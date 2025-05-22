import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type AppState = {
  isOpen: boolean;
  theme: "dark" | "light";
  togglePopup: (status: boolean) => void;
};

const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      isOpen: false,
      theme: "dark",
      togglePopup: (status) => {
        set(() => ({
          isOpen: status,
        }));
      },
      //   toggleTheme: () => {
      //     set((state) => ({
      //       theme: state.theme == "dark" ? "light" : "dark",
      //     }));
      //   },
    }),
    {
      name: "app-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAppStore;
