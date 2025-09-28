import { Link } from "react-router-dom";

function Cta() {
  return (
    <section className="bg-blue-50 py-20">
      <div className="max-w-3xl mx-auto text-center px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Ready to streamline your productivity?
        </h2>
        <p className="text-gray-600 mb-8">
          Join thousands of satisfied users who are managing their tasks
          effortlessly. Get started today!
        </p>
        <Link to="/signup" className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition">
          Get Started Now
        </Link>
      </div>
    </section>
  );
}

export default Cta;
