import Column from "./Column";

import { DndContext, type DragEndEvent } from "@dnd-kit/core";

import useKanbanStore from "../stores/kanbanStore";
import useAppStore from "../stores/appStore";
import AddNewTaskButton from "./AddNewTaskButton";
function Kanban() {
  const taskCount = useKanbanStore((state) => state.taskCount);
  const pendingTasks = useKanbanStore((state) => state.pendingTasks);
  const inProgressTasks = useKanbanStore((state) => state.inProgressTasks);
  const completedTasks = useKanbanStore((state) => state.completedTasks);
  const changeStatus = useKanbanStore((state) => state.changeStatus);
  const togglePopup = useAppStore((state) => state.togglePopup);

  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key == "q") {
      togglePopup(true);
    }
    if (e.key == "Escape") {
      togglePopup(false);
    }
  });

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over) return;
    const taskId = Number(active.id);
    const newStatus = over.id as "pending" | "inProgress" | "completed";
    changeStatus(taskId, newStatus);
  };

  return (
    <div className="min-h-screen p-6 rounded flex flex-col justify-between">
      <h1 className="text-4xl text-center font-bold">Kanban Board</h1>
      <DndContext onDragEnd={handleDragEnd}>
        <div className="mt-6 flex gap-6 mb-auto">
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
      <div className="bg-gray-500/20 p-2 rounded flex justify-around">
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
