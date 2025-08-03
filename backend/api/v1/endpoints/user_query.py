import json
import logging
import os

import pandas as pd
import redis
from fastapi import APIRouter
from sqlalchemy.orm import Session
from starlette import status

from config.llm_connection import chat_with_openai
from exception.exceptions import InternalServerErrorException, DataTableNotFoundException, RecordNotFoundException
from model.models import QuickInsight, DeepDive, UserQuery, DataTable
from schema.user_query_schema import UserQueryResponse
from util.constants import TAGS, BASE_API_URL_PATH
from util.get_db import db_dependency
from util.helper import execute_query_to_snowflake, get_snowflake_schema_by_table_name, get_insight_cache_key, \
    get_cache_key
from util.prompts import get_sql_generation_prompt, get_formatted_quick_insight

user_query_router = APIRouter(tags=[TAGS[2]], prefix=BASE_API_URL_PATH)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
redis_client = redis.Redis(host=os.getenv("REDIS_HOST"), port=os.getenv("REDIS_PORT"), password=os.getenv("REDIS_PASSWORD"), db=0)

@user_query_router.post("/user-query", status_code=status.HTTP_200_OK, response_model=UserQueryResponse)
async def register_user_query(datatable_id: int, table_name: str, user_question: str, db: Session = db_dependency):
    try:
        logger.info(f"Fetching data table info of id: {datatable_id}")

        data_table_model = db.query(DataTable).filter(DataTable.id == datatable_id).first()
        if data_table_model is None:
            raise DataTableNotFoundException(data_table_id=datatable_id)

        logger.info(f"Fetching Snowflake schema for table: {table_name}")

        snowflake_table_schema = get_snowflake_schema_by_table_name(snowflake_table_name=table_name)
        sql_generation_prompt = get_sql_generation_prompt(schema=snowflake_table_schema,
                                                          user_query=user_question.strip())

        user_query_llm_response = chat_with_openai(prompt=sql_generation_prompt)
        user_query_json_response = json.loads(user_query_llm_response.replace(",}", "}"))

        query = user_query_json_response.get("sql_query")
        quick_insight = user_query_json_response.get("insight")
        deepdive = user_query_json_response.get("summary")

        snowflake_record, table_description = execute_query_to_snowflake(query)
        logger.info(f"Data fetched from Snowflake successfully for the query: {query} on table: {table_name}")

        if len(snowflake_record) == 0:
            raise RecordNotFoundException(user_question)

        if len(snowflake_record) == 1:
            logger.info(f"Quick insight: {quick_insight}")
            snowflake_df = pd.DataFrame(snowflake_record, columns=[desc[0] for desc in table_description])
            quick_insight_data = snowflake_df.to_dict(orient='records')

            formatted_quick_insight = get_formatted_quick_insight(quick_insight, quick_insight_data)
            quick_insight_response = chat_with_openai(prompt=formatted_quick_insight)

            quick_insight_json = json.loads(quick_insight_response.replace(",}", "}"))
            quick_insight = quick_insight_json.get("quick_insight")

            logger.info("Quick Insight posted successfully.")

            cache_key = get_insight_cache_key(datatable_id)
            cached_quick_insights = redis_client.get(cache_key)
            cached_quick_insights = cached_quick_insights.decode('utf-8')
            cached_quick_insights = json.loads(cached_quick_insights)
            quick_insight_data = QuickInsight(label=quick_insight, data_table_id=datatable_id)
            db.add(quick_insight_data)
            db.commit()
            temp_quick_insight = {
                "label": quick_insight_data.label,
                "data_table_id": quick_insight_data.data_table_id,
                "id": quick_insight_data.id
            }
            cached_quick_insights.append(temp_quick_insight)
            insights_to_save_in_redis = [
                {"label": insight['label'], "data_table_id": insight['data_table_id'], "id": insight.get('id')}
                for insight in cached_quick_insights
            ]
            redis_client.setex(cache_key, 60 * 60, json.dumps(insights_to_save_in_redis))
            db.commit()
            db.refresh(quick_insight_data)

        else:
            try:
                logger.info(f"Deepdive posted successfully with label: {deepdive}")
                cache_key = get_cache_key(datatable_id)
                cached_deepdives = redis_client.get(cache_key)
                cached_deepdives = cached_deepdives.decode('utf-8')
                cached_deepdives = json.loads(cached_deepdives)
                deep_dive_data = DeepDive(label=deepdive, query=query, data_table_id=datatable_id)
                db.add(deep_dive_data)
                db.commit()
                temp_deepdive = {
                    "label": deep_dive_data.label,
                    "query": deep_dive_data.query,
                    "data_table_id": deep_dive_data.data_table_id,
                    "id": deep_dive_data.id
                }
                cached_deepdives.append(temp_deepdive)
                deepdives_to_save_in_redis = [
                    {"label": deepdive['label'],"query": deepdive['query'],"data_table_id": deepdive['data_table_id'], "id": deepdive.get('id')}
                    for deepdive in cached_deepdives
                ]
                redis_client.setex(cache_key, 60 * 60, json.dumps(deepdives_to_save_in_redis))
                db.commit()
                db.refresh(deep_dive_data)
            except json.JSONDecodeError as e:
                logger.error(f"Error decoding JSON: {e}")

        user_query_data = UserQuery(query=user_question, data_table_id=datatable_id)
        db.add(user_query_data)
        db.commit()
        db.refresh(user_query_data)
        return user_query_data

    except RecordNotFoundException as e:
        logger.warning("No record found for given user question.")
        raise RecordNotFoundException(user_question)
    except DataTableNotFoundException as e:
        logger.exception("Data table not found with the given id")
        raise DataTableNotFoundException(datatable_id)
    except Exception as e:
        logger.error(e)
        raise InternalServerErrorException() from e
