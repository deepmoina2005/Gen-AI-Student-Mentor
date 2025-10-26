import React from "react";
import { useNavigate } from "react-router-dom";
import { FileText, ArrowRight } from "lucide-react";

const LearningCard = ({ id, topic, summary, author }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/workspace/${id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md border border-gray-200 cursor-pointer transition-transform transform hover:-translate-y-1 duration-200 flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center gap-2 mb-2">
          <FileText className="w-5 h-5 text-indigo-600" />
          <h2 className="text-gray-900 font-semibold text-lg line-clamp-1">
            {topic}
          </h2>
        </div>
        <p className="text-gray-600 text-sm line-clamp-3">
          {summary || "No summary available"}
        </p>
      </div>

      <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
        <span>{author || "AI Generated"}</span>
        <ArrowRight className="w-4 h-4 text-indigo-600" />
      </div>
    </div>
  );
};

export default LearningCard;
