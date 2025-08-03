from typing import List, Dict, Any
from pydantic import BaseModel


class DeepDiveBase(BaseModel):
    query: str
    label: str


class DeepDive(DeepDiveBase):
    id: int
    data_table_id: int

    class Config:
        orm_mode = True


class DeepDiveTableContent(BaseModel):
    file_content: List[Dict[str, Any]]


class DeepDiveTableSchema(BaseModel):
    table_name: str

    class ConfigDict:
        from_attributes =True
