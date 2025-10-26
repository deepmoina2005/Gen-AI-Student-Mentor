// src/pages/ExamTack.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getExamById, checkAnswers, clearExamState } from "../redux/slice/testSlice";
import { v4 as uuidv4 } from "uuid";

const ExamTack = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { selectedExam = null, loading, error, results } = useSelector(
    (state) => state.test || {}
  );

  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [examSubmitted, setExamSubmitted] = useState(false);

  useEffect(() => {
    if (id) dispatch(getExamById(id));
    return () => dispatch(clearExamState());
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedExam && selectedExam._id === id) {
      const total = selectedExam.mcqs?.length || 0;
      setAnswers(Array(total).fill(""));
      setTimeLeft((selectedExam.timeMinutes || 15) * 60);
    }
  }, [selectedExam, id]);

  useEffect(() => {
    if (!timeLeft || examSubmitted) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, examSubmitted]);

  const handleAnswerChange = (index, value) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  const handleFinish = async () => {
    if (!selectedExam?._id) return;
    setExamSubmitted(true);
    await dispatch(checkAnswers({ examId: selectedExam._id, userAnswers: answers }));
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  if (loading) return <p className="p-6 text-center">Loading exam...</p>;
  if (error) return <p className="p-6 text-red-500 text-center">{error}</p>;
  if (!selectedExam) return null;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2">
        <h2 className="text-3xl font-semibold text-gray-900">{selectedExam.title}</h2>
        {!examSubmitted && (
          <span className="text-lg font-medium text-gray-700">Time Left: {formatTime(timeLeft)}</span>
        )}
      </div>

      {selectedExam.mcqs?.length === 0 && <p className="text-gray-500 text-center">No questions available.</p>}

      <div className="grid sm:grid-cols-2 gap-6">
        {selectedExam.mcqs?.map((q, idx) => {
          const userAns = answers[idx];
          const result = results?.[idx]; // from API
          const correctAns = result?.correctAnswer || q.answer;
          const isCorrect = result?.isCorrect;

          return (
            <div
              key={q._id || uuidv4()}
              className={`bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition-all ${
                examSubmitted ? (isCorrect ? "border-green-500" : "border-red-400") : "border-gray-200"
              }`}
            >
              <p className="font-medium text-gray-800 mb-2">Q{idx + 1}: {q.question}</p>

              <div className="flex flex-col gap-2 ml-2">
                {q.options.map((opt, oIdx) => {
                  let bgColor = "";
                  if (examSubmitted) {
                    if (opt === correctAns && opt === userAns) bgColor = "bg-green-300 text-white";
                    else if (opt === correctAns) bgColor = "bg-green-100";
                    else if (opt === userAns && userAns !== correctAns) bgColor = "bg-red-300 text-white";
                  }

                  return (
                    <label
                      key={oIdx}
                      className={`flex items-center gap-3 cursor-pointer rounded px-2 py-1 transition ${bgColor} ${!examSubmitted ? "hover:bg-gray-50" : ""}`}
                    >
                      <input
                        type="radio"
                        name={`q${idx}`}
                        value={opt}
                        checked={answers[idx] === opt}
                        disabled={examSubmitted}
                        className="accent-indigo-500"
                        onChange={() => handleAnswerChange(idx, opt)}
                      />
                      <span className="text-gray-700">{opt}</span>
                    </label>
                  );
                })}
              </div>

              {examSubmitted && (
                <div className="mt-2 text-sm">
                  <p>✅ Correct Answer: <span className="font-semibold text-green-600">{correctAns}</span></p>
                  <p>🧍‍♂️ Your Answer: <span className={`font-semibold ${isCorrect ? "text-green-600" : "text-red-600"}`}>{userAns || "Not Answered"}</span></p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {!examSubmitted && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleFinish}
            disabled={timeLeft === 0}
            className="px-8 py-3 bg-indigo-500 text-white font-medium rounded-xl hover:bg-indigo-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Finish Exam
          </button>
        </div>
      )}
    </div>
  );
};

export default ExamTack;
