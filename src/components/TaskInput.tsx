import React, { useState } from "react";
import useAppStore from "../stores/useAppStore";
import type { TaskType } from "../stores/useKanbanStore";
import useKanbanStore from "../stores/useKanbanStore";

function TaskInput() {
  const closePopup = useAppStore((state) => state.closePopup);
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [select, setSelect] = useState<TaskType["status"]>("pending");
  const addTask = useKanbanStore((state) => state.addTask);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    closePopup();
    addTask(title, desc, select);
  };
  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="min-w-[300px]">
        <div className="flex flex-col gap-3">
          <h2 className="bg-blue-500 text-white text-center text-xl font-semibold rounded-md">
            Add new Task
          </h2>
          <input
            type="text"
            name=""
            id=""
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="Title"
            className="p-1.5 rounded  border border-gray-500 "
            autoFocus={true}
            required={true}
          />
          <textarea
            name=""
            id=""
            value={desc}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
            placeholder="Description"
            className="p-1.5 rounded border border-gray-500"
          />
          <select
            name=""
            id=""
            value={select}
            onChange={(e) => {
              setSelect(e.target.value as TaskType["status"]);
            }}
            className="p-1.5 rounded border border-gray-500"
          >
            <option value="pending" className="bg-slate-600 text-white">
              Pending
            </option>
            <option value="inProgress" className="bg-slate-600 text-white">
              In Progress
            </option>
            <option value="completed" className="bg-slate-600 text-white">
              Completed
            </option>
          </select>
          <button className="px-3 py-1 rounded bg-blue-500 text-white mx-auto w-fit hover:bg-blue-600 active:bg-blue-600 active:scale-[.97] cursor-pointer">
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskInput;
