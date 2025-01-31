import {StyleSheet} from 'react-native';
import {COLORS} from '../../theme/COLORS';

export const contactCardItemStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: COLORS.WHITE,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  innerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 30,
    height: 60,
    width: 60,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 6,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.BLACK,
    marginBottom: 4,
  },
  job: {
    fontSize: 14,
    color: COLORS.GRAY,
  },

  btnContainer: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.PRIMARY,
  },
  buttonPressed: {
    transform: [{scale: 0.95}],
    opacity: 0.9,
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 1000,
  },
  avatarText: {
    color: COLORS.WHITE,
    fontWeight: '600',
    fontSize: 18,
  },
});
