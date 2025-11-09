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
  '&:hover': {
    backgroundColor: 'primary.dark',
  },
  '&:disabled': {
    backgroundColor: '#e0e0e0',
    color: 'rgba(0, 0, 0, 0.26)',
  },
};

export const primaryOutlinedButtonSx = {
  borderColor: 'primary.main',
  color: 'primary.main',
  '&:hover': {
    borderColor: 'primary.dark',
    backgroundColor: 'rgba(25, 118, 210, 0.04)',
  },
  '&:disabled': {
    borderColor: '#e0e0e0',
    color: 'rgba(0, 0, 0, 0.26)',
  },
};

export const textAccentButtonSx = {
  color: 'primary.main',
  '&:hover': {
    backgroundColor: 'rgba(25, 118, 210, 0.04)',
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
