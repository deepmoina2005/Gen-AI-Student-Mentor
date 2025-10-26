import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { Menu, X } from "lucide-react";
import Sidebar from "../components/Sidebar";

const Layout = () => {
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);

  useEffect(() => {
    document.body.style.overflow = sidebar ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [sidebar]);

  return (
    <div className="flex flex-col h-screen overflow-hidden relative">
      <nav className="w-full px-6 h-14 flex items-center justify-between border-b border-gray-200 bg-white z-40">
        <img
          src="./vidyaai_logo.png"
          alt="logo"
          onClick={() => navigate("/")}
          className="cursor-pointer w-35 transition-all duration-300 hover:scale-105 h-9"
        />
        {sidebar ? (
          <X
            onClick={() => setSidebar(false)}
            className="w-6 h-6 text-gray-600 sm:hidden z-50"
          />
        ) : (
          <Menu
            onClick={() => setSidebar(true)}
            className="w-6 h-6 text-gray-600 sm:hidden z-100"
          />
        )}
      </nav>

      {/* Main Layout */}
      <div className="flex flex-1 w-full h-[calc(100vh-56px)] relative">
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
        <div className="flex-1 bg-[#F4F7FB] overflow-y-auto z-10">
          <Outlet />
        </div>
      </div>

      {/* Mobile Overlay */}
      {sidebar && (
        <div
          onClick={() => setSidebar(false)}
          className="fixed inset-0 bg-black/20 z-30 sm:hidden"
        />
        
      )}
    </div>
  );
};

export default Layout;
