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

  interface IUser {
    id: number;
    name: string;
    surname: string;
    phone: string;
    email: string;
    job: string;
  }
}
