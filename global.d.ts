import {SCREENS} from './src/utils/SCREENS';

declare global {
  type RootStackParamList = {
    [SCREENS.BottomTabs]: undefined;
    [SCREENS.Detail]: {contact: IContact};
    [SCREENS.Calling]: {contact: IContact};
    [SCREENS.ContactForm]: {
      mode: 'add' | 'edit';
      contact?: IContact;
    };
  };

  type BottomTabParamList = {
    [SCREENS.Recent]: undefined;
    [SCREENS.Contacts]: undefined;
    [SCREENS.Favorites]: undefined;
  };

  type CallType = 'incoming' | 'outgoing' | 'missed';

  interface IContact {
    id?: number;
    name: string;
    surname: string;
    phone: string;
    email: string;
    job: string;
    address: string;
  }

  interface Recent {
    id: number;
    date: string;
    recent_id: number;
    callType: CallType;
    duration?: number;
    name: string;
    surname: string;
    phone: string;
  }

  interface RecentWithContact extends Recent {
    name: string;
    surname: string;
    phone: string;
  }

  interface IContactState {
    contacts: IContact[];
    recents: RecentWithContact[];
    loading: boolean;
    error: string | null;
    fetchContacts: () => Promise<void>;
    fetchRecents: () => Promise<void>;
    addRecent: (recent_id: number, callType: CallType) => Promise<void>;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
  }

  type ThemeType = 'light' | 'dark';

  interface ThemeState {
    theme: ThemeType;
    toggleTheme: () => void;
  }
}
