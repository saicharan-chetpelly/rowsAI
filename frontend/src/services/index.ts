import API from './API';

export const getAllSpreadsheets = async () => {
  try {
    const response = await API.get('/spreadsheets');
    return response; // Return the response
  } catch (error) {
    console.error('Error in getAllSpreadsheets:', error);
    return undefined; // Return undefined in case of error
  }
};

export const getSpreadsheetById = async (spreadsheetId: number) => {
  try {
    const response = await API.get(`/spreadsheets/${spreadsheetId}`);
    return response; // Return the response
  } catch (error) {
    console.error(
      `Error in getSpreadsheetById for ID ${spreadsheetId}:`,
      error,
    );
    return undefined;
  }
};

export const updateSpreadsheetTitleById = async (
  spreadsheetId: number,
  updatedTitle: string,
) => {
  try {
    return await API.patch(`/spreadsheets/${spreadsheetId}`, {
      title: updatedTitle,
    });
  } catch (error) {
    console.error(
      `Error in updateSpreadsheetTitleById for ID ${spreadsheetId}:`,
      error,
    );
    return undefined;
  }
};

export const getPagesBySpreadsheetId = async (spreadsheetId: number) => {
  try {
    return await API.get(`/spreadsheets/${spreadsheetId}/pages`);
  } catch (error) {
    console.error(
      `Error in getPagesBySpreadsheetId for ID ${spreadsheetId}:`,
      error,
    );
  }
};

export const getDataTablesByPageId = async (pageId: number) => {
  try {
    return await API.get(`/data-table/pages/${pageId}`);
  } catch (error) {
    console.error(`Error in getDataTablesByPageId for ID ${pageId}:`, error);
  }
};

export const createNewPage = async (spreadsheetId: number, title: string) => {
  try {
    return await API.post(`/spreadsheets/${spreadsheetId}/pages`, {
      title,
    });
  } catch (error) {
    console.error('Error in createNewPage:', error);
    return undefined;
  }
};

export const fetchAllPages = async (spreadsheetId: number) => {
  try {
    return await API.get(`/spreadsheets/${spreadsheetId}/pages`);
  } catch (error) {
    console.error('Error in fetchAllPages:', error);
    return undefined;
  }
};
export const createNewSpreadsheet = async (title: string) => {
  try {
    return await API.post('/spreadsheets', {
      title,
    });
  } catch (error) {
    console.error('Error in createNewSpreadsheet:', error);
    return undefined;
  }
};

export const uploadNewFile = async (pageId: number, file: File) => {
  try {
    const formData = new FormData();
    formData.append('upload_file', file);

    const response = await API.post(`/data-table/pages/${pageId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  } catch (error) {
    console.error('Error in uploadNewFile:', error);
    return undefined;
  }
};

export const fetchAllQuickInsights = async (
  spreadsheetId: number,
  pageId: number,
  dataTableId: number,
) => {
  try {
    const response = await API.post(
      `spreadsheets/${spreadsheetId}/pages/${pageId}/data-tables/${dataTableId}/quick-insights`,
    );
    return response;
  } catch (error) {
    console.error('Error in fetchAllQuickInsights:', error);
    return undefined;
  }
};

export const fetchAllDeepDives = async (
  spreadsheetId: number,
  pageId: number,
  dataTableId: number,
) => {
  try {
    const response = await API.post(
      `spreadsheets/${spreadsheetId}/pages/${pageId}/data-tables/${dataTableId}/deep-dives`,
    );
    return response;
  } catch (error) {
    console.error('Error in fetchAllDeepDives:', error);
    return undefined;
  }
};

export const getDeepdiveDataTableContent = async (query: string) => {
  try {
    const response = await API.get(`/deep-dives/${query}`);
    return response;
  } catch (error) {
    console.error('Error in getDeepdiveDataTableContent:', error);
    return undefined;
  }
};

export const postUserQuery = async (
  query: string,
  dataTableId: number,
  snowflakeTableName: string,
) => {
  try {
    const response = await API.post(
      `/user-query?datatable_id=${dataTableId}&table_name=${snowflakeTableName}&user_question=${query}`,
    );
    return response;
  } catch (error) {
    console.error('Error in postUserQuery:', error);
    return undefined;
  }
};

export const getDataTableById = async (dataTableId: number) => {
  try {
    const response = await API.get(`/data-table/${dataTableId}`);
    return response;
  } catch (error) {
    console.error('Error in getDataTableById:', error);
    return undefined;
  }
};
export const updateDataTableTitle = async (
  dataTableId: number,
  updatedTitle: string,
) => {
  try {
    return await API.patch(`/data-table/${dataTableId}`, {
      table_name: updatedTitle,
    });
  } catch (error) {
    console.error(
      `Error in updateDataTableTitle for ID ${dataTableId}:`,
      error,
    );
    return undefined;
  }
};
