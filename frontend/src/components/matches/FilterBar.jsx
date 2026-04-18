import React from "react";
import { Button } from "../ui/Button";

export function FilterBar({ onFilterChange }) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-6">
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <input 
          type="text" 
          placeholder="Search by skill..." 
          className="flex-1 sm:w-64 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          onChange={(e) => onFilterChange && onFilterChange({ search: e.target.value })}
        />
      </div>
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <span className="text-sm font-medium text-gray-500">Sort:</span>
        <select className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <option>Highest Match</option>
          <option>Newest Members</option>
        </select>
        <Button variant="outline" size="sm">Reset</Button>
      </div>
    </div>
  );
}
