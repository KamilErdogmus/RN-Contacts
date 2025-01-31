import {create} from 'zustand';
import {COLORS} from '../theme/COLORS';

export const useThemeStore = create<ThemeState>(set => ({
  theme: 'light',
  toggleTheme: () =>
    set(state => ({
      theme: state.theme === 'light' ? 'dark' : 'light',
    })),
}));

export const useThemeColors = () => {
  const theme = useThemeStore(state => state.theme);

  return {
    colors: {
      ...COLORS,
      background: theme === 'light' ? '#FFFFFF' : '#222B45',
      text: theme === 'light' ? '#000000' : '#FFFFFF',
      card: theme === 'light' ? '#FFFFFF' : '#1A2138',
      border: theme === 'light' ? '#E4E9F2' : '#101426',
    },
  };
};
