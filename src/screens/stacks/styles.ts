import {StyleSheet} from 'react-native';
import {height} from '../../constants/constants';
import {COLORS} from '../../theme/COLORS';

export const contactDetailScreenStyles = StyleSheet.create({
  userContainer: {
    height: height * 0.2,
    position: 'relative',
  },
  upperHalf: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '50%',
    backgroundColor: COLORS.WARNING,
  },
  lowerHalf: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    backgroundColor: COLORS.WHITE,
  },
  userInfoContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    right: 0,
    top: '25%',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    height: height * 0.1,
    marginTop: 20,
  },
  fullName: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 10,
    color: COLORS.BLACK,
  },
  job: {
    color: COLORS.GRAY,
    marginTop: 5,
  },
  infoContainer: {
    backgroundColor: COLORS.LIGHT_GRAY,
    margin: 8,
    borderRadius: 8,

    padding: 10,
    paddingLeft: 16,
    justifyContent: 'center',
    rowGap: 8,
  },
  title: {
    fontSize: 16,
    color: COLORS.TEXT_PRIMARY,
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  phone: {fontSize: 20},
});

export const callingScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.DIALING,
    paddingHorizontal: 20,
  },
  userInfo: {
    alignItems: 'center',
    marginTop: height * 0.15,
  },
  name: {
    fontSize: 28,
    fontWeight: '600',
    color: COLORS.WHITE,
    marginTop: 20,
  },
  status: {
    fontSize: 16,
    color: COLORS.WHITE,
    opacity: 0.7,
    marginVertical: 10,
  },
  phone: {
    fontSize: 20,
    color: COLORS.WHITE,
    opacity: 0.7,
    marginTop: 5,
  },
  controls: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  upperControls: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginBottom: 40,
  },
  controlButton: {
    alignItems: 'center',
    padding: 15,
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    width: 80,
  },
  buttonText: {
    color: COLORS.WHITE,
    marginTop: 8,
    fontSize: 12,
  },
  endCallButton: {
    backgroundColor: COLORS.ERROR,
    width: 65,
    height: 65,
    borderRadius: 33,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{rotate: '135deg'}],
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});
