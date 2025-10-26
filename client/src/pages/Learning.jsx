import React, { useState, useEffect } from "react";
import {
  X,
  BookOpen,
  PlusCircle,
  FileText,
  Upload,
  Brain,
  Loader2,
  BookMarked,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  uploadPDF,
  generateContent,
  getAllLearningContents,
  clearContentState,
} from "../redux/slice/learningSlice";
import { getProfile } from "../redux/slice/authSlice";
import LearningCard from "../components/LearningCard";

const Learning = () => {
  const dispatch = useDispatch();
  const { contents, loading, error } = useSelector((state) => state.learning);
  const { user } = useSelector((state) => state.auth);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [topic, setTopic] = useState("");
  const [file, setFile] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    dispatch(getProfile());
    dispatch(getAllLearningContents());
  }, [dispatch]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setTopic("");
    setFile(null);
    setSuccessMsg("");
    setIsModalOpen(false);
    dispatch(clearContentState());
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!topic || !file || !user?._id)
      return alert("Please provide a topic and upload a file.");

    try {
      const uploaded = await dispatch(
        uploadPDF({ file, userId: user._id })
      ).unwrap();

      await dispatch(
        generateContent({ pdfId: uploaded.id, userId: user._id, topic })
      ).unwrap();

      setSuccessMsg("✨ Content generated successfully!");
      setTimeout(() => closeModal(), 1500);
    } catch (err) {
      console.error(err);
      alert("Upload or content generation failed.");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-8">
          <div className="flex items-center gap-3">
            <BookOpen className="w-7 h-7 text-indigo-600" />
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">
              Learning Module
            </h1>
          </div>
          {contents?.length > 0 && (
            <button
              onClick={openModal}
              className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-lg hover:bg-indigo-700 shadow-md transition-all active:scale-95"
            >
              <PlusCircle className="w-5 h-5" />
              <span className="text-sm sm:text-base">Generate Guide</span>
            </button>
          )}
        </div>

        {/* Alerts */}
        {successMsg && (
          <div className="flex items-center gap-2 text-green-700 bg-green-100 px-4 py-2 rounded-md mb-4">
            <Brain className="w-5 h-5" />
            <p>{successMsg}</p>
          </div>
        )}
        {error && (
          <div className="flex items-center gap-2 text-red-600 bg-red-100 px-4 py-2 rounded-md mb-4">
            <FileText className="w-5 h-5" />
            <p>{typeof error === "string" ? error : error.error}</p>
          </div>
        )}

        {/* Content Section */}
        {contents?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center gap-4">
            <BookMarked className="w-14 h-14 text-gray-400" />
            <h2 className="text-xl font-medium text-gray-700">
              No content generated yet
            </h2>
            <p className="text-gray-500 mt-1 max-w-xs">
              Upload your notes or PDFs to generate personalized study material.
            </p>
            <button
              onClick={openModal}
              className="mt-2 flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 active:scale-95 transition"
            >
              <PlusCircle className="w-5 h-5" /> Generate Now
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {contents.map((c) => (
              <LearningCard
                key={c._id}
                id={c._id}
                topic={c.topic}
                summary={c.content?.summary}
                author={c.content?.author}
              />
            ))}
          </div>
        )}
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 sm:p-8 relative animate-fadeIn">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Header */}
            <div className="flex flex-col items-center mb-6 text-center">
              <Upload className="w-10 h-10 text-indigo-600 mb-2" />
              <h2 className="text-2xl font-semibold text-gray-800">
                Add New Learning Content
              </h2>
              <p className="text-gray-500 mt-1 text-sm">
                Upload your notes or PDFs to generate study guides.
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleUpload}
              className="flex flex-col gap-5"
              encType="multipart/form-data"
            >
              <input
                type="text"
                placeholder="Enter Topic Name"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition text-sm sm:text-base"
                required
              />

              <label
                htmlFor="fileInput"
                className="border-2 border-dashed border-gray-400 p-6 rounded-lg flex flex-col items-center justify-center text-center gap-2 cursor-pointer hover:border-indigo-500 transition bg-gray-50"
              >
                <FileText className="w-8 h-8 text-gray-500" />
                <p className="text-gray-600 font-medium text-sm sm:text-base">
                  Drag & Drop your file here
                </p>
                <p className="text-gray-400 text-xs sm:text-sm">
                  or <span className="text-indigo-500 underline">browse</span>
                </p>
                <input
                  id="fileInput"
                  type="file"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files[0])}
                  required
                />
              </label>

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 sm:px-5 py-2 border border-gray-400 bg-white text-gray-600 rounded-md hover:bg-gray-100 transition active:scale-95 text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`flex items-center justify-center gap-2 px-5 sm:px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 active:scale-95 transition text-sm sm:text-base ${
                    loading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> Processing...
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5" /> Upload & Generate
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Learning;
