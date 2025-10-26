import React, { useState, useEffect } from "react";
import {
  BookText,
  ListChecks,
  HelpCircle,
  FileText,
  Link,
  ChevronDown,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getLearningContentById,
  clearContentState,
  askQuestion,
} from "../redux/slice/learningSlice";

export default function Workspace() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { content, loading, error, questionAnswer } = useSelector(
    (state) => state.learning
  );

  const [selectedTab, setSelectedTab] = useState(
    localStorage.getItem("workspaceTab") || "summary"
  );
  const [openIndex, setOpenIndex] = useState(null);
  const [question, setQuestion] = useState("");
  const [expandAll, setExpandAll] = useState(false);

  useEffect(() => {
    if (id) dispatch(getLearningContentById(id));
    return () => dispatch(clearContentState());
  }, [id, dispatch]);

  useEffect(() => {
    localStorage.setItem("workspaceTab", selectedTab);
  }, [selectedTab]);

  const handleAskQuestion = () => {
    if (!question.trim()) return;
    dispatch(askQuestion({ pdfId: id, userId: content.userId._id, question }));
    setQuestion("");
  };

  if (loading)
    return <p className="p-6 text-center text-gray-600">Loading...</p>;
  if (error)
    return <p className="p-6 text-center text-red-600">{error}</p>;
  if (!content)
    return <p className="p-6 text-center text-gray-600">No content found.</p>;

  const { topic, content: data } = content;

  const tabs = [
    { id: "summary", label: "Summary", icon: BookText },
    { id: "points", label: "Points", icon: ListChecks },
    { id: "questions", label: "Q&A", icon: HelpCircle },
    { id: "conclusion", label: "Conclusion", icon: FileText },
    { id: "resources", label: "Resources", icon: Link },
  ];

  const renderContent = () => {
    switch (selectedTab) {
      case "summary":
        return <p className="text-gray-700 leading-relaxed">{data?.summary}</p>;

      case "points":
        return data?.importantPoints?.length ? (
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {data.importantPoints.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No important points available.</p>
        );

      case "questions":
        return (
          <div className="space-y-4">
            {/* Expand/Collapse All */}
            {data.questions?.length > 0 && (
              <button
                onClick={() => setExpandAll(!expandAll)}
                className="mb-2 px-3 py-1 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 transition"
              >
                {expandAll ? "Collapse All" : "Expand All"}
              </button>
            )}

            {/* Questions List */}
            {data?.questions?.length ? (
              data.questions.map((q, i) => (
                <div
                  key={i}
                  className="border border-gray-200 rounded-lg p-3 sm:p-4 cursor-pointer hover:shadow transition"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-gray-800">{q.question}</h3>
                    <ChevronDown
                      size={18}
                      className={`text-indigo-600 transition-transform ${
                        expandAll || openIndex === i ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  {(expandAll || openIndex === i) && (
                    <p className="mt-2 text-gray-600 text-sm">{q.answer}</p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500">No questions available.</p>
            )}

            {/* Ask a Question */}
            <div className="mt-4 flex flex-col gap-2">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask a question about this topic..."
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={handleAskQuestion}
                className="w-full py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition font-medium"
              >
                Ask
              </button>
              {questionAnswer && (
                <div className="mt-2 p-3 bg-gray-100 text-gray-700 rounded">
                  <strong>Answer:</strong> {questionAnswer}
                </div>
              )}
            </div>
          </div>
        );

      case "conclusion":
        return <p className="text-gray-700 leading-relaxed">{data?.conclusion}</p>;

      case "resources":
        return data?.resources?.length ? (
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {data.resources.map((r, i) => (
              <li key={i}>
                <a
                  href={r.link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 underline hover:text-indigo-800"
                >
                  {r.name || r}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No resources available.</p>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-10 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6 text-center md:text-left">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">
          {topic || "Workspace"}
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Review and learn your generated study materials.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center md:justify-start gap-2 bg-white p-2 rounded-xl border border-gray-200 shadow-sm">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setSelectedTab(id)}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 
              ${
                selectedTab === id
                  ? "bg-indigo-600 text-white"
                  : "text-gray-600 hover:bg-indigo-100 hover:text-indigo-700"
              }`}
          >
            <Icon size={16} />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="mt-6 bg-white p-4 sm:p-6 rounded-xl border border-gray-200 shadow-sm">
        {renderContent()}
      </div>
    </div>
  );
}
