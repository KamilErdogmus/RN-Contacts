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
    recents: (Recent & IContact)[];
    favorites: IContact[];
    searchQuery: string;
    filteredContacts: IContact[];
    loading: boolean;
    error: string | null;
    currentDetailName: string;
    refreshTrigger: number;
    setCurrentDetailName: (name: string) => void;
    fetchContacts: () => Promise<void>;
    fetchRecents: () => Promise<void>;
    setSearchQuery: (query: string) => void;
    fetchFavorites: () => Promise<void>;
    addRecent: (recent_id: number) => Promise<void>;
    addToFavorites: (userId: number) => Promise<void>;
    removeFromFavorites: (userId: number) => Promise<void>;
    setLoading: (loading: boolean) => void;
    triggerRefresh: () => void;
    setError: (error: string | null) => void;
  }

  type ThemeType = 'light' | 'dark';

  interface ThemeState {
    theme: ThemeType;
    toggleTheme: () => void;
  }

  interface ThemeColors {
    background: string;
    text: string;
    card: string;
    border: string;
    secondary: string;
    hint: string;
    shadow: string;
    ripple: string;
    success: string;
    danger: string;
    primary: string;
    white: string;
    control: string;
    basic: string;
  }
}
