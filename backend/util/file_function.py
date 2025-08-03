import io
import logging
import re
import uuid

import pandas as pd
from fastapi import UploadFile
from pandas import DataFrame

from exception.exceptions import UnsupportedFileTypeException, EmptyFileException

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


async def read_csv_excel_file(upload_file: UploadFile) -> pd.DataFrame:
    try:
        logger.info(f"Reading {upload_file.filename}: ")
        file_extension = upload_file.filename.split(".")[-1]
        if file_extension.lower() not in ("csv", "xlsx", "xls"):
            raise UnsupportedFileTypeException()

        content = await upload_file.read()

        if not len(content):
            raise EmptyFileException()

        data_frame = ""

        if file_extension.lower() == "csv":
            logger.info(f"Reading csv file: {upload_file.filename} ")
            data_frame = pd.read_csv(io.BytesIO(content))
        elif file_extension.lower() in ["xlsx", "xls"]:
            logger.info(f"Reading xlsx or xls file: {upload_file.filename} ")
            data_frame = pd.read_excel(io.BytesIO(content))

        return data_frame

    except Exception as e:
        logger.exception(f"An error occurred: {e}")
        raise


def create_snowflake_table(table_name: str, data_frame: DataFrame, snowflake_conn) -> str:
    logger.info("Snowflake table creation started.")
    uuid_str = str(uuid.uuid4())
    snowflake_table_name = (uuid_str[:10] + '_' + table_name).replace('-', '_').upper()
    if not snowflake_table_name[0].isalpha():
        snowflake_table_name = 't' + snowflake_table_name

    data_frame.columns = data_frame.columns.str.replace(' ', '_').str.upper()
    data_frame.columns = [re.sub(r'\(\*\)', '', column) for column in data_frame.columns]

    with snowflake_conn.cursor() as cursor:
        columns_names = ', '.join([f'"{col}" VARCHAR' for col in data_frame.columns])
        create_table_sql = f'CREATE OR REPLACE TABLE {snowflake_table_name} ({columns_names})'
        cursor.execute(create_table_sql)
        logger.info(f"Snowflake table {snowflake_table_name} created in warehouse.")

    return snowflake_table_name


def insert_data_into_snowflake(snowflake_table_name: str, data_frame: DataFrame, snowflake_conn) -> bool:
    try:
        data_frame.columns = data_frame.columns.str.replace(' ', '_').str.upper()
        data_frame.columns = [re.sub(r'\(\*\)', '', column) for column in data_frame.columns]

        with snowflake_conn.cursor() as cursor:
            column_names = ", ".join(data_frame.columns)
            values = ', '.join(['%s'] * len(data_frame.columns))
            insert_statement = f"INSERT INTO {snowflake_table_name} ({column_names}) VALUES ({values})"
            data = [tuple(row) for row in data_frame.values]
            cursor.executemany(insert_statement, data)
            snowflake_conn.commit()
            return True

    except Exception as e:
        logger.error(f"Error inserting data into Snowflake table.")
        snowflake_conn.rollback()
        return False


def get_snowflake_data_table(snowflake_table_name, snowflake_conn):
    try:
        with snowflake_conn.cursor() as cursor:
            describe_table_query = f'SELECT * FROM {snowflake_table_name}'
            cursor.execute(describe_table_query)
            table_data = cursor.fetchall()
            table_description = cursor.description
            return table_data, table_description
    except Exception as e:
        logger.exception(
            f"An error occurred while reading the data from Snowflake table {snowflake_table_name}: {str(e)}")
