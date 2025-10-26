import { MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";

const GeneratedExamCard = ({ exam, onAttend }) => {
  const navigate = useNavigate();

  const examId = exam._id || exam.id;
  const examTitle = exam.title || "Untitled Exam";
  const examDate = exam.date ? new Date(exam.date).toLocaleDateString() : "N/A";
  const examLevel = exam.level || "Easy";

  const handleAttendClick = (e) => {
    e.stopPropagation();
    if (onAttend) onAttend(examId);
    else navigate(`/take-exam/${examId}`);
  };

  return (
    <div
      onClick={() => navigate(`/take-exam/${examId}`)}
      className="cursor-pointer bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all w-72 overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-indigo-50">
        <div className="flex items-center gap-3">
          <div className="bg-white p-2 rounded-full border border-gray-200 flex items-center justify-center">
            <img
              className="h-10 w-10 object-contain"
              src={exam.pdfUrl || "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/dummyLogo/dummyFavicon.svg"}
              alt="exam icon"
            />
          </div>
          <p className="text-lg font-medium text-gray-800">{examTitle}</p>
        </div>
        <button type="button" aria-label="more options" onClick={(e) => e.stopPropagation()}>
          <MoreHorizontal className="w-5 h-5 text-gray-500 hover:text-gray-700 transition" />
        </button>
      </div>

      {/* Body */}
      <div className="px-4 py-3 flex flex-col gap-2">
        <div className="flex justify-between text-gray-600">
          <span className="font-medium">Date:</span>
          <span>{examDate}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span className="font-medium">Level:</span>
          <span>{examLevel}</span>
        </div>

        <button
          onClick={handleAttendClick}
          className="mt-3 w-full py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition font-medium"
        >
          Attend Exam
        </button>
      </div>
    </div>
  );
};

export default GeneratedExamCard;