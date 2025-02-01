export const COLORS: Colors = {
  PRIMARY: '#344cb7',
  ERROR: '#F44336',
  SUCCESS: '#4CAF50',
  WHITE: '#FFFFFF',
  BLACK: '#000000',
  CALLING: '#1a237e',
  GRAY: '#757575',
  LIGHT_GRAY: '#F5F5F5',
  TEXT_PRIMARY: '#212121',
  ORANGE: '#f2a233',

  light: {
    background: '#FFFFFF',
    card: '#f5f5f5',
    text: '#000000',
    secondary: '#757575',
    hint: '#9E9E9E',
    border: '#E4E9F2',
    shadow: '#000000',
    ripple: 'rgba(0, 0, 0, 0.1)',
    success: '#4CAF50',
    danger: '#F44336',
    primary: '#2196F3',
    white: '#FFFFFF',
    control: '#FFFFFF',
    basic: '#757575',
  },

  dark: {
    background: '#222B45',
    card: '#1A2138',
    text: '#FFFFFF',
    secondary: '#9E9E9E',
    hint: '#757575',
    border: '#101426',
    shadow: '#000000',
    ripple: 'rgba(255, 255, 255, 0.1)',
    success: '#81C784',
    danger: '#E57373',
    primary: '#64B5F6',
    white: '#FFFFFF',
    control: '#FFFFFF',
    basic: '#9E9E9E',
  },
};

interface Colors {
  PRIMARY: string;
  ERROR: string;
  SUCCESS: string;
  WHITE: string;
  BLACK: string;
  CALLING: string;
  GRAY: string;
  LIGHT_GRAY: string;
  TEXT_PRIMARY: string;
  light: ThemeColors;
  dark: ThemeColors;
  ORANGE: string;
}
