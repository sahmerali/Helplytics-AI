import React from "react";
import { Card, CardContent } from "../ui/Card";
import { Avatar } from "../ui/Avatar";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";

export function MatchCard({ match }) {
  const { user, matchScore, commonSkills } = match;

  // Simple heuristic for percentage (e.g. 10+ score = 99%)
  const percentage = Math.min(Math.round((matchScore / 10) * 100), 99);

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <Avatar fallback={user.avatarFallback} size="lg" />
            <div>
              <h3 className="text-lg font-bold text-gray-900">{user.name}</h3>
              <p className="text-sm text-gray-500">{user.role} • {user.location || "Remote"}</p>
            </div>
          </div>
          <div className="text-right flex flex-col items-end">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-emerald-50 border-2 border-emerald-100 text-emerald-700 font-bold">
              {percentage > 0 ? percentage : 10}%
            </div>
            <p className="text-xs text-gray-400 mt-1">Match</p>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Skills Match</p>
          <div className="flex flex-wrap gap-2">
            {user.skills.slice(0, 5).map((skill, i) => {
              const isCommon = commonSkills.includes(skill.toLowerCase());
              return (
                <Badge 
                  key={i} 
                  variant={isCommon ? "success" : "secondary"}
                >
                  {skill} {isCommon && "✓"}
                </Badge>
              );
            })}
            {user.skills.length > 5 && (
              <Badge variant="outline">+{user.skills.length - 5} more</Badge>
            )}
            {user.skills.length === 0 && (
              <span className="text-sm text-gray-400 italic">No skills listed</span>
            )}
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <Button variant="primary" className="flex-1">Connect</Button>
          <Button variant="outline" className="flex-1">View Profile</Button>
        </div>
      </CardContent>
    </Card>
  );
}
