from datetime import datetime
import os
import sys
from unittest.mock import patch
from fastapi.testclient import TestClient
from fastapi import HTTPException
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool
from main import app
from config.db import Base
from exception.exceptions import UnprocessableEntityException
from model.models import Spreadsheet as SpreadSheetModel,Page as PageModel

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
updated_title = "updated page"
page_title = "Page"
test_time = "2024-03-28 09:00:00.00000"


def test_create_spreadsheet():
    spreadsheet_data = {
        "id": 1,
        "title": "Spreadsheet",
        "createdAt": datetime(2024, 3, 28, 9, 0, 0),
        "updatedAt": datetime(2024, 3, 28, 9, 0, 0),
    }
    with TestingSession() as db:
        existing_spreadsheet = db.query(SpreadSheetModel).filter(SpreadSheetModel.id == 1).first()
        if existing_spreadsheet:
            return existing_spreadsheet.id
        db.add(SpreadSheetModel(**spreadsheet_data))
        db.commit()
    return 1


def test_create_page():
    spreadsheet_id = test_create_spreadsheet()
    page_id = 1
    page_data = {
        "title": page_title,
        "id": 1,
        "createdAt":  test_time,
        "updatedAt": test_time,
        "spreadsheet_id": spreadsheet_id
    }
    with TestingSession() as db:
        existing_page = db.query(PageModel).filter(PageModel.id == page_id).first()
        if existing_page:
            return existing_page.id
        db.add(PageModel(**page_data))
        db.commit()
    return page_id


def test_get_all_pages():
    spreadsheet_id = test_create_spreadsheet()
    response = client.get(f"api/v1/spreadsheets/{spreadsheet_id}/pages")
    assert response.status_code == 200
    assert len(response.json()) > 0


def test_get_page_by_id():
    spreadsheet_id = test_create_spreadsheet()
    page_id = test_create_page()
    response = client.get(f"/api/v1/spreadsheets/{spreadsheet_id}/pages/{page_id}")
    assert response.status_code == 200
    page = response.json()
    assert isinstance(page, dict)


def test_update_page():
    spreadsheet_id = test_create_spreadsheet()
    page_id = 1
    patch_page = {"title": updated_title}
    response = client.patch(f"/api/v1/spreadsheets/{spreadsheet_id}/pages/{page_id}", json=patch_page)
    assert response.status_code == 200
    updated_page = response.json()
    assert updated_page.get("title") == updated_title


def test_create_page_empty_title_exception():
    spreadsheet_id = test_create_spreadsheet()
    page_data = {
        "id": 1,
        "title": "",
        "createdAt": test_time,
        "updatedAt": test_time,
        "spreadsheet_id": spreadsheet_id
    }
    response = client.post(f"/api/v1/spreadsheets/{spreadsheet_id}/pages", json=page_data)
    assert response.status_code == 422


def test_create_page_spreadsheet_not_found_exception():
    non_existing_spreadsheet_id = 999
    page_data = {
        "id": 1,
        "title": page_title,
        "createdAt": test_time,
        "updatedAt": test_time,
        "spreadsheet_id": non_existing_spreadsheet_id
    }
    response = client.post(f"/api/v1/spreadsheets/{non_existing_spreadsheet_id}/pages", json=page_data)
    assert response.status_code == 404


def test_get_all_pages_spreadsheet_not_found_exception():
    non_existing_spreadsheet_id = 999
    response = client.get(f"/api/v1/spreadsheets/{non_existing_spreadsheet_id}/pages")
    assert response.status_code == 404


def test_get_page_by_id_spreadsheet_not_found_exception():
    non_existing_spreadsheet_id = 999
    page_id = 1
    response = client.get(f"/api/v1/spreadsheets/{non_existing_spreadsheet_id}/pages/{page_id}")
    assert response.status_code == 404


def test_get_page_by_id_page_not_found_exception():
    spreadsheet_id = test_create_spreadsheet()
    non_existing_page_id = 999
    response = client.get(f"/api/v1/spreadsheets/{spreadsheet_id}/pages/{non_existing_page_id}")
    assert response.status_code == 404


def test_update_page_empty_title_exception():
    spreadsheet_id = test_create_spreadsheet()
    page_id = 1
    patch_page = {"title": ""}
    response = client.patch(f"/api/v1/spreadsheets/{spreadsheet_id}/pages/{page_id}", json=patch_page)
    assert response.status_code == 422


def test_update_page_spreadsheet_not_found_exception():
    non_existing_spreadsheet_id = 999
    page_id = 1
    patch_page = {"title": updated_title}
    response = client.patch(f"/api/v1/spreadsheets/{non_existing_spreadsheet_id}/pages/{page_id}", json=patch_page)
    assert response.status_code == 404


def test_update_page_with_page_not_found_exception():
    spreadsheet_id = test_create_spreadsheet()
    non_existing_page_id = 999
    patch_page = {"title": updated_title}
    response = client.patch(f"/api/v1/spreadsheets/{spreadsheet_id}/pages/{non_existing_page_id}", json=patch_page)
    assert response.status_code == 404


def test_create_page_unprocessable_entity_exception():
    with patch('util.helper.get_spreadsheet', side_effect=UnprocessableEntityException):
        spreadsheet_id = test_create_spreadsheet()
        page_data = {
            "id": 1,
            "title": page_title,
            "created_at": test_time,
            "updated_at": test_time,
            "spreadsheet_id": spreadsheet_id
        }
        try:
            client.post(f"/api/v1/spreadsheets/{spreadsheet_id}/pages", json=page_data)
        except HTTPException as e:
            assert e.status_code == 422
            assert e.detail == "Unprocessable entity"


def test_get_all_pages_internal_server_error_exception():
    with patch('util.helper.get_spreadsheet', side_effect=UnprocessableEntityException):
        spreadsheet_id = test_create_spreadsheet()
        try:
            client.get(f"/api/v1/spreadsheets/{spreadsheet_id}/pages")
        except HTTPException as e:
            assert e.status_code == 422
            assert e.detail == "Unprocessable entity"


def test_update_page_internal_server_error_exception():
    with patch('util.helper.get_spreadsheet', side_effect=UnprocessableEntityException):
        spreadsheet_id = test_create_spreadsheet()
        page_id = 1
        patch_page = {"title": updated_title}
        try:
            client.patch(f"/api/v1/spreadsheets/{spreadsheet_id}/pages/{page_id}", json=patch_page)
        except HTTPException as e:
            assert e.status_code == 422
            assert e.detail == "Unprocessable entity"


def test_get_page_by_id_internal_server_error_exception():
    with patch('util.helper.get_spreadsheet', side_effect=UnprocessableEntityException):
        spreadsheet_id = test_create_spreadsheet()
        page_id = 1
        try:
            client.get(f"/api/v1/spreadsheets/{spreadsheet_id}/pages/{page_id}")
        except HTTPException as e:
            assert e.status_code == 422
            assert e.detail == "Unprocessable entity"
