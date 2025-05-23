import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface AppState {
  isOpen: boolean;
  theme: "dark" | "light";
  togglePopup: (
    status: boolean,
    component?: React.Component,
    componentHandler?: () => void
  ) => void;
  popupComponent: React.Component | null;
}

const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      isOpen: false,
      theme: "dark",
      popupComponent: null,
      togglePopup: (status, component) => {
        set(() => ({
          isOpen: status,
          popupComponent: component,
        }));
      },
      toggleTheme: () => {
        set((state) => ({
          theme: state.theme == "dark" ? "light" : "dark",
        }));
      },
    }),
    {
      name: "app-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAppStore;
