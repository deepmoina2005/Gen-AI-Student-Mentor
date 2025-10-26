import { createContext, useContext, useEffect, useState } from "react";

// Create Context
const DashboardContext = createContext();

// Provider
export const DashboardProvider = ({ children }) => {
  const [stats, setStats] = useState({
    totalStudyHours: 12,
    attendanceRate: 95.8,
    resourcesAccessed: 8,
    doubtsResolved: 2,
    upcomingTasks: [],
    currentStreak: 5,
  });

  const [modules, setModules] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  const learningModules = [
    {
      id: 1,
      name: "Exam Preparation",
      description: "Plan and organize your study schedule",
      gradient: "from-blue-400 to-blue-600",
      route: "/exam",
    },
    {
      id: 2,
      name: "Learning Content",
      description: "Track your class and study attendance",
      gradient: "from-green-400 to-green-600",
      route: "/learning",
    },
    {
      id: 3,
      name: "Resources",
      description: "Access learning materials and notes",
      gradient: "from-purple-400 to-purple-600",
      route: "/notes",
    },
    {
      id: 4,
      name: "AI Career Counsellor",
      description: "Get your doubts resolved instantly",
      gradient: "from-orange-400 to-orange-600",
      route: "/career",
    },
  ];

  const simulatedActivity = [
    {
      id: 1,
      title: "Completed study session: Mathematics",
      type: "study",
      date: "2025-10-21",
      module: "Study Planner",
    },
    {
      id: 2,
      title: "Marked present: Physics Lab",
      type: "attendance",
      date: "2025-10-21",
      module: "Attendance Tracker",
    },
    {
      id: 3,
      title: "Downloaded: Data Structures Notes",
      type: "resource",
      date: "2025-10-20",
      module: "Resources",
    },
  ];

  // Simulated data fetching
  const getLearningData = () => {
    setLoading(true);
    setTimeout(() => {
      setModules(learningModules);
      setRecentActivity(simulatedActivity);
      setLoading(false);
    }, 1000);
  };

  // Function to add a new activity and/or upcoming task
  const addActivity = (activity) => {
  setRecentActivity((prev) => [activity, ...prev]);

  // Add to upcoming tasks if it's a study session or task
  if (activity.type === "study" || activity.type === "task") {
    setStats((prevStats) => ({
      ...prevStats,
      upcomingTasks: [
        ...prevStats.upcomingTasks,
        {
          id: activity.id,
          title: activity.title,
          date: activity.date,
          module: activity.module,
        },
      ],
    }));
  }

  // Increment resourcesAccessed if it's a resource
  if (activity.type === "resource") {
    setStats((prevStats) => ({
      ...prevStats,
      resourcesAccessed: prevStats.resourcesAccessed + (activity.count || 1), // default +1
    }));
  }
};

  // Optional: Function to remove a task once completed
  const removeUpcomingTask = (taskId) => {
    setStats((prevStats) => ({
      ...prevStats,
      upcomingTasks: prevStats.upcomingTasks.filter((task) => task.id !== taskId),
    }));
  };

  useEffect(() => {
    getLearningData();
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        stats,
        modules,
        recentActivity,
        loading,
        setStats,
        setModules,
        addActivity,
        removeUpcomingTask,
        getLearningData,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

// Custom hook
export const useDashboard = () => useContext(DashboardContext);
