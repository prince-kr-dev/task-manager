import React, { useState } from "react";
import Navbar from "./Navbar";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function CreateTask() {
  const [title, setTaskTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("");

  const {createTask} = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    const taskData = { title, description, dueDate, priority };
    await createTask(taskData);
    setTaskTitle("");
    setDescription("");
    setDueDate("");
    setPriority("");
    navigate("/dashboard");
  };

  return (
    <>
      <Navbar />
      <div className="md:pt-15 pt-10">
        <div className=" flex items-center justify-center p-4">
          <div className="bg-gray-100 rounded-xl shadow-md w-full max-w-md p-6 md:p-2">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Create New Task
            </h2>
            <p className="text-gray-500 mb-6 text-sm">
              Fill in the details below to create a new task.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col">
                <label className="text-gray-700 mb-1 font-medium">
                  Task Title
                </label>
                <input
                  type="text"
                  placeholder="e.g., Complete Project Report"
                  value={title}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="text-gray-700 mb-1 font-medium">
                  Description
                </label>
                <textarea
                  placeholder="Provide details about the task, including sub-tasks or specific requirements."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 resize-none"
                  rows={4}
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="text-gray-700 mb-1 font-medium">
                  Due Date
                </label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="text-gray-700 mb-1 font-medium">
                  Priority
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                  required
                >
                  <option value="">Select priority</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div className="flex justify-end space-x-3 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setTaskTitle("");
                    setDescription("");
                    setDueDate("");
                    setPriority("");
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateTask;
