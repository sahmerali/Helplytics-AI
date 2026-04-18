import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { Link } from "react-router-dom";
import { Card, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";

export default function Login() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Both"); // Visual only for demo match
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDemoSelect = (e) => {
    const val = e.target.value;
    if (val === "ayesha") {
      setEmail("ayesha@example.com");
      setPassword("password123");
    } else if (val === "hassan") {
      setEmail("hassan@example.com");
      setPassword("password123");
    } else {
      setEmail("");
      setPassword("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center p-4 lg:p-12">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-6 lg:gap-8">
        
        {/* Left Pane - Dark Slate Card */}
        <div className="w-full lg:w-1/2 bg-slate-900 rounded-[2rem] p-10 lg:p-16 text-white shadow-xl flex flex-col justify-center">
          <h3 className="text-[10px] font-bold tracking-widest text-teal-500 uppercase mb-4">Community Access</h3>
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-8 leading-[1.1]">
            Enter the support network.
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed mb-8">
            Choose a demo identity, set your role, and jump into a multi-page product flow designed for asking, offering, and tracking help with a premium interface.
          </p>
          <ul className="space-y-4 text-slate-400 font-medium text-sm leading-relaxed">
            <li className="flex items-start gap-3">
              <span className="text-teal-500 mt-1">•</span> Role-based entry for Need Help, Can Help, or Both
            </li>
            <li className="flex items-start gap-3">
              <span className="text-teal-500 mt-1">•</span> Direct path into dashboard, requests, AI Center, and community feed
            </li>
            <li className="flex items-start gap-3">
              <span className="text-teal-500 mt-1">•</span> Persistent session powered by MongoDB
            </li>
          </ul>
        </div>

        {/* Right Pane - Auth Form */}
        <Card className="w-full lg:w-1/2 bg-beige-50 rounded-[2rem] border-0 shadow-xl overflow-hidden p-0">
          <CardContent className="p-10 lg:p-16">
            <h3 className="text-[10px] font-bold tracking-widest text-teal-600 uppercase mb-4">Login / Signup</h3>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-10 leading-tight">
              Authenticate your community profile
            </h2>

            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm font-bold border border-red-100 flex items-center gap-2">
                <span>⚠️</span> {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">Select demo user</label>
                  <select 
                    onChange={handleDemoSelect}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white font-medium text-slate-700 shadow-sm"
                  >
                    <option value="">Custom User</option>
                    <option value="ayesha">Ayesha Khan (Demo)</option>
                    <option value="hassan">Hassan Ali (Demo)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">Role selection</label>
                  <select 
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white font-medium text-slate-700 shadow-sm"
                  >
                    <option value="Both">Both</option>
                    <option value="Need Help">Need Help</option>
                    <option value="Can Help">Can Help</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white font-medium text-slate-700 shadow-sm placeholder-slate-400"
                    placeholder="community@helphub.ai"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white font-medium text-slate-700 shadow-sm placeholder-slate-400"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="pt-6">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-teal-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-teal-600/20 hover:bg-teal-700 hover:shadow-teal-600/30 transition-all text-lg tracking-wide disabled:opacity-50"
                >
                  {loading ? "Authenticating..." : "Continue to dashboard"}
                </Button>
              </div>
            </form>

            <div className="text-center mt-6">
               <Link to="/register" className="text-sm font-bold text-teal-600 hover:text-teal-700 transition-colors">
                  Create a new account instead
               </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
