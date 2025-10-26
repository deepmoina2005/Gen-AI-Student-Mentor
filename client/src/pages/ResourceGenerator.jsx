import { BookOpen, Sparkles, ExternalLink } from "lucide-react";
import { useState } from "react";
import { useDashboard } from "../context/DashboardContext";
import axios from "axios";

const ResourceGenerator = () => {
  const { addActivity } = useDashboard();
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [resources, setResources] = useState(null);

  const onSubmitHandler = async () => {
    if (!topic.trim()) return;
    setLoading(true);

    try {
      const response = await axios.get("http://localhost:4000/api/resource/get-resource", {
        params: { topic }
      });

      const generatedResources = response.data;

      // Ensure results array exists
      if (!generatedResources.results) generatedResources.results = [];

      setResources(generatedResources);

      // Update dashboard activity
      addActivity({
        id: Date.now(),
        title: `Accessed resources for ${topic}`,
        type: "resource",
        date: new Date().toISOString(),
        module: "Resources",
        count: generatedResources.results.length
      });

    } catch (error) {
      console.error("Error fetching resources:", error);
      alert("Failed to fetch resources. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700">

      {/* Left column - Topic input */}
      <div className="w-full max-w-lg p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <Sparkles className="w-6 text-purple-600" />
          <h1 className="text-xl font-semibold">Resource Finder</h1>
        </div>

        <div className="space-y-5">
          <div>
            <label className="text-sm font-medium block mb-2">Topic / Subject</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full p-2.5 px-3 outline-none text-sm rounded-md border border-gray-300 focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
              placeholder="e.g., React Hooks, Linear Algebra, Photosynthesis"
            />
          </div>
        </div>

        <button
          onClick={onSubmitHandler}
          disabled={loading || !topic.trim()}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2.5 mt-6 text-sm rounded-lg cursor-pointer hover:from-purple-600 hover:to-purple-700 transition-all disabled:opacity-50"
        >
          {loading ? (
            <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
          ) : (
            <BookOpen className="w-5" />
          )}
          Find Resources
        </button>
      </div>

      {/* Right column - Results */}
      <div className="flex-1 min-w-[500px] p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-purple-600" />
            <h1 className="text-xl font-semibold">Available Resources</h1>
          </div>
          {resources && (
            <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium">
              {resources.totalFound} found
            </span>
          )}
        </div>

        {!resources ? (
          <div className="flex justify-center items-center min-h-[24rem]">
            <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
              <BookOpen className="w-12 h-12" />
              <p className="text-center">Enter a topic and click "Find Resources"<br />to discover learning materials</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h3 className="font-semibold text-purple-900 mb-1">
                Resources for: {resources.topic}
              </h3>
              <p className="text-xs text-purple-700">
                Found {resources.totalFound} relevant resources
              </p>
            </div>

            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
              {resources.results.map((resource) => (
                <div
                  key={resource.id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-slate-800 mb-1">{resource.title}</h3>
                      <p className="text-xs text-slate-600 mb-2">{resource.description}</p>
                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span>By {resource.author}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-3">
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 text-xs bg-purple-50 text-purple-700 px-3 py-2 rounded-md hover:bg-purple-100 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      View Resource
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourceGenerator;
