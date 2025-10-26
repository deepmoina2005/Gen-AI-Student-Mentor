import { useEffect } from "react";
import {
  Calendar,
  CheckCircle,
  BookOpen,
  MessageCircleQuestion,
  Users,
  Clock,
  TrendingUp,
  Award,
  Link,
  Edit2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDashboard } from "../context/DashboardContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { stats, modules, recentActivity, loading, getLearningData } =
    useDashboard();

  useEffect(() => {
    getLearningData();
  }, []);

  // Map module names to icons directly
  const iconMap = {
    "Exam Preparation": Edit2,
    "Learning Content": BookOpen,
    Resources: Link,
    "AI Career Counsellor": MessageCircleQuestion,
  };

  const StatCard = ({ label, value, icon: Icon, gradient }) => (
    <div className="flex justify-between items-center w-full p-4 sm:p-5 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="text-slate-600">
        <p className="text-xs sm:text-sm">{label}</p>
        <h2 className="text-xl sm:text-2xl font-semibold">{value}</h2>
      </div>
      <div
        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br ${gradient} flex justify-center items-center`}
      >
        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </div>
    </div>
  );

  const ModuleCard = ({ module }) => {
    const Icon = iconMap[module.name];

    return (
      <div
        onClick={() => navigate(module.route)}
        className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6 hover:shadow-lg transition-all cursor-pointer group"
      >
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <div
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${module.gradient} flex items-center justify-center group-hover:scale-110 transition-transform`}
          >
            <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
          </div>
        </div>
        <h3 className="text-base sm:text-lg font-semibold text-slate-800 mb-1 sm:mb-2">
          {module.name}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600">
          {module.description}
        </p>
      </div>
    );
  };

  const ActivityItem = ({ item }) => {
    const getTypeColor = (type) => {
      switch (type) {
        case "study":
          return "bg-blue-100 text-blue-700";
        case "attendance":
          return "bg-green-100 text-green-700";
        case "resource":
          return "bg-purple-100 text-purple-700";
        case "doubt":
          return "bg-orange-100 text-orange-700";
        default:
          return "bg-gray-100 text-gray-700";
      }
    };

    return (
      <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-all">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-slate-800">{item.title}</h3>
          <div className="flex flex-wrap items-center gap-2 mt-1">
            <p className="text-xs text-slate-500">
              {new Date(item.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </p>
            <span className="text-xs text-slate-400">•</span>
            <p className="text-xs text-slate-500">{item.module}</p>
          </div>
        </div>
        <span
          className={`text-xs font-medium px-3 py-1 rounded-full ${getTypeColor(
            item.type
          )}`}
        >
          {item.type}
        </span>
      </div>
    );
  };

  return (
    <div className="h-full overflow-y-auto p-4 sm:p-6 bg-gray-50">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-800">
          Dashboard
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Manage your studies, attendance, resources, and doubts
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-80 sm:h-96">
          <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-4 border-emerald-500 border-t-transparent"></div>
        </div>
      ) : (
        <>
          {/* Quick Stats */}
          <div className="grid grid-cols-1 max-sm:grid-cols-3 lg:grid-cols-3 gap-4 mb-8">
            <StatCard
              label="Study Hours (This Month)"
              value={stats.totalStudyHours}
              icon={Clock}
              gradient="from-blue-400 to-blue-600"
            />
            <StatCard
              label="Attendance Rate"
              value={`${stats.attendanceRate}%`}
              icon={TrendingUp}
              gradient="from-green-400 to-green-600"
            />
            <StatCard
              label="Current Streak"
              value={`${stats.currentStreak} days`}
              icon={Award}
              gradient="from-purple-400 to-purple-600"
            />
          </div>

          {/* Learning Modules */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">
              Learning Modules
            </h2>
            <div className="grid grid-cols-1 max-sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {modules.map((module) => (
                <ModuleCard key={module.id} module={module} />
              ))}
            </div>
          </div>

          {/* Additional Stats Row */}
          <div className="grid grid-cols-1 max-sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                  <MessageCircleQuestion className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Doubts Resolved</p>
                  <p className="text-lg sm:text-xl font-bold text-slate-800">
                    {stats.doubtsResolved}
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-600">Keep asking questions!</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Resources Accessed</p>
                  <p className="text-lg sm:text-xl font-bold text-slate-800">
                    {stats.resourcesAccessed}
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-600">Great learning progress!</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Upcoming Tasks</p>
                  <p className="text-lg sm:text-xl font-bold text-slate-800">
                    {stats.upcomingTasks.length} tasks
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-600">Stay organized!</p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">
              Recent Activity
            </h2>
            <div className="space-y-3">
              {recentActivity.map((item) => (
                <ActivityItem key={item.id} item={item} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
