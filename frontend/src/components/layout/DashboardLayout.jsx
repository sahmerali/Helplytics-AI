import { Outlet } from "react-router-dom";
import TopNav from "./TopNav";

export default function DashboardLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-transparent overflow-x-hidden">
      {/* Main Top Navigation */}
      <TopNav />

      {/* Page Content */}
      <main className="flex-1 p-6 md:p-12 lg:p-16">
        <div className="max-w-7xl mx-auto">
          {/* The nested routes will render their content here */}
          <Outlet />
        </div>
      </main>
      
      {/* Decorative background gradients to match reference */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-[#e8f3ee] opacity-40 blur-[100px] rounded-full"></div>
        <div className="absolute top-[5%] right-[-5%] w-[35%] h-[35%] bg-[#fdebdc] opacity-30 blur-[100px] rounded-full"></div>
      </div>
    </div>
  );
}
