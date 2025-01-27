import {SCREENS} from './src/utils/SCREENS';

declare global {
  type RootStackParamList = {
    [SCREENS.BottomTabs]: undefined;
  };

  type BottomTabParamList = {
    [SCREENS.Resent]: undefined;
    [SCREENS.Contacts]: undefined;
    [SCREENS.Favorites]: undefined;
  };
}
