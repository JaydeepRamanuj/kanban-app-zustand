import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type TaskType = {
  id: number;
  title: string;
  status: "pending" | "inProgress" | "completed";
  description: string;
};

export type KanbanState = {
  tasks: TaskType[];
  id: number;
  taskCount: number;
  pendingTasks: number;
  inProgressTasks: number;
  completedTasks: number;
  addTask: (
    title: string,
    description: string,
    status: "pending" | "inProgress" | "completed"
  ) => void;
  removeTask: (id: number) => void;
  changeStatus: (
    id: number,
    status: "pending" | "inProgress" | "completed"
  ) => void;
};

const useKanbanStore = create<KanbanState>()(
  persist(
    (set) => ({
      tasks: [],
      id: 0,
      taskCount: 0,
      pendingTasks: 0,
      inProgressTasks: 0,
      completedTasks: 0,
      addTask: (
        title: string,
        description: string,
        status: "pending" | "inProgress" | "completed"
      ) => {
        set((state) => {
          return {
            id: state.id + 1,
            tasks: [
              ...state.tasks,
              { id: state.id + 1, title, status, description },
            ],
            taskCount: state.taskCount + 1,
            [`${status}Tasks`]: state[`${status}Tasks`] + 1,
          };
        });
      },
      removeTask: (id: number) => {
        set((state) => {
          const task = state.tasks.find((task) => task.id == id);
          if (task) {
            return {
              [`${task.status}Tasks`]: state[`${task.status}Tasks`] - 1,
              [`${task.status}Tasks`]: state[`${task.status}Tasks`] - 1,
              tasks: state.tasks.filter((task) => task.id != id),
              taskCount: state.taskCount - 1,
            };
          } else {
            return state;
          }
        });
      },
      changeStatus: (
        id: number,
        status: "pending" | "inProgress" | "completed"
      ) => {
        set((state) => {
          const task = state.tasks.find((task) => task.id == id);
          const updatedTasks = state.tasks.map((task) => {
            if (task.id === id) {
              return { ...task, status: status };
            }
            return task;
          });
          if (task) {
            return {
              tasks: updatedTasks,
              [`${task.status}Tasks`]: state[`${task.status}Tasks`] - 1,
              [`${status}Tasks`]: state[`${status}Tasks`] + 1,
            };
          } else {
            return state;
          }
        });
      },
    }),
    {
      name: "kanban-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useKanbanStore;
