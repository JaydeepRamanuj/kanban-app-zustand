import React from "react";
import { MdDeleteForever } from "react-icons/md";
import { useDraggable } from "@dnd-kit/core";
import type { KanbanState, TaskType } from "../stores/kanbanStore";
import useKanbanStore from "../stores/kanbanStore";

function Task({ id, title, status, description }: TaskType) {
  const changeStatus = useKanbanStore(
    (state: KanbanState) => state.changeStatus
  );
  const removeTask = useKanbanStore((state: KanbanState) => state.removeTask);
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    changeStatus(id, e.target.value as "pending" | "inProgress" | "completed");
  };

  const handleDelete = () => {
    console.log("delete function");
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
      className="p-2 rounded bg-white/20"
      style={style}
    >
      <div className="flex justify-between items-center relative z-20 cursor-pointer active:cursor-grab">
        <h1 className="text-lg font-bold">{title}</h1>
        <select
          name=""
          id=""
          defaultValue={status}
          className="bg-slate-800/50 text-white rounded text-sm cursor-pointer ml-auto"
          onChange={handleSelectChange}
        >
          <option value="pending">Pending</option>
          <option value="inProgress">In Process</option>
          <option value="completed">Completed</option>
        </select>
        <MdDeleteForever
          className="text-xl text-red-300 ml-1 cursor-pointer transition-all hover:text-red-400"
          onClick={handleDelete}
        />
      </div>
      <p>{description}</p>
    </div>
  );
}

export default Task;
