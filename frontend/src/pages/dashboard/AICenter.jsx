import React from "react";
import { Card, CardContent } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";

export default function AICenter() {
  const recommendations = [
    {
      id: 1,
      title: "Need help",
      summary: "AI summary: Web Development request with high urgency. Best suited for members with relevant expertise.",
      category: "Web Development",
      urgency: "High"
    },
    {
      id: 2,
      title: "Need help making my portfolio responsive before demo day",
      summary: "Responsive layout issue with a short deadline. Best helpers are frontend mentors comfortable with CSS grids and media queries.",
      category: "Web Development",
      urgency: "High"
    },
    {
      id: 3,
      title: "Looking for Figma feedback on a volunteer event poster",
      summary: "A visual design critique request where feedback on hierarchy, spacing, and messaging would create the most value.",
      category: "Design",
      urgency: "Medium"
    },
    {
      id: 4,
      title: "Need mock interview support for internship applications",
      summary: "Career coaching request focused on confidence-building, behavioral answers, and entry-level frontend interviews.",
      category: "Career",
      urgency: "Low"
    }
  ];

  return (
    <div className="space-y-8">
      {/* 1. Dark Slate Header */}
      <div className="bg-slate-900 rounded-[2rem] p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
        <h3 className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-4">AI Center</h3>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 max-w-4xl leading-[1.1]">
          See what the platform intelligence is noticing.
        </h1>
        <p className="text-slate-300 text-lg max-w-2xl">
          AI-like insights summarize demand trends, helper readiness, urgency signals, and request recommendations.
        </p>
      </div>

      {/* 2. Top 3 Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 -mt-12 mx-8">
        <Card className="bg-beige-50 shadow-lg border border-gray-100/50">
          <CardContent className="p-6">
            <h3 className="text-[10px] font-bold tracking-widest text-teal-600 uppercase mb-4">Trend Pulse</h3>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight leading-tight">Web<br/>Development</h2>
            <p className="text-sm text-slate-600 font-medium leading-relaxed">
              Most common support area based on active community requests.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-beige-50 shadow-lg border border-gray-100/50">
          <CardContent className="p-6">
            <h3 className="text-[10px] font-bold tracking-widest text-teal-600 uppercase mb-4">Urgency Watch</h3>
            <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">2</h2>
            <p className="text-sm text-slate-600 font-medium leading-relaxed">
              Requests currently flagged high priority by the urgency detector.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-beige-50 shadow-lg border border-gray-100/50">
          <CardContent className="p-6">
            <h3 className="text-[10px] font-bold tracking-widest text-teal-600 uppercase mb-4">Mentor Pool</h3>
            <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">2</h2>
            <p className="text-sm text-slate-600 font-medium leading-relaxed">
              Trusted helpers with strong response history and contribution signals.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 3. AI Recommendations List */}
      <Card className="bg-beige-50 mt-4 mx-8 shadow-sm">
        <CardContent className="p-8">
          <h3 className="text-[10px] font-bold tracking-widest text-teal-600 uppercase mb-2">AI Recommendations</h3>
          <h2 className="text-2xl font-bold text-slate-900 mb-8 tracking-tight">Requests needing attention</h2>
          
          <div className="space-y-4">
            {recommendations.map(req => (
              <div key={req.id} className="p-6 bg-white rounded-[1.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-sm font-bold text-slate-900 mb-3">{req.title}</h3>
                <p className="text-xs text-slate-600 font-medium leading-relaxed mb-4 max-w-4xl">
                  {req.summary}
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="primary" className="border-none">{req.category}</Badge>
                  <Badge variant={req.urgency === "High" ? "danger" : req.urgency === "Medium" ? "warning" : "default"} className="border-none">
                    {req.urgency}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
