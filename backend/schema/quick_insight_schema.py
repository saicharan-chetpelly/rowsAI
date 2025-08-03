from pydantic import BaseModel


class QuickInsightBase(BaseModel):
    label: str


class QuickInsightResponse(QuickInsightBase):
    id: int
    data_table_id: int

    class ConfigDict:
        from_attributes = True
