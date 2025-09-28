import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "./Navbar";
import toast from "react-hot-toast";

const ViewTask = () => {
  const { id } = useParams();
  const { getTaskById, updateTask, deleteTask, updateTaskStatus } = useAuth();
  const [task, setTask] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      const data = await getTaskById(id);
      if (data) {
        setTask(data);
        setFormData(data);
      } else {
        navigate("/dashboard");
      }
    };
    fetchTask();
  }, [id, getTaskById, navigate]);

  const handleUpdate = async () => {
    try {
      const updated = await updateTask(id, {
        title: formData.title,
        description: formData.description,
        dueDate: formData.dueDate,
        priority: formData.priority,
      });
      setTask(updated.task || updated)
      setEditing(false);
      navigate("/dashboard");
      toast.success("Updated successfully");
    } catch (err) {
      alert("Failed to update task.");
    }
  };

  const handleStatusChange = async (status) => {
    try {
      const updated = await updateTaskStatus(id, status);
      setTask(updated.task);
      setFormData((prev) => ({ ...prev, status }));
    } catch (err) {
      console.error("Status change failed:", err);
      alert("Failed to update status.");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTask(id);
      navigate("/dashboard");
      toast.success("Deleted Successfully");
    } catch (err) {
      alert("Failed to delete task.");
    }
  };

  if (!task) return <p className="text-center mt-10">Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="pt-10 md:pt-20 p-2">
        <div className="p-6 max-w-3xl mx-auto bg-gray-100 rounded-xl shadow-2xl">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-sm text-blue-500 mb-4"
          >
            ← Back to Dashboard
          </button>

          {editing ? (
            <div className="space-y-4">
              <input
                type="text"
                value={formData.title || ""}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
                placeholder="Title"
              />
              <textarea
                value={formData.description || ""}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full border rounded px-3 py-2 resize-none"
                placeholder="Description"
              />
              <input
                type="date"
                value={formData.dueDate?.split("T")[0] || ""}
                onChange={(e) =>
                  setFormData({ ...formData, dueDate: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
              />
              <select
                value={formData.priority || ""}
                onChange={(e) =>
                  setFormData({ ...formData, priority: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
              >
                <option value="">Select Priority</option>
                <option value="low">Low</option>
                <option value="normal">Normal</option>
                <option value="high">High</option>
              </select>

              <select
                value={formData.status || ""}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="w-full border rounded px-3 py-2"
              >
                <option value="">Select Status</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>

              <div className="flex gap-3">
                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 bg-green-500 text-white rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold mb-2">{task.title}</h1>
              <p className="text-gray-600 mb-4">{task.description}</p>

              <div className="space-y-2">
                <p>
                  <strong>Due Date:</strong>{" "}
                  {new Date(task.dueDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>Priority:</strong> {task.priority}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`px-2 py-1 rounded ${
                      task.status === "completed"
                        ? "bg-green-200 text-green-800"
                        : "bg-yellow-200 text-yellow-800"
                    }`}
                  >
                    {task.status}
                  </span>
                </p>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setEditing(true)}
                  className="px-4 py-2 bg-gray-200 rounded"
                >
                  Edit Task
                </button>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="px-4 py-2 bg-red-500 text-white rounded"
                >
                  Delete Task
                </button>
              </div>
            </>
          )}

          {showDeleteModal && (
            <div className="fixed inset-0 bg-black/3 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
                <p className="mb-6">
                  Are you sure you want to delete this task?
                </p>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="px-4 py-2 bg-gray-300 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="px-4 py-2 bg-red-500 text-white rounded"
                  >
                    Yes, Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ViewTask;
