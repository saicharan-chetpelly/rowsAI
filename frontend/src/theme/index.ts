import { Popper, tooltipClasses } from '@mui/material';
import { SxProps, createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    primaryCustom: {
      PRIMARY_DARK: string;
      PRIMARY_MEDIUM: string;
    };
    icon: {
      ICON_DARK: string;
    };
    red: {
      100: string;
      200: string;
    };
    yellow: {
      100: string;
    };
    green: {
      100: string;
    };
    purple: {
      100: string;
    };
    stroke: {
      100: string;
      200: string;
      300: string;
    };
    greyCustom: {
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
    };
    structural: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
      BLUE: string;
      WHITE: string;
    };
    shadow: {
      boxShadow1: string;
      100: string;
      200: string;
      300: string;
    };
    textCustom: {
      TEXT_DARK: string;
      TEXT_HIGH_EMPHASIS: string;
      TEXT_MEDIUM_EMPHASIS: string;
    };
  }

  interface PaletteOptions {
    primaryCustom: {
      PRIMARY_DARK: string;
      PRIMARY_MEDIUM: string;
    };
    icon: {
      ICON_DARK: string;
    };
    red: {
      100: string;
      200: string;
    };
    yellow: {
      100: string;
    };
    green: {
      100: string;
    };
    purple: {
      100: string;
    };
    stroke: {
      100: string;
      200: string;
      300: string;
    };
    greyCustom: {
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
    };
    structural: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
      BLUE: string;
      WHITE: string;
    };
    shadow: {
      boxShadow1: string;
      100: string;
      200: string;
      300: string;
    };
    textCustom: {
      TEXT_DARK: string;
      TEXT_HIGH_EMPHASIS: string;
      TEXT_MEDIUM_EMPHASIS: string;
    };
  }
  interface TypographyVariants {
    h1: SxProps;
    h2: SxProps;
    h3: SxProps;
    h4: SxProps;
    h5: SxProps;
    h6: SxProps;
    body1: SxProps;
    body2: SxProps;
    caption: SxProps;
    button: SxProps;
    subtitle1: SxProps;
    subtitle2: SxProps;
    overline: SxProps;
  }

  interface TypographyVariantsOptions {
    h1: SxProps;
    h2: SxProps;
    h3: SxProps;
    h4: SxProps;
    h5: SxProps;
    h6: SxProps;
    body1: SxProps;
    body2: SxProps;
    caption: SxProps;
    button: SxProps;
    subtitle1: SxProps;
    subtitle2: SxProps;
    overline: SxProps;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    h1: true;
    h2: true;
    h3: true;
    h4: true;
    h5: true;
    h6: true;
    body1: true;
    body2: true;
    caption: true;
    button: true;
    subtitle1: true;
    subtitle2: true;
    overline: true;
  }
}

const theme = createTheme({
  palette: {
    primaryCustom: {
      PRIMARY_DARK: '#3A032D',
      PRIMARY_MEDIUM: '#5B3452',
    },
    icon: {
      ICON_DARK: '#9D8196',
    },
    red: {
      100: '#CC2F60',
      200: '#E92F3C',
    },
    yellow: {
      100: '#FFC800',
    },
    green: {
      100: '#1E8A70',
    },
    purple: {
      100: '#754F6C',
    },
    stroke: {
      100: '#E1E1E1',
      200: '#716F71',
      300: '#989898',
    },
    greyCustom: {
      100: '#EAEAEA',
      200: '#C2C2C2',
      300: '#4C4C4C',
      400: '#EBEBEB',
      500: '#F7F7F7',
      600: '#6F6F6F',
    },
    structural: {
      50: '#F7F7F7',
      100: '#E9E3E7',
      200: '#F1F1F1',
      300: '#C3C8CF45',
      400: '#FFEEEB',
      500: '#27A083',
      600: '#CE11A114',
      700: '#CE11A11C',
      800: '#DAE9FD',
      900: '#F0BC00',
      BLUE: '#E4EFFE',
      WHITE: '#FFFFFF',
    },
    shadow: {
      boxShadow1: '#00230B20',
      100: '#00000033',
      200: '#00000024',
      300: '#0000001f',
    },
    textCustom: {
      TEXT_DARK: '#D3C7D0',
      TEXT_HIGH_EMPHASIS: '#1A1A1A',
      TEXT_MEDIUM_EMPHASIS: '#6F6F6F',
    },
  },

  typography: {
    fontFamily: 'Output-Sans-Regular',
    h1: {
      fontSize: '4rem',
      fontWeight: 'bold',
      lineHeight: '1.2',
      textTransform: 'none',
    },
    h2: {
      fontSize: '3.2rem',
      fontWeight: 'bold',
      lineHeight: '1.125',
      textTransform: 'none',
    },
    h3: {
      fontSize: '2.8rem',
      fontWeight: 'bold',
      lineHeight: '1.143',
      textTransform: 'none',
    },
    h4: {
      fontSize: '2.4rem',
      fontWeight: 'bold',
      lineHeight: '1.333',
      textTransform: 'none',
    },
    h5: {
      fontSize: '2rem',
      fontWeight: 'bold',
      lineHeight: '1.2',
      textTransform: 'none',
    },
    h6: {
      fontSize: '1.8rem',
      fontWeight: 'bold',
      lineHeight: '1.333',
      textTransform: 'none',
    },
    body1: {
      fontSize: '1.6rem',
      fontWeight: 'normal',
      lineHeight: '1.5',
      letterSpacing: '0.2px',
      textTransform: 'none',
    },
    body2: {
      fontSize: '1.4rem',
      fontWeight: 'normal',
      lineHeight: '1.428',
      letterSpacing: '0.2px',
      textTransform: 'none',
    },
    caption: {
      fontSize: '1.2rem',
      fontWeight: 'normal',
      lineHeight: '1.333',
      letterSpacing: '0.2px',
      textTransform: 'none',
    },
    button: {
      fontSize: '1.4rem',
      fontWeight: 500,
      fontStyle: 'normal',
      lineHeight: '1.75',
    },
    subtitle1: {
      fontSize: '1.6rem',
      fontWeight: 'bold',
      lineHeight: '1.5',
      textTransform: 'none',
      letterSpacing: '0.2px',
    },
    subtitle2: {
      fontSize: '1.4rem',
      fontWeight: 'bold',
      lineHeight: '1.428',
      letterSpacing: '0.2px',
      textTransform: 'none',
    },
    overline: {
      fontSize: '1.2rem',
      fontWeight: 'normal',
      lineHeight: '1.333',
      letterSpacing: '1px',
      textTransform: 'none',
    },
  },
  spacing: 4,
  components: {
    MuiTabs: {
      styleOverrides: {
        root: {
          minHeight: 0,
        },
      },
    },
    MuiTooltip: {
      defaultProps: {
        PopperComponent: Popper,
      },
      styleOverrides: {
        tooltip: {
          color: '#fff',
          padding: '6px 12px',
          fontSize: '1.2rem',
          maxWidth: '245px',
          boxShadow: '0 1px 4px 0 #00000040',
          minHeight: '20px',
          maxHeight: '30px',
          fontWeight: 500,
          lineHeight: '1.5',
          borderRadius: '1px',
          letterSpacing: 'normal',
          backgroundColor: '#3A032D',
          margin: 0,
        },
        popper: {
          [`&.${tooltipClasses.popper}[data-popper-placement*="bottom"] .${tooltipClasses.tooltip}`]:
            {
              marginTop: '0px',
            },
          [`&.${tooltipClasses.popper}[data-popper-placement*="top"] .${tooltipClasses.tooltip}`]:
            {
              marginBottom: '0px',
            },
          [`&.${tooltipClasses.popper}[data-popper-placement*="right"] .${tooltipClasses.tooltip}`]:
            {
              marginLeft: '0px',
            },
          [`&.${tooltipClasses.popper}[data-popper-placement*="left"] .${tooltipClasses.tooltip}`]:
            {
              marginRight: '0px',
            },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          marginTop: '5px',
          marginBottom: '5px',
        },
      },
    },
  },
});

export default theme;
