import { useAuth } from "../../../context/AuthContext";
import { useLocation } from "react-router-dom";

export default function TopNav() {
  const { user, logout } = useAuth();
  const location = useLocation();

  // Dynamic Title Generator
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === "/dashboard") return "Dashboard";
    if (path.includes("feed")) return "Explore / Feed";
    if (path.includes("create")) return "Create Request";
    if (path.includes("messages")) return "Messages";
    if (path.includes("leaderboard")) return "Leaderboard";
    if (path.includes("ai-center")) return "AI Center";
    if (path.includes("notifications")) return "Notifications";
    if (path.includes("profile")) return "Profile";
    return "Overview";
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        {/* Mobile menu button could go here */}
        <h1 className="text-xl font-bold text-gray-900 hidden sm:block">{getPageTitle()}</h1>
      </div>

      <div className="flex-1 max-w-md px-6 hidden md:block">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
            🔍
          </span>
          <input
            type="text"
            className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors"
            placeholder="Search requests, skills, or users..."
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors focus:outline-none">
          <span className="text-xl">🔔</span>
          <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
        </button>

        <div className="flex items-center gap-2 border-l border-gray-200 pl-4">
          <button className="flex items-center gap-2 hover:opacity-80 transition-opacity focus:outline-none">
            <div className="h-8 w-8 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-700 font-bold overflow-hidden">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <span className="text-xs text-gray-400">▼</span>
          </button>
          
          <button 
            onClick={logout}
            className="ml-2 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors focus:outline-none"
            title="Logout"
          >
            <span className="text-lg">🚪</span>
          </button>
        </div>
      </div>
    </header>
  );
}
