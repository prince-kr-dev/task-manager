import { useState } from "react";
import { Menu, Plus, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const activeClass = "text-blue-500 font-bold underline";
  const inactiveClass = "text-gray-600 hover:text-blue-600";

  const { user, logout } = useAuth();

  return (
    <nav className="fixed w-full bg-white shadow-md px-4 md:px-8 py-1 flex items-center justify-between z-30">
      <Link to="/dashboard">
        <h1 className="text-xl md:text-3xl font-medium italic text-blue-600">
          Task
          <span className="bg-blue-600 text-white px-1 pb-1 ml-0.5 rounded-md transform skew-x-[-12deg] inline-block">
            Manager
          </span>
        </h1>
      </Link>

      <div className="hidden md:flex items-center space-x-6">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${isActive ? activeClass : inactiveClass} font-semibold text-sm`
          }
        >
          Dashboard
        </NavLink>
        <NavLink
            to="/create"
            className={({ isActive }) =>
              `${isActive ? activeClass : inactiveClass} py-2`
            }
          >
            <Plus className="bg-gray-200 h-8 w-8 rounded-md"/>
          </NavLink>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
        >
          Logout
        </button>

        <NavLink>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center text-blue-700 font-bold text-sm">
              {user.fullName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <span className="text-xs mt-1">{user.fullName}</span>
          </div>
        </NavLink>
      </div>

      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div
          className="md:hidden fixed inset-0 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`md:hidden fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 flex flex-col p-4 space-y-4 transition-transform duration-300 ease-in-out
          ${isOpen ? "transform translate-x-0" : "transform translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b pb-4">
          <span className="font-semibold text-lg">Welcome back!</span>
          <button onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <NavLink>
          <div className="flex items-center space-x-3 py-2">
            <div className="w-12 h-12 rounded-full bg-green-200 flex items-center justify-center text-green-700 font-bold text-lg">
              {user.fullName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div className="flex flex-col">
              <span className="font-medium">{user.fullName}</span>
              <span className="text-sm font-medium">{user.email}</span>
            </div>
          </div>
        </NavLink>

        <div className="flex flex-col space-y-3">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `${isActive ? activeClass : inactiveClass} py-2`
            }
          >
            Dashsboard
          </NavLink>
          <NavLink
            to="/create"
            className={({ isActive }) =>
              `${isActive ? activeClass : inactiveClass} py-2`
            }
          >
            Create Task
          </NavLink>
        </div>

        <div className="pt-2">
          <button
            onClick={logout}
            className="w-full bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
