import {StyleSheet} from 'react-native';
import {width} from '../../constants/constants';

export const UIStyles = StyleSheet.create({
  circleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: width * 0.13,
    width: width * 0.13,
    borderRadius: width,
  },
});
