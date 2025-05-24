import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

import { createJSONStorage, persist } from "zustand/middleware";
import useAppStore from "./useAppStore";
import { updateData } from "../lib/firebaseServices";

export type TaskType = {
  id: string;
  title: string;
  status: "pending" | "inProgress" | "completed";
  description: string;
};

export type KanbanState = {
  tasks: TaskType[];
  taskCount: number;
  pendingTasks: number;
  inProgressTasks: number;
  completedTasks: number;
  initialize: (tasks: TaskType[]) => void;
  clearData: () => void;
  addTask: (
    title: string,
    description: string,
    status: "pending" | "inProgress" | "completed"
  ) => void;
  removeTask: (id: string) => void;
  changeStatus: (
    id: string,
    status: "pending" | "inProgress" | "completed"
  ) => void;
};

const useKanbanStore = create<KanbanState>()(
  persist(
    (set) => ({
      tasks: [],
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
          const uid = useAppStore.getState().uid;
          const updatedTasks = [
            ...state.tasks,
            { id: uuidv4(), title, status, description },
          ];
          if (uid) updateData(uid, updatedTasks);
          return {
            id: uuidv4(),
            tasks: updatedTasks,
            taskCount: state.taskCount + 1,
            [`${status}Tasks`]: state[`${status}Tasks`] + 1,
          };
        });
      },
      changeStatus: (
        id: string,
        status: "pending" | "inProgress" | "completed"
      ) => {
        set((state) => {
          const task = state.tasks.find((task) => task.id === id);
          const updatedTasks = state.tasks.map((task) => {
            if (task.id === id) {
              return { ...task, status: status };
            }
            return task;
          });

          const uid = useAppStore.getState().uid;
          if (uid) updateData(uid, updatedTasks);
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
      removeTask: (id: string) => {
        set((state) => {
          const task = state.tasks.find((task) => task.id == id);
          const updatedTasks = state.tasks.filter((task) => task.id != id);

          const uid = useAppStore.getState().uid;
          if (uid) updateData(uid, updatedTasks);
          if (task) {
            return {
              [`${task.status}Tasks`]: state[`${task.status}Tasks`] - 1,
              [`${task.status}Tasks`]: state[`${task.status}Tasks`] - 1,
              tasks: updatedTasks,
              taskCount: state.taskCount - 1,
            };
          } else {
            return state;
          }
        });
      },
      initialize: (tasks: TaskType[]) => {
        set(() => {
          const statusCount = tasks.reduce(
            (acc, task) => {
              acc[task.status] = (acc[task.status] || 0) + 1;
              return acc;
            },
            { pending: 0, inProgress: 0, completed: 0 }
          );

          console.log(statusCount);

          return {
            tasks: tasks,
            id: tasks.length,
            pendingTasks: statusCount.pending,
            inProgressTasks: statusCount.inProgress,
            completedTasks: statusCount.completed,
          };
        });
      },
      clearData: () => {
        set(() => ({
          tasks: [],
          id: 0,
          taskCount: 0,
          pendingTasks: 0,
          inProgressTasks: 0,
          completedTasks: 0,
        }));
      },
    }),
    {
      name: "kanban-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useKanbanStore;
