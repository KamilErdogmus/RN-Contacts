import {create} from 'zustand';
import {IContactState} from './types';
import {getContacts} from '../database/Database';

export const useContactStore = create<IContactState>()(set => ({
  // Initial state
  contacts: [],
  loading: false,
  error: null,

  // Actions
  fetchContacts: async () => {
    set({loading: true, error: null});
    try {
      console.log('Contacts fetch başladı'); // Debug log
      const result = await getContacts();
      console.log('Fetch edilen veriler:', result); // Debug log
      set({contacts: result, loading: false});
    } catch (error) {
      console.error('Fetch error:', error);
      set({error: error.message, loading: false});
    }
  },

  setContacts: contacts => set({contacts}),
  setLoading: loading => set({loading}),
  setError: error => set({error}),
}));
