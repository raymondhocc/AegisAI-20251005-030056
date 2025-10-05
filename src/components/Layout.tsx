import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuthStore } from "@/lib/auth";
import SidebarNav from "@/components/SidebarNav";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AIChatAssistant } from "@/components/AIChatAssistant";
export default function Layout() {
  const { isAuthenticated } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return (
    <div className="flex min-h-screen w-full bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-50">
      <SidebarNav sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="lg:pl-64 flex flex-col flex-1 w-full">
        <Header setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 p-6 md:p-8">
          <Outlet />
        </main>
        <Footer />
      </div>
      <AIChatAssistant />
    </div>
  );
}