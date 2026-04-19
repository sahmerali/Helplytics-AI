import React from "react";
import { Card, CardContent } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";

export default function Leaderboard() {
  const topUsers = [
    { rank: 1, name: "Sarah K.", score: 98, helps: 142, avatar: "S", badge: "🏅 Top Helper", color: "bg-yellow-400" },
    { rank: 2, name: "Marcus T.", score: 95, helps: 118, avatar: "M", badge: "⚡ Fast Responder", color: "bg-slate-300" },
    { rank: 3, name: "Elena R.", score: 92, helps: 96, avatar: "E", badge: "🤝 Community Hero", color: "bg-orange-400" },
    { rank: 4, name: "David L.", score: 88, helps: 74, avatar: "D", badge: "" },
    { rank: 5, name: "James W.", score: 85, helps: 61, avatar: "J", badge: "" },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <h4 className="text-[10px] font-bold tracking-widest text-teal-600 uppercase">Community Impact</h4>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Leaderboard Momentum</h1>
        <p className="text-slate-500 font-medium max-w-xl mx-auto">Recognizing our most helpful and trusted community members who drive value every day.</p>
      </div>

      {/* The Podium (Top 3) */}
      <div className="flex flex-col md:flex-row justify-center items-end gap-6 md:gap-4 pt-12 pb-6">
        {/* Rank 2 - Silver */}
        <div className="order-2 md:order-1 flex flex-col items-center w-full md:w-56 transform translate-y-4">
          <div className="h-16 w-16 rounded-full bg-slate-100 border-4 border-slate-200 flex items-center justify-center text-slate-700 font-bold text-2xl shadow-lg mb-4 relative z-10">
            {topUsers[1].avatar}
            <div className="absolute -bottom-2 -right-2 bg-slate-400 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border-2 border-white">#2</div>
          </div>
          <Card className="w-full bg-beige-50 shadow-md border-slate-100">
            <CardContent className="p-6 text-center">
              <h3 className="font-bold text-slate-900 truncate">{topUsers[1].name}</h3>
              <p className="text-[10px] text-teal-600 font-bold mb-3 uppercase tracking-wider">{topUsers[1].badge}</p>
              <div className="text-2xl font-black text-slate-800">{topUsers[1].score}<span className="text-sm text-slate-500 font-bold"> pt</span></div>
            </CardContent>
          </Card>
        </div>

        {/* Rank 1 - Gold */}
        <div className="order-1 md:order-2 flex flex-col items-center w-full md:w-64 z-20 relative">
          <div className="absolute -top-12 text-4xl animate-bounce">👑</div>
          <div className="h-24 w-24 rounded-full bg-yellow-50 border-4 border-yellow-400 flex items-center justify-center text-yellow-700 font-bold text-4xl shadow-xl mb-4 relative z-10">
            {topUsers[0].avatar}
            <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-white text-xs font-bold px-2.5 py-1 rounded-full border-2 border-white">#1</div>
          </div>
          <Card className="w-full bg-slate-900 text-white shadow-2xl transform scale-105 rounded-[2rem]">
            <CardContent className="p-8 text-center">
              <h3 className="font-bold text-white text-xl truncate">{topUsers[0].name}</h3>
              <p className="text-[10px] text-teal-400 font-bold mb-4 uppercase tracking-widest">{topUsers[0].badge}</p>
              <div className="text-4xl font-black text-white">{topUsers[0].score}<span className="text-lg text-slate-400 font-bold ml-1">pts</span></div>
            </CardContent>
          </Card>
        </div>

        {/* Rank 3 - Bronze */}
        <div className="order-3 md:order-3 flex flex-col items-center w-full md:w-56 transform translate-y-8">
          <div className="h-16 w-16 rounded-full bg-orange-50 border-4 border-orange-300 flex items-center justify-center text-orange-800 font-bold text-2xl shadow-lg mb-4 relative z-10">
            {topUsers[2].avatar}
            <div className="absolute -bottom-2 -right-2 bg-orange-400 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border-2 border-white">#3</div>
          </div>
          <Card className="w-full bg-beige-50 shadow-md border-orange-100">
            <CardContent className="p-6 text-center">
              <h3 className="font-bold text-slate-900 truncate">{topUsers[2].name}</h3>
              <p className="text-[10px] text-orange-600 font-bold mb-3 uppercase tracking-wider">{topUsers[2].badge}</p>
              <div className="text-2xl font-black text-slate-800">{topUsers[2].score}<span className="text-sm text-slate-500 font-bold"> pt</span></div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Rest of the Leaderboard */}
      <Card className="mt-16 bg-beige-50 overflow-hidden shadow-sm">
        <div className="grid grid-cols-12 gap-4 p-6 bg-slate-100/50 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
          <div className="col-span-2 md:col-span-1 text-center">Rank</div>
          <div className="col-span-6 md:col-span-5">User</div>
          <div className="col-span-4 md:col-span-3 text-center">Helps Given</div>
          <div className="hidden md:block md:col-span-3 text-right pr-4">Trust Score</div>
        </div>
        <div className="divide-y divide-slate-100">
          {topUsers.map((user) => (
            <div key={user.rank} className="grid grid-cols-12 gap-4 p-6 items-center hover:bg-white transition-colors">
              <div className="col-span-2 md:col-span-1 text-center font-black text-slate-300">
                {user.rank}
              </div>
              <div className="col-span-6 md:col-span-5 flex items-center gap-4">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center text-xs font-bold shrink-0 shadow-sm
                  ${user.rank === 1 ? "bg-yellow-400 text-white" : 
                    user.rank === 2 ? "bg-slate-300 text-white" : 
                    user.rank === 3 ? "bg-orange-400 text-white" : "bg-teal-50 text-teal-700 border border-teal-100"}`}
                >
                  {user.avatar}
                </div>
                <div>
                  <div className="font-bold text-slate-900 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                    <span className="truncate">{user.name}</span>
                    {user.badge && (
                      <span className="text-[8px] bg-white text-slate-500 border border-slate-200 px-2 py-0.5 rounded-full font-bold uppercase tracking-tight w-fit">
                        {user.badge}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-span-4 md:col-span-3 text-center text-sm text-slate-600 font-bold">
                {user.helps}
              </div>
              <div className="hidden md:flex md:col-span-3 text-right pr-4 text-sm font-black text-slate-900 justify-end items-center gap-1">
                {user.score} <span className="text-emerald-500 text-xs">⭐</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
