import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-25">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 text-center md:text-left">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
              Manage Your Tasks Effortlessly
            </h1>
            <p className="text-lg text-gray-600">
              Create, track, and organize your tasks with ease, boosting your
              productivity and focus.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link to="/signup" className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition">
                Get Started
              </Link>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <img
              src="https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRhc2slMjBtYW5hZ2VtZW50fGVufDB8fDB8fHww"
              alt="Task Illustration"
              className="rounded-xl shadow-md w-full max-w-md object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
