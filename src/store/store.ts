import {create} from 'zustand';
import {
  addRecentCall,
  addToFavorites,
  getContacts,
  getFavorites,
  getRecents,
  removeFromFavorites,
} from '../database/Database';

interface IContactState {
  contacts: IContact[];
  recents: (Recent & IContact)[];
  favorites: IContact[];
  searchQuery: string;
  filteredContacts: IContact[];
  loading: boolean;
  error: string | null;
  currentDetailName: string;
  setCurrentDetailName: (name: string) => void;
  fetchContacts: () => Promise<void>;
  fetchRecents: () => Promise<void>;
  setSearchQuery: (query: string) => void;
  fetchFavorites: () => Promise<void>;
  addRecent: (recent_id: number) => Promise<void>;
  addToFavorites: (userId: number) => Promise<void>;
  removeFromFavorites: (userId: number) => Promise<void>;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useContactStore = create<IContactState>((set, get) => ({
  contacts: [],
  recents: [],
  favorites: [],
  searchQuery: '',
  filteredContacts: [],
  loading: false,
  error: null,
  currentDetailName: '',

  setCurrentDetailName: (name: string) => set({currentDetailName: name}),

  fetchContacts: async () => {
    set({loading: true, error: null});
    try {
      const result = await getContacts();

      set({contacts: result, loading: false});
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'An unknown error occurred';
      set({error: errorMessage, loading: false});
    }
  },

  fetchRecents: async () => {
    set({loading: true, error: null});
    try {
      const result = await getRecents();
      set({recents: result, loading: false});
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'An unknown error occurred';
      set({error: errorMessage, loading: false});
    }
  },

  setSearchQuery: (query: string) => {
    const contacts = get().contacts;
    const searchTerm = query.toLowerCase().trim();

    const filtered = contacts.filter((contact: IContact) => {
      const name = contact.name?.toLowerCase() || '';
      const surname = contact.surname?.toLowerCase() || '';
      const phone = contact.phone?.toString() || '';

      return (
        name.includes(searchTerm) ||
        surname.includes(searchTerm) ||
        phone.includes(searchTerm)
      );
    });

    set({searchQuery: query, filteredContacts: filtered});
  },

  fetchFavorites: async () => {
    set({loading: true, error: null});
    try {
      const result = await getFavorites();
      set({favorites: result, loading: false});
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'An unknown error occurred';
      set({error: errorMessage, loading: false});
    }
  },

  addRecent: async (recent_id: number) => {
    set({loading: true, error: null});
    try {
      await addRecentCall(recent_id);
      const recents = await getRecents();
      set({recents, loading: false});
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'An unknown error occurred';
      set({error: errorMessage, loading: false});
    }
  },

  addToFavorites: async (userId: number) => {
    set({loading: true, error: null});
    try {
      await addToFavorites(userId);
      const favorites = await getFavorites();
      set({favorites, loading: false});
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'An unknown error occurred';
      set({error: errorMessage, loading: false});
      throw error;
    }
  },

  removeFromFavorites: async (userId: number) => {
    set({loading: true, error: null});
    try {
      await removeFromFavorites(userId);
      const favorites = await getFavorites();
      set({favorites, loading: false});
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'An unknown error occurred';
      set({error: errorMessage, loading: false});
      throw error;
    }
  },

  setLoading: loading => set({loading}),
  setError: error => set({error}),
}));
