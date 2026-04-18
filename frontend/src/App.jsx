// ============================================
// App Component
// Sets up routing and the navigation bar.
// ============================================

import { Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext.jsx";

// Page components
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Premium from "./pages/Premium.jsx";
import Onboarding from "./pages/Onboarding.jsx";

// Dashboard components
import DashboardLayout from "./components/layout/DashboardLayout.jsx";
import Overview from "./pages/dashboard/Overview.jsx";
import Feed from "./pages/dashboard/Feed.jsx";
import CreateRequest from "./pages/dashboard/CreateRequest.jsx";
import RequestDetail from "./pages/dashboard/RequestDetail.jsx";
import Messages from "./pages/dashboard/Messages.jsx";
import Leaderboard from "./pages/dashboard/Leaderboard.jsx";
import AICenter from "./pages/dashboard/AICenter.jsx";
import Notifications from "./pages/dashboard/Notifications.jsx";
import Profile from "./pages/dashboard/Profile.jsx";
import AdminPanel from "./pages/dashboard/AdminPanel.jsx";

function App() {
  const { user, logout, loading } = useAuth();
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith("/dashboard");

  // Show a loading spinner while checking auth status
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* ---- Navigation Bar (Public/Landing Only) ---- */}
      {!isDashboardRoute && (
        <nav className="bg-white shadow-sm">
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link to="/" className="text-xl font-bold text-indigo-600">
              Helplytics AI
            </Link>

            <div className="flex items-center gap-4">
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    className="text-gray-700 hover:text-indigo-600"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/premium"
                    className="text-gray-700 hover:text-indigo-600"
                  >
                    Premium
                  </Link>
                  <span className="text-sm text-gray-500">
                    Hi, {user.name}
                  </span>
                  <button
                    onClick={logout}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-indigo-600"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-indigo-600 text-white px-3 py-1 rounded text-sm hover:bg-indigo-700"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>
      )}

      {/* ---- Page Routes ---- */}
      <main className={isDashboardRoute ? "" : "max-w-4xl mx-auto px-4 py-8"}>
        <Routes>
          {/* Public routes */}
          <Route
            path="/login"
            element={user ? (user.hasCompletedOnboarding ? <Navigate to="/dashboard" /> : <Navigate to="/onboarding" />) : <Login />}
          />
          <Route
            path="/register"
            element={user ? (user.hasCompletedOnboarding ? <Navigate to="/dashboard" /> : <Navigate to="/onboarding" />) : <Register />}
          />

          {/* Protected routes — redirect to login if not authenticated */}
          <Route
            path="/onboarding"
            element={user ? (user.hasCompletedOnboarding ? <Navigate to="/dashboard" /> : <Onboarding />) : <Navigate to="/login" />}
          />
          
          <Route
            path="/premium"
            element={user ? (user.hasCompletedOnboarding ? <Premium /> : <Navigate to="/onboarding" />) : <Navigate to="/login" />}
          />

          {/* Dashboard Nested Routes */}
          <Route
            path="/dashboard"
            element={user ? (user.hasCompletedOnboarding ? <DashboardLayout /> : <Navigate to="/onboarding" />) : <Navigate to="/login" />}
          >
            <Route index element={<Overview />} />
            <Route path="feed" element={<Feed />} />
            <Route path="request/:id" element={<RequestDetail />} />
            <Route path="create" element={<CreateRequest />} />
            <Route path="messages" element={<Messages />} />
            <Route path="leaderboard" element={<Leaderboard />} />
            <Route path="ai-center" element={<AICenter />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="profile" element={<Profile />} />
            <Route path="admin" element={<AdminPanel />} />
          </Route>

          {/* Default route */}
          <Route
            path="*"
            element={
              <Navigate to={user ? (user.hasCompletedOnboarding ? "/dashboard" : "/onboarding") : "/login"} />
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
