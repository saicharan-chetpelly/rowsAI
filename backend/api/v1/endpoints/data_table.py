import logging
from datetime import datetime

import pandas as pd
from fastapi import APIRouter, Path, UploadFile, File
from sqlalchemy.orm import Session
from starlette import status

from config.snowflake_db import snowflake_connection as snowflake_con
from exception.exceptions import PageNotFoundException, FileNotFoundException, UnprocessableEntityException, \
    DataTableNotFoundException, SnowflakeDataWriteError, EmptyFileException
from model.models import DataTable
from schema.data_table_schema import DataTableResponse, DataTableContentResponse, DataTableBase
from util.constants import ROUTE_CONFIGURATIONS
from util.file_function import read_csv_excel_file, insert_data_into_snowflake, create_snowflake_table, \
    get_snowflake_data_table
from util.get_db import db_dependency
from util.helper import fetch_page_by_id

data_table_router = APIRouter(
    prefix=ROUTE_CONFIGURATIONS["data_table"]["prefix"],
    tags=ROUTE_CONFIGURATIONS["data_table"]["tags"]
)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@data_table_router.post("/pages/{page_id}", status_code=status.HTTP_201_CREATED, response_model=DataTableResponse)
async def create_data_table(db: Session = db_dependency, page_id: int = Path(gt=0),
                            upload_file: UploadFile = File(...)):
    try:
        if upload_file is None:
            raise FileNotFoundException()

        upload_file_name = upload_file.filename.rsplit('.', 1)[0]
        data_frame = await read_csv_excel_file(upload_file)

        snowflake_table_name = create_snowflake_table(upload_file_name, data_frame, snowflake_con)

        logger.info(f"Inserting data to the {snowflake_table_name} Snowflake table.")

        is_data_inserted = insert_data_into_snowflake(snowflake_table_name, data_frame, snowflake_con)

        logger.info(f"Data inserted into Snowflake table {snowflake_table_name} successfully.")

        if not is_data_inserted:
            raise SnowflakeDataWriteError()

        data_table_model = DataTable(
            table_name=upload_file_name,
            snowflake_table_name=snowflake_table_name,
            page_id=page_id
        )
        db.add(data_table_model)
        db.commit()
        db.refresh(data_table_model)
        return data_table_model

    except FileNotFoundException:
        logger.exception("File not found in the request body")
    except EmptyFileException as e:
        logger.exception(f"Uploaded file has no data to read")
        raise EmptyFileException()
    except PageNotFoundException as e:
        logger.exception(f"Invalid page id: {page_id}")
        raise PageNotFoundException(page_id)
    except SnowflakeDataWriteError:
        logger.exception("Error occurs while writing data to snowflake")
    except UnprocessableEntityException:
        logger.exception("Unprocessable entity, pass valid request body")
        raise UnprocessableEntityException()
    except Exception as e:
        logger.exception(f"An error occurred during creating the data table for page {page_id}: {str(e)}")


@data_table_router.get("/pages/{page_id}", status_code=status.HTTP_200_OK)
async def get_all_data_tables(db: Session = db_dependency, page_id: int = Path(..., gt=0)):
    try:
        page_model = fetch_page_by_id(page_id, db)
        if page_model is None:
            raise PageNotFoundException(page_id)

        data_tables = db.query(DataTable).filter(DataTable.page_id == page_id).all()
        for data_table in data_tables:
            snowflake_table_name = data_table.snowflake_table_name
            snowflake_table, table_description = get_snowflake_data_table(snowflake_table_name,
                                                                          snowflake_con)
            snowflake_df = pd.DataFrame(snowflake_table, columns=[desc[0] for desc in table_description])
            data_table.file_content = snowflake_df.to_dict(orient='records')
            logger.info(f"Data tables retrieved successfully for table: {snowflake_table_name} ")

            if not len(snowflake_df):
                logger.warning(f"No data returned from Snowflake for the table: {snowflake_table_name}")
        return data_tables

    except PageNotFoundException:
        logger.exception(f"Page not found with ID: {page_id}")
        raise PageNotFoundException(page_id)
    except Exception as e:
        logger.exception(f"An error occurred during getting the all data table for page {page_id}: {str(e)}")


@data_table_router.get("/{data_table_id}", status_code=status.HTTP_200_OK)
async def get_data_table_by_id(db: Session = db_dependency, data_table_id: int = Path(..., gt=0)):
    try:
        logger.info(f"Retrieving data table by ID: {data_table_id}")
        data_table_model = db.query(DataTable).filter(DataTable.id == data_table_id).first()

        if data_table_model is None:
            raise DataTableNotFoundException(data_table_id)

        snowflake_table_name = data_table_model.snowflake_table_name
        snowflake_table, table_description = get_snowflake_data_table(snowflake_table_name,
                                                                      snowflake_con)

        snowflake_df = pd.DataFrame(snowflake_table, columns=[desc[0] for desc in table_description])
        data_table_model.file_content = snowflake_df.to_dict(orient='records')

        if not len(snowflake_df):
            logger.warning(f"No data returned from Snowflake for the table: {snowflake_table_name}")

        return data_table_model
    except DataTableNotFoundException as e:
        logger.exception(f"Data table not found with ID: {data_table_id}")
        raise DataTableNotFoundException(data_table_id)
    except Exception as e:
        logger.exception(f"An error occurred during getting the data table: {str(e)}")


@data_table_router.patch("/{data_table_id}", status_code=status.HTTP_200_OK, response_model=DataTableResponse)
async def update_data_table_by_id(updated_data_table: DataTableBase, db: Session = db_dependency,
                                  data_table_id: int = Path(..., gt=0)):
    try:
        logger.info(f"Updating data table with ID: {data_table_id}")
        data_table_model = db.query(DataTable).filter(DataTable.id == data_table_id).first()

        if data_table_model is None:
            raise DataTableNotFoundException(data_table_id)

        for field, value in updated_data_table.model_dump(exclude_unset=True).items():
            setattr(data_table_model, field, value)
        data_table_model.updatedAt = datetime.now()
        db.commit()
        db.refresh(data_table_model)
        return data_table_model

    except DataTableNotFoundException as e:
        logger.exception(f"Data table not found with ID: {data_table_id}")
    except Exception as e:
        logger.exception(f"An error occurred during updating the data table: {str(e)}")
