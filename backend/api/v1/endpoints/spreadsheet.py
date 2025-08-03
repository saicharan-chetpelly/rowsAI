from typing import List
from fastapi import APIRouter
from sqlalchemy import func
from sqlalchemy.orm import Session
from util.get_db import db_dependency
from exception.exceptions import InternalServerErrorException, SpreadSheetEmptyTitleException, SpreadsheetNotFoundException
from model.models import Spreadsheet as SpreadSheetModel
from schema.spreadsheet import SpreadSheet as SpreadSheetResponse,SpreadSheetBase as SpreadSheetRequest
from util.constants import BASE_API_URL_PATH, TAGS
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
router = APIRouter(tags=[TAGS[0]], prefix=BASE_API_URL_PATH)

@router.get("/spreadsheets", response_model=List[SpreadSheetResponse])
async def get_all_spreadsheets(db: Session = db_dependency):
    try:
        logger.info("Fetching all spreadsheets")
        spreadsheets = db.query(SpreadSheetModel)
        
        logger.info(f"Spreadsheets fetched successfully: {spreadsheets}")
        return spreadsheets
    
    except Exception as exception:
        logger.exception(f"An error occurred while fetching spreadsheets : {exception}")
        raise InternalServerErrorException() from exception


@router.get("/spreadsheets/{spreadsheet_id}", response_model=SpreadSheetResponse) 
async def get_spreadsheet_by_id(spreadsheet_id: int, db: Session = db_dependency):
   try:
       logger.info(f"Fetching spreadsheet details with ID: {spreadsheet_id}")
       spreadsheet = db.query(SpreadSheetModel).filter(SpreadSheetModel.id == spreadsheet_id).first()

       if spreadsheet is None:
           raise SpreadsheetNotFoundException(spreadsheet_id)
      
       logger.info(f"Spreadsheet fetched successfully: {spreadsheet}")
       return spreadsheet
  
   except SpreadsheetNotFoundException as exception:
       logger.exception(f"Spreadsheet with id not found: {exception}")
       raise SpreadsheetNotFoundException(spreadsheet_id)
  
   except Exception as exception:
       logger.exception(f"An error occurred while fetching spreadsheet: {exception}")
       raise InternalServerErrorException() from exception
   
@router.post("/spreadsheets", response_model=SpreadSheetResponse)
async def create_spredsheet(current_spreadsheet: SpreadSheetRequest, db: Session = db_dependency):
   try:
       logger.info("Creating a new spreadsheet")

       if not current_spreadsheet.model_dump().get("title"):
           raise SpreadSheetEmptyTitleException()
      
       new_spreadsheet = SpreadSheetModel(**current_spreadsheet.model_dump())
       db.add(new_spreadsheet)
       db.commit()
       db.refresh(new_spreadsheet)

       logger.info(f"New Spreadsheet created successfully: {new_spreadsheet}")
       return new_spreadsheet
  
   except SpreadSheetEmptyTitleException as exception:
       raise SpreadSheetEmptyTitleException()
  
   except Exception as exception:
       logger.exception(f"An error occurred while creating a new spreadsheet: {exception}")
       raise InternalServerErrorException() from exception

@router.patch("/spreadsheets/{spreadsheet_id}", response_model=SpreadSheetResponse)
async def update_spreadsheet(spreadsheet_id: int, current_spreadsheet: SpreadSheetRequest, db: Session = db_dependency):
   try:
       logger.info(f"Updating spreadsheet title with ID: {spreadsheet_id}")
       updated_spreadsheet = db.query(SpreadSheetModel).filter(SpreadSheetModel.id == spreadsheet_id).first()

       if updated_spreadsheet is None:
           raise SpreadsheetNotFoundException(spreadsheet_id)

       if "title" in current_spreadsheet.model_dump(exclude_unset=True) and not current_spreadsheet.model_dump(exclude_unset=True)["title"]:
           raise SpreadSheetEmptyTitleException()

       for field, value in current_spreadsheet.model_dump(exclude_unset=True).items():
           setattr(updated_spreadsheet, field, value)

       updated_spreadsheet.updatedAt =func.now()
       db.commit()
       db.refresh(updated_spreadsheet)


       logger.info(f"Spreadsheet Title updated successfully: {updated_spreadsheet}")
       return updated_spreadsheet
  
   except SpreadsheetNotFoundException as exception:
       logger.exception(f"Spreadsheet with id not found: {exception}")
       raise SpreadsheetNotFoundException(spreadsheet_id)
  
   except SpreadSheetEmptyTitleException as exception:
       raise SpreadSheetEmptyTitleException()