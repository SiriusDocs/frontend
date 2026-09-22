import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#4F46E5',   // было --color-accent
      dark: '#312E81',   // было --color-dark-blue
    },
    secondary: {
      main: '#189EA0',   // было --color-cyan-color
    },
    error: {
      main: '#6a1a21',   // было --color-error-color
    },
    text: {
      primary: '#0f172a',   // было --color-default-text-color
      secondary: '#64748B', // было --color-light-gray
    },
    divider: '#E5E7EB',     // было --color-divider-color
    background: {
      default: '#ffffff',
      paper: '#F3F4F6',     // было --color-field-color
    },
    action: {
      selected: '#E0E7FF',  // было --color-selected-color
    },
  },
  typography: {
    fontFamily: '"Montserrat", sans-serif',
  },
  shape: {
    borderRadius: 12, 
  },
})

// Токены, которых нет в стандартной палитре MUI (используются через sx напрямую)
export const customColors = {
  titleColor: '#2e346f',        // --color-title-color
  inputColor: '#f1f1f1',        // --color-input-color
  footerColor: '#222222',       // --color-footer-color
  onFooterColor: '#979797',     // --color-on-footer-color
  onFooterAccentColor: '#cccccc', // --color-on-footer-accent-color
  gradientStart: '#4f46e5',     // --color-start-grade-color
  gradientEnd: '#189ea0',       // --color-end-grade-color
} as const

export const accentGradient = `linear-gradient(to right, ${customColors.gradientStart}, ${customColors.gradientEnd})`