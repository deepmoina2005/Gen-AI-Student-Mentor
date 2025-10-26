/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import {
  BookOpen,
  Bot,
  Edit2,
  Home,
  Link,
  LogOut,
  Mail,
  Users,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, logoutUser } from "../redux/slice/authSlice";
import toast from "react-hot-toast";

const navItems = [
  { to: "/app", label: "Dashboard", Icon: Home },
  { to: "/learning", label: "Learning", Icon: BookOpen },
  { to: "/exam", label: "Exams", Icon: Edit2 },
  { to: "/bot", label: "Doubt slover", Icon: Bot },
  { to: "/career", label: "Career Insights", Icon: Users },
  { to: "/notes", label: "Resource Hub", Icon: Link },
];

const Sidebar = ({ sidebar, setSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);


  useEffect(() => {
    if (!user) dispatch(getProfile());
  }, [dispatch, user]);


  const handleLogout = async () => {
    await dispatch(logoutUser());
    toast.success("Logged out successfully!");
    navigate("/");
  };

  const firstLetter = user?.fullName
    ? user.fullName[0].toUpperCase()
    : user?.name
      ? user.name[0].toUpperCase()
      : "?";

  const displayName = user?.fullName || user?.name || "User";

  return (
    <aside
      className={`
    w-60 bg-white border-r border-gray-200 flex flex-col justify-between
    fixed top-0 left-0 bottom-0 z-50 transform transition-transform duration-300 ease-in-out
    sm:static sm:translate-x-0 sm:flex
    ${sidebar ? "translate-x-0" : "-translate-x-full"}
  `}
    >
      {/* Top - Navigation */}
      <div className="px-4 flex flex-col gap-4 mt-14 sm:mt-4">
        <nav className="flex flex-col gap-1">
          {navItems.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/app"}
              onClick={() => setSidebar(false)}
              className={({ isActive }) =>
                `px-4 py-2 flex items-center gap-3 rounded-lg transition ${isActive
                  ? "bg-gradient-to-r from-emerald-300 via-green-400 to-lime-400 text-white"
                  : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={`w-4 h-4 ${isActive ? "text-white" : "text-gray-600"}`}
                  />
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Bottom - User Initial & Logout */}
      <div className="w-full border-t border-gray-200 py-4 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white font-semibold">
            {firstLetter}
          </div>
          <div>
            <h1 className="text-sm font-medium">{displayName}</h1>
          </div>
        </div>
        <LogOut
          onClick={handleLogout}
          className="w-5 h-5 text-gray-400 hover:text-gray-700 cursor-pointer"
        />
      </div>
    </aside>

  );
};

export default Sidebar;
