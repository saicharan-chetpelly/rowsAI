import json
import logging
import os
from typing import List
import redis
from dotenv import load_dotenv
from fastapi import APIRouter, Path
from sqlalchemy.orm import Session
from exception.exceptions import SpreadsheetNotFoundException, PageNotFoundException, DataTableNotFoundException, \
    InternalServerErrorException
from util.constants import BASE_API_URL_PATH, TAGS, SPREADSHEET_ENDPOINT, PAGE_ENDPOINT, DATA_TABLE_ENDPOINT, \
    QUICK_INSIGHTS_ENDPOINT, SPREADSHEET_ID_TITLE, PAGE_ID_TITLE, DATATABLE_ID_TITLE
from util.get_db import db_dependency
from model.models import DataTable, QuickInsight
from schema.quick_insight_schema import QuickInsightResponse
from util.helper import get_data_table, get_snowflake_table_name_by_datatable_id
from util.insights_llm_model import get_insights_from_llm

load_dotenv()
router = APIRouter(tags=[TAGS[4]], prefix=BASE_API_URL_PATH)
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def get_cache_key(datatable_id):
        return f"insights_{datatable_id}"

redis_client = redis.Redis(host=os.getenv("REDIS_HOST"), port=os.getenv("REDIS_PORT"), password=os.getenv("REDIS_PASSWORD"), db=0)


@router.post(f"{SPREADSHEET_ENDPOINT}{PAGE_ENDPOINT}{DATA_TABLE_ENDPOINT}{QUICK_INSIGHTS_ENDPOINT}",
             response_model=List[QuickInsightResponse])
async def create_quick_insight(
        spreadsheet_id: int = Path(..., title=SPREADSHEET_ID_TITLE),
        page_id: int = Path(..., title=PAGE_ID_TITLE),
        datatable_id: int = Path(..., title=DATATABLE_ID_TITLE),
        db: Session = db_dependency
):
    try:
        data_table = get_data_table(db, spreadsheet_id, page_id, datatable_id)
        logger.info(f"Data Table retrieved successfully: {data_table}")
        cache_key = get_cache_key(datatable_id)
        cached_quick_insights = redis_client.get(cache_key)
        existing_insights = db.query(QuickInsight).join(DataTable).filter(DataTable.id == datatable_id).all()

        if cached_quick_insights:
            try:
                logger.info(f"Insights retrieved successfully from cache: {cached_quick_insights}")
                cached_insights_list = json.loads(cached_quick_insights.decode('utf-8'))
                return cached_insights_list
            except json.JSONDecodeError:
                logger.error("Error decoding cached insights from Redis")

        elif len(existing_insights) != 0:
            logger.info(f"Insights retrieved from database: {existing_insights}")
            return existing_insights

        else:
            snowflake_table_name = get_snowflake_table_name_by_datatable_id(db, datatable_id)
            insights_response = get_insights_from_llm(snowflake_table_name)

            quick_insights = []
            for insight_label in insights_response:
                new_insight = QuickInsight(
                    label=insight_label,
                    data_table_id=datatable_id
                )
                db.add(new_insight)
                quick_insights.append(new_insight)
            db.commit()
            db.refresh(new_insight)

            logger.info(f"Quick insights stored in database successfully: {quick_insights}")
            insights_to_save_in_redis = [
                {"label": insight.label, "data_table_id": insight.data_table_id, "id": insight.id}
                for insight in quick_insights
            ]
            redis_client.setex(cache_key, 60 * 60, json.dumps(insights_to_save_in_redis))
            logger.info(f"Insights stored successfully into the cache: {quick_insights}")
        return quick_insights

    except SpreadsheetNotFoundException:
        raise SpreadsheetNotFoundException(spreadsheet_id)

    except PageNotFoundException:
        raise PageNotFoundException(page_id)

    except DataTableNotFoundException:
        raise DataTableNotFoundException(datatable_id)

    except Exception as exception:
        logger.exception(f"An error occurred while fetching quick insights: {exception}")
        raise InternalServerErrorException() from exception
