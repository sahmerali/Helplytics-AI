import React, { useState } from "react";
import { Card, CardContent } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";

export default function Notifications() {
  const [filter, setFilter] = useState("All");

  const allNotifications = [
    { id: 1, type: "request", title: "New help request matches your skills", desc: "Elena R. needs help with Dockerizing a Python Flask app.", time: "10 mins ago", unread: true, icon: "🎯", color: "bg-blue-100 text-blue-600" },
    { id: 2, type: "ai", title: "AI Suggestion: Boost your Trust Score", desc: "You are 1 help away from earning the Top Helper badge.", time: "1 hour ago", unread: true, icon: "✨", color: "bg-purple-100 text-purple-600" },
    { id: 3, type: "system", title: "System Update", desc: "Helplytics matching algorithm v2.4 has been successfully deployed.", time: "2 hours ago", unread: false, icon: "⚙️", color: "bg-gray-100 text-gray-600" },
    { id: 4, type: "action", title: "Sarah K. offered to help you", desc: "Sarah wants to help with your React useEffect loop request.", time: "Yesterday", unread: false, icon: "🤝", color: "bg-emerald-100 text-emerald-600" },
    { id: 5, type: "request", title: "Request Marked as Solved", desc: "Your issue 'Figma design system review' was successfully resolved.", time: "2 days ago", unread: false, icon: "✅", color: "bg-emerald-100 text-emerald-600" },
  ];

  const filteredNotifications = allNotifications.filter(notif => {
    if (filter === "Unread") return notif.unread;
    if (filter === "System") return notif.type === "system" || notif.type === "ai";
    return true; // "All"
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-500 mt-1">Stay updated on your requests and community matches.</p>
        </div>
        <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800 text-left">
          ✓ Mark all as read
        </button>
      </div>

      <div className="flex gap-2 border-b border-gray-200 pb-4">
        {["All", "Unread", "System"].map(tab => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${
              filter === tab ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map(notif => (
            <Card key={notif.id} className={`transition-all ${notif.unread ? 'bg-indigo-50/30 border-indigo-100' : 'bg-white'} hover:shadow-md`}>
              <CardContent className="p-4 sm:p-5 flex gap-4">
                <div className={`h-12 w-12 rounded-full flex items-center justify-center text-xl shrink-0 ${notif.color}`}>
                  {notif.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2 mb-1">
                    <h3 className={`text-sm sm:text-base font-semibold truncate ${notif.unread ? 'text-gray-900' : 'text-gray-700'}`}>
                      {notif.title}
                    </h3>
                    <span className="text-xs text-gray-400 whitespace-nowrap shrink-0">{notif.time}</span>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-2">{notif.desc}</p>
                </div>
                {notif.unread && (
                  <div className="flex items-center justify-center shrink-0">
                    <div className="h-2.5 w-2.5 bg-indigo-600 rounded-full"></div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-100 border-dashed">
            <span className="text-4xl text-gray-300">📭</span>
            <h3 className="mt-4 text-sm font-semibold text-gray-900">All caught up!</h3>
            <p className="mt-1 text-sm text-gray-500">No {filter.toLowerCase()} notifications right now.</p>
          </div>
        )}
      </div>
    </div>
  );
}
