import React from "react";
import { Card, CardContent } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";

export default function AdminPanel() {
  const flags = [
    { id: 1, title: "Inappropriate language in request", user: "John D.", type: "Content", status: "Pending" },
    { id: 2, title: "Spam / Advertising", user: "Marketing Bot", type: "Spam", status: "Resolved" },
    { id: 3, title: "Harassment in chat", user: "Anonymous", type: "Behavior", status: "Pending" }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <span>🛡️</span> Admin Dashboard
        </h1>
        <p className="text-gray-500 mt-1">Platform moderation and community analytics overview.</p>
      </div>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-t-4 border-t-indigo-500 shadow-sm">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-gray-500">Total Users</p>
            <h3 className="text-3xl font-bold text-gray-900 mt-2">1,248</h3>
            <p className="text-xs text-emerald-600 font-medium mt-2 flex items-center gap-1">↑ 12% this week</p>
          </CardContent>
        </Card>
        <Card className="border-t-4 border-t-purple-500 shadow-sm">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-gray-500">Total Requests</p>
            <h3 className="text-3xl font-bold text-gray-900 mt-2">8,432</h3>
            <p className="text-xs text-emerald-600 font-medium mt-2 flex items-center gap-1">↑ 5% this week</p>
          </CardContent>
        </Card>
        <Card className="border-t-4 border-t-emerald-500 shadow-sm">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-gray-500">Active Helps</p>
            <h3 className="text-3xl font-bold text-gray-900 mt-2">412</h3>
            <p className="text-xs text-emerald-600 font-medium mt-2 flex items-center gap-1">↑ 24% this week</p>
          </CardContent>
        </Card>
        <Card className="border-t-4 border-t-red-500 shadow-sm">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-gray-500">Pending Flags</p>
            <h3 className="text-3xl font-bold text-gray-900 mt-2">2</h3>
            <p className="text-xs text-red-600 font-medium mt-2 flex items-center gap-1">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Moderation Table */}
      <Card className="shadow-sm">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-900">Content Moderation Queue</h2>
          <Button variant="outline" size="sm">View All History</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-4 font-semibold">Report Reason</th>
                <th className="px-6 py-4 font-semibold">Reported User</th>
                <th className="px-6 py-4 font-semibold">Category</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {flags.map((flag) => (
                <tr key={flag.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{flag.title}</td>
                  <td className="px-6 py-4 text-gray-600">{flag.user}</td>
                  <td className="px-6 py-4">
                    <span className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md text-xs font-semibold">
                      {flag.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={flag.status === "Pending" ? "warning" : "secondary"}>
                      {flag.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Button variant="outline" size="sm" className="text-xs h-8">Review</Button>
                    <Button variant="primary" size="sm" className="bg-red-600 hover:bg-red-700 text-xs h-8">Ban</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
