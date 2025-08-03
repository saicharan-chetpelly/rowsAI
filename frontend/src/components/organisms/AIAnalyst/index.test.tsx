import React from 'react';
import {
  render,
  fireEvent,
  waitFor,
  act,
  screen,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  ANALYST_FILL_DATA,
  ANALYST_TABLE_EMPTY_WARNING,
  ANALYST_TEXTFIELD_PLACEHOLER_TEXT,
  ANALYST_TITLE,
  DEEP_DIVES_TITLE,
  IMPORT_SAMPLE_DATA,
  NOT_SURE_TO_START,
  SAMPLE_DEEP_DIVE,
} from 'utils/constants';
import AIAnalyst from '.';

const mockSheetTitle = 'Mock Sheet';
const mockAnalyzableData = [{ 'AI Evolution': 'AI Evolution' }];
const mockClickImportData = jest.fn();
const mockClickDeepDiveOption = jest.fn();
const analystOpen = true;
const mockToggleAIAnalyst = jest.fn();
const mockQuickInsightsData = {
  '191': 'The most common currency code in the dataset is AED',
  '192':
    'The average length of currency names in the dataset is 15 characters.',
  '193': 'The number of unique currency names in the dataset is 163',
};
const mockDeepdivesData = [
  {
    startIconSrc: '',
    startIconAlt: 'deepdive icon',
    label: 'Top 5 currencies by name',
    deepdiveId: '81',
    query: 'SELECT * FROM T100A4606_A_CURRENCY ORDER BY NAME DESC LIMIT 5;',
    deepdiveName: 'Top 5 currencies by name',
  },
  {
    startIconSrc: '',
    startIconAlt: 'deepdive icon',
    label: "Currencies with symbols starting with 'USD'",
    deepdiveId: '82',
    query: "SELECT * FROM T100A4606_A_CURRENCY WHERE SYMBOL LIKE 'USD%';",
    deepdiveName: "Currencies with symbols starting with 'USD'",
  },
  {
    startIconSrc: '',
    startIconAlt: 'deepdive icon',
    label: "Currencies with codes containing 'EUR'",
    deepdiveId: '83',
    query: "SELECT * FROM T100A4606_A_CURRENCY WHERE CODE LIKE '%EUR%';",
    deepdiveName: "Currencies with codes containing 'EUR'",
  },
  {
    startIconSrc: '',
    startIconAlt: 'deepdive icon',
    label: 'Distinct currency codes',
    deepdiveId: '84',
    query: 'SELECT DISTINCT CODE FROM T100A4606_A_CURRENCY;',
    deepdiveName: 'Distinct currency codes',
  },
];
describe('AIAnalyst component', () => {
  const mockaskQuestionToAIanalyst = jest.fn();
  test('should render Analyzable data', async () => {
    jest.useFakeTimers();
    await act(async () => {
      render(
        <AIAnalyst
          open={analystOpen}
          sheetTitle={mockSheetTitle}
          analyzableData={mockAnalyzableData}
          onClickImportData={mockClickImportData}
          onClickDeepDiveOption={mockClickDeepDiveOption}
          toggleAIAnalyst={mockToggleAIAnalyst}
          quickInsighsData={mockQuickInsightsData}
          deepdivesData={mockDeepdivesData}
          askQuestionToAIanalyst={mockaskQuestionToAIanalyst}
        />,
      );
    });

    jest.advanceTimersByTime(3000);

    await waitFor(() => {
      expect(screen.getByText(DEEP_DIVES_TITLE)).toBeInTheDocument();
      expect(screen.getByText(ANALYST_TITLE)).toBeInTheDocument();
      expect(screen.getByText(mockSheetTitle)).toBeInTheDocument();
    });

    jest.clearAllTimers();
  });

  test('should render import data button and banner when no data is provided', async () => {
    jest.useFakeTimers();
    await act(async () => {
      render(
        <AIAnalyst
          open={analystOpen}
          sheetTitle={mockSheetTitle}
          analyzableData={[]}
          onClickImportData={mockClickImportData}
          onClickDeepDiveOption={mockClickDeepDiveOption}
          toggleAIAnalyst={mockToggleAIAnalyst}
          quickInsighsData={mockQuickInsightsData}
          deepdivesData={mockDeepdivesData}
          askQuestionToAIanalyst={mockaskQuestionToAIanalyst}
        />,
      );
    });

    jest.advanceTimersByTime(3000);

    await waitFor(() => {
      expect(screen.getByText(ANALYST_TABLE_EMPTY_WARNING)).toBeInTheDocument();
      expect(screen.getByText(ANALYST_FILL_DATA)).toBeInTheDocument();
      expect(screen.getByText(NOT_SURE_TO_START)).toBeInTheDocument();
    });

    const importDataButton = screen.getByRole('button', {
      name: IMPORT_SAMPLE_DATA,
    });
    expect(importDataButton).toBeInTheDocument();

    fireEvent.click(importDataButton);
    expect(mockClickImportData).toHaveBeenCalledTimes(1);
    jest.clearAllTimers();
  });

  test('should handle user prompt change', async () => {
    jest.useFakeTimers();

    await act(async () => {
      render(
        <AIAnalyst
          open={analystOpen}
          sheetTitle={mockSheetTitle}
          analyzableData={mockAnalyzableData}
          onClickImportData={mockClickImportData}
          onClickDeepDiveOption={mockClickDeepDiveOption}
          toggleAIAnalyst={mockToggleAIAnalyst}
          quickInsighsData={mockQuickInsightsData}
          deepdivesData={mockDeepdivesData}
          askQuestionToAIanalyst={mockaskQuestionToAIanalyst}
        />,
      );
    });

    jest.advanceTimersByTime(3000);

    await waitFor(() => {
      const userInputField = screen.getByPlaceholderText(
        ANALYST_TEXTFIELD_PLACEHOLER_TEXT,
      );

      fireEvent.change(userInputField, { target: { value: 'Test prompt' } });
      expect(userInputField).toHaveValue('Test prompt');
      fireEvent.keyDown(userInputField, { key: 'Escape' });
      fireEvent.keyDown(userInputField, { key: 'Enter' });
    });
    jest.clearAllTimers();
  });

  test('should calls onClickDeepDiveOption when deep dive option is clicked', async () => {
    jest.useFakeTimers();

    await act(async () => {
      render(
        <AIAnalyst
          open={analystOpen}
          sheetTitle={mockSheetTitle}
          analyzableData={mockAnalyzableData}
          onClickImportData={mockClickImportData}
          onClickDeepDiveOption={mockClickDeepDiveOption}
          toggleAIAnalyst={mockToggleAIAnalyst}
          quickInsighsData={mockQuickInsightsData}
          deepdivesData={mockDeepdivesData}
          askQuestionToAIanalyst={mockaskQuestionToAIanalyst}
        />,
      );
    });

    jest.advanceTimersByTime(3000);
    jest.clearAllTimers();

    await waitFor(() => {
      mockDeepdivesData.forEach((item) => {
        const deepDiveOption = screen.getByText(item.label);
        fireEvent.click(deepDiveOption);

        const insertTableOption = screen.getByRole('img', {
          name: 'Insert table',
        });

        fireEvent.click(insertTableOption);

        expect(mockClickDeepDiveOption).toHaveBeenCalledWith(
          item.query,
          item.deepdiveName,
          expect.any(String),
        );

        mockClickDeepDiveOption.mockClear();
      });
    });
  });

  test('should renders feedback information', async () => {
    jest.useFakeTimers();

    await act(async () => {
      render(
        <AIAnalyst
          open={analystOpen}
          sheetTitle={mockSheetTitle}
          analyzableData={mockAnalyzableData}
          onClickImportData={mockClickImportData}
          onClickDeepDiveOption={mockClickDeepDiveOption}
          toggleAIAnalyst={mockToggleAIAnalyst}
          quickInsighsData={mockQuickInsightsData}
          deepdivesData={mockDeepdivesData}
          askQuestionToAIanalyst={mockaskQuestionToAIanalyst}
        />,
      );
    });

    jest.advanceTimersByTime(3000);
    jest.clearAllTimers();

    await waitFor(() => {
      expect(screen.getByTestId('feedback-box')).toBeInTheDocument();
      const heartIcon = screen.getByRole('img', { name: 'favourite-icon' });
      expect(heartIcon).toBeInTheDocument();
    });
  });

  test('should close the AI Analyst drawer on cliking on close button', async () => {
    const { getByRole } = render(
      <AIAnalyst
        open={analystOpen}
        sheetTitle={mockSheetTitle}
        analyzableData={mockAnalyzableData}
        onClickImportData={mockClickImportData}
        onClickDeepDiveOption={mockClickDeepDiveOption}
        toggleAIAnalyst={mockToggleAIAnalyst}
        quickInsighsData={mockQuickInsightsData}
        deepdivesData={mockDeepdivesData}
        askQuestionToAIanalyst={mockaskQuestionToAIanalyst}
      />,
    );
    await act(async () => {});
    const analystCloseButton = getByRole('img', {
      name: 'drawer-close-icon',
    });
    fireEvent.click(analystCloseButton);
  });
});
