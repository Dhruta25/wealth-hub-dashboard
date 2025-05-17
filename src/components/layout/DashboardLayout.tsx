
import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { NavSidebar } from "./NavSidebar";
import { Header } from "./Header";
import { Toaster } from "@/components/ui/toaster";

export const DashboardLayout = () => {
  const { user, isLoading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Handle sidebar toggle
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // If auth is loading, show loading state
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  // If user is not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header toggleSidebar={toggleSidebar} />
      
      <div className="flex h-[calc(100vh-4rem)]">
        <NavSidebar isOpen={sidebarOpen} />
        
        <main className={`flex-1 overflow-auto transition-all p-4 md:p-6 ${sidebarOpen ? 'md:ml-64' : ''}`}>
          <Outlet />
        </main>
      </div>
      
      <Toaster />
    </div>
  );
};
