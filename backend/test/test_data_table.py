import os
import sys
from datetime import datetime
from unittest.mock import MagicMock
from unittest.mock import patch

import snowflake.connector
import pytest
from fastapi import HTTPException
from fastapi.testclient import TestClient
from snowflake.connector.cursor import ResultMetadata
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from config.db import Base
from exception.exceptions import UnprocessableEntityException, PageNotFoundException
from main import app
from model.models import Spreadsheet as SpreadsheetModel, Page as PageModel, DataTable as DataTableModel
from util.constants import DATA_TABLE_ROUTE_PREFIX

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


def create_mock_spreadsheet():
    spreadsheet_id = 1
    spreadsheet_data = {
        "id": spreadsheet_id,
        "title": f"Test Spreadsheet {spreadsheet_id}",
        "createdAt": datetime(2024, 3, 30, 18, 0, 0),
        "updatedAt": datetime(2024, 3, 30, 18, 0, 0),
    }
    with TestingSessionLocal() as db:
        existing_spreadsheet = db.query(SpreadsheetModel).filter(SpreadsheetModel.id == spreadsheet_id).first()
        if existing_spreadsheet:
            return existing_spreadsheet.id

        db.add(SpreadsheetModel(**spreadsheet_data))
        db.commit()

    return spreadsheet_id


def create_test_page(page_id, spreadsheet_id):
    page_name = f"Test Page {page_id}"
    test_time = datetime(2024, 3, 30, 18, 0, 0)
    page_data = {
        "id": page_id,
        "title": page_name,
        "createdAt": test_time,
        "updatedAt": test_time,
        "spreadsheet_id": spreadsheet_id
    }
    with TestingSessionLocal() as db:
        existing_page = db.query(PageModel).filter(PageModel.id == page_id).first()
        if existing_page:
            return existing_page.id

        db.add(PageModel(**page_data))
        db.commit()

    return page_id


def create_test_datatable(page_id):
    datatable_id = 1
    datatable_name = f"Test DataTable {datatable_id}"
    test_time = datetime(2024, 3, 4, 18, 0, 0)
    datatable_data = {
        "id": datatable_id,
        "table_name": datatable_name,
        "createdAt": test_time,
        "updatedAt": test_time,
        "page_id": page_id
    }
    with TestingSessionLocal() as db:
        existing_datatable = db.query(DataTableModel).filter(DataTableModel.id == datatable_id).first()
        if existing_datatable:
            return existing_datatable.id

        db.add(DataTableModel(**datatable_data))
        db.commit()

    return datatable_id


def mock_get_snowflake_data_table(snowflake_table_name):
    snowflake_table = [('value1', 'value2')]
    table_description = [
        ResultMetadata(name='COL1', type_code=2, display_size=None, internal_size=16777216, precision=None, scale=None,
                       is_nullable=True),
        ResultMetadata(name='COL2', type_code=2, display_size=None, internal_size=16777216, precision=None, scale=None,
                       is_nullable=True)]

    return snowflake_table, table_description


def test_create_datatable_success():
    spreadsheet_id = create_mock_spreadsheet()
    page_id = create_test_page(1, spreadsheet_id)
    file_data = b"col1,col2\nvalue1,value2\n"
    files = {'upload_file': ('test.csv', file_data)}
    response = client.post(f"{DATA_TABLE_ROUTE_PREFIX}/pages/{page_id}", files=files)
    assert response.status_code == 201
    assert response.json().get("table_name") == "test"



def test_create_datatable_empty_file():
    spreadsheet_id = create_mock_spreadsheet()
    page_id = create_test_page(1, spreadsheet_id)
    file_data = b""
    files = {'upload_file': ('test.csv', file_data)}

    response = client.post(f"{DATA_TABLE_ROUTE_PREFIX}/pages/{page_id}", files=files)
    if response.status_code == 400:
        assert response.json()["detail"] == "Please upload a valid file"
    else:
        assert response.status_code == 422


def test_create_datatable_internal_server_error_exception():
    with patch('util.helper.fetch_page_by_id', side_effect=UnprocessableEntityException):
        spreadsheet_id = create_mock_spreadsheet()
        page_id = create_test_page(1, spreadsheet_id)
        file_data = b"col1,col2\nvalue1,value2\n"
        files = {'upload_file': ('test.csv', file_data)}
        try:
            client.post(f"{DATA_TABLE_ROUTE_PREFIX}/pages/{page_id}", files=files)
        except HTTPException as e:
            assert e.status_code == 422
            assert e.detail == "Unprocessable entity"


def test_get_all_datatables():
    spreadsheet_id = create_mock_spreadsheet()
    page_id = create_test_page(1, spreadsheet_id)
    patch('util.file_function.get_snowflake_data_table', mock_get_snowflake_data_table)
    response = client.get(f"{DATA_TABLE_ROUTE_PREFIX}/pages/{page_id}")
    assert response.status_code == 200


def test_get_all_datatables_page_not_found():
    non_exist_page_id = 111

    response = client.get(f"{DATA_TABLE_ROUTE_PREFIX}/pages/{non_exist_page_id}")
    assert response.status_code == 404
    assert response.json()["detail"] == f"Page with id {non_exist_page_id} not found"


def test_get_all_datatables_internal_server_error_exception():
    with patch('util.helper.fetch_page_by_id', side_effect=UnprocessableEntityException):
        spreadsheet_id = create_mock_spreadsheet()
        page_id = create_test_page(1, spreadsheet_id)
        try:
            client.get(f"{DATA_TABLE_ROUTE_PREFIX}/pages/{page_id}")
        except HTTPException as e:
            assert e.status_code == 422
            assert e.detail == "Unprocessable entity"


def test_update_datatable_success():
    datatable_id = 1
    datatable_patch_data = {
        "table_name": "Updated DataTable Name",
    }
    response = client.patch(
        f"{DATA_TABLE_ROUTE_PREFIX}/{datatable_id}",
        json=datatable_patch_data
    )
    assert response.status_code == 200
    updated_datatable = response.json()
    assert updated_datatable["id"] == datatable_id
    assert updated_datatable["table_name"] == datatable_patch_data["table_name"]


def test_update_datatable_internal_server_error_exception():
    with patch('util.helper.fetch_page_by_id', side_effect=UnprocessableEntityException):
        datatable_id = 1
        datatable_patch_data = {
            "table_name": "Updated DataTable Name",
        }
        try:
            client.patch(
                f"{DATA_TABLE_ROUTE_PREFIX}/{datatable_id}",
                json=datatable_patch_data
            )
        except HTTPException as e:
            assert e.status_code == 422
            assert e.detail == "Unprocessable entity"


def test_get_datatable_by_id_success():
    datatable_id = 1

    response = client.get(f"{DATA_TABLE_ROUTE_PREFIX}/{datatable_id}")
    assert response.status_code == 200


def test_get_datatable_by_id_datatable_not_found():
    non_existent_datatable_id = 100
    response = client.get(f"{DATA_TABLE_ROUTE_PREFIX}/{non_existent_datatable_id}")
    assert response.status_code == 404
    assert response.json()["detail"] == f"Data table not found with id: {non_existent_datatable_id}"


def test_get_datatable_by_id_internal_server_error_exception():
    with patch('util.helper.fetch_page_by_id', side_effect=UnprocessableEntityException):
        datatable_id = 1
        try:
            client.get(f"{DATA_TABLE_ROUTE_PREFIX}/{datatable_id}")
        except HTTPException as e:
            assert e.status_code == 422
            assert e.detail == "Unprocessable entity"
