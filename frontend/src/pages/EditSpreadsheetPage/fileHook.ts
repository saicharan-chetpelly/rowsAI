import { updateDataTableTitle, uploadNewFile } from 'services';

const useFiles = (
  handleUpdateDatatTableId: (id: number, title: string) => void,
) => {
  const uploadNewFileAsDataTable = async (pageId: number, file: File) => {
    const response = await uploadNewFile(pageId, file);
    if (response?.status === 201) {
      handleUpdateDatatTableId(response.data.id, response.data.table_name);
      return response.data;
    }
  };
  const updateDataTableTitleById = async (
    dataTableId: string,
    title: string,
  ) => {
    const formattedDataTableId = parseInt(dataTableId, 10);
    const response = await updateDataTableTitle(formattedDataTableId, title);
    if (response?.status === 200) {
      return response.data.title;
    }
  };
  return {
    uploadNewFileAsDataTable,
    updateDataTableTitleById,
  };
};

export default useFiles;
