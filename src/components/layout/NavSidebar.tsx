
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigation } from "@/hooks/useNavigation";

type NavSidebarProps = {
  isOpen: boolean;
};

export const NavSidebar = ({ isOpen }: NavSidebarProps) => {
  const { user } = useAuth();
  const { navigationItems } = useNavigation(user?.role);
  
  // Get role display name for the sidebar
  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case "top_management":
        return "Top Management";
      case "business_head":
        return "Business Head";
      case "rm_head":
        return "RM Head";
      case "relationship_manager":
        return "Relationship Manager";
      default:
        return role;
    }
  };

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-20 w-64 transform bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out md:translate-x-0 mt-16",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="h-full flex flex-col overflow-y-auto">
        <div className="px-4 py-6">
          <p className="text-sm font-medium text-gray-500 mb-2">Logged in as</p>
          <p className="font-semibold text-financial-900">{user?.name}</p>
          <p className="text-sm text-gray-600">{user?.role && getRoleDisplayName(user.role)}</p>
        </div>
        
        <div className="flex-1">
          <nav className="px-2 space-y-1">
            {navigationItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "bg-financial-900 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  )
                }
              >
                <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
        
        <div className="p-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            © 2023 Financial Services CRM
            <br />
            Version 1.0.0
          </p>
        </div>
      </div>
    </aside>
  );
};
