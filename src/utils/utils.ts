import type { KanbanState } from "../stores/useKanbanStore";

export function getStateDataFromLocalStorage() {
  try {
    const data = window.localStorage.getItem("kanban-app-state");
    if (data) {
      return JSON.parse(data);
    } else {
      return {};
    }
  } catch (error) {
    console.log("Error getting state data from localStorage", error);

    return {};
  }
}

export function saveStateDataToLocalStorage(data: KanbanState) {
  try {
    window.localStorage.setItem("kanban-app-state", JSON.stringify(data));
  } catch (error) {
    console.log("Error saving state data to localStorage", error);
  }
}
