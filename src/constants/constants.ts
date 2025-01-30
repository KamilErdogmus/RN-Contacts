import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const sizes = {
  SMALL: 'small',
  MEDIUM: 'Medium',
  LARGE: 'Large',
} as const;

export {width, height, sizes};
