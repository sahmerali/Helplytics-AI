import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";

export default function DashboardLayout() {
  return (
    <div className="flex h-screen bg-transparent overflow-hidden">
      {/* Sidebar for desktop */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Navigation */}
        <TopNav />

        {/* Page Content - Scrolls independently */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-6xl mx-auto">
            {/* The nested routes will render their content here */}
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
