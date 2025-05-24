import Column from "./Column";

import { DndContext, type DragEndEvent } from "@dnd-kit/core";

import useKanbanStore from "../stores/useKanbanStore";
import useAppStore from "../stores/useAppStore";
import AddNewTaskButton from "./AddNewTaskButton";
import TaskInput from "./TaskInput";
import Header from "./Header";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebaseSetup";
function Kanban() {
  const taskCount = useKanbanStore((state) => state.taskCount);
  const pendingTasks = useKanbanStore((state) => state.pendingTasks);
  const inProgressTasks = useKanbanStore((state) => state.inProgressTasks);
  const completedTasks = useKanbanStore((state) => state.completedTasks);
  const changeStatus = useKanbanStore((state) => state.changeStatus);
  const showPopup = useAppStore((state) => state.showPopup);
  const closePopup = useAppStore((state) => state.closePopup);
  const setUser = useAppStore((state) => state.setUser);
  const clearUser = useAppStore((state) => state.clearUser);
  const clearData = useKanbanStore((state) => state.clearData);
  const tasks = useKanbanStore((state) => state.tasks);

  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key == "q") {
      showPopup(<TaskInput />);
    }
    if (e.key == "Escape") {
      closePopup();
    }
  });

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over) return;
    const taskId = active.id as string;
    const newStatus = over.id as "pending" | "inProgress" | "completed";

    const task = tasks.find((task) => task.id === taskId);

    if (task?.status != newStatus) changeStatus(taskId, newStatus);
  };

  useEffect(() => {
    const userStatus = onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log("User is logged in:", user);
        setUser(user);
      } else {
        // console.log("No user logged in.");
        clearUser();
        clearData();
      }
    });

    return () => userStatus();
  }, []);

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50 text-gray-800 flex flex-col gap-8">
      <Header />

      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex flex-wrap gap-6 justify-center">
          <Column title="Pending" type="pending" />
          <Column title="In Progress" type="inProgress" />
          <Column title="Completed" type="completed" />
        </div>
      </DndContext>

      {/* Add Task Shortcut + Button */}
      <div className="text-center">
        <AddNewTaskButton />
        <p className="mt-4 text-sm text-gray-500">
          Press
          <code className="mx-1 px-1.5 py-1 rounded bg-gray-200 text-gray-700 font-semibold">
            Ctrl + Q
          </code>
          to add a new note
        </p>
      </div>

      {/* Stats */}
      <div className="bg-white shadow-inner p-4 rounded-lg flex flex-wrap justify-center gap-4 text-sm text-gray-700 font-medium">
        <span className="bg-gray-100 px-3 py-1 rounded">
          Total: {taskCount}
        </span>
        <span className="bg-orange-100 px-3 py-1 rounded">
          Pending: {pendingTasks}
        </span>
        <span className="bg-yellow-100 px-3 py-1 rounded">
          In Progress: {inProgressTasks}
        </span>
        <span className="bg-green-100 px-3 py-1 rounded">
          Completed: {completedTasks}
        </span>
      </div>
    </div>
  );
}

export default Kanban;
