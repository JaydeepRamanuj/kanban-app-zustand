import type { User } from "firebase/auth";
import { create } from "zustand";

interface AuthStore {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user: user }),
  setLoading: (loading) => set({ loading: loading }),
}));
