import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div className="px-6 md:px-20 flex items-center justify-between py-3 border-b border-blue-100 ">
      <Link to="/">
        <h1 className="text-xl md:text-3xl font-medium italic text-blue-600">
          Task
          <span className="bg-blue-600 text-white px-1 pb-1 ml-0.5 rounded-md transform skew-x-[-12deg] inline-block">
            Manager
          </span>
        </h1>
      </Link>
      <div className="flex items-center gap-3">
        <Link
          to="/login"
          className="hover:bg-blue-200 px-3 py-1 text-md font-medium rounded-md cursor-pointer transition-all"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="bg-blue-600 hover:bg-blue-700 px-3 py-1 text-md font-medium rounded-md cursor-pointer transition-all text-white"
        >
          Signup
        </Link>
      </div>
    </div>
  );
}

export default Nav;