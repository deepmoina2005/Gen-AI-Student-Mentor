import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import GeneratedExamCard from "../components/Exam/GeneratedExamCard";
import { createExam, uploadPDF, getUserExams, clearExamState } from "../redux/slice/testSlice";
import { getProfile } from "../redux/slice/authSlice";

const Exam = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { exams, loading, error } = useSelector((state) => state.test);
  const { user } = useSelector((state) => state.auth);
  const userId = user?._id;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [level, setLevel] = useState("Easy");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (userId) dispatch(getUserExams(userId));
    dispatch(getProfile());
    return () => dispatch(clearExamState());
  }, [dispatch, userId]);

  const handleAddExam = async (e) => {
    e.preventDefault();
    if (!title || !file || !userId) return alert("Please provide all required fields");
    try {
      const uploaded = await dispatch(uploadPDF({ file, userId })).unwrap();
      const pdfId = uploaded._id || uploaded.id;
      await dispatch(createExam({ userId, title, pdfId, level })).unwrap();
      setSuccessMsg("Exam added successfully!");
      setTimeout(() => setIsModalOpen(false), 1500);
      dispatch(getUserExams(userId));
    } catch (err) {
      alert(err?.message || "Failed to add exam");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 p-6 overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Exam Module</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Add New Exam
        </button>
      </div>

      {successMsg && <p className="text-green-600 font-medium mb-4">{successMsg}</p>}
      {loading && <p className="text-gray-500 mb-4">Loading...</p>}
      {error && <p className="text-red-600 mb-4">{typeof error === "string" ? error : error.error}</p>}

      {/* Exam Cards */}
      {exams.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">No exams found. Add a new exam to start.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {exams.map((exam) => (
            <GeneratedExamCard
              key={exam._id}
              exam={exam}
              onAttend={() => navigate(`/take-exam/${exam._id}`)}
            />
          ))}
        </div>
      )}

      {/* Add Exam Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-xl p-6 relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-semibold text-center mb-4">Add New Exam</h2>
            <form onSubmit={handleAddExam} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Exam Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                required
              />

              <label className="border-2 border-dashed p-6 text-center cursor-pointer rounded hover:border-blue-400 transition">
                {file ? file.name : "Drag files here or click to upload"}
                <input type="file" className="hidden" onChange={(e) => setFile(e.target.files[0])} required />
              </label>

              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              >
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>

              <div className="flex justify-end gap-3 mt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2 border rounded hover:bg-gray-100 transition">
                  Cancel
                </button>
                <button type="submit" disabled={loading} className={`px-6 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition ${loading ? "opacity-60 cursor-not-allowed" : ""}`}>
                  {loading ? "Processing..." : "Add Exam"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Exam;