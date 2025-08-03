import os
import sys
from unittest.mock import patch, MagicMock

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import StaticPool, create_engine
from sqlalchemy.orm import sessionmaker

from config.db import Base
from exception.exceptions import RecordNotFoundException
from main import app

sys.path.append(os.getcwd())
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSession = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def override_get_db():
    db = TestingSession()
    try:
        yield db
    finally:
        db.close()


Base.metadata.create_all(bind=engine)

client = TestClient(app)


@pytest.fixture
def mock_dependencies():
    with patch("util.helper.get_snowflake_schema_by_table_name") as mock_get_snowflake_schema_by_table_name, \
            patch("util.prompts.get_sql_generation_prompt") as mock_get_sql_generation_prompt, \
            patch("config.llm_connection.chat_with_openai") as mock_chat_with_openai, \
            patch("util.helper.execute_query_to_snowflake") as mock_execute_query_to_snowflake, \
            patch("util.prompts.get_formatted_quick_insight") as mock_get_formatted_quick_insight, \
            patch("util.get_db.db_dependency") as mock_db:
        mock_db.return_value = MagicMock(spec=TestingSession)

        mock_get_snowflake_schema_by_table_name.return_value = """
        TABLE ROWSAI_DB.ROWSAI_SCHEMA.A466C7F1_0_SAMPLE (
            FIRST_NAME VARCHAR(16777216), 
            LAST_NAME VARCHAR(16777216), 
            COMPANY_NAME VARCHAR(16777216), 
            ADDRESS VARCHAR(16777216), 
            CITY VARCHAR(16777216), 
            COUNTY VARCHAR(16777216), 
            STATE VARCHAR(16777216),
            ZIP VARCHAR(16777216), 
            EMAIL VARCHAR(16777216
        )
        """
    yield mock_chat_with_openai, mock_get_sql_generation_prompt, \
        mock_execute_query_to_snowflake, mock_get_formatted_quick_insight


def test_register_user_query_with_insight_question(mock_dependencies):
    mock_chat_with_openai, mock_get_sql_generation_prompt, \
        mock_execute_query_to_snowflake, mock_get_formatted_quick_insight = mock_dependencies

    mock_data = """{
         "summary": "Country with most companies",
        "sql_query": "SELECT STATE AS country, COUNT(COMPANY_NAME) AS company_count FROM A466C7F1_0_SAMPLE GROUP BY STATE ORDER BY company_count DESC LIMIT 1;",
        "insight": "The state with the highest number of companies is ## with ## companies."
    }"""

    mock_get_sql_generation_prompt.return_value = mock_data
    mock_execute_query_to_snowflake.return_value = [('CA', 5)]
    mock_chat_with_openai.return_value = mock_data
    mock_get_formatted_quick_insight.return_value = mock_data

    request_params = {
        "datatable_id": 1,
        "table_name": "A466C7F1_0_SAMPLE",
        "user_question": "What is the country name where most of the company is present?"
    }
    response = client.post("/api/v1/user-query", params=request_params)
    response = response.json()
    assert "id" in response
    assert response["data_table_id"] == 1
    assert response["query"] == "What is the country name where most of the company is present?"


def test_register_user_query_with_deepdive_question(mock_dependencies):
    mock_chat_with_openai, mock_get_sql_generation_prompt, \
        mock_execute_query_to_snowflake, mock_get_formatted_quick_insight = mock_dependencies

    mock_data = """{
        "summary": "Retrieve first name and email of users from Los Angeles",
        "sql_query": "SELECT FIRST_NAME, EMAIL FROM A466C7F1_0_SAMPLE WHERE CITY = 'Los Angeles';",
        "insight": "There are # users from Los Angeles in the database."
    }"""

    mock_get_sql_generation_prompt.return_value = mock_data
    mock_execute_query_to_snowflake.return_value = [('Kiley', 'kiley.caldarera@aol.com'),
                                                    ('Kanisha', 'kanisha_waycott@yahoo.com')]
    mock_chat_with_openai.return_value = mock_data
    mock_get_formatted_quick_insight.return_value = mock_data

    request_params = {
        "datatable_id": 1,
        "table_name": "A466C7F1_0_SAMPLE",
        "user_question": "Give the user firstname, email whose country is Los Angeles?"
    }

    response = client.post("/api/v1/user-query", params=request_params)
    assert response.status_code == 200
    response = response.json()
    assert "id" in response
    assert response["data_table_id"] == 1
    assert response["query"] == "Give the user firstname, email whose country is Los Angeles?"
