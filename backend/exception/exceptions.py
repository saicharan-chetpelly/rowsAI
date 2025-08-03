from fastapi import HTTPException
from starlette import status


class SpreadsheetNotFoundException(HTTPException):
    def __init__(self, spreadsheet_id: int):
        message = f"Spreadsheet with id {spreadsheet_id} not found"
        super().__init__(status_code=status.HTTP_404_NOT_FOUND, detail=message)


class InternalServerErrorException(HTTPException):
    def __init__(self):
        message = "Internal server error"
        super().__init__(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=message)


class SpreadSheetEmptyTitleException(HTTPException):
    def __init__(self):
        super().__init__(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail="Title cannot be empty")


class PageNotFoundException(HTTPException):
    def __init__(self, page_id: int):
        message = f"Page with id {page_id} not found"
        super().__init__(status_code=status.HTTP_404_NOT_FOUND, detail=message)


class EmptyTitleException(HTTPException):
    def __init__(self):
        super().__init__(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail="Title cannot be empty")


class UnprocessableEntityException(HTTPException):
    def __init__(self):
        super().__init__(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail="Unprocessable entity")


class FileNotFoundException(HTTPException):
    def __init__(self):
        detail = "File not found:"
        super().__init__(status_code=status.HTTP_404_NOT_FOUND, detail=detail)


class EmptyFileException(HTTPException):
    def __init__(self, detail: str = "Please upload a valid file"):
        super().__init__(status_code=status.HTTP_400_BAD_REQUEST, detail=detail)


class UnsupportedFileTypeException(HTTPException):
    def __init__(self):
        super().__init__(status_code=status.HTTP_400_BAD_REQUEST,
                         detail="Unsupported file type. Please provide a CSV or Excel file.")


class DataTableNotFoundException(HTTPException):
    def __init__(self, data_table_id):
        super().__init__(status_code=status.HTTP_404_NOT_FOUND,
                         detail=f"Data table not found with id: {data_table_id}")


class SnowflakeDataWriteError(Exception):
    def __init__(self, message="Error writing data to Snowflake"):
        self.message = message
        super().__init__(self.message)


class DeepDivesNotFoundException(HTTPException):
    def __init__(self):
        super().__init__(status_code=status.HTTP_404_NOT_FOUND,
                         detail="Deep Dives not found with provided Id's")

                         
class RecordNotFoundException(HTTPException):
    def __init__(self, question):
        super().__init__(status_code=status.HTTP_404_NOT_FOUND,
                         detail=f"No record found for the given question: {question}")
