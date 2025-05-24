import React from "react";
import { MdDeleteForever } from "react-icons/md";
import { useDraggable } from "@dnd-kit/core";
import type { KanbanState, TaskType } from "../stores/useKanbanStore";
import useKanbanStore from "../stores/useKanbanStore";

function Task({ id, title, status, description }: TaskType) {
  const changeStatus = useKanbanStore(
    (state: KanbanState) => state.changeStatus
  );

  const removeTask = useKanbanStore((state: KanbanState) => state.removeTask);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    changeStatus(id, e.target.value as "pending" | "inProgress" | "completed");
  };

  const handleDelete = () => {
    const response = confirm(
      `Are you sure you want to delete task :  ${title}`
    );
    if (response) {
      removeTask(id);
    }
  };

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });

  const style: React.CSSProperties = transform
    ? {
        transform: `translate(${transform.x}px,${transform.y}px)`,
      }
    : {};

  return (
    <div
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      className="p-4 rounded-2xl shadow-md bg-white text-slate-800 border border-slate-100 transition-transform duration-200"
      style={style}
    >
      <div className="flex justify-between items-start gap-2 relative z-20 cursor-grab active:cursor-grabbing">
        <h1 className="text-base font-semibold text-slate-800">{title}</h1>

        <div className="flex items-center gap-2 ml-auto">
          <select
            defaultValue={status}
            className="bg-slate-100 text-slate-700 border border-slate-300 rounded-md px-2 py-1 text-sm shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-200"
            onChange={handleSelectChange}
            onPointerDown={(e) => e.stopPropagation()}
          >
            <option value="pending">Pending</option>
            <option value="inProgress">In Process</option>
            <option value="completed">Completed</option>
          </select>

          <MdDeleteForever
            className="text-xl text-red-400 cursor-pointer hover:text-red-500 transition-colors duration-150"
            onClick={handleDelete}
            onPointerDown={(e) => e.stopPropagation()}
          />
        </div>
      </div>

      <p className="mt-2 text-sm text-slate-600 leading-snug">{description}</p>
    </div>
  );
}

export default Task;
