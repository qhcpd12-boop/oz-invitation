import { createTheme } from '@mui/material/styles'
import { palette, radii, shadows, breakpoints, fontFamily } from './tokens.js'
import { typography } from './typography.js'

export { palette, radii, shadows, fontFamily }

export const theme = createTheme({
  breakpoints: { values: breakpoints },
  palette: {
    mode: 'light',
    primary: {
      main: palette.primary,
      dark: palette.primaryDark,
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: palette.textPrimary,
      contrastText: '#FFFFFF',
    },
    error: { main: palette.danger },
    warning: { main: palette.warning },
    success: { main: palette.success },
    background: {
      default: palette.bgDark,
      paper: palette.surfaceWhite,
    },
    text: {
      primary: palette.textPrimary,
      secondary: palette.textMuted,
    },
    divider: palette.divider,
  },
  shape: { borderRadius: radii.md },
  typography,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: { scrollBehavior: 'smooth' },
        body: {
          backgroundColor: palette.bgDark,
          color: palette.textPrimary,
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        },
        a: { color: 'inherit', textDecoration: 'none' },
        '*::selection': {
          background: palette.primary,
          color: '#fff',
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true, disableRipple: false },
      styleOverrides: {
        root: {
          borderRadius: radii.pill,
          paddingInline: 24,
          paddingBlock: 12,
          fontWeight: 700,
        },
        sizeLarge: { paddingInline: 32, paddingBlock: 16, fontSize: '1rem' },
        containedPrimary: {
          background: palette.ctaGradient,
          boxShadow: shadows.cta,
          '&:hover': { background: palette.ctaGradient, opacity: 0.95 },
        },
        outlinedPrimary: {
          borderWidth: 2,
          '&:hover': { borderWidth: 2 },
        },
      },
    },
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        rounded: { borderRadius: radii.lg },
      },
    },
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          borderRadius: radii.lg,
          border: `1px solid ${palette.border}`,
          background: palette.surfaceWhite,
        },
      },
    },
    MuiTextField: {
      defaultProps: { variant: 'outlined', fullWidth: true, size: 'medium' },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: radii.md,
            background: '#fff',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: palette.border,
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: { borderRadius: 6, color: palette.textMuted },
      },
    },
    MuiContainer: {
      defaultProps: { maxWidth: false },
    },
  },
})
