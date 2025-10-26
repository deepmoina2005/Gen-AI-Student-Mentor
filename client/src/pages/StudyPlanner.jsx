import { Calendar, Clock, BookOpen, CheckCircle, Target } from "lucide-react";
import { useState } from "react";
import { useDashboard } from "../context/DashboardContext"; // import context

const StudyPlanner = () => {
  const [topic, setTopic] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [studyPlan, setStudyPlan] = useState(null);

  const { addActivity } = useDashboard(); // get addActivity from context

  const onSubmitHandler = () => {
    if (!topic || !date || !time) return;
    setLoading(true);

    // Simulate AI API call
    setTimeout(() => {
      const generatedPlan = {
        topic: topic,
        date: date,
        time: time,
        duration: "2 hours",
        breakdown: [
          {
            id: 1,
            phase: "Introduction & Overview",
            duration: "20 minutes",
            description: `Get familiar with the basics of ${topic}. Review fundamental concepts and terminology.`,
            activities: [
              "Read introductory material",
              "Watch overview video",
              "Note down key terms"
            ]
          },
          {
            id: 2,
            phase: "Deep Dive & Learning",
            duration: "45 minutes",
            description: "Focus on core concepts and detailed understanding.",
            activities: [
              "Study main concepts thoroughly",
              "Work through examples",
              "Create mind maps or notes",
              "Highlight important points"
            ]
          },
          {
            id: 3,
            phase: "Practice & Application",
            duration: "30 minutes",
            description: "Apply what you've learned through exercises.",
            activities: [
              "Solve practice problems",
              "Work on exercises",
              "Apply concepts to real scenarios"
            ]
          },
          {
            id: 4,
            phase: "Review & Assessment",
            duration: "25 minutes",
            description: "Reinforce learning and identify gaps.",
            activities: [
              "Review notes and key concepts",
              "Self-quiz on important topics",
              "Identify areas needing more work",
              "Plan follow-up study session"
            ]
          }
        ],
        tips: [
          "Take a 5-minute break between each phase",
          "Keep all study materials ready before starting",
          "Eliminate distractions during study time",
          "Stay hydrated and maintain good posture"
        ]
      };

      setStudyPlan(generatedPlan);
      setLoading(false);

      // Add to upcoming tasks in context
      addActivity({
        id: Date.now(), // unique id
        title: `Study: ${generatedPlan.topic}`,
        type: "study",
        date: generatedPlan.date,
        module: "Study Planner"
      });
    }, 1500);
  };

  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700">
      {/* Left col - Input Form */}
      <div className="w-full max-w-lg p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <Calendar className="w-6 text-blue-600" />
          <h1 className="text-xl font-semibold">Study Session Planner</h1>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium block mb-2">Study Topic</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full p-2.5 px-3 outline-none text-sm rounded-md border border-gray-300 focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
              placeholder="e.g., React Hooks, Calculus, Photosynthesis"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium block mb-2">Study Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2.5 px-3 outline-none text-sm rounded-md border border-gray-300 focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium block mb-2">Start Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full p-2.5 px-3 outline-none text-sm rounded-md border border-gray-300 focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
              required
            />
          </div>
        </div>

        <button
          disabled={loading}
          onClick={onSubmitHandler}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2.5 mt-6 text-sm rounded-lg cursor-pointer hover:from-blue-600 hover:to-blue-700 transition-all disabled:opacity-50"
        >
          {loading ? (
            <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
          ) : (
            <Target className="w-5" />
          )}
          Generate Study Plan
        </button>
      </div>

      {/* Right Col - Generated Plan */}
      <div className="w-full max-w-2xl p-6 bg-white rounded-lg border border-gray-200 shadow-sm min-h-96">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="w-5 h-5 text-blue-600" />
          <h1 className="text-xl font-semibold">Your Study Plan</h1>
        </div>

        {!studyPlan ? (
          <div className="flex-1 flex justify-center items-center min-h-80">
            <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
              <Calendar className="w-12 h-12" />
              <p className="text-center">
                Enter your study details and click<br />"Generate Study Plan" to get started
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Plan Header */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
              <h2 className="text-lg font-semibold text-blue-900 mb-2">{studyPlan.topic}</h2>
              <div className="flex flex-wrap gap-4 text-sm text-blue-700">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(studyPlan.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{studyPlan.time} ({studyPlan.duration})</span>
                </div>
              </div>
            </div>

            {/* Study Phases */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-700">Study Breakdown</h3>
              {studyPlan.breakdown.map((phase, index) => (
                <div key={phase.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-sm font-semibold text-blue-600">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-semibold text-slate-800">{phase.phase}</h4>
                        <span className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded">{phase.duration}</span>
                      </div>
                      <p className="text-sm text-slate-600 mb-3">{phase.description}</p>
                      <ul className="space-y-1.5">
                        {phase.activities.map((activity, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                            <CheckCircle className="w-3.5 h-3.5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Study Tips */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-yellow-900 mb-3 flex items-center gap-2">
                <Target className="w-4 h-4" />
                Study Tips
              </h3>
              <ul className="space-y-2">
                {studyPlan.tips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-yellow-800">
                    <span className="text-yellow-600 font-bold mt-0.5">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyPlanner;
