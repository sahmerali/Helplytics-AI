import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { Link } from "react-router-dom";
import { Card, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";

export default function Register() {
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Both");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!role) {
      setError("Please select how you want to use the platform.");
      setLoading(false);
      return;
    }

    try {
      await register(name, email, password, role);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
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
            Join the support network.
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed mb-8">
            Create your account and jump into a multi-page product flow designed for asking, offering, and tracking help with a premium interface.
          </p>
          <ul className="space-y-4 text-slate-400 font-medium text-sm leading-relaxed">
            <li className="flex items-start gap-3">
              <span className="text-teal-500 mt-1">•</span> Smart matching for your specific skill set
            </li>
            <li className="flex items-start gap-3">
              <span className="text-teal-500 mt-1">•</span> Track your contribution and build your trust score
            </li>
            <li className="flex items-start gap-3">
              <span className="text-teal-500 mt-1">•</span> Real-time notifications and community insights
            </li>
          </ul>
        </div>

        {/* Right Pane - Auth Form */}
        <Card className="w-full lg:w-1/2 bg-beige-50 rounded-[2rem] border-0 shadow-xl overflow-hidden p-0">
          <CardContent className="p-10 lg:p-16">
            <h3 className="text-[10px] font-bold tracking-widest text-teal-600 uppercase mb-4">Login / Signup</h3>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-10 leading-tight">
              Create your community profile
            </h2>

            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm font-bold border border-red-100 flex items-center gap-2">
                <span>⚠️</span> {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">Role selection</label>
                <div className="grid grid-cols-3 gap-3">
                  {["Need Help", "Can Help", "Both"].map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRole(r)}
                      className={`py-3 px-2 border-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                        role === r
                          ? "bg-slate-900 border-slate-900 text-white shadow-md"
                          : "bg-white border-gray-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white font-medium text-slate-700 shadow-sm placeholder-slate-400"
                  placeholder="Jane Doe"
                />
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
                    placeholder="At least 6 characters"
                  />
                </div>
              </div>

              <div className="pt-6">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-teal-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-teal-600/20 hover:bg-teal-700 hover:shadow-teal-600/30 transition-all text-lg tracking-wide disabled:opacity-50"
                >
                  {loading ? "Creating account..." : "Continue to dashboard"}
                </Button>
              </div>
            </form>

            <div className="text-center mt-6">
               <Link to="/login" className="text-sm font-bold text-teal-600 hover:text-teal-700 transition-colors">
                  Already have an account? Sign in
               </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
