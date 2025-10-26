import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/slice/authSlice";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";

export default function SignUp() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(registerUser(formData)).unwrap();
      toast.success("Registration successful");
      setFormData({ name: "", email: "", password: "" });
    } catch (err) {
      toast.error(err?.message || "Registration failed");
    }
  };

  return (
    <div className="w-full max-w-sm rounded-lg p-4 mx-auto">
      <h1 className="text-2xl font-semibold text-center mb-4">Create Account</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm text-gray-400 mb-1">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your Full Name"
            className="w-full px-3 py-2 rounded border border-gray-300 bg-slate-100 text-gray-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm text-gray-400 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="name@example.com"
            className="w-full px-3 py-2 rounded border border-gray-300 bg-slate-100 text-gray-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm text-gray-400 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-3 py-2 rounded border border-gray-300 bg-slate-100 text-gray-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 rounded bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Account"}
        </button>
      </form>

      <div className="my-4 relative text-center">
        <span className="bg-gray-50 px-3 text-gray-400 z-10 relative">Or continue with</span>
        <div className="absolute top-1/2 left-0 h-px w-2/5 bg-gray-300 transform -translate-y-1/2"></div>
        <div className="absolute top-1/2 right-0 h-px w-2/5 bg-gray-300 transform -translate-y-1/2"></div>
      </div>

      <button className="flex items-center justify-center gap-2 w-full py-2 rounded bg-gray-800 text-gray-300 hover:bg-gray-900 transition">
        <FcGoogle className="w-5 h-5" /> Sign up with Google
      </button>
    </div>
  );
}
