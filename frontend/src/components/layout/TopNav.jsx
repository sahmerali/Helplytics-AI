import { useAuth } from "../../context/AuthContext.jsx";
import { useLocation, Link } from "react-router-dom";
import { Button } from "../ui/Button";

export default function TopNav() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/dashboard", exact: true },
    { name: "Explore", path: "/dashboard/feed" },
    { name: "Leaderboard", path: "/dashboard/leaderboard" },
    { name: "Notifications", path: "/dashboard/notifications" },
    { name: "AI Center", path: "/dashboard/ai-center" },
  ];

  return (
    <header className="h-20 bg-transparent flex items-center justify-between px-8 md:px-16 sticky top-0 z-50 backdrop-blur-sm">
      <div className="flex items-center gap-12">
        <Link to="/dashboard" className="flex items-center gap-3">
          <div className="h-10 w-10 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold text-lg">H</div>
          <span className="font-bold text-slate-900 tracking-tight text-lg">HelpHub AI</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`text-sm font-bold tracking-tight transition-colors ${location.pathname === item.path || (item.exact && location.pathname === "/dashboard")
                ? "text-slate-900 bg-slate-200/50 px-4 py-2 rounded-full"
                : "text-slate-500 hover:text-slate-900"
                }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden xl:flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest">
          <span className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse"></span>
          Live community signals
        </div>

        {user ? (
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end hidden sm:flex">
              <span className="text-xs font-bold text-slate-900">{user.name}</span>
              <span className="text-[10px] font-bold text-teal-600 uppercase">{user.role}</span>
            </div>
            <button
              onClick={logout}
              className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-sm hover:bg-red-50 hover:text-red-600 transition-all border border-transparent hover:border-red-100"
            >
              {user.name?.charAt(0).toUpperCase()}
            </button>
          </div>
        ) : (
          <Link to="/login">
            <Button variant="primary" className="bg-teal-600 px-6 rounded-full font-bold">Join the platform</Button>
          </Link>
        )}
      </div>
    </header>
  );
}
