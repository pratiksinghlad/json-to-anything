// Reusable SX styles for UI components
// Keep these theme-aware (use palette tokens like 'primary.main') so styles follow the app theme
export const interactiveHoverSx = {
  color: 'rgba(0,0,0,0.6)',
  transition: 'color 0.15s ease-in-out, background-color 0.15s ease-in-out',
  '&:hover': { color: 'primary.main', backgroundColor: 'transparent' },
};

export const primaryContainedButtonSx = {
  backgroundColor: 'primary.main',
  color: '#ffffff',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(37, 99, 235, 0.2)',
  '&:hover': {
    backgroundColor: 'primary.dark',
    boxShadow: '0 4px 6px rgba(37, 99, 235, 0.3)',
  },
  '&:disabled': {
    backgroundColor: '#e0e0e0',
    color: 'rgba(0, 0, 0, 0.26)',
  },
};

export const primaryOutlinedButtonSx = {
  borderColor: 'primary.main',
  color: 'primary.main',
  borderWidth: '1.5px',
  borderRadius: '8px',
  '&:hover': {
    borderWidth: '1.5px',
    borderColor: 'primary.dark',
    backgroundColor: 'rgba(37, 99, 235, 0.04)',
  },
  '&:disabled': {
    borderColor: '#e0e0e0',
    color: 'rgba(0, 0, 0, 0.26)',
  },
};

export const textAccentButtonSx = {
  color: 'primary.main',
  fontWeight: 600,
  '&:hover': {
    backgroundColor: 'rgba(37, 99, 235, 0.04)',
  },
  '&:disabled': {
    color: 'rgba(0, 0, 0, 0.26)',
  },
};

export default {
  interactiveHoverSx,
  primaryContainedButtonSx,
  primaryOutlinedButtonSx,
  textAccentButtonSx,
};
