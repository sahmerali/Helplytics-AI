import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar() {
  const { user } = useAuth();

  const navItems = [
    { name: "Dashboard", path: "/dashboard", exact: true, icon: "📊" },
    { name: "Explore / Feed", path: "/dashboard/feed", icon: "🌍" },
    { name: "Create Request", path: "/dashboard/create", icon: "✍️" },
    { name: "Messages", path: "/dashboard/messages", icon: "💬" },
    { name: "Leaderboard", path: "/dashboard/leaderboard", icon: "🏆" },
    { name: "AI Center", path: "/dashboard/ai-center", icon: "🤖" },
    { name: "Notifications", path: "/dashboard/notifications", icon: "🔔" },
    { name: "Profile", path: "/dashboard/profile", icon: "👤" },
    { name: "Admin Panel", path: "/dashboard/admin", icon: "🛡️" },
  ];

  return (
    <aside className="w-64 bg-transparent border-r border-slate-200/50 hidden md:flex flex-col h-full shrink-0">
      <div className="p-8 pb-4 flex items-center gap-3">
        <div className="h-8 w-8 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold">H</div>
        <div>
          <h2 className="text-xl font-bold text-slate-900 leading-tight tracking-tight">Helplytics <span className="text-teal-600">AI</span></h2>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.exact}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm font-bold transition-all duration-200 ${
                isActive
                  ? "bg-slate-900 text-white shadow-md"
                  : "text-slate-600 hover:bg-slate-200/50 hover:text-slate-900"
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="p-6 pt-4">
        <div className="flex items-center gap-3 mb-4 bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
          <div className="h-10 w-10 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700 font-bold overflow-hidden shrink-0">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-slate-900 truncate">{user?.name}</p>
            <p className="text-xs text-teal-600 font-bold truncate">{user?.role || "Member"}</p>
          </div>
        </div>
        <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white hover:bg-slate-50 text-slate-700 text-sm font-bold rounded-2xl transition-colors border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500">
          <span>⚙️</span> Settings
        </button>
      </div>
    </aside>
  );
}
