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
      <form onSubmit={handleSubmit} className="min-w-[350px] md:min-w-[350px]">
        <div className="flex flex-col gap-4 bg-white/20 backdrop-blur-md rounded-xl p-5 border border-blue-300 shadow-xl text-sm text-gray-800">
          <h2 className="text-lg text-center font-semibold text-white bg-blue-500/90 rounded-md py-2 shadow-md">
            Add New Task
          </h2>

          {/* Title Input */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task Title"
            className="px-3 py-2 rounded-md bg-white/70 text-gray-800 placeholder-gray-500 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            autoFocus
            required
          />

          {/* Description */}
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Task Description"
            rows={3}
            className="px-3 py-2 rounded-md bg-white/70 text-gray-800 placeholder-gray-500 border border-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Select Dropdown */}
          <select
            value={select}
            onChange={(e) => setSelect(e.target.value as TaskType["status"])}
            className="px-3 py-2 rounded-md bg-white/70 text-gray-800 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="pending">🕒 Pending</option>
            <option value="inProgress">🚧 In Progress</option>
            <option value="completed">✅ Completed</option>
          </select>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 active:scale-[.97] text-white font-medium rounded-full px-5 py-2 w-fit mx-auto shadow-md transition-all"
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskInput;
