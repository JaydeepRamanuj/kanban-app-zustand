import { create } from "zustand";

export type AppState = {
  isOpen: boolean;
  theme: "dark" | "light";
  togglePopup: (status: boolean) => void;
};

const useAppStore = create<AppState>((set) => ({
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
}));

export default useAppStore;
