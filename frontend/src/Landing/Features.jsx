import { CheckSquare, Layout, FileText, Shield } from "lucide-react";

function Features() {
  const features = [
    {
      icon: <CheckSquare className="w-10 h-10 text-blue-500" />,
      title: "Intuitive Task Creation",
      desc: "Easily create new tasks with customizable fields, deadlines, and labels to keep everything organized.",
    },
    {
      icon: <Layout className="w-10 h-10 text-blue-500" />,
      title: "Dynamic Task Dashboard",
      desc: "Visualize your workflow at a glance with a personalized dashboard, tracking progress and priorities.",
    },
    {
      icon: <FileText className="w-10 h-10 text-blue-500" />,
      title: "Detailed Task Management",
      desc: "Effortlessly edit task details, set priorities, add notes, and manage attachments for comprehensive control.",
    },
    {
      icon: <Shield className="w-10 h-10 text-blue-500" />,
      title: "Secure User Authentication",
      desc: "Access your tasks securely with robust user authentication, ensuring your data is always protected.",
    },
  ];

  return (
    <section className="bg-gray-50 py-25">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-12">
          Powerful Features at Your Fingertips
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 text-center space-y-4 hover:shadow-lg transition"
            >
              <div className="flex justify-center">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
