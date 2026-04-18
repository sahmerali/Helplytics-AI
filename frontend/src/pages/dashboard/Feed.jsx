import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { Card, CardContent } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";

export default function Feed() {
  const { token } = useAuth();
  
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filters State
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeUrgency, setActiveUrgency] = useState("All");
  const [searchSkills, setSearchSkills] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  const fetchLiveRequests = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (activeCategory !== "All") params.append("category", activeCategory);
      if (activeUrgency !== "All") params.append("urgency", activeUrgency);
      if (searchSkills) params.append("search", searchSkills);
      if (searchLocation) params.append("location", searchLocation);

      const res = await axios.get(`http://localhost:5000/api/projects?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRequests(res.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load requests from server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchLiveRequests();
  }, [token, activeCategory, activeUrgency]);

  // Debounce helper for text inputs would go here, but for simplicity we rely on manual search button or re-fetch logic if needed. 
  // We'll auto-fetch on blur or enter for now in a refined UI.

  return (
    <div className="space-y-8">
      {/* 1. Dark Slate Header */}
      <div className="bg-slate-900 rounded-[2rem] p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
        <h3 className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-4">Explore / Feed</h3>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 max-w-4xl leading-[1.1]">
          Browse help requests with filterable community context.
        </h1>
        <p className="text-slate-300 text-lg max-w-2xl">
          Filter by category, urgency, skills, and location to surface the best matches.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* 2. Filters Sidebar */}
        <div className="w-full lg:w-80 shrink-0">
          <Card className="p-6 sticky top-24 bg-beige-50">
            <h3 className="text-xs font-bold tracking-widest text-teal-600 uppercase mb-4">Filters</h3>
            <h2 className="text-3xl font-bold text-slate-900 mb-8 tracking-tight">Refine the feed</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
                <select 
                  value={activeCategory}
                  onChange={(e) => setActiveCategory(e.target.value)}
                  className="w-full text-sm border-0 shadow-sm rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 bg-white text-slate-700 font-medium cursor-pointer"
                >
                  <option value="All">All categories</option>
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Design">Design</option>
                  <option value="DevOps">DevOps</option>
                  <option value="Career">Career</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Urgency</label>
                <select 
                  value={activeUrgency}
                  onChange={(e) => setActiveUrgency(e.target.value)}
                  className="w-full text-sm border-0 shadow-sm rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 bg-white text-slate-700 font-medium cursor-pointer"
                >
                  <option value="All">All urgency levels</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Skills</label>
                <input 
                  type="text" 
                  placeholder="React, Figma, Git/GitHub" 
                  value={searchSkills}
                  onChange={(e) => setSearchSkills(e.target.value)}
                  onBlur={fetchLiveRequests}
                  onKeyDown={(e) => e.key === 'Enter' && fetchLiveRequests()}
                  className="w-full text-sm border-0 shadow-sm rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 bg-white text-slate-700 placeholder-slate-400 font-medium"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Location</label>
                <input 
                  type="text" 
                  placeholder="Karachi, Lahore, Remote" 
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  onBlur={fetchLiveRequests}
                  onKeyDown={(e) => e.key === 'Enter' && fetchLiveRequests()}
                  className="w-full text-sm border-0 shadow-sm rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 bg-white text-slate-700 placeholder-slate-400 font-medium"
                />
              </div>
            </div>
          </Card>
        </div>

        {/* 3. Feed List */}
        <div className="flex-1 space-y-4 w-full">
          {loading ? (
            <div className="bg-beige-50 rounded-3xl shadow-sm border border-gray-100/50 p-12 text-center animate-pulse">
              <div className="h-16 w-16 bg-teal-50 rounded-full mx-auto mb-4 flex items-center justify-center text-teal-300 text-2xl">⏳</div>
              <h3 className="text-lg font-bold text-slate-900">Loading Community Requests...</h3>
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-600 p-6 rounded-3xl text-center border border-red-100 font-medium">
              {error}
            </div>
          ) : requests.length > 0 ? (
            requests.map((req) => (
              <Card key={req._id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <Badge variant="primary">{req.category === "Other" ? "Web Development" : req.category}</Badge>
                    <Badge variant={req.urgency === "High" ? "danger" : req.urgency === "Medium" ? "warning" : "default"}>
                      {req.urgency}
                    </Badge>
                    {req.status === "Completed" ? (
                      <Badge variant="success">Solved</Badge>
                    ) : (
                      <Badge variant="outline">Open</Badge>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight leading-snug">{req.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-2">
                    {req.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {req.requiredSkills.map((skill, idx) => (
                      <span key={idx} className="text-xs text-teal-800 bg-teal-50/50 border border-teal-100/50 px-3 py-1 rounded-full font-semibold">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-gray-100/50 gap-4">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{req.createdBy?.name || "Anonymous"}</h4>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">
                        {req.location || "Remote"} • {Math.floor(Math.random() * 3) + 1} helper interested
                      </p>
                    </div>
                    
                    <Link to={`/dashboard/request/${req._id}`} className="shrink-0 w-full sm:w-auto">
                      <Button variant="outline" className="w-full rounded-full border-gray-200 text-slate-800 font-bold hover:bg-slate-50 shadow-sm bg-white">
                        Open details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="bg-beige-50 rounded-3xl shadow-sm border border-gray-100/50 p-12 text-center">
              <div className="h-16 w-16 bg-slate-100 rounded-full mx-auto mb-4 flex items-center justify-center text-slate-400 text-2xl">🔍</div>
              <h3 className="text-lg font-bold text-slate-900">No requests found</h3>
              <p className="text-sm text-slate-500 mt-2">Try adjusting your filters or be the first to post a request!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
