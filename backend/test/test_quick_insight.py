import json
import pytest
import os
import sys
from datetime import datetime
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.pool import StaticPool
from unittest.mock import patch
from unittest.mock import MagicMock

from test.test_deepdive import mock_spreadsheet, create_mock_page, create_mock_datatable

sys.path.append(os.getcwd())

from config.db import Base
from main import app
from model.models import Spreadsheet as SpreadSheetModel, Page as PageModel, DataTable as DataTableModel, \
    QuickInsight as QuickInsightModel

SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)

TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()


Base.metadata.create_all(bind=engine)

client = TestClient(app)


@pytest.fixture
def mock_dependencies():
    with patch('util.insights_llm_model.get_insights_from_llm') as mock_get_insights_from_llm, \
            patch('util.helper.get_snowflake_schema_by_table_name') as mock_get_schema, \
            patch('util.helper.execute_query_to_snowflake') as mock_get_queries, \
            patch('config.llm_connection.chat_with_openai') as mock_get_model, \
            patch('api.v1.endpoints.quick_insight.redis_client') as mock_redis, \
            patch('util.get_db.db_dependency') as mock_db:
        mock_db.return_value = MagicMock(spec=Session)
        mock_get_schema.return_value = """
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
        mock_redis_instance = MagicMock()
        mock_redis.return_value = mock_redis_instance
        yield mock_get_insights_from_llm, mock_get_model, mock_get_queries


def test_create_insights_success():
    spreadsheet_id = mock_spreadsheet()
    page_id = create_mock_page(1, spreadsheet_id)
    data_table_id = create_mock_datatable(page_id)

    with TestingSessionLocal() as db:
        db.query(QuickInsightModel).delete()
        db.commit()

    response = client.post(f"/api/v1/spreadsheets/{spreadsheet_id}/pages/{page_id}/data-tables/{data_table_id}/quick-insights")

    assert response.status_code == 200


def test_create_insights_with_error():
    spreadsheet_id = mock_spreadsheet()
    page_id = create_mock_page(1, spreadsheet_id)
    data_table_id = create_mock_datatable(page_id)

    with TestingSessionLocal() as db:
        db.query(QuickInsightModel).delete()
        db.commit()

    with patch('api.v1.endpoints.quick_insight.redis_client.get') as mock_redis_get:
        mock_redis_get.return_value = None

        with patch('util.insights_llm_model.get_insights_from_llm') as mock_get_insights_from_llm:
            mock_get_insights_from_llm.side_effect = json.JSONDecodeError("Error decoding cached insights from Redis",
                                                                          "", 0)

            response = client.post(f"/api/v1/spreadsheets/{spreadsheet_id}/pages/{page_id}/data-tables/{data_table_id}/quick-insights")
            assert response.status_code == 200

            mock_get_insights_from_llm.side_effect = None
            mock_get_insights_from_llm.return_value = ["insight1", "insight2"]


def test_create_insights_spreadsheet_not_found():
    spreadsheet_id = 999
    page_id = 1
    data_table_id = 1

    response = client.post(f"/api/v1/spreadsheets/{spreadsheet_id}/pages/{page_id}/data-tables/{data_table_id}/quick-insights")
    assert response.status_code == 404


def test_insights_page_not_found():
    spreadsheet_id = 1
    page_id = 999
    data_table_id = 1

    response = client.post(f"/api/v1/spreadsheets/{spreadsheet_id}/pages/{page_id}/data-tables/{data_table_id}/quick-insights")
    assert response.status_code == 404


def test_create_insights_datatable_not_found():
    spreadsheet_id = 1
    page_id = 1
    data_table_id = 999

    response = client.post(f"/api/v1/spreadsheets/{spreadsheet_id}/pages/{page_id}/data-tables/{data_table_id}/quick-insights")
    assert response.status_code == 404
