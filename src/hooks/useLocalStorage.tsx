import { useState } from "react";
import type { KanbanState } from "../stores/useKanbanStore";

function useLocalStorage() {
  const [data, setData] = useState<KanbanState | null>(() => {
    try {
      const stateData = window.localStorage.getItem("kanban-app-state");
      if (stateData) {
        return JSON.parse(stateData);
      }
      return null;
    } catch (error) {
      console.log("Error getting data from localStorage", error);
      return null;
    }
  });

  const updateData = (newData: KanbanState) => {
    try {
      window.localStorage.setItem("kanban-app-state", JSON.stringify(newData));
    } catch (error) {
      console.log("Error setting data to localStorage", error);
    }
    setData(newData);
  };

  return [data, updateData];
}

export default useLocalStorage;
