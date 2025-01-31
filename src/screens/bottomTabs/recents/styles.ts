import {StyleSheet} from 'react-native';
import {COLORS} from '../../../theme/COLORS';

export const recentScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: COLORS.GRAY,
  },
});
