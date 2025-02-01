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
      ...COLORS[theme],
      PRIMARY: COLORS.PRIMARY,
    },
  };
};
