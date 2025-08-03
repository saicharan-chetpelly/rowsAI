from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.v1.endpoints.data_table import data_table_router
from api.v1.endpoints.page import router as pagerouter
from api.v1.endpoints.spreadsheet import router as spreadsheet_router
from api.v1.endpoints.deepdive import router as deepdive_router
from api.v1.endpoints.user_query import user_query_router
from api.v1.endpoints.quick_insight import router as quick_insight_router

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(data_table_router)
app.include_router(spreadsheet_router)
app.include_router(pagerouter)
app.include_router(deepdive_router)
app.include_router(user_query_router)
app.include_router(quick_insight_router)
