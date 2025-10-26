import React from "react";
import { CheckCircle, BookOpen, Calendar, Brain, ClipboardList, Mail, FileQuestion, LogIn } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <LogIn className="w-10 h-10 text-primary" />,
      title: "Login or Sign Up",
      description:
        "Start your learning journey by creating an account or logging in. Your personal dashboard keeps everything organized and accessible.",
    },
    {
      icon: <BookOpen className="w-10 h-10 text-green-500" />,
      title: "Access Resource Finder",
      description:
        "Discover curated study materials, AI-generated notes, and reference links—all tailored to your subjects and syllabus.",
    },
    {
      icon: <Calendar className="w-10 h-10 text-blue-500" />,
      title: "Use the Study Planner",
      description:
        "Plan your daily or weekly schedule smartly. The planner helps you track topics and maintain consistency effortlessly.",
    },
    {
      icon: <Brain className="w-10 h-10 text-purple-500" />,
      title: "AI Career Counsellor",
      description:
        "Tell us your interests and goals, and our AI will generate a personalized career roadmap with clear learning paths.",
    },
    {
      icon: <ClipboardList className="w-10 h-10 text-yellow-500" />,
      title: "Track Attendance",
      description:
        "Stay updated with your attendance records and get reminders when you’re falling behind—so you never miss out.",
    },
    {
      icon: <Mail className="w-10 h-10 text-pink-500" />,
      title: "Manage Important Emails",
      description:
        "All your academic and institutional emails are neatly organized in one place, helping you stay on top of deadlines.",
    },
    {
      icon: <FileQuestion className="w-10 h-10 text-red-500" />,
      title: "Take Smart Exams",
      description:
        "Practice AI-generated mock tests that adapt to your knowledge level and boost your preparation confidence.",
    },
  ];

  return (
    <div id="howitworks" className="px-6 sm:px-20 xl:px-32 py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-semibold text-slate-800">
          How It Works
        </h2>
        <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
          From logging in to mastering your studies — here’s how our AI-powered platform helps you every step of the way.
        </p>
      </div>

      {/* Steps Section */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
        {steps.map((step, index) => (
          <div
            key={index}
            className="p-6 rounded-2xl shadow-md bg-white border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition duration-300"
          >
            <div className="flex items-center justify-center mb-4">
              {step.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-800 text-center">
              {step.title}
            </h3>
            <p className="text-gray-500 text-sm mt-3 text-center leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>

      {/* Final CTA */}
      <div className="text-center mt-16">
        <CheckCircle className="mx-auto w-10 h-10 text-green-600 mb-3" />
        <h3 className="text-2xl font-semibold text-slate-800">And you’re all set!</h3>
        <p className="text-gray-500 mt-2">
          Log in now and explore all modules designed to make learning smarter, faster, and simpler.
        </p>
      </div>
    </div>
  );
};

export default HowItWorks;
