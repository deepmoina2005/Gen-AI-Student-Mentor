import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, X, Menu } from "lucide-react";
import SignIn from "../components/Auth/SignIn";
import SignUp from "../components/Auth/SignUp";

const Navbar = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("signin");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const user = false; // Replace with actual auth logic

  const openSignIn = () => {
    setAuthMode("signin");
    setIsModalOpen(true);
  };

  const openSignUp = () => {
    setAuthMode("signup");
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-lg shadow-sm">
        <div className="flex justify-between items-center px-4 sm:px-10 lg:px-20 py-3 transition-all duration-200">
          {/* Logo */}
          <img
            src="./vidyaai_logo.png"
            alt="logo"
            className="w-28 sm:w-40 cursor-pointer object-contain"
            onClick={() => navigate("/")}
          />

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
            {navLinks.map((link) => (
              <span
                key={link.name}
                onClick={() => navigate(link.path)}
                className="cursor-pointer hover:text-primary transition-colors duration-200"
              >
                {link.name}
              </span>
            ))}
          </nav>

          {/* Auth / Login Button */}
          {user ? (
            <UserButton />
          ) : (
            <button
              onClick={openSignIn}
              className="hidden sm:flex items-center gap-2 rounded-full text-sm bg-primary text-white px-6 py-2 hover:bg-primary/90 transition"
            >
              Login <ArrowRight className="w-4 h-4" />
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg border-t border-gray-100">
            <nav className="flex flex-col gap-4 p-4">
              {navLinks.map((link) => (
                <span
                  key={link.name}
                  onClick={() => {
                    navigate(link.path);
                    setIsMobileMenuOpen(false);
                  }}
                  className="cursor-pointer text-gray-700 hover:text-primary transition-colors duration-200"
                >
                  {link.name}
                </span>
              ))}
              <button
                onClick={() => {
                  openSignIn();
                  setIsMobileMenuOpen(false);
                }}
                className="mt-3 w-full py-2.5 rounded-full bg-primary text-white font-medium hover:bg-primary/90 transition"
              >
                Login
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[100] px-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-5 right-5 text-gray-500 hover:text-gray-700 transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content */}
            {authMode === "signin" ? (
              <>
                <SignIn />
                <p className="mt-4 text-center text-sm text-gray-500">
                  Don’t have an account?{" "}
                  <span
                    className="text-primary cursor-pointer underline"
                    onClick={() => setAuthMode("signup")}
                  >
                    Sign Up
                  </span>
                </p>
              </>
            ) : (
              <>
                <SignUp />
                <p className="mt-4 text-center text-sm text-gray-500">
                  Already have an account?{" "}
                  <span
                    className="text-primary cursor-pointer underline"
                    onClick={() => setAuthMode("signin")}
                  >
                    Sign In
                  </span>
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
