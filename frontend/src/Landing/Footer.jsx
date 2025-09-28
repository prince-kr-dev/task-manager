import { Github } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/">
            <h1 className="text-xl md:text-3xl font-medium italic text-blue-600">
              Task
              <span className="bg-blue-600 text-white px-1 pb-1 ml-0.5 rounded-md transform skew-x-[-12deg] inline-block">
                Manager
              </span>
            </h1>
          </Link>
          <p className="text-sm text-gray-500">
            © 2025 TaskManager. All rights reserved.
          </p>

          <div className="flex gap-4 text-gray-500 text-lg">
            <a href="#" className="hover:text-gray-900">
              <Github />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
