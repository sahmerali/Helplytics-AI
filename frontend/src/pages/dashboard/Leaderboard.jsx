import React from "react";
import { Card, CardContent } from "../../components/ui/Card";

export default function Leaderboard() {
  const topUsers = [
    { rank: 1, name: "Sarah K.", score: 98, helps: 142, avatar: "S", badge: "🏅 Top Helper" },
    { rank: 2, name: "Marcus T.", score: 95, helps: 118, avatar: "M", badge: "⚡ Fast Responder" },
    { rank: 3, name: "Elena R.", score: 92, helps: 96, avatar: "E", badge: "🤝 Community Hero" },
    { rank: 4, name: "David L.", score: 88, helps: 74, avatar: "D", badge: "" },
    { rank: 5, name: "James W.", score: 85, helps: 61, avatar: "J", badge: "" },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Community Leaderboard</h1>
        <p className="text-gray-500">Recognizing our most helpful and trusted community members.</p>
      </div>

      {/* The Podium (Top 3) */}
      <div className="flex flex-col md:flex-row justify-center items-end gap-4 md:gap-8 pt-8 pb-4">
        {/* Rank 2 - Silver */}
        <div className="order-2 md:order-1 flex flex-col items-center w-full md:w-48 transform translate-y-4">
          <div className="h-16 w-16 rounded-full bg-gray-100 border-4 border-gray-300 flex items-center justify-center text-gray-700 font-bold text-2xl shadow-lg mb-4 relative z-10">
            {topUsers[1].avatar}
            <div className="absolute -bottom-2 -right-2 bg-gray-300 text-gray-800 text-xs font-bold px-2 py-0.5 rounded-full border-2 border-white">#2</div>
          </div>
          <Card className="w-full bg-gradient-to-b from-gray-50 to-white border-gray-200 shadow-md">
            <CardContent className="p-4 text-center">
              <h3 className="font-bold text-gray-900 truncate">{topUsers[1].name}</h3>
              <p className="text-xs text-indigo-600 font-semibold mb-2">{topUsers[1].badge}</p>
              <div className="text-2xl font-bold text-gray-800">{topUsers[1].score}<span className="text-sm text-gray-500 font-normal"> pt</span></div>
            </CardContent>
          </Card>
        </div>

        {/* Rank 1 - Gold */}
        <div className="order-1 md:order-2 flex flex-col items-center w-full md:w-56 z-20 relative">
          <div className="absolute -top-8 text-4xl animate-bounce">👑</div>
          <div className="h-20 w-20 rounded-full bg-yellow-50 border-4 border-yellow-400 flex items-center justify-center text-yellow-700 font-bold text-3xl shadow-xl mb-4 relative z-10">
            {topUsers[0].avatar}
            <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-yellow-900 text-sm font-bold px-2.5 py-0.5 rounded-full border-2 border-white">#1</div>
          </div>
          <Card className="w-full bg-gradient-to-b from-yellow-50 via-white to-white border-yellow-200 shadow-xl transform scale-105">
            <CardContent className="p-5 text-center">
              <h3 className="font-bold text-gray-900 text-lg truncate">{topUsers[0].name}</h3>
              <p className="text-xs text-yellow-600 font-bold mb-3 uppercase tracking-wider">{topUsers[0].badge}</p>
              <div className="text-3xl font-black text-gray-900">{topUsers[0].score}<span className="text-base text-gray-500 font-medium"> pts</span></div>
            </CardContent>
          </Card>
        </div>

        {/* Rank 3 - Bronze */}
        <div className="order-3 md:order-3 flex flex-col items-center w-full md:w-48 transform translate-y-8">
          <div className="h-16 w-16 rounded-full bg-orange-50 border-4 border-orange-300 flex items-center justify-center text-orange-800 font-bold text-2xl shadow-md mb-4 relative z-10">
            {topUsers[2].avatar}
            <div className="absolute -bottom-2 -right-2 bg-orange-300 text-orange-900 text-xs font-bold px-2 py-0.5 rounded-full border-2 border-white">#3</div>
          </div>
          <Card className="w-full bg-gradient-to-b from-orange-50/30 to-white border-orange-100 shadow-sm">
            <CardContent className="p-4 text-center">
              <h3 className="font-bold text-gray-900 truncate">{topUsers[2].name}</h3>
              <p className="text-xs text-orange-600 font-semibold mb-2">{topUsers[2].badge}</p>
              <div className="text-2xl font-bold text-gray-800">{topUsers[2].score}<span className="text-sm text-gray-500 font-normal"> pt</span></div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Rest of the Leaderboard */}
      <div className="mt-12 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-100 bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          <div className="col-span-2 md:col-span-1 text-center">Rank</div>
          <div className="col-span-6 md:col-span-5">User</div>
          <div className="col-span-4 md:col-span-3 text-center">Helps Given</div>
          <div className="hidden md:block md:col-span-3 text-right pr-4">Trust Score</div>
        </div>
        <div className="divide-y divide-gray-100">
          {topUsers.map((user) => (
            <div key={user.rank} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50 transition-colors">
              <div className="col-span-2 md:col-span-1 text-center font-bold text-gray-400">
                {user.rank}
              </div>
              <div className="col-span-6 md:col-span-5 flex items-center gap-3">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0
                  ${user.rank === 1 ? "bg-yellow-100 text-yellow-700" : 
                    user.rank === 2 ? "bg-gray-200 text-gray-700" : 
                    user.rank === 3 ? "bg-orange-100 text-orange-800" : "bg-indigo-50 text-indigo-700"}`}
                >
                  {user.avatar}
                </div>
                <div>
                  <div className="font-semibold text-gray-900 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <span className="truncate">{user.name}</span>
                    {user.badge && (
                      <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium w-fit">
                        {user.badge}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-span-4 md:col-span-3 text-center text-sm text-gray-600 font-medium">
                {user.helps}
              </div>
              <div className="hidden md:flex md:col-span-3 text-right pr-4 text-sm font-bold text-gray-900 justify-end items-center gap-1">
                {user.score} <span className="text-emerald-500 text-xs">⭐</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
