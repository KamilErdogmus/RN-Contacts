interface IContactState {
  // State
  contacts: IContact[];
  loading: boolean;
  error: string | null;
  // Actions
  fetchContacts: () => Promise<void>;
  setContacts: (contacts: IContact[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

interface IContact {
  id: number;
  name: string;
  surname: string;
  phone: string;
  email: string;
  job: string;
}
export type {IContact, IContactState};
