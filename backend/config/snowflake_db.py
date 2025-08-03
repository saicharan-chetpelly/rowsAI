import os

import snowflake.connector
from dotenv import load_dotenv

from config.db import SessionLocal

load_dotenv()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


snowflake_connection = snowflake.connector.connect(
    account=os.getenv("SNOWFLAKE_ACCOUNT"),
    password=os.getenv("SNOWFLAKE_PASSWORD"),
    user=os.getenv("SNOWFLAKE_USER"),
    database=os.getenv("SNOWFLAKE_DATABASE"),
    schema=os.getenv("SNOWFLAKE_SCHEMA"),
    warehouse='compute_wh',
    client_session_keep_alive=True
)
