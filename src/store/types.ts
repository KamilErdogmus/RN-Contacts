interface IContactState {
  contacts: IContact[];
  recents: Recent[];
  loading: boolean;
  error: string | null;

  // Actions
  fetchContacts: () => Promise<void>;
  fetchRecents: () => Promise<void>;
  addRecent: (recent_id: number) => Promise<void>;
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
