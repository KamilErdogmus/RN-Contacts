import {SCREENS} from './src/utils/SCREENS';

declare global {
  type RootStackParamList = {
    [SCREENS.BottomTabs]: undefined;
    [SCREENS.Detail]: {contact: IUser};
    [SCREENS.Calling]: {contact: IUser};
  };

  type BottomTabParamList = {
    [SCREENS.Recent]: undefined;
    [SCREENS.Contacts]: undefined;
    [SCREENS.Favorites]: undefined;
  };

  interface IUser {
    id: number;
    name: string;
    address: string;
    surname: string;
    phone: string;
    email: string;
    job: string;
  }

  interface Recent {
    id: number;
    date: string;
    recent_id: number;
  }
}
