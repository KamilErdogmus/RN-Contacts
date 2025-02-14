import {create} from 'zustand';
import {
  addRecentCall,
  addToFavorites,
  getContacts,
  getFavorites,
  getRecents,
  removeFromFavorites,
} from '../database/Database';

export const useContactStore = create<IContactState>((set, get) => ({
  contacts: [],
  recents: [],
  favorites: [],
  searchQuery: '',
  filteredContacts: [],
  loading: false,
  error: null,
  refreshTrigger: 0,
  currentDetailName: '',

  setCurrentDetailName: (name: string) =>
    set(state => ({...state, currentDetailName: name})),

  fetchContacts: async () => {
    set({loading: true, error: null});
    try {
      const result = await getContacts();
      set(state => ({
        ...state,
        contacts: result,
        loading: false,
        error: null,
        filteredContacts: state.searchQuery
          ? result.filter(contact => {
              const searchTerm = state.searchQuery.toLowerCase().trim();
              const name = contact.name?.toLowerCase() || '';
              const surname = contact.surname?.toLowerCase() || '';
              const phone = contact.phone?.toString() || '';

              return (
                name.includes(searchTerm) ||
                surname.includes(searchTerm) ||
                phone.includes(searchTerm)
              );
            })
          : [],
      }));
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'An unknown error occurred';
      set(state => ({...state, error: errorMessage, loading: false}));
    }
  },

  triggerRefresh: () =>
    set(state => ({...state, refreshTrigger: state.refreshTrigger + 1})),

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
