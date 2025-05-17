
import { UserRole } from "@/types/auth";
import { BarChart3, Briefcase, ClipboardList, Home, Users, Ticket, ChevronRight } from "lucide-react";

export type NavigationItem = {
  name: string;
  href: string;
  icon: React.ElementType;
  roles: UserRole[];
};

export const useNavigation = (userRole: UserRole | undefined) => {
  // Define all navigation items and which roles can see them
  const allNavItems: NavigationItem[] = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: Home,
      roles: ["top_management", "business_head", "rm_head", "relationship_manager"],
    },
    {
      name: "Leads",
      href: "/leads",
      icon: ChevronRight,
      roles: ["business_head", "rm_head", "relationship_manager"],
    },
    {
      name: "Clients",
      href: "/clients",
      icon: Users,
      roles: ["business_head", "rm_head", "relationship_manager"],
    },
    {
      name: "Tasks",
      href: "/tasks",
      icon: ClipboardList,
      roles: ["business_head", "rm_head", "relationship_manager"],
    },
    {
      name: "Service Requests",
      href: "/service-requests",
      icon: Ticket,
      roles: ["business_head", "rm_head", "relationship_manager"],
    },
    {
      name: "Metrics",
      href: "/metrics",
      icon: BarChart3,
      roles: ["top_management", "business_head", "rm_head", "relationship_manager"],
    },
  ];

  // Filter navigation items based on user role
  const filteredNavItems = allNavItems.filter(item => 
    !userRole || item.roles.includes(userRole)
  );

  return { navigationItems: filteredNavItems };
};
