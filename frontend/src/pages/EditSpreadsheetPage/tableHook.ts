import { useState } from 'react';
import {
  fetchAllDeepDives,
  fetchAllQuickInsights,
  getDataTableById,
  getDeepdiveDataTableContent,
  postUserQuery,
} from 'services';
import { DeepDiveModel, IDeepDiveItem, QuickInsightModel } from 'utils/types';
import DeepdiveIcon from '@public/assets/icons/deepdive.svg';
import { jsonToCsv } from 'utils/function';

const useDataTable = () => {
  const [quickInsights, setQuickInsights] = useState<Record<number, string>>(
    {},
  );
  const [deepdives, setDeepdives] = useState<IDeepDiveItem[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isQuestionAsked, setIsQuestionAsked] = useState<boolean>(false);

  const fetchQuickInsights = async (
    spreadsheetId: number,
    pageId: number,
    dataTableId: number,
  ) => {
    setIsLoading(true);
    try {
      const response = await fetchAllQuickInsights(
        spreadsheetId,
        pageId,
        dataTableId,
      );
      if (response?.status === 200 && response.data) {
        const formattedQuickInsights = response.data.reduce(
          (acc: Record<number, string>, insight: QuickInsightModel) => {
            acc[insight.id] = insight.label;
            return acc;
          },
          {},
        );
        setQuickInsights(formattedQuickInsights);
        return formattedQuickInsights;
      }
    } catch (error) {
      console.error('Error fetching quick insights:', error);
    }
  };

  const fetchDeepdives = async (
    spreadsheetId: number,
    pageId: number,
    dataTableId: number,
  ) => {
    setIsLoading(true);
    try {
      const response = await fetchAllDeepDives(
        spreadsheetId,
        pageId,
        dataTableId,
      );
      if (response?.status === 200) {
        const formattedDeepdives: IDeepDiveItem[] = response.data?.map(
          (deepDive: DeepDiveModel) => ({
            startIconSrc: DeepdiveIcon,
            startIconAlt: 'deepdive icon',
            label: deepDive.label,
            deepdiveId: deepDive.id,
            query: deepDive.query,
            deepdiveName: deepDive.label,
          }),
        );
        setDeepdives(formattedDeepdives);
        return formattedDeepdives;
      }
    } catch (error) {
      console.error('Error fetching deepdives:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const getDeepdiveDataTableFileContentByQuery = async (
    query: string,
    deepdiveName: string,
  ) => {
    try {
      const response = await getDeepdiveDataTableContent(query);
      if (response?.status === 200) {
        const csvData = jsonToCsv(response.data.file_content);
        const fileExtension = `${deepdiveName.replace(/\s/g, '_')}.csv`;
        const file = new File([csvData], fileExtension, { type: 'csv' });
        return file;
      }
    } catch (error) {
      console.error('Error in getDeepdiveDataTableFileContentByQuery:', error);
      return undefined;
    }
  };
  const askQuestion = async (userQuestion: string, dataTableId: number) => {
    try {
      setIsQuestionAsked(false);
      const response = await getDataTableById(dataTableId);
      if (response?.status === 200) {
        const dataTableName = response.data?.snowflake_table_name;
        const res = await postUserQuery(
          userQuestion,
          dataTableId,
          dataTableName,
        );
        if (res?.status === 200) {
          setIsQuestionAsked(true);
          return res.data;
        }
      }
    } catch (error) {
      setIsQuestionAsked(false);
      console.error('Error in askQuestion:', error);
      return undefined;
    }
  };

  return {
    fetchQuickInsights,
    quickInsights,
    isLoading,
    fetchDeepdives,
    deepdives,
    getDeepdiveDataTableFileContentByQuery,
    askQuestion,
    isQuestionAsked,
    setIsQuestionAsked,
  };
};

export default useDataTable;
