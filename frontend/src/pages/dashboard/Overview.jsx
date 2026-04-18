import { useAuth } from "../../../context/AuthContext";
import { Link } from "react-router-dom";
import { Card, CardContent } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";

export default function Overview() {
  const { user } = useAuth();

  // Dummy Data for Phase 1
  const stats = [
    { title: "Total Requests", value: "24", icon: "📋" },
    { title: "Active Requests", value: "8", icon: "🔥" },
    { title: "Helped Users", value: "12", icon: "🤝" },
    { title: "Trust Score", value: "98%", icon: "⭐" },
  ];

  const recentRequests = [
    { id: 1, title: "Need help debugging React useEffect infinite loop", category: "Frontend", urgency: "High", skills: ["React", "JavaScript"] },
    { id: 2, title: "Setting up MongoDB aggregation pipeline", category: "Backend", urgency: "Medium", skills: ["MongoDB", "Node.js"] },
    { id: 3, title: "Figma design system review needed", category: "Design", urgency: "Low", skills: ["Figma", "UI/UX"] },
  ];

  const aiInsights = [
    "You are most active in React help requests.",
    "High demand skill right now: Node.js.",
    "Suggested: Try answering backend requests to boost your Trust Score."
  ];

  return (
    <div className="space-y-8">
      {/* 1. Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-indigo-50 flex items-center justify-center text-2xl shadow-inner">
                {stat.icon}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 2. Recent Requests Section (Takes up 2 columns) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Recent Requests</h2>
            <Link to="/dashboard/feed" className="text-sm font-medium text-indigo-600 hover:text-indigo-700">View All →</Link>
          </div>
          <div className="space-y-4">
            {recentRequests.map((req) => (
              <Card key={req.id} className="hover:border-indigo-200 transition-colors">
                <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">{req.category}</span>
                      <Badge variant={req.urgency === "High" ? "danger" : req.urgency === "Medium" ? "warning" : "secondary"}>
                        {req.urgency}
                      </Badge>
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 truncate">{req.title}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      {req.skills.map(skill => (
                        <span key={skill} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md border border-gray-200">{skill}</span>
                      ))}
                    </div>
                  </div>
                  <Link to={`/dashboard/request/${req.id}`} className="shrink-0">
                    <Button variant="outline" size="sm">View Details</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Column: AI Insights & Quick Actions */}
        <div className="space-y-8">
          {/* 3. AI Insights Panel */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">AI Insights</h2>
            <div className="bg-gradient-to-br from-indigo-600 to-purple-800 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 h-32 w-32 bg-white opacity-10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 -mb-4 -ml-4 h-24 w-24 bg-purple-400 opacity-20 rounded-full blur-2xl"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-8 w-8 bg-white/20 rounded-lg flex items-center justify-center text-lg backdrop-blur-sm">✨</div>
                  <h3 className="font-bold text-white tracking-wide">Helplytics AI</h3>
                </div>
                <ul className="space-y-4">
                  {aiInsights.map((insight, idx) => (
                    <li key={idx} className="text-sm text-indigo-100 flex items-start gap-3 bg-white/5 p-3 rounded-lg border border-white/10 backdrop-blur-sm">
                      <span className="text-indigo-300 mt-0.5 text-xs">●</span>
                      <span className="leading-relaxed">{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* 4. Quick Actions */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              <Link to="/dashboard/create">
                <Button variant="primary" className="w-full flex-col h-auto py-5 gap-2 shadow-sm hover:shadow-md transition-shadow">
                  <span className="text-2xl">✍️</span>
                  <span className="text-xs font-semibold">Create Request</span>
                </Button>
              </Link>
              <Link to="/dashboard/feed">
                <Button variant="outline" className="w-full flex-col h-auto py-5 gap-2 bg-white hover:bg-gray-50 border-gray-200">
                  <span className="text-2xl">🌍</span>
                  <span className="text-xs font-semibold text-gray-700">Browse Feed</span>
                </Button>
              </Link>
              <Link to="/dashboard/leaderboard">
                <Button variant="outline" className="w-full flex-col h-auto py-5 gap-2 bg-white hover:bg-gray-50 border-gray-200">
                  <span className="text-2xl">🏆</span>
                  <span className="text-xs font-semibold text-gray-700">Leaderboard</span>
                </Button>
              </Link>
              <Link to="/dashboard/ai-center">
                <Button variant="outline" className="w-full flex-col h-auto py-5 gap-2 bg-white hover:bg-gray-50 border-gray-200">
                  <span className="text-2xl">🤖</span>
                  <span className="text-xs font-semibold text-gray-700">AI Center</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
