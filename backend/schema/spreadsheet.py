from pydantic import BaseModel
from datetime import datetime

class SpreadSheetBase(BaseModel):
    title: str

class SpreadSheet(SpreadSheetBase):
    id: int
    createdAt: datetime
    updatedAt: datetime

    class Config:
        orm_mode = True

