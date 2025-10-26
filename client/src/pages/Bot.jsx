import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paperclip, Send, Loader2, X } from "lucide-react";
import {
  createBotSession,
  chatWithPDF,
  addUserMessage,
  clearDoubtState,
  uploadPDF
} from "../redux/slice/doubtSlice";

export default function Bot({ loggedInUser }) {
  const dispatch = useDispatch();
  const { currentSession, chats, loading, error } = useSelector((state) => state.doubt);

  const [pdfFile, setPdfFile] = useState(null);
  const [topic, setTopic] = useState("");
  const [input, setInput] = useState("");

  // Upload PDF and create bot session
  const handlePDFUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== "application/pdf") return alert("Please upload a valid PDF");
    if (!topic.trim()) return alert("Please enter a topic");

    setPdfFile(file);

    try {
      // 1️⃣ Upload PDF
      const pdfRes = await dispatch(uploadPDF({ file, userId: loggedInUser._id })).unwrap();
      const pdfId = pdfRes._id || pdfRes.id;
      if (!pdfId) throw new Error("PDF ID not returned");

      // 2️⃣ Create bot session
      await dispatch(
        createBotSession({
          userId: loggedInUser._id,
          pdfId,
          topic,
          description: "",
        })
      ).unwrap();
    } catch (err) {
      console.error("Error uploading PDF / creating bot session:", err);
      alert(err?.message || "Failed to upload PDF or create session");
      setPdfFile(null);
    }
  };

  // Send user message
  const handleSend = async () => {
    if (!input.trim() || !currentSession) return;
    try {
      dispatch(addUserMessage(input));
      await dispatch(chatWithPDF({ botId: currentSession._id, userMessage: input })).unwrap();
      setInput("");
    } catch (err) {
      console.error("Chat Error:", err);
      alert(err?.message || "Failed to send message");
    }
  };

  const handleRemovePDF = () => {
    setPdfFile(null);
    setTopic("");
    setInput("");
    dispatch(clearDoubtState());
  };

  return (
    <div className="flex flex-col items-center w-full h-screen bg-gray-50 p-4 sm:p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">📄 Chat with your PDF</h2>

      {/* PDF Upload / Info */}
      {!pdfFile ? (
        <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl py-10 cursor-pointer hover:bg-gray-100 transition w-full max-w-md mx-auto">
          <Paperclip className="w-8 h-8 text-gray-500 mb-2" />
          <span className="text-gray-600 font-medium mb-2">Click to upload a PDF</span>
          <input type="file" accept="application/pdf" className="hidden" onChange={handlePDFUpload} />
          <input
            type="text"
            placeholder="Enter topic for this PDF"
            className="mt-2 border rounded p-1 w-full text-sm"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </label>
      ) : (
        <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-3 shadow-sm max-w-md mx-auto mb-6">
          <div>
            <p className="text-sm font-medium text-gray-700">{pdfFile.name}</p>
            <p className="text-xs text-gray-500">Topic: {topic}</p>
          </div>
          <button onClick={handleRemovePDF} className="text-red-500 text-sm hover:underline">
            Remove
          </button>
        </div>
      )}

      {/* Chat Area */}
      {pdfFile && currentSession && (
        <div className="flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm max-w-2xl w-full h-[70vh]">
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {chats.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`px-4 py-2 rounded-2xl max-w-[75%] text-sm ${
                    msg.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {msg.message}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex items-center border-t border-gray-200 px-3 py-2 bg-gray-50">
            <div className="flex items-center border pl-4 gap-2 border-gray-400/30 h-[46px] rounded-full overflow-hidden w-full">
              <input
                type="text"
                placeholder="Ask something about your PDF..."
                className="w-full h-full outline-none text-gray-700 bg-transparent placeholder-gray-500 text-sm"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                disabled={loading}
              />
            </div>
            <button
              onClick={handleSend}
              className="ml-2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition disabled:opacity-70"
              disabled={loading}
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </button>
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mt-4 text-red-600 bg-red-100 px-4 py-2 rounded-md max-w-md">
          {typeof error === "string" ? error : error.message || "Something went wrong"}
        </div>
      )}
    </div>
  );
}
