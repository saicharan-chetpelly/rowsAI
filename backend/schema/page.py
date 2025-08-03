from datetime import datetime
from pydantic import BaseModel


class PageBase(BaseModel):
    title: str


class Page(PageBase):
    id: int
    createdAt: datetime
    updatedAt: datetime
    spreadsheet_id: int

    class ConfigDict:
        from_attributes = True
