import React, { useState } from "react";
import { Search, X } from "lucide-react";

const ExamHeader = () => {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [level, setLevel] = useState("Easy");

  const handleGenerateExam = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, pdfFile, level }); // Replace with backend call
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center p-4 rounded-md gap-3">
        {/* Search */}
        <div className="flex items-center w-full sm:max-w-md border bg-white border-gray-300 rounded-md overflow-hidden">
          <Search className="w-5 h-5 text-gray-400 ml-2" />
          <input
            type="text"
            placeholder="Search exams..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-12 px-2 outline-none text-gray-600 placeholder-gray-400 text-sm sm:text-base"
          />
        </div>

        {/* Generate Exam Button */}
        <button
          onClick={handleGenerateExam}
          className="flex items-center justify-center w-full sm:w-auto bg-indigo-600 text-white px-4 py-2.5 rounded-md hover:bg-indigo-700 transition active:scale-95 text-sm sm:text-base"
        >
          Generate Exam
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-4 py-6 overflow-auto">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 sm:p-8 relative animate-fadeIn">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 text-gray-700"
            >
              <h2 className="text-2xl font-semibold text-center text-gray-800">
                Add New Exam
              </h2>

              {/* Exam Title */}
              <input
                type="text"
                placeholder="Exam Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm sm:text-base"
                required
              />

              {/* PDF Upload */}
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setPdfFile(e.target.files[0])}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm sm:text-base"
                required
              />

              {/* Exam Level */}
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm sm:text-base"
                required
              >
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-md font-medium transition active:scale-95 text-sm sm:text-base"
              >
                Add Exam
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ExamHeader;
