import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6366f1', // Modern indigo
      light: '#818cf8',
      dark: '#4f46e5',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#10b981', // Emerald green
      light: '#34d399',
      dark: '#059669',
      contrastText: '#ffffff',
    },
    background: {
      default: '#050617', // Deeper blue-black for premium feel
      paper: '#0f172a', // Dark slate
    },
    text: {
      primary: '#f8fafc', // Cleaner white
      secondary: '#e2e8f0', // Lighter slate
      disabled: '#64748b', // Cool gray
    },
    divider: 'rgba(148, 163, 184, 0.08)',
    error: {
      main: '#ef4444',
    },
    warning: {
      main: '#f59e0b',
    },
    info: {
      main: '#3b82f6',
    },
    success: {
      main: '#10b981',
    },
    action: {
      hover: 'rgba(99, 102, 241, 0.08)',
      selected: 'rgba(99, 102, 241, 0.12)',
    },
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontWeight: 800,
      fontSize: '3.5rem',
      lineHeight: 1.1,
      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2.25rem',
      color: '#f8fafc',
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.875rem',
      color: '#e2e8f0',
      lineHeight: 1.3,
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
      color: '#e2e8f0',
      lineHeight: 1.4,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
      color: '#cbd5e1',
      lineHeight: 1.4,
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
      color: '#cbd5e1',
      lineHeight: 1.4,
    },
    subtitle1: {
      fontWeight: 500,
      fontSize: '1rem',
      color: '#94a3b8',
      lineHeight: 1.5,
    },
    subtitle2: {
      fontWeight: 500,
      fontSize: '0.875rem',
      color: '#64748b',
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      color: '#e2e8f0',
      fontWeight: 400,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      color: '#94a3b8',
      fontWeight: 400,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
      letterSpacing: '0.01em',
      fontSize: '1rem',
    },
    caption: {
      fontSize: '0.75rem',
      color: '#64748b',
      lineHeight: 1.4,
    },
  },
  shape: {
    borderRadius: 16,
  },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 600,
          boxShadow: 'none',
          minHeight: 44,
          px: 3,
          fontSize: '1rem',
        },
        contained: {
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
        },
        outlined: {
          borderWidth: 1.5,
        },
        sizeSmall: {
          minHeight: 36,
          fontSize: '0.875rem',
          px: 2,
        },
        sizeLarge: {
          minHeight: 52,
          fontSize: '1rem',
          px: 4,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          // Base styles - less specific to allow component overrides
          '& .MuiOutlinedInput-root': {
            borderRadius: { xs: 10, sm: 12 },
            backgroundColor: 'rgba(15, 23, 42, 0.8)',
            position: 'relative',
          },
          '& .MuiInputLabel-root': {
            color: '#e2e8f0',
            fontSize: { xs: '0.75rem', sm: '0.875rem' },
            zIndex: 10,
            position: 'relative',
          },
          '& .MuiInputBase-input': {
            color: '#f8fafc',
            fontSize: { xs: '0.875rem', sm: '1rem' },
            lineHeight: 1.5,
            zIndex: 0,
            '&::placeholder': {
              color: '#64748b',
            },
          },
          '& .MuiFormHelperText-root': {
            color: '#94a3b8',
            fontSize: { xs: '0.625rem', sm: '0.75rem', md: '0.875rem' },
            marginTop: { xs: 0.25, sm: 0.5 },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(15, 23, 42, 0.8)',
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(148, 163, 184, 0.2)',
          },
          '& .MuiSelect-select': {
            color: '#f8fafc',
            fontSize: '1rem',
            lineHeight: 1.5,
            minHeight: '48px',
            display: 'flex',
            alignItems: 'center',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          backgroundImage: 'none',
          backgroundColor: '#0f172a',
          border: '1px solid rgba(148, 163, 184, 0.08)',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#0f172a',
          borderRadius: 16,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(148, 163, 184, 0.08)',
          borderColor: 'rgba(148, 163, 184, 0.08)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
          fontSize: '0.875rem',
          height: 32,
          '& .MuiChip-label': {
            px: 2,
          },
        },
        outlined: {
          borderColor: 'rgba(148, 163, 184, 0.2)',
          '&:hover': {
            borderColor: 'rgba(148, 163, 184, 0.3)',
          },
        },
        sizeSmall: {
          height: 28,
          fontSize: '0.75rem',
          '& .MuiChip-label': {
            px: 1.5,
          },
        },
      },
    },
  },
});