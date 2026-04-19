import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";

export default function Onboarding() {
  const { user, completeOnboarding } = useAuth();
  const navigate = useNavigate();

  const [skills, setSkills] = useState("");
  const [interests, setInterests] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await completeOnboarding(skills, interests, location);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-12rem)] flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-beige-50 rounded-[2.5rem] border-0 shadow-2xl overflow-hidden p-0">
        <CardContent className="p-10 md:p-16">
          <div className="text-center mb-12">
            <h4 className="text-[10px] font-bold tracking-widest text-teal-600 uppercase mb-4 tracking-widest">Setup Phase</h4>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">Welcome to the loop, {user?.name}!</h1>
            <p className="text-slate-500 font-medium mt-4">Let's complete your profile so we can match you perfectly with community needs.</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-8 text-sm font-bold border border-red-100 flex items-center gap-2">
              <span>⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                  What are your core skills?
                </label>
                <input
                  type="text"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  required
                  className="w-full px-5 py-4 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white font-medium text-slate-700 shadow-sm placeholder-slate-400"
                  placeholder="React, Node.js, Python, Figma..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                  Interests & Domains
                </label>
                <input
                  type="text"
                  value={interests}
                  onChange={(e) => setInterests(e.target.value)}
                  required
                  className="w-full px-5 py-4 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white font-medium text-slate-700 shadow-sm placeholder-slate-400"
                  placeholder="AI, Web3, Design..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                  Current Location
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  className="w-full px-5 py-4 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white font-medium text-slate-700 shadow-sm placeholder-slate-400"
                  placeholder="City, Country"
                />
              </div>
            </div>

            <div className="pt-6">
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-teal-600 text-white font-bold py-5 rounded-2xl shadow-xl shadow-teal-600/20 hover:bg-teal-700 transition-all text-lg tracking-wide disabled:opacity-50 active:scale-98"
              >
                {loading ? "Optimizing Profile..." : "Complete profile & enter feed"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
