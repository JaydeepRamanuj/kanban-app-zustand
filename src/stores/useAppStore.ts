import type { User } from "firebase/auth";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type PopupContentType = "TaskInputForm" | "AuthenticationForm" | null;

export type AppState = {
  isOpen: boolean;
  theme: "dark" | "light";
  uid: string;
  username: string;
  showPopup: (component?: React.ReactNode) => void;
  closePopup: () => void;
  popupComponent?: React.ReactNode | null;
  user: User | null;
  setUsername: (username: string) => void;
  setUId: (uid: string) => void;
  setUser: (user: User) => void;
  clearUser: () => void;
};

const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      isOpen: false,
      theme: "dark",
      popupComponent: null,
      PopupContentType: null,
      user: null,
      uid: "",
      username: "",
      showPopup: (popupComponent) => {
        set(() => ({
          isOpen: true,
          popupComponent,
        }));
      },
      closePopup: () => {
        set(() => ({
          isOpen: false,
        }));
      },
      setUsername: (username) => set({ username: username }),
      setUId: (uid: string) => set({ uid: uid }),
      setUser: (user) => set({ user: user }),
      clearUser: () => set({ user: null, username: "", uid: "" }),
      toggleTheme: () => {
        set((state) => ({
          theme: state.theme == "dark" ? "light" : "dark",
        }));
      },
    }),
    {
      name: "app-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        uid: state.uid,
        username: state.username,
        theme: state.theme,
      }),
    }
  )
);
export default useAppStore;
