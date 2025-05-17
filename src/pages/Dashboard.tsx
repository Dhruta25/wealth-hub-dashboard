
import { useAuth } from "@/contexts/AuthContext";
import { TopManagementDashboard } from "@/components/dashboards/TopManagementDashboard";
import { BusinessHeadDashboard } from "@/components/dashboards/BusinessHeadDashboard";
import { RMHeadDashboard } from "@/components/dashboards/RMHeadDashboard";
import { RelationshipManagerDashboard } from "@/components/dashboards/RelationshipManagerDashboard";

const Dashboard = () => {
  const { user } = useAuth();

  // Return appropriate dashboard based on user role
  if (!user) return null;

  switch (user.role) {
    case "top_management":
      return <TopManagementDashboard />;
    case "business_head":
      return <BusinessHeadDashboard />;
    case "rm_head":
      return <RMHeadDashboard />;
    case "relationship_manager":
      return <RelationshipManagerDashboard />;
    default:
      return <div>Unknown role</div>;
  }
};

export default Dashboard;
