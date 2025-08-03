from sqlalchemy import Column, Integer, ForeignKey, Text, DateTime, func
from sqlalchemy.orm import relationship

from config.db import Base
from util.constants import DATA_TABLE_ID


class Spreadsheet(Base):
    __tablename__ = 'spreadsheet'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(Text)
    createdAt = Column(DateTime(timezone=True), nullable=False, default=func.now())
    updatedAt = Column(DateTime(timezone=True), nullable=False, default=func.now())


class Page(Base):
    __tablename__ = 'page'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(Text)
    createdAt = Column(DateTime(timezone=True), nullable=False, default=func.now())
    updatedAt = Column(DateTime(timezone=True), nullable=False, default=func.now())
    spreadsheet_id = Column(Integer, ForeignKey('spreadsheet.id'))

    spreadsheets = relationship("Spreadsheet")


class DataTable(Base):
    __tablename__ = 'data_table'

    id = Column(Integer, primary_key=True, index=True)
    table_name = Column(Text)
    snowflake_table_name = Column(Text)
    createdAt = Column(DateTime(timezone=True), nullable=False, default=func.now())
    updatedAt = Column(DateTime(timezone=True), nullable=False, default=func.now())
    page_id = Column(Integer, ForeignKey('page.id'))

    pages = relationship("Page")


class UserQuery(Base):
    __tablename__ = 'user_query'

    id = Column(Integer, primary_key=True, index=True)
    query = Column(Text)
    createdAt = Column(DateTime(timezone=True), nullable=False, default=func.now())
    data_table_id = Column(Integer, ForeignKey(DATA_TABLE_ID))

    pages = relationship("DataTable")


class DeepDive(Base):
    __tablename__ = 'deep_dive'

    id = Column(Integer, primary_key=True, index=True)
    query = Column(Text)
    createdAt = Column(DateTime(timezone=True), nullable=False, default=func.now())
    label = Column(Text)
    data_table_id = Column(Integer, ForeignKey('data_table.id'))

    data_table = relationship('DataTable')


class QuickInsight(Base):
    __tablename__ = 'quick_insight'

    id = Column(Integer, primary_key=True, index=True)
    label = Column(Text)
    createdAt = Column(DateTime(timezone=True), nullable=False, default=func.now())
    data_table_id = Column(Integer, ForeignKey(DATA_TABLE_ID))

    data_table = relationship('DataTable')