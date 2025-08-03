from datetime import datetime
import os
import sys
from fastapi.testclient import TestClient
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from sqlalchemy.pool import StaticPool
from config.db import Base
from main import app
from main import app
from config.db import Base
from model.models import Spreadsheet as SpreadSheetModel
from util.constants import SPREADSHEET_TEST_ENDPOINT
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

def test_create_spreadsheet():
   spreadsheet_test_data = {
       "title": "Test Spreadsheet 2",
       "id": 2,
       "createdAt": "2024-03-28T13:05:14",
       "updatedAt": "2024-03-28T13:05:14",
   }
   response = client.post(SPREADSHEET_TEST_ENDPOINT, json=spreadsheet_test_data)
   assert response.status_code == 200
   assert response.json()["title"] == "Test Spreadsheet 2"

def test_get_all_spredsheets():
   response = client.get(SPREADSHEET_TEST_ENDPOINT)
   assert response.status_code == 200
   assert len(response.json()) > 0

def test_get_spreadsheet_by_id():
   spread_sheet_id = test_create_new_spreadsheet()
   response = client.get(f"/api/v1/spreadsheets/{spread_sheet_id}")
   assert response.status_code == 200
   assert response.json()["id"] == 1

def test_update_spreadsheet_title():
   spreadsheet_id = test_create_new_spreadsheet()
   spreadsheet_patch = {"title": "New Test Spreadsheet"}
   response = client.patch(f"/api/v1/spreadsheets/{spreadsheet_id}", json=spreadsheet_patch)
   assert response.status_code == 200
   assert response.json()["title"] == "New Test Spreadsheet"

def test_create_spreadsheet_empty_title():
   spreadsheet_data = {
       "title": "",
       "id": 2,
       "createdAt": "2024-03-28T13:05:14",
       "updatedAt": "2024-03-28T13:05:14",
   }
   response = client.post(SPREADSHEET_TEST_ENDPOINT, json=spreadsheet_data)
   assert response.status_code == 422


def test_update_spreadsheet_title_not_found():
   non_existent_spreadsheet_id = 999
   spreadsheet_patch = {"title": "spreadsheet1"}
   response = client.patch(f"/api/v1/spreadsheets/{non_existent_spreadsheet_id}", json=spreadsheet_patch)
   assert response.status_code == 404

def test_update_spreadsheet_empty_title():
   spreadsheet_id = test_create_new_spreadsheet()
   spreadsheet_patch = {"title": ""} 
   response = client.patch(f"/api/v1/spreadsheets/{spreadsheet_id}", json=spreadsheet_patch)
   assert response.status_code == 422

def test_get_spreadsheet_by_id_not_found():
   non_existent_spreadsheet_id = 100 
   response = client.get(f"/api/v1/spreadsheets/{non_existent_spreadsheet_id}")
   assert response.status_code == 404

def test_create_new_spreadsheet():   
   spreadsheet_id = 1
   spreadsheet_test_data = {
       "id": spreadsheet_id,
       "title": f"Test Spreadsheet {spreadsheet_id}",
       "createdAt": datetime(2024, 3, 28, 10, 0, 0),
       "updatedAt": datetime(2024, 3, 28, 10, 0, 0),
   }
   with TestingSession() as db:
       retrieved_spreadsheet = db.query(SpreadSheetModel).filter(SpreadSheetModel.id == spreadsheet_id).first()
       if retrieved_spreadsheet:
           return retrieved_spreadsheet.id

       db.add(SpreadSheetModel(**spreadsheet_test_data))
       db.commit()

   return spreadsheet_id 
