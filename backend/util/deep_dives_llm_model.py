import json
from typing import List, Dict, Any
import logging
from config.llm_connection import chat_with_openai
from util.helper import get_snowflake_schema_by_table_name
from util.prompts import get_sql_generation_prompt_deep_dive

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def get_deep_dives_from_llm(table_name: str) -> List[Dict[str, Any]]:
    logger.info(f"Fetching Snowflake schema for table: {table_name}")

    snowflake_table_schema = get_snowflake_schema_by_table_name(snowflake_table_name=table_name)
    print(f"SCHEMA: {type(snowflake_table_schema)}", snowflake_table_schema)

    sql_generation_prompt = get_sql_generation_prompt_deep_dive(schema=snowflake_table_schema)
    llm_response = chat_with_openai(prompt=sql_generation_prompt)
    logger.info("SQL query response: %s", llm_response)

    formatted_llm_response = json.loads(llm_response)
    logger.info(f"formatted_llm_response: {formatted_llm_response}")
    deep_dives = []
    for deepdive in formatted_llm_response:
        query = deepdive["sql_query"]
        deep_dive = deepdive["summary"]
        deep_dives.append({"query": query, "deep_dive": deep_dive})
    return deep_dives
