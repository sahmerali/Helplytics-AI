import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Card, CardContent } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";

export default function Profile() {
  const { user } = useAuth();

  const skills = ["React", "JavaScript", "Tailwind CSS", "Node.js", "Figma"];
  
  const stats = [
    { label: "Requests Created", value: 3 },
    { label: "Requests Solved", value: 2 },
    { label: "Helps Given", value: 12 }
  ];

  const badges = [
    { icon: "🏅", name: "Top Helper", desc: "Top 5% of community" },
    { icon: "⚡", name: "Fast Responder", desc: "Replies under 30 mins" },
    { icon: "🤝", name: "Community Hero", desc: "Helped 10+ people" }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* 1. User Info Header */}
      <Card className="overflow-hidden border-none shadow-sm">
        <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
        <CardContent className="p-6 sm:p-8 relative">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-20 sm:-mt-16 mb-6">
            <div className="h-24 w-24 sm:h-32 sm:w-32 rounded-full bg-white border-4 border-white shadow-md flex items-center justify-center text-4xl font-bold text-indigo-700 overflow-hidden relative z-10">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <div className="flex-1 text-center sm:text-left mb-2">
              <h1 className="text-2xl font-bold text-gray-900">{user?.name || "Guest User"}</h1>
              <p className="text-gray-500">{user?.email || "guest@example.com"}</p>
            </div>
            <div className="mb-2">
              <Button variant="outline">Edit Profile</Button>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="text-gray-400">💼 Role:</span>
              <span className="font-semibold text-gray-900">{user?.role || "Both"}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="text-gray-400">📍 Location:</span>
              <span className="font-semibold text-gray-900">Remote</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="text-gray-400">📅 Joined:</span>
              <span className="font-semibold text-gray-900">April 2026</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* 2. Skills Section */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">Skills & Expertise</h2>
                <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">Manage</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, idx) => (
                  <span key={idx} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-medium border border-indigo-100">
                    {skill}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 3. Contributions Section */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Contributions</h2>
              <div className="grid grid-cols-3 gap-4">
                {stats.map((stat, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                    <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">{stat.label}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 5. Badges Section */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Earned Badges</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {badges.map((badge, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-white shadow-sm hover:border-indigo-200 transition-colors cursor-default">
                    <div className="h-10 w-10 bg-indigo-50 rounded-full flex items-center justify-center text-xl shrink-0">
                      {badge.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm leading-tight mb-0.5">{badge.name}</h4>
                      <p className="text-[10px] text-gray-500">{badge.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          
          {/* 4. Trust Score System */}
          <Card className="bg-gradient-to-br from-indigo-900 to-purple-900 text-white border-none shadow-lg overflow-hidden relative">
            <div className="absolute -top-10 -right-10 h-32 w-32 bg-white opacity-5 rounded-full blur-2xl"></div>
            <CardContent className="p-8 text-center relative z-10">
              <h2 className="text-sm font-medium text-indigo-200 uppercase tracking-widest mb-6">Community Trust Score</h2>
              
              <div className="relative h-40 w-40 mx-auto flex items-center justify-center mb-6">
                <svg className="absolute inset-0 h-full w-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="45" 
                    fill="none" 
                    stroke="url(#gradient)" 
                    strokeWidth="8" 
                    strokeDasharray="283" 
                    strokeDashoffset="28" 
                    strokeLinecap="round" 
                    className="drop-shadow-lg transition-all duration-1000 ease-out"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#818cf8" />
                      <stop offset="100%" stopColor="#c084fc" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="flex flex-col items-center">
                  <span className="text-4xl font-black tracking-tighter">90</span>
                  <span className="text-xs text-indigo-200 mt-1">Excellent</span>
                </div>
              </div>
              
              <p className="text-sm text-indigo-100">
                You are in the top 10% of trustworthy users on Helplytics AI.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
