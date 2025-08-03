from datetime import datetime
from typing import List, Dict, Any

from pydantic import BaseModel


class DataTableBase(BaseModel):
    table_name: str


class DataTableRequest(DataTableBase):
    createdAt: datetime
    updatedAt: datetime
    page_id: int

    class Config:
        from_attributes = True


class DataTableResponse(DataTableRequest):
    id: int
    snowflake_table_name: str


class DataTableContentResponse(DataTableResponse):
    file_content: List[Dict[str, Any]]
