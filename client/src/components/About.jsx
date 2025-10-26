import React from "react";
import { Brain, CalendarCheck, Users2, Sparkles } from "lucide-react";

const About = () => {
  return (
    <div className="px-4 sm:px-10 max-sm:mt-15 lg:px-20 xl:px-32 relative flex flex-col w-full justify-center bg-[url(/gradientBackground.png)] bg-cover bg-no-repeat min-h-screen py-16 sm:py-24">
      {/* Header Section */}
      <div className="text-center mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl 2xl:text-5xl font-semibold leading-tight">
          About <span className="text-primary">Vidya AI</span>
        </h1>
        <p className="mt-3 sm:mt-4 max-w-[90%] sm:max-w-lg lg:max-w-xl mx-auto text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed">
          Vidya AI is your intelligent learning companion designed to make
          education smarter, simpler, and more engaging. From AI study plans to
          real-time learning insights, we help students achieve their goals with
          clarity and confidence.
        </p>
      </div>

      {/* Features Cards */}
      <div className="flex flex-col sm:flex-row justify-center items-center sm:items-stretch gap-6 sm:gap-8 mt-6 sm:mt-10">
        {/* Card 1 */}
        <div className="bg-white/80 backdrop-blur-md shadow-md rounded-2xl p-5 sm:p-6 w-full sm:max-w-[260px] text-center hover:scale-105 transition-transform duration-300">
          <div className="flex justify-center mb-4 text-primary">
            <Brain className="h-10 w-10 sm:h-12 sm:w-12" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold mb-2 text-gray-800">
            Smarter Learning
          </h3>
          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
            Get personalized study tips and AI-driven insights that adapt to
            your unique learning style.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white/80 backdrop-blur-md shadow-md rounded-2xl p-5 sm:p-6 w-full sm:max-w-[260px] text-center hover:scale-105 transition-transform duration-300">
          <div className="flex justify-center mb-4 text-primary">
            <CalendarCheck className="h-10 w-10 sm:h-12 sm:w-12" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold mb-2 text-gray-800">
            Personalized Guidance
          </h3>
          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
            Stay on track with tailored study plans, reminders, and real-time
            progress tracking.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white/80 backdrop-blur-md shadow-md rounded-2xl p-5 sm:p-6 w-full sm:max-w-[260px] text-center hover:scale-105 transition-transform duration-300">
          <div className="flex justify-center mb-4 text-primary">
            <Users2 className="h-10 w-10 sm:h-12 sm:w-12" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold mb-2 text-gray-800">
            Learning Community
          </h3>
          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
            Connect with peers, exchange ideas, and grow together with a
            supportive student network.
          </p>
        </div>
      </div>

      {/* Footer Note */}
      <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mt-10 sm:mt-12 text-gray-600 text-xs sm:text-sm text-center">
        <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
        <span>
          Empowering{" "}
          <span className="font-medium text-gray-800">1000+ students</span> worldwide
        </span>
      </div>
    </div>
  );
};

export default About;
