import logging

from sqlalchemy.orm import Session

from config.snowflake_db import snowflake_connection
from exception.exceptions import SpreadsheetNotFoundException, PageNotFoundException, DataTableNotFoundException
from model.models import Spreadsheet, Page as PageModel, Page, DataTable, DeepDive
from util.get_db import db_dependency

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def get_spreadsheet(db: Session, spreadsheet_id: int) -> Spreadsheet:
    spreadsheet = db.query(Spreadsheet).filter(Spreadsheet.id == spreadsheet_id).first()
    if not spreadsheet:
        raise SpreadsheetNotFoundException(spreadsheet_id)
    return spreadsheet


def get_page(db: Session, spreadsheet_id: int, page_id: int) -> PageModel:
    logger.info(f"Fetching spreadsheet of id {spreadsheet_id}")
    spreadsheet = get_spreadsheet(db, spreadsheet_id)
    logger.info(f"Spreadsheet of spreadsheet id is fetched successfully {spreadsheet}")
    page = db.query(PageModel).filter(PageModel.spreadsheet_id == spreadsheet_id, PageModel.id == page_id).first()
    if not page:
        raise PageNotFoundException(page_id)
    return page


def fetch_page_by_id(page_id: int, db: Session = db_dependency) -> Page:
    logger.info(f"Fetching the page with ID: {page_id}")
    page_model = db.query(Page).filter(Page.id == page_id).first()
    if page_model is None:
        raise PageNotFoundException(page_id)
    return page_model


def execute_query_to_snowflake(sql_query: str):
    cursor = snowflake_connection.cursor()
    cursor.execute(sql_query)
    table_data = cursor.fetchall()
    table_description = cursor.description
    cursor.close()
    return table_data, table_description


def get_snowflake_schema_by_table_name(snowflake_table_name: str) -> str:
    try:
        formatted_table_name = snowflake_table_name.upper()
        logger.info(f"Fetching schema of the snowflake table: {formatted_table_name}")
        with snowflake_connection.cursor() as cursor:
            describe_table_query = f'DESC {formatted_table_name}'
            cursor.execute(describe_table_query)
            schema_info = cursor.fetchall()
            schema = f"TABLE {formatted_table_name} ("
            for column_info in schema_info:
                column_name = column_info[0]
                data_type = column_info[1]
                schema += f"{column_name} {data_type}, "
            schema = schema.rstrip(", ")
            schema += ");"
            return schema
    except Exception as e:
        logger.exception(f"An error occurred while getting the schema for Snowflake table: {str(e)}")


def replace_quick_insight_placeholders(quick_insight, snowflake_record):
    for value in snowflake_record:
        quick_insight = quick_insight.replace("#", str(value), 1)
    return quick_insight


def get_data_table(db: Session, spreadsheet_id: int, page_id: int, data_table_id: int) -> DataTable:
    logger.info(f"Fetching spreadsheet of id {spreadsheet_id}")
    get_spreadsheet(db, spreadsheet_id)
    logger.info(f"Spreadsheet with id {spreadsheet_id} is fetched successfully")
    page = db.query(PageModel).filter(PageModel.spreadsheet_id == spreadsheet_id, PageModel.id == page_id).first()
    if not page:
        raise PageNotFoundException(page_id)
    logger.info(f"Page with id is fetched succesfully {page_id}")
    data_table = db.query(DataTable).filter(DataTable.id == data_table_id, DataTable.page_id == page_id).first()
    if not data_table:
        raise DataTableNotFoundException(data_table_id)
    logger.info(f"Datatable with id is fetched succesfully {data_table_id}")
    return data_table


def get_deep_dives(db: Session, spreadsheet_id: int, page_id: int, datatable_id: int) -> DataTable:
    logger.info(f"Fetching data table by id: {datatable_id} of page id {page_id} and spreadsheet id {spreadsheet_id}")
    get_data_table(db, spreadsheet_id, page_id, datatable_id)
    logger.info(f"Fetched data table with id {datatable_id}")
    logger.info(f"Fetching deep dives of data table id {datatable_id}")
    deep_dives = []
    deep_dives = db.query(DeepDive).join(DataTable).join(Page).filter(
        Page.spreadsheet_id == spreadsheet_id,
        DataTable.page_id == page_id,
        DataTable.id == datatable_id,
        DeepDive.data_table_id == datatable_id
    ).all()

    return deep_dives


def get_snowflake_schema_by_table_name(snowflake_table_name: str) -> str:
    try:
        formatted_table_name = snowflake_table_name.upper()
        logger.info(f"Fetching schema of the snowflake table: {formatted_table_name}")
        with snowflake_connection.cursor() as cursor:
            describe_table_query = f'DESC {formatted_table_name}'
            cursor.execute(describe_table_query)
            schema_info = cursor.fetchall()
            schema = f"TABLE {formatted_table_name} ("
            for column_info in schema_info:
                column_name = column_info[0]
                data_type = column_info[1]
                schema += f"{column_name} {data_type}, "
            return schema
    except Exception as e:
        logger.exception("An error occurred while getting the schema for Snowflake table: %s", str(e))


def get_cache_key(datatable_id):
    return f"deep_dives_cache_{datatable_id}"


def get_insight_cache_key(datatable_id):
    return f"insights_{datatable_id}"


def get_snowflake_table_name_by_datatable_id(db: Session, datatable_id: int) -> str:
    databale = db.query(DataTable).filter(DataTable.id == datatable_id).first()
    if not databale:
        raise DataTableNotFoundException(datatable_id)
    return databale.snowflake_table_name
