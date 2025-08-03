import ChartSelectMenu from 'components/molecules/ChartSelectMenu';
import Typography from 'components/atoms/Typography';
import { Divider, FormControl } from '@mui/material';
import {
  ADD_SERIES,
  CHART_SELECT_MENU_OPTIONS_DATA,
  CHART_TYPE,
  DATA_RANGE,
  DEFAULT_DATA_RANGE_VALUE,
  GROUP_DATA_BY,
  MAIN_AXIS,
  MAIN_AXIS_MENU_OPTIONS_DATA,
  RADIO_LABELS,
  SELECT_DATA_RANGE_PLACEHOLDER_TEXT,
  TREAT_LABELS_AS_TEXT,
  USE_FIRST_COLUMN_AS_LABELS_MESSAGE,
  USE_FIRST_ROW_AS_HEADERS_MESSAGE,
  VERTICAL_AXIS_MENU_OPTIONS_DATA1,
  VERTICAL_AXIS_MENU_OPTIONS_DATA2,
  VERTICAL_AXIS_MENU_OPTIONS_DATA3,
  VERTICAL_LEFT_AXIS,
} from 'utils/constants';
import Switch from 'components/atoms/Switch';
import RadioButtons from 'components/atoms/radioButton';
import AddIcon from '@public/assets/icons/insert.svg';
import IconTypography from 'components/molecules/IconTypography';
import {
  StyledChartEditorOptionsWrapper,
  StyledColumnFlexWrapper,
  StyledRadiosWrapper,
  StyledRowFlexSpaceBtwBox,
  StyledSetupTabWrapper,
  StyledTextField,
  StyledVerticalAxisWrapper,
} from './styled';

const DefaultChartEditorOptions = () => (
  <StyledSetupTabWrapper>
    <StyledColumnFlexWrapper>
      <Typography variant="body2">{CHART_TYPE}</Typography>
      <ChartSelectMenu MenuOptionsData={CHART_SELECT_MENU_OPTIONS_DATA} />
    </StyledColumnFlexWrapper>

    <StyledChartEditorOptionsWrapper>
      <StyledColumnFlexWrapper>
        <Typography variant="body2">{DATA_RANGE}</Typography>
        <FormControl>
          <StyledTextField
            variant="outlined"
            placeholder={SELECT_DATA_RANGE_PLACEHOLDER_TEXT}
            value={DEFAULT_DATA_RANGE_VALUE}
          />
        </FormControl>
      </StyledColumnFlexWrapper>
      <StyledRowFlexSpaceBtwBox>
        <Typography variant="body2">
          {USE_FIRST_ROW_AS_HEADERS_MESSAGE}
        </Typography>
        <Switch defaultChecked />
      </StyledRowFlexSpaceBtwBox>
      <StyledRowFlexSpaceBtwBox>
        <Typography variant="body2">
          {USE_FIRST_COLUMN_AS_LABELS_MESSAGE}
        </Typography>
        <Switch defaultChecked />
      </StyledRowFlexSpaceBtwBox>
      <StyledRowFlexSpaceBtwBox>
        <Typography variant="body2">{TREAT_LABELS_AS_TEXT}</Typography>
        <Switch defaultChecked={false} />
      </StyledRowFlexSpaceBtwBox>
      <StyledColumnFlexWrapper>
        <Typography variant="body2">{GROUP_DATA_BY}</Typography>
        <StyledRadiosWrapper>
          <RadioButtons label={RADIO_LABELS[0]} onChange={() => {}} checked />
          <RadioButtons
            label={RADIO_LABELS[1]}
            onChange={() => {}}
            checked={false}
          />
        </StyledRadiosWrapper>
      </StyledColumnFlexWrapper>
      <Divider />
      <StyledColumnFlexWrapper>
        <Typography variant="body2">{MAIN_AXIS}</Typography>
        <ChartSelectMenu
          MenuOptionsData={MAIN_AXIS_MENU_OPTIONS_DATA}
          defaultValue={MAIN_AXIS_MENU_OPTIONS_DATA[0].label}
        />
      </StyledColumnFlexWrapper>
      <StyledVerticalAxisWrapper>
        <Typography variant="body2">{VERTICAL_LEFT_AXIS}</Typography>
        {[
          VERTICAL_AXIS_MENU_OPTIONS_DATA1,
          VERTICAL_AXIS_MENU_OPTIONS_DATA2,
          VERTICAL_AXIS_MENU_OPTIONS_DATA3,
        ].map((options) => (
          <ChartSelectMenu
            key={options[0].label}
            MenuOptionsData={options}
            defaultValue={options[0].label}
          />
        ))}
      </StyledVerticalAxisWrapper>
      <IconTypography
        textVariant="body2"
        textText={ADD_SERIES}
        iconSrc={AddIcon}
        iconAltText="add-icon"
      />
    </StyledChartEditorOptionsWrapper>
  </StyledSetupTabWrapper>
);

export default DefaultChartEditorOptions;
