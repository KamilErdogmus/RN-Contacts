import {StyleSheet} from 'react-native';
import {COLORS} from '../../theme/COLORS';

export const contactCardItemStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 5,
  },
  avatarContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  infoContainer: {flex: 4},
  name: {fontSize: 18, fontWeight: '700', margin: 5, color: COLORS.BLACK},
  job: {color: COLORS.GRAY, margin: 5},
});
