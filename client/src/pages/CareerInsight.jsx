import { Send, Sparkles, Bot, User, Compass } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

const CareerCounsellor = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      text: "👋 Hi! I'm your AI Career Counsellor. Select a stream below or ask about your interests, and I’ll help guide your next career steps!",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const [options, setOptions] = useState([]);
  const [selectedStream, setSelectedStream] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch options from backend
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/career/options")
      .then((res) => setOptions(res.data.options || []))
      .catch((err) => console.error("Failed to fetch options:", err));
  }, []);

  const handleStreamSubmit = async () => {
    if (!selectedStream) return;

    const userMessage = {
      id: messages.length + 1,
      type: "user",
      text: selectedStream,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:4000/api/career/scope", {
        stream: selectedStream,
      });

      const botMessage = {
        id: messages.length + 2,
        type: "bot",
        text: res.data.scope || "Sorry, no response available.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
      const botMessage = {
        id: messages.length + 2,
        type: "bot",
        text: "❌ Failed to fetch career info from the server.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botMessage]);
    }

    setLoading(false);
  };

  return (
    <div className="h-full flex flex-col p-6 text-slate-700">
      <div className="w-full max-w-4xl mx-auto flex flex-col h-full bg-white rounded-lg border border-gray-200 shadow-sm">
        {/* Header */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-200 bg-gradient-to-r from-emerald-50 to-emerald-100">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
            <Compass className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold">AI Career Counsellor</h1>
            <p className="text-xs text-slate-600">Your smart guide for academic & career planning</p>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.type === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.type === "bot"
                  ? "bg-gradient-to-br from-emerald-400 to-emerald-600"
                  : "bg-gradient-to-br from-blue-400 to-blue-600"
                  }`}
              >
                {message.type === "bot" ? <Bot className="w-4 h-4 text-white" /> : <User className="w-4 h-4 text-white" />}
              </div>

              {/* Message */}
              <div className={`max-w-2xl ${message.type === "user" ? "items-end" : "items-start"} flex flex-col`}>
                <div
                  className={`px-1 py-1 rounded-2xl ${message.type === "bot"
                    ? "bg-gray-100 text-slate-700"
                    : "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                    }`}
                >
                  <div className="px-4 py-3 rounded-2xl bg-gray-100 text-slate-700 text-sm whitespace-pre-wrap">
                    <ReactMarkdown>
                      {message.text}
                    </ReactMarkdown>
                  </div>
                </div>
                <span className="text-xs text-gray-400 mt-1 px-2">{message.timestamp}</span>
              </div>
            </div>
          ))}

          {/* Loading animation */}
          {loading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-gray-100 px-4 py-3 rounded-2xl">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Stream selection */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex gap-2 items-center mb-2">
            <select
              value={selectedStream}
              onChange={(e) => setSelectedStream(e.target.value)}
              className="flex-1 border p-2 rounded-lg outline-none"
            >
              <option value="">-- Select Stream --</option>
              {options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <button
              onClick={handleStreamSubmit}
              disabled={!selectedStream || loading}
              className="px-4 py-2 bg-gradient-to-r from-emerald-400 to-emerald-600 text-white rounded-lg hover:from-emerald-500 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-gray-500 flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            AI-powered career insights from Vidya.Ai.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CareerCounsellor;
