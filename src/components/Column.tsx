import { useMemo } from "react";
import { useDroppable } from "@dnd-kit/core";
import type { KanbanState, TaskType } from "../stores/useKanbanStore";
import useKanbanStore from "../stores/useKanbanStore";
import Task from "./Task";

type ColumnProps = {
  title: string;
  type: "pending" | "inProgress" | "completed";
};

function Column({ title, type }: ColumnProps) {
  const { setNodeRef } = useDroppable({ id: type });

  const tasks = useKanbanStore((state: KanbanState) => state.tasks);
  const filteredTasks = useMemo(
    () => tasks.filter((task: TaskType) => task.status == type),
    [tasks, type]
  );

  const headerColors = {
    pending: "bg-red-100 text-red-700",
    inProgress: "bg-yellow-100 text-yellow-700",
    completed: "bg-green-100 text-green-700",
  };

  return (
    <div className="bg-white shadow-md rounded-xl flex flex-col w-full max-w-sm min-w-[280px] h-fit">
      <h2
        className={`text-lg font-semibold px-4 py-2 rounded-t-xl ${headerColors[type]}`}
      >
        {title}
      </h2>

      <div
        ref={setNodeRef}
        className="flex flex-col gap-3 p-4 min-h-[300px] transition-all"
      >
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task: TaskType) => (
            <Task
              key={task.id}
              id={task.id}
              title={task.title}
              status={task.status}
              description={task.description}
            />
          ))
        ) : (
          <p className="text-sm text-gray-400 italic text-center">
            No tasks here
          </p>
        )}
      </div>
    </div>
  );
}

export default Column;
