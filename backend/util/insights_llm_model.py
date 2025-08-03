import json
from typing import List
import pandas as pd
import logging
from config.llm_connection import chat_with_openai
from util.helper import get_snowflake_schema_by_table_name, execute_query_to_snowflake
from util.prompts import get_quick_insight_sql_generation_prompt, get_formatted_quick_insight_prompt

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def get_insights_from_llm(table_name: str) -> List[str]:
    logger.info(f"Fetching Snowflake schema for table: {table_name}")

    snowflake_table_schema = get_snowflake_schema_by_table_name(snowflake_table_name=table_name)
    print(f"SCHEMA: {type(snowflake_table_schema)}", snowflake_table_schema)

    sql_generation_prompt = get_quick_insight_sql_generation_prompt(schema=snowflake_table_schema)
    llm_response = chat_with_openai(prompt=sql_generation_prompt)
    logger.info("SQL query response: %s", llm_response)

    formatted_llm_response = json.loads(llm_response)
    quick_insights = []

    for insight in formatted_llm_response:
        query = insight["sql_query"]
        quick_insight = insight["insight"]

        snowflake_record, table_description = execute_query_to_snowflake(query)
        print("Snowflake data: ", snowflake_record, len(snowflake_record))
        logger.info(f"Data fetched from Snowflake successfully for the query: {query} on table: {table_name}")

        if len(snowflake_record) == 0:
            return [f"Invalid table_name {table_name}"]

        if len(snowflake_record) == 1:
            snowflake_df = pd.DataFrame(snowflake_record, columns=[desc[0] for desc in table_description])
            quick_insight_data = snowflake_df.to_dict(orient='records')

            formatted_quick_insight = get_formatted_quick_insight_prompt(quick_insight, quick_insight_data)
            quick_insight_response = chat_with_openai(prompt=formatted_quick_insight)

            quick_insight_json = json.loads(quick_insight_response.replace(",}", "}"))
            quick_insight = quick_insight_json.get("quick_insight")
            logger.info(f"Quick Insight posted successfully: {quick_insight}")

            quick_insights.append(quick_insight)

    return quick_insights
