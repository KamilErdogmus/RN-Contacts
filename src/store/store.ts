import {create} from 'zustand';
import {IContactState} from './types';
import {addRecentCall, getContacts, getRecents} from '../database/Database';

export const useContactStore = create<IContactState>()(set => ({
  // Initial state
  contacts: [],
  recents: [],
  loading: false,
  error: null,

  // Actions
  fetchContacts: async () => {
    set({loading: true, error: null});
    try {
      console.log('Contacts fetching...');
      const result = await getContacts();
      console.log('Fetched contacts:', result);
      set({contacts: result, loading: false});
    } catch (error) {
      console.error('Fetch error:', error);
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

  addRecent: async (recent_id: number) => {
    set({loading: true, error: null});
    try {
      await addRecentCall(new Date().toDateString(), recent_id);
      const recents = await getRecents();
      set({recents, loading: false});
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'An unknown error occurred';
      set({error: errorMessage, loading: false});
    }
  },

  setLoading: loading => set({loading}),
  setError: error => set({error}),
}));
