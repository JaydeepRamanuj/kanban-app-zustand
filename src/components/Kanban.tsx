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
    const taskId = Number(active.id);
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
    <div className="min-h-screen p-3 md:p-6 rounded flex flex-col justify-between">
      <Header />
      <DndContext onDragEnd={handleDragEnd}>
        <div className="mt-6 flex gap-6 mb-auto flex-wrap">
          <Column title="Pending" type="pending" />
          <Column title="In Progress" type="inProgress" />
          <Column title="Completed" type="completed" />
        </div>
      </DndContext>
      <div className="mt-6 w-fit mx-auto mb-auto">
        <AddNewTaskButton />
        <span className="block mt-6">
          Press
          <code className="py-1 px-1.5 mx-1 rounded bg-white/20 text-lg font-semibold">
            ctrl + q
          </code>
          to add new note
        </span>
      </div>
      <div className="bg-gray-500/20 p-2 rounded flex justify-around flex-wrap gap-3">
        <span className="bg-white/10 py-0.5 px-2 rounded mx-3">
          taskCount: {taskCount}
        </span>
        <span className="bg-white/10 py-0.5 px-2 rounded mx-3">
          pendingTasks: {pendingTasks}
        </span>
        <span className="bg-white/10 py-0.5 px-2 rounded mx-3">
          inProgressTasks: {inProgressTasks}
        </span>
        <span className="bg-white/10 py-0.5 px-2 rounded mx-3">
          completedTasks: {completedTasks}
        </span>
      </div>
    </div>
  );
}

export default Kanban;
