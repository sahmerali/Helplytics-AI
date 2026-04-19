import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";

export default function CreateRequest() {
  const { token } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Frontend",
    urgency: "Medium",
    location: "Remote",
    requiredSkills: ""
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // AI Simulation States
  const [isImproving, setIsImproving] = useState(false);
  const [isCategorizing, setIsCategorizing] = useState(false);
  const [suggestedTags, setSuggestedTags] = useState(["React", "API", "Debugging", "Node.js", "Design"]);
  const [toast, setToast] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post("http://localhost:5000/api/projects", formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setToast("Request Posted Successfully! 🎉");
      setTimeout(() => {
        navigate("/dashboard/feed");
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create request.");
      setLoading(false);
    }
  };

  const handleImproveDescription = () => {
    if (!formData.description) return;
    setIsImproving(true);
    setTimeout(() => {
      setFormData({
        ...formData,
        description: `I am currently working on a feature that requires ${formData.title ? formData.title : 'advanced logic'}. However, I am encountering an unexpected issue where the implementation is not behaving as expected.\n\nCould someone with strong expertise in this area review my approach and help me identify the root cause? I am specifically looking for best practices or potential edge cases I might have missed.`
      });
      setIsImproving(false);
    }, 1500);
  };

  const handleAutoCategorize = () => {
    setIsCategorizing(true);
    setTimeout(() => {
      const fullText = (formData.title + " " + formData.description).toLowerCase();
      
      // 1. Context-Aware Categorization
      let newCategory = "Other";
      if (/(react|vue|angular|css|html|tailwind|frontend|ui\/ux|layout|responsive|button|color)/i.test(fullText)) {
        newCategory = "Frontend";
      } else if (/(node|express|api|database|mongo|sql|backend|server|endpoint|auth|jwt)/i.test(fullText)) {
        newCategory = "Backend";
      } else if (/(docker|aws|cloud|deploy|ci\/cd|pipeline|nginx|hosting)/i.test(fullText)) {
        newCategory = "DevOps";
      } else if (/(figma|design|mockup|prototype|wireframe|ux|typography)/i.test(fullText)) {
        newCategory = "Design";
      } else if (/(interview|resume|portfolio|career|job|internship|mentor)/i.test(fullText)) {
        newCategory = "Career";
      }
      
      // 2. Intelligent Urgency Detection
      let newUrgency = formData.urgency;
      if (/(urgent|asap|broken|emergency|prod down|production down|deadline|tomorrow|immediately|stuck|blocker)/i.test(fullText)) {
        newUrgency = "High";
      } else if (/(when you have time|low priority|review|feedback|sometime|no rush|mock|practice)/i.test(fullText)) {
        newUrgency = "Low";
      } else {
        newUrgency = "Medium";
      }

      // 3. Smart Tag Extraction (Noun/Tech extraction simulation)
      const knownTech = ["React", "API", "Debugging", "Node.js", "Design", "CSS", "AWS", "Docker", "Database", "Auth", "Figma", "HTML", "Interview Prep", "Career", "Portfolio", "Responsive"];
      const newTags = knownTech.filter(tag => fullText.includes(tag.toLowerCase()));
      // Ensure we have relevant tags
      const updatedTags = Array.from(new Set([...newTags])).slice(0, 5);
      if (updatedTags.length === 0) updatedTags.push("General Support");
      
      setSuggestedTags(updatedTags);
      setFormData({ ...formData, category: newCategory, urgency: newUrgency });
      setIsCategorizing(false);
      setToast("AI applied Contextual Categorization & Urgency! ✨");
      setTimeout(() => setToast(""), 3000);
    }, 1500);
  };

  const addTag = (tag) => {
    const currentTags = formData.requiredSkills ? formData.requiredSkills.split(",").map(t => t.trim()).filter(Boolean) : [];
    if (!currentTags.includes(tag)) {
      currentTags.push(tag);
      setFormData({ ...formData, requiredSkills: currentTags.join(", ") });
    }
  };

  return (
    <div className="space-y-6 relative">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-24 right-8 bg-emerald-600 text-white px-6 py-3 rounded-lg shadow-xl z-50 animate-bounce font-medium">
          {toast}
        </div>
      )}

      <div>
        <h1 className="text-2xl font-bold text-gray-900">Create a Request</h1>
        <p className="text-gray-500 mt-1">Post your project or question to get help from the community.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Left Side: Form */}
        <Card className="flex-1 w-full">
          <CardHeader>
            <CardTitle>Request Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Need help debugging React useEffect"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <button 
                    type="button" 
                    onClick={handleImproveDescription}
                    disabled={isImproving || !formData.description}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 disabled:opacity-50 flex items-center gap-1"
                  >
                    ✨ {isImproving ? "Improving..." : "Improve via AI"}
                  </button>
                </div>
                <textarea
                  required
                  rows="6"
                  placeholder="Describe what you are trying to accomplish and where you are stuck..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <button 
                      type="button" 
                      onClick={handleAutoCategorize}
                      disabled={isCategorizing || !formData.title}
                      className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 disabled:opacity-50 flex items-center gap-1"
                    >
                      🤖 {isCategorizing ? "Thinking..." : "Auto-Categorize"}
                    </button>
                  </div>
                  <select
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                  >
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Design">Design</option>
                    <option value="DevOps">DevOps</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Urgency</label>
                  <select
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={formData.urgency}
                    onChange={e => setFormData({...formData, urgency: e.target.value})}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location / Preference</label>
                  <input
                    type="text"
                    placeholder="e.g. Remote, New York, etc."
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={formData.location}
                    onChange={e => setFormData({...formData, location: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Required Skills (Comma separated)</label>
                  <input
                    type="text"
                    placeholder="React, Node.js, Design"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    value={formData.requiredSkills}
                    onChange={e => setFormData({...formData, requiredSkills: e.target.value})}
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-4 border-t border-gray-100">
                <Button type="button" variant="ghost" onClick={() => navigate("/dashboard/feed")}>Cancel</Button>
                <Button type="submit" variant="primary" disabled={loading}>
                  {loading ? "Posting..." : "Post Request"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Right Side: AI Assistant Panel */}
        <div className="w-full lg:w-80 space-y-6">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-800 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 h-32 w-32 bg-white opacity-10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-8 w-8 bg-white/20 rounded-lg flex items-center justify-center text-lg backdrop-blur-sm">✨</div>
                <h3 className="font-bold text-white tracking-wide">Helplytics AI</h3>
              </div>
              <p className="text-indigo-100 text-sm leading-relaxed mb-6">
                I can help you write a better request. Try typing a rough draft and I will polish it for you!
              </p>
              
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold text-indigo-200 uppercase tracking-wider mb-2">Suggested Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedTags.map(tag => (
                      <button 
                        key={tag} 
                        onClick={() => addTag(tag)}
                        className="text-xs bg-white/10 hover:bg-white/20 border border-white/20 px-2 py-1 rounded transition-colors"
                      >
                        + {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Card className="bg-indigo-50/50 border-indigo-100 shadow-sm">
            <CardContent className="p-5">
              <h4 className="text-sm font-semibold text-indigo-900 mb-3">Tips for success</h4>
              <ul className="text-sm text-indigo-700 space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-500">✅</span> Be specific about your blocker.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-500">✅</span> Tag exact technologies used.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-500">✅</span> State your desired outcome.
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
