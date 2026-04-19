import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { MatchCard } from "../../components/matches/MatchCard";
import { FilterBar } from "../../components/matches/FilterBar";

export default function Discover() {
  const { token } = useAuth();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/matches/recommendations", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMatches(res.data.matches);
      } catch (err) {
        setError("Failed to load match recommendations.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchMatches();
    }
  }, [token]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Discover Matches</h1>
        <p className="text-gray-500 mt-1">Our AI is finding the perfect people for you to connect with based on your skills.</p>
      </div>

      <FilterBar />

      {loading ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-16 w-16 bg-indigo-100 rounded-full mb-4 flex items-center justify-center text-indigo-500 text-2xl">✨</div>
            <h3 className="text-lg font-medium text-gray-900">Analyzing skills...</h3>
            <p className="text-sm text-gray-500 mt-2">Finding the best collaborations for you.</p>
          </div>
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center border border-red-100">
          {error}
        </div>
      ) : matches.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <h3 className="text-lg font-medium text-gray-900">No matches found yet.</h3>
          <p className="text-sm text-gray-500 mt-2">Try updating your skills in your profile to find better matches.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {matches.map((match) => (
            <MatchCard key={match.user.id} match={match} />
          ))}
        </div>
      )}
    </div>
  );
}
