import logging
from datetime import datetime
from typing import List
from fastapi import APIRouter, Path
from sqlalchemy.orm import Session
from exception.exceptions import InternalServerErrorException, SpreadsheetNotFoundException, PageNotFoundException, \
    EmptyTitleException
from util.helper import get_spreadsheet, get_page
from schema.page import Page as PageResponse, PageBase as PageRequest
from util.constants import BASE_API_URL_PATH, TAGS, SPREADSHEET_ID_TEXT, SPREADSHEET_ENDPOINT, PAGE_ENDPOINT, \
    PAGE_ID_TEXT
from util.get_db import db_dependency
from model.models import Page as PageModel

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
router = APIRouter(tags=[TAGS[1]], prefix=BASE_API_URL_PATH)


@router.get(f"{SPREADSHEET_ENDPOINT}/pages", response_model=List[PageResponse])
async def get_all_pages(spreadsheet_id: int = Path(..., title=SPREADSHEET_ID_TEXT),
                        db: Session = db_dependency):
    try:
        logger.info(f"Fetching all pages of spreadsheet id {spreadsheet_id}")
        spreadsheet = get_spreadsheet(db, spreadsheet_id)
        logger.info(f"Spreadsheet fetched successfully: {spreadsheet}")
        pages_query = db.query(PageModel).filter(PageModel.spreadsheet_id == spreadsheet_id)
        pages = pages_query.all()
        logger.info(f"Pages fetched successfully: {pages}")
        return pages
    except SpreadsheetNotFoundException as se:
        logger.warning(f"Spreadsheet not found: {se}")
        raise SpreadsheetNotFoundException(spreadsheet_id)
    except Exception as exception:
        logger.exception(f"An error occurred while fetching pages: {exception}")
        raise InternalServerErrorException() from exception


@router.get(f"{SPREADSHEET_ENDPOINT}{PAGE_ENDPOINT}", response_model=PageResponse)
async def get_page_by_id(spreadsheet_id: int = Path(..., title=SPREADSHEET_ID_TEXT),
                         page_id: int = Path(..., title=PAGE_ID_TEXT),
                         db: Session = db_dependency
                         ):
    try:
        logger.info(f"Fetching page by page id {page_id} of spreadsheet {spreadsheet_id}")
        page = get_page(db, spreadsheet_id, page_id)

        logger.info(f"Page fetched successfully {page}")
        return page

    except SpreadsheetNotFoundException as se:
        logger.warning(f"Spreadsheet not found: {se}")
        raise SpreadsheetNotFoundException(spreadsheet_id)
    except PageNotFoundException as pe:
        logger.warning(f"Page not found: {pe}")
        raise PageNotFoundException(page_id)
    except Exception as exception:
        logger.exception(f"An error occurred while fetching pages: {exception}")
        raise InternalServerErrorException() from exception


@router.post(f"{SPREADSHEET_ENDPOINT}/pages", response_model=PageResponse)
async def create_page(current_page: PageRequest,
                      spreadsheet_id: int = Path(..., title=PAGE_ID_TEXT),
                      db: Session = db_dependency
                      ):
    try:
        logger.info(f"Posting page inside spreadsheet of spreadsheet id: {spreadsheet_id}")
        spreadsheet = get_spreadsheet(db, spreadsheet_id)
        logger.info(f"Fetched spreadsheet successfully {spreadsheet}")

        if not current_page.model_dump().get("title"):
            raise EmptyTitleException()
        new_page = PageModel(**current_page.model_dump(), spreadsheet_id=spreadsheet_id)
        db.add(new_page)
        db.commit()
        db.refresh(new_page)
        logger.info(f"Page created successfully {new_page}")
        return new_page

    except SpreadsheetNotFoundException as se:
        logger.warning(f"Spreadsheet not found {se}")
        raise SpreadsheetNotFoundException(spreadsheet_id)
    except EmptyTitleException as et:
        logger.warning(f"Name cannot be empty {et}")
        raise EmptyTitleException
    except Exception as exception:
        logger.exception(f"An error occurred while creating page: {exception}")
        raise InternalServerErrorException() from exception


@router.patch(f"{SPREADSHEET_ENDPOINT}{PAGE_ENDPOINT}", response_model=PageResponse)
async def update_page_title(current_page: PageRequest,
                            spreadsheet_id: int = Path(..., title=PAGE_ID_TEXT),
                            page_id: int = Path(..., title=PAGE_ID_TEXT),
                            db: Session = db_dependency
                            ):
    try:
        logger.info(f"Updating the page with id {page_id} of spreadsheet {spreadsheet_id}")
        page = get_page(db, spreadsheet_id, page_id)
        if "title" in current_page.model_dump(exclude_unset=True) and not current_page.model_dump(exclude_unset=True)["title"]:
            raise EmptyTitleException()
        for field, value in current_page.model_dump(exclude_unset=True).items():
            setattr(page, field, value)
        page.updatedAt = datetime.now()
        db.commit()
        db.refresh(page)
        return page
    except EmptyTitleException as et:
        logger.warning(f"Name cannot be empty {et}")
        raise EmptyTitleException
    except SpreadsheetNotFoundException as se:
        logger.warning(f"Spreadsheet not found {se}")
        raise SpreadsheetNotFoundException(spreadsheet_id)
    except PageNotFoundException as pe:
        logger.warning(f"Page not found: {pe}")
        raise PageNotFoundException(page_id)
    except Exception as exception:
        logger.exception(f"An error occurred while updating page: {exception}")
        raise InternalServerErrorException() from exception
