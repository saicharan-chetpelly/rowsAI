from datetime import datetime

from pydantic import BaseModel


class UserQueryBase(BaseModel):
    query: str


class UserQueryResponse(UserQueryBase):
    id: int
    createdAt: datetime
    data_table_id: int

    class Config:
        from_attributes = True
