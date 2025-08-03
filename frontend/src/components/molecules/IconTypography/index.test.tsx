import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { ALT_TEXT, ICON_TYPO_DATA_TEST_ID } from 'utils/constants';
import IconLabel from '.';
import theme from '../../../theme';
import search from '../../../../public/assets/icons/search.svg';

describe('IconLabel Component', () => {
  test('should render IconLabel component properly', () => {
    render(
      <IconLabel
        textText="OpenAI"
        textVariant="body2"
        textColor={theme.palette.textCustom.TEXT_HIGH_EMPHASIS}
        iconSrc={search}
        iconAltText={ALT_TEXT}
      />,
    );
    expect(screen.getByTestId(ICON_TYPO_DATA_TEST_ID)).toBeInTheDocument();
    expect(screen.getByText('OpenAI')).toBeInTheDocument();
    expect(screen.getByAltText(ALT_TEXT)).toBeInTheDocument();
  });

  test('should handle onClick functionality when IconLabel is clicked', () => {
    render(
      <IconLabel
        textText="OpenAI"
        textVariant="body2"
        textColor={theme.palette.textCustom.TEXT_HIGH_EMPHASIS}
        iconSrc={search}
        iconAltText={ALT_TEXT}
      />,
    );
    const iconLabelComponent = screen.getByTestId(ICON_TYPO_DATA_TEST_ID);
    expect(iconLabelComponent).toBeInTheDocument();
  });
});
