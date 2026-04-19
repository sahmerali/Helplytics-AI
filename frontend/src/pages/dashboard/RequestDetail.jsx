import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { Card, CardContent } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";

export default function RequestDetail() {
  const { id } = useParams();
  const { user, token } = useAuth();
  
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/projects/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setRequest(res.data);
      } catch (err) {
        setError("Failed to load request details.");
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchRequest();
  }, [id, token]);

  const handleMarkSolved = async () => {
    try {
      setRequest(prev => ({ ...prev, status: "Completed" }));
      setToast("Request marked as Solved! 🎉");
      setTimeout(() => setToast(""), 3000);
      
      await axios.patch(`http://localhost:5000/api/projects/${id}/status`, 
        { status: "Completed" },
        { headers: { Authorization: `Bearer ${token}` }}
      );
    } catch (err) {
      setRequest(prev => ({ ...prev, status: "Open" }));
      setToast("Failed to update status.");
      setTimeout(() => setToast(""), 3000);
    }
  };

  if (loading) return <div className="p-12 text-center text-slate-500 font-medium">Loading Request Details...</div>;
  if (error || !request) return <div className="p-12 text-center text-red-500 font-medium">{error || "Not found"}</div>;

  const isOwner = user && request.createdBy && user.id === request.createdBy._id;

  const helpers = [
    { id: 1, name: "Ayesha Khan", skills: "Figma, UI/UX, HTML/CSS", trustScore: "100%", avatar: "AK", color: "bg-orange-500" },
    { id: 2, name: "Hassan Ali", skills: "JavaScript, React, Git/GitHub", trustScore: "88%", avatar: "HA", color: "bg-orange-400" }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6 relative">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-24 right-8 bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl z-50 animate-bounce font-bold border border-slate-700">
          {toast}
        </div>
      )}

      {/* Massive Dark Slate Header */}
      <div className="bg-slate-900 rounded-[2rem] p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <Badge variant="secondary" className="bg-slate-800 text-teal-400 border-none">{request.category === "Other" ? "Career" : request.category}</Badge>
          <Badge variant={request.urgency === "High" ? "danger" : request.urgency === "Medium" ? "warning" : "default"} className="bg-slate-800 border-none">
            {request.urgency}
          </Badge>
          {request.status === "Completed" ? (
            <Badge variant="success" className="bg-teal-900/50 text-teal-300 border-none">Solved</Badge>
          ) : (
            <Badge variant="outline" className="border-slate-700 text-slate-300">Open</Badge>
          )}
        </div>
        
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 max-w-4xl leading-[1.1]">
          {request.title}
        </h1>
        <p className="text-slate-300 text-lg max-w-3xl leading-relaxed whitespace-pre-wrap">
          {request.description}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6 flex flex-col h-full">
          
          {/* AI SUMMARY */}
          <Card className="flex-1 bg-beige-50">
            <CardContent className="p-8">
              <h3 className="text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-6">AI Summary</h3>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="h-8 w-8 rounded-md bg-teal-600 flex items-center justify-center text-white font-bold text-sm">H</div>
                <h4 className="font-bold text-slate-900 text-sm">HelpHub AI</h4>
              </div>
              
              <p className="text-slate-700 font-medium leading-relaxed mb-6 text-sm">
                AI summary: {request.category} request with {request.urgency.toLowerCase()} urgency. Best suited for members with relevant expertise in {request.requiredSkills?.join(", ") || request.category.toLowerCase()}.
              </p>

              <div className="flex flex-wrap gap-2">
                {request.requiredSkills?.map((skill, idx) => (
                  <span key={idx} className="text-xs text-teal-800 bg-teal-50/50 border border-teal-100/50 px-3 py-1 rounded-full font-semibold">
                    {skill}
                  </span>
                ))}
              </div>

              {/* AI Suggested Responses */}
              <div className="mt-8 pt-8 border-t border-slate-200/50">
                <h3 className="text-[10px] font-bold tracking-widest text-teal-600 uppercase mb-4">AI Helper: Suggested Responses</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "Hey! I have strong experience in this and would love to help you debug this issue. Let me know when you're free to chat!",
                    "I've worked on similar projects before and I think I know exactly what's causing your blocker. Happy to jump on a call."
                  ].map((sug, i) => (
                    <button key={i} className="text-left p-4 bg-white rounded-2xl border border-teal-100/50 hover:border-teal-300 transition-colors shadow-sm group">
                      <p className="text-xs text-slate-600 italic line-clamp-2 mb-2 group-hover:text-slate-900 transition-colors">"{sug}"</p>
                      <span className="text-[10px] font-bold text-teal-600 uppercase">Use this template</span>
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ACTIONS */}
          {request.status === "Open" && (
            <Card className="bg-beige-50 shrink-0">
              <CardContent className="p-8">
                <h3 className="text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-6">Actions</h3>
                <div className="flex flex-wrap items-center gap-4">
                  {!isOwner && (
                    <Button variant="primary" className="px-6 py-2 shadow-lg shadow-teal-600/20 text-sm h-11">
                      I can help
                    </Button>
                  )}
                  {isOwner && (
                    <Button variant="outline" onClick={handleMarkSolved} className="px-6 py-2 bg-white text-slate-800 border-gray-200 font-bold hover:bg-slate-50 text-sm h-11">
                      Mark as solved
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-6 flex flex-col h-full">
          
          {/* REQUESTER */}
          <Card className="bg-beige-50 shrink-0">
            <CardContent className="p-8">
              <h3 className="text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-6">Requester</h3>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900">{request.createdBy?.name || "Anonymous"}</h4>
                  <p className="text-xs text-slate-500 font-medium mt-1">{request.location || "Remote"} • {request.createdBy?.role || "Member"}</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-sm shrink-0">
                  {request.createdBy?.name?.charAt(0).toUpperCase() || "U"}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* HELPERS */}
          <Card className="flex-1 bg-beige-50">
            <CardContent className="p-8">
              <h3 className="text-[10px] font-bold tracking-widest text-teal-600 uppercase mb-2">Helpers</h3>
              <h2 className="text-xl font-bold text-slate-900 mb-6 tracking-tight">People ready to support</h2>
              
              <div className="space-y-4">
                {helpers.map(helper => (
                  <div key={helper.id} className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`h-10 w-10 rounded-full ${helper.color} text-white flex items-center justify-center font-bold text-sm shrink-0`}>
                        {helper.avatar}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{helper.name}</h4>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">{helper.skills}</p>
                      </div>
                    </div>
                    <Badge variant="primary" className="bg-teal-50 text-teal-700 shrink-0 border-none font-bold">
                      Trust {helper.trustScore}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
