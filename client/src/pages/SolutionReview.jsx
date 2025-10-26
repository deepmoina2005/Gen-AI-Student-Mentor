import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Send, Bot, User, BookOpen } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const SolutionChatbot = () => {
  const [userId] = useState("68fb9b77883c2c40e45236e8");
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([
    {
      role: "assistant",
      message:
        "👋 Hi! I’m your AI Study Assistant. Ask me questions about any topic — I’ll help you understand concepts quickly!",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage = { role: "user", message };
    setChat((prev) => [...prev, userMessage]);
    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:4000/api/solution/get-response", {
        userId,
        topic,
        message,
      });

      const botReply = {
        role: "assistant",
        message:
          res.data?.reply?.replace(/\*\*(.*?)\*\*/g, "**$1**") ||
          "⚠️ Sorry, I couldn’t generate a response. Please try again.",
      };
      setChat((prev) => [...prev, botReply]);
    } catch (err) {
      console.error("Error:", err);
      setChat((prev) => [
        ...prev,
        { role: "assistant", message: "❌ Failed to get a response. Try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col p-6 text-slate-700 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-4xl mx-auto flex flex-col h-[90vh] bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
        {/* Header */}
        <header className="flex items-center gap-3 p-4 border-b border-gray-200 bg-gradient-to-r from-blue-100 to-blue-200">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold">AI Study Assistant</h1>
            <p className="text-xs text-slate-600">Powered by Vidya.Ai • Gemini Model</p>
          </div>
          <div className="ml-auto">
            <input
              type="text"
              placeholder="Topic (optional)"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="border rounded-md px-3 py-1 text-sm focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
        </header>

        {/* Chat Section */}
        <main className="flex-1 overflow-y-auto p-4 space-y-5 bg-white">
          {chat.map((msg, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${
                  msg.role === "assistant"
                    ? "bg-gradient-to-br from-blue-500 to-blue-700"
                    : "bg-gradient-to-br from-gray-400 to-gray-600"
                }`}
              >
                {msg.role === "assistant" ? (
                  <Bot className="w-4 h-4 text-white" />
                ) : (
                  <User className="w-4 h-4 text-white" />
                )}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-2xl flex flex-col ${
                  msg.role === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`px-4 py-3 rounded-2xl shadow-sm text-sm whitespace-pre-wrap ${
                    msg.role === "assistant"
                      ? "bg-gray-100 text-slate-800"
                      : "bg-gradient-to-r from-blue-600 to-blue-700 text-white"
                  }`}
                >
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      strong: ({ children }) => (
                        <strong className="font-semibold">{children}</strong>
                      ),
                      code: ({ children }) => (
                        <code className="bg-gray-200 text-rose-600 px-1 py-0.5 rounded text-xs font-mono">
                          {children}
                        </code>
                      ),
                      ul: ({ children }) => <ul className="list-disc ml-5">{children}</ul>,
                      ol: ({ children }) => <ol className="list-decimal ml-5">{children}</ol>,
                      p: ({ children }) => <p className="mb-2">{children}</p>,
                    }}
                  >
                    {msg.message}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          ))}

          {/* Loading indicator */}
          {loading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-gray-100 px-4 py-3 rounded-2xl">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                  <span
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></span>
                  <span
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></span>
                </div>
              </div>
            </div>
          )}

          <div ref={chatEndRef}></div>
        </main>

        {/* Input Area */}
        <footer className="p-4 border-t border-gray-200 bg-gray-50">
          <form
            onSubmit={sendMessage}
            className="flex items-center gap-2 max-w-3xl mx-auto"
          >
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your question..."
              className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button
              type="submit"
              disabled={loading}
              className="p-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full hover:from-blue-700 hover:to-blue-800 transition disabled:opacity-50"
            >
              <Send size={20} />
            </button>
          </form>
          <p className="text-xs text-center text-gray-400 mt-2">
            ⚡ AI Study Assistant • Powered by Gemini AI
          </p>
        </footer>
      </div>
    </div>
  );
};

export default SolutionChatbot;
