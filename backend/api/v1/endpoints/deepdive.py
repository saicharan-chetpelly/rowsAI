import json
import logging
import os
from datetime import datetime
from typing import List
from dotenv import load_dotenv
import pandas as pd
from sqlalchemy.orm import Session

from exception.exceptions import InternalServerErrorException, SpreadsheetNotFoundException, PageNotFoundException, \
    DataTableNotFoundException
from model.models import DeepDive
from util.deep_dives_llm_model import get_deep_dives_from_llm
from util.get_db import db_dependency
from fastapi import APIRouter, Path
import redis
from util.constants import BASE_API_URL_PATH, TAGS, SPREADSHEET_ENDPOINT, PAGE_ENDPOINT, DATA_TABLE_ENDPOINT, \
    SPREADSHEET_ID_TEXT, PAGE_ID_TEXT, DATA_TABLE_ID_TEXT, QUERY_ID_TEXT
from schema.deepdive import DeepDive as DeepDiveSchema, DeepDiveTableContent, DeepDiveTableSchema
from util.helper import get_data_table, execute_query_to_snowflake, get_deep_dives, get_cache_key, \
    get_snowflake_table_name_by_datatable_id

load_dotenv()
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
router = APIRouter(tags=[TAGS[3]], prefix=BASE_API_URL_PATH)

redis_client = redis.Redis(host=os.getenv("REDIS_HOST"), port=os.getenv("REDIS_PORT"),
                           password=os.getenv("REDIS_PASSWORD"), db=0)


@router.get("/deep-dives/{sql_query}", response_model=DeepDiveTableContent)
async def get_deep_dive_table(sql_query: str = Path(..., title=QUERY_ID_TEXT)):
    try:
        logger.info("Fetching data from snowflake using the sql query")
        table_data, table_description = execute_query_to_snowflake(sql_query)
        if not len(table_data):
            logger.warning("No data found from snowflake with provided query")

        snowflake_df = pd.DataFrame(table_data, columns=[desc[0] for desc in table_description])
        file_content = snowflake_df.to_dict(orient='records')
        return DeepDiveTableContent(file_content=file_content)

    except Exception as e:
        logger.exception(f"An error occurred while fetching data: {e}")
        raise InternalServerErrorException() from e


@router.post(f"{SPREADSHEET_ENDPOINT}{PAGE_ENDPOINT}{DATA_TABLE_ENDPOINT}/deep-dives",
             response_model=List[DeepDiveSchema])
async def create_deepdive(
        spreadsheet_id: int = Path(..., title=SPREADSHEET_ID_TEXT),
        page_id: int = Path(..., title=PAGE_ID_TEXT),
        datatable_id: int = Path(..., title=DATA_TABLE_ID_TEXT),
        db: Session = db_dependency
):
    try:
        data_table = get_data_table(db, spreadsheet_id, page_id, datatable_id)
        logger.info(f"Fetched data table successfully: {data_table}")
        redis_key = get_cache_key(datatable_id)
        cached_deep_dives = redis_client.get(redis_key)
        existing_deep_dives = get_deep_dives(db, spreadsheet_id, page_id, datatable_id)

        if cached_deep_dives:
            try:
                logger.info(f"Fetched deep dives successfully: {cached_deep_dives}")
                decoded_data = json.loads(cached_deep_dives.decode('utf-8'))
                return decoded_data
            except json.JSONDecodeError:
                logger.error("Error decoding cached deep dives from Redis")

        elif existing_deep_dives:
            logger.info(f"Deep dives fetched from database: {existing_deep_dives}")
            return existing_deep_dives

        else:
            input_table_name = get_snowflake_table_name_by_datatable_id(db, datatable_id)
            deep_dives_response = get_deep_dives_from_llm(input_table_name)
            logger.info(f"deep dives{deep_dives_response}")
            deep_dives = []
            for deepdive in deep_dives_response:
                new_deep_dive = DeepDive(
                    query=deepdive["query"],
                    label=deepdive["deep_dive"],
                    data_table_id=datatable_id
                )
                db.add(new_deep_dive)
                deep_dives.append(new_deep_dive)
            db.commit()
            db.refresh(new_deep_dive)
            logger.info(f"Deep dives created successfully: {deep_dives}")
            deep_dives_to_save_in_redis = [{"label": deepdive.label,"query": deepdive.query, "data_table_id": deepdive.data_table_id, "id": deepdive.id}
                                           for deepdive in deep_dives]
            redis_client.setex(redis_key, 60 * 60, json.dumps(deep_dives_to_save_in_redis))
            logger.info(f"Deep dives added to cache successfully {deep_dives}")
        response_data = []
        for deep_dive in deep_dives:
            response_data.append({
                "label": deep_dive.label,
                "query": deep_dive.query,
                "data_table_id": deep_dive.data_table_id,
                "id": deep_dive.id,
                "createdAt": datetime.now()
            })
        return response_data

    except SpreadsheetNotFoundException:
        raise SpreadsheetNotFoundException(spreadsheet_id)

    except PageNotFoundException:
        raise PageNotFoundException(page_id)

    except DataTableNotFoundException:
        raise DataTableNotFoundException(datatable_id)

    except Exception as e:
        logger.exception(f"An error occurred white fetching the deep dives: {e}")
        raise InternalServerErrorException() from e
