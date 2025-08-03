import json
import os
import sys
from datetime import datetime
from http.client import HTTPException

from model.models import Spreadsheet as SpreadSheetModel, Page as PageModel, DataTable as DataTableModel, DeepDive

import pytest
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from sqlalchemy.pool import StaticPool
from sqlalchemy.orm import sessionmaker

from unittest.mock import patch, MagicMock
from fastapi.testclient import TestClient

from config.db import Base
from main import app

sys.path.append(os.getcwd())
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
    with patch('util.deep_dives_llm_model.get_deep_dives_from_llm') as mock_get_deep_dives_from_llm, \
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
        yield mock_get_deep_dives_from_llm, mock_get_model, mock_get_queries


def mock_spreadsheet():
    sheet_id = 1
    sample_data = {
        "id": sheet_id,
        "title": f"sheet {sheet_id}",
        "createdAt": datetime(2024, 2, 1, 16, 0, 0),
        "updatedAt": datetime(2024, 2, 1, 16, 0, 0),
    }
    with TestingSessionLocal() as db:
        existing_sheet = db.query(SpreadSheetModel).filter(SpreadSheetModel.id == sheet_id).first()
        if existing_sheet:
            return existing_sheet.id

        db.add(SpreadSheetModel(**sample_data))
        db.commit()

    return sheet_id

def create_mock_page(page_id,spreadsheet_id):
    name = f"Page {page_id}"
    time = datetime(2024, 2, 4, 16, 0, 0)
    page_sample_data = {
        "id": page_id,
        "title": name,
        "createdAt": time,
        "updatedAt": time,
        "spreadsheet_id": spreadsheet_id
    }
    with TestingSessionLocal() as db:
        retrived_page = db.query(PageModel).filter(PageModel.id == page_id).first()
        if retrived_page:
            return retrived_page.id

        db.add(PageModel(**page_sample_data))
        db.commit()

    return page_id

def create_mock_datatable(page_id):
    table_id = 1
    datatable_name = f"DataTable {table_id}"
    test_time = datetime(2024, 2, 3, 12, 0, 0)
    sample_data = {
        "id": table_id,
        "table_name": datatable_name,
        "snowflake_table_name": "T4C343F4C_13A8_4408_8508_D3B758D0CE49",
        "createdAt": test_time,
        "updatedAt": test_time,
        "page_id": page_id
    }
    with TestingSessionLocal() as db:
        retrived_datatable = db.query(DataTableModel).filter(DataTableModel.id == table_id).first()
        if retrived_datatable:
            return retrived_datatable.id

        db.add(DataTableModel(**sample_data))
        db.commit()

    return table_id


def test_create_deepdive_success():
    spreadsheet_id = mock_spreadsheet()
    page_id = create_mock_page(1, spreadsheet_id)
    datatable_id = create_mock_datatable(page_id)

    with TestingSessionLocal() as db:
        db.query(DeepDive).delete()
        db.commit()

    response = client.post(f"/api/v1/spreadsheets/{spreadsheet_id}/pages/{page_id}/data-tables/{datatable_id}/deep-dives")

    assert response.status_code == 200


def test_create_deep_dives_with_error():
    spreadsheet_id = mock_spreadsheet()
    page_id = create_mock_page(1, spreadsheet_id)
    datatable_id = create_mock_datatable(page_id)

    with TestingSessionLocal() as db:
        db.query(DeepDive).delete()
        db.commit()

    with patch('api.v1.endpoints.deepdive.redis_client.get') as mock_redis_get:
        mock_redis_get.return_value = None

        with patch('util.deep_dives_llm_model.get_deep_dives_from_llm') as mock_get_deep_dives_from_llm:
            mock_get_deep_dives_from_llm.side_effect = json.JSONDecodeError("Error decoding cached insights from Redis",
                                                                          "", 0)

            response = client.post(f"/api/v1/spreadsheets/{spreadsheet_id}/pages/{page_id}/data-tables/{datatable_id}/deep-dives")
            assert response.status_code == 200

            mock_get_deep_dives_from_llm.side_effect = None
            mock_get_deep_dives_from_llm.return_value = ["deep_dive1", "deep_dive2"]


def test_create_and_cache_new_deepdives():
    with patch('api.v1.endpoints.deepdive.get_deep_dives_from_llm') as mock_get_deep_dives_from_llm, \
            patch(
                'api.v1.endpoints.deepdive.get_snowflake_table_name_by_datatable_id') as mock_get_snowflake_table_name, \
            patch('api.v1.endpoints.deepdive.redis_client.get') as mock_redis_get, \
            patch('api.v1.endpoints.deepdive.redis_client.setex') as mock_redis_setex:
        mock_redis_setex_instance = MagicMock()
        mock_redis_setex.return_value = mock_redis_setex_instance
        mock_get_deep_dives_from_llm.return_value = [{"deep_dive": "Test Deep Dive", "query": "SELECT * FROM TABLE"}]
        mock_get_snowflake_table_name.return_value = "SAMPLE_TABLE"
        mock_redis_get.return_value = None

        spreadsheet_id = mock_spreadsheet()
        page_id = create_mock_page(1, spreadsheet_id)
        datatable_id = create_mock_datatable(page_id)

        response = client.post(
            f"/api/v1/spreadsheets/{spreadsheet_id}/pages/{page_id}/data-tables/{datatable_id}/deep-dives")

        assert response.status_code == 200
        assert len(response.json()) == 4


def test_create_deepdives_spreadsheet_not_found():
    spreadsheet_id = 999
    page_id = 1
    data_table_id = 1

    response = client.post(
        f"/api/v1/spreadsheets/{spreadsheet_id}/pages/{page_id}/data-tables/{data_table_id}/deep-dives")
    assert response.status_code == 404


def test_deepdives_page_not_found():
    spreadsheet_id = 1
    page_id = 999
    data_table_id = 1

    response = client.post(
        f"/api/v1/spreadsheets/{spreadsheet_id}/pages/{page_id}/data-tables/{data_table_id}/deep-dives")
    assert response.status_code == 404


def test_create_deepdives_datatable_not_found():
    spreadsheet_id = 1
    page_id = 1
    data_table_id = 999

    response = client.post(
        f"/api/v1/spreadsheets/{spreadsheet_id}/pages/{page_id}/data-tables/{data_table_id}/deep-dives")
    assert response.status_code == 404
#

def test_get_deep_dive_table_success():
    sql_query = "select * from A9218106_F_SAMPLE_DATA;"
    response = client.get(f"/api/v1/deep-dives/{sql_query}")
    assert response.status_code == 200
    assert "file_content" in response.json()
    assert len(response.json()["file_content"]) > 0


def test_get_deep_dive_table_internal_server_error():
    sql_query = "SELECT * FROM table_name"
    with patch('util.helper.execute_query_to_snowflake') as mock_execute_query:
        mock_execute_query.side_effect = Exception("Mocked Snowflake Error")

        response = client.get(f"/api/v1/deep-dives/{sql_query}")

        assert response.status_code == 500