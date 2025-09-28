import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "./Navbar";

const Dashboard = () => {
  const { getAllTasks } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await getAllTasks();

        if (res?.data && Array.isArray(res.data)) {
          setTasks(res.data);
        } else if (res?.data?.tasks && Array.isArray(res.data.tasks)) {
          setTasks(res.data.tasks);
        } else {
          setTasks([]);
        }
      } catch (err) {
        console.error("Failed to load tasks:", err);
        setTasks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const getStatusClasses = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-200 text-green-800";
      case "in-progress":
        return "bg-yellow-200 text-yellow-800";
      case "pending":
        return "bg-red-200 text-red-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-6xl mx-auto pt-10 md:pt-20">
        <h1 className="text-3xl font-bold mb-6 text-center">Dashboard</h1>

        {loading ? (
          <p className="text-center">Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p className="text-gray-600 text-center">No tasks found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <div
                key={task._id}
                className="p-5 bg-gray-100 rounded-xl shadow-lg hover:shadow-xl transition duration-300"
              >
                <h2 className="text-xl font-semibold mb-2">{task.title}</h2>

                <p className="text-gray-600 line-clamp-3">{task.description}</p>

                <p className="mt-3 text-sm">
                  <span
                    className={`px-2 py-1 rounded font-medium ${getStatusClasses(
                      task.status
                    )}`}
                  >
                    {task.status}
                  </span>
                </p>

                <Link
                  to={`/task/${task._id}`}
                  className="mt-4 inline-block text-blue-600 hover:underline font-medium"
                >
                  View Task →
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
