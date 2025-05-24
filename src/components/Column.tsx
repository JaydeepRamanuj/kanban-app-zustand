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

  return (
    <div className="h-fit bg-slate-100/50 rounded-md grow">
      <h2
        className={`text-center text-2xl font-bold  text-white  ${
          title == "Pending"
            ? "bg-orange-600/40"
            : title == "In Progress"
            ? "bg-blue-600/40"
            : title == "Completed"
            ? "bg-green-600/40"
            : "bg-white"
        }`}
      >
        {title}
      </h2>
      <div ref={setNodeRef} className="flex flex-col gap-3 p-2 min-h-[300px]">
        {filteredTasks &&
          filteredTasks.map((task: TaskType) => (
            <Task
              key={task.id}
              id={task.id}
              title={task.title}
              status={task.status}
              description={task.description}
            />
          ))}
      </div>
      {/* <AddNewTaskButton /> */}
    </div>
  );
}

export default Column;
