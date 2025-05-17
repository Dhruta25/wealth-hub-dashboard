
import { useEffect, useState } from "react";
import { BarChart3, ClipboardList, MessageSquare, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KPICard } from "@/components/dashboard/KPICard";
import { SectionHeader } from "@/components/dashboard/SectionHeader";
import { ChartContainer } from "@/components/dashboard/ChartContainer";
import { SimpleBarChart } from "@/components/dashboard/SimpleBarChart";

// Mock data for the dashboard
const mockLeadFunnelData = [
  { name: "New", value: 120 },
  { name: "Contacted", value: 85 },
  { name: "Meeting", value: 62 },
  { name: "Proposal", value: 41 },
  { name: "Converted", value: 28 },
  { name: "Lost", value: 14 },
];

const mockRMHeadData = [
  {
    id: 1,
    name: "Rajesh Sharma",
    leadsAssigned: 45,
    conversionRate: "22.4%",
    actions: "",
  },
  {
    id: 2,
    name: "Preeti Khanna",
    leadsAssigned: 38,
    conversionRate: "28.1%",
    actions: "",
  },
  {
    id: 3,
    name: "Vikram Mehta",
    leadsAssigned: 31,
    conversionRate: "19.8%",
    actions: "",
  },
  {
    id: 4,
    name: "Anjali Patel",
    leadsAssigned: 42,
    conversionRate: "26.3%",
    actions: "",
  },
];

export const BusinessHeadDashboard = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Business Head Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Manage RM Heads and oversee team performance
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard
          title="Team Leads Assigned"
          value="156"
          icon={<User size={24} />}
          trend={{ value: 8.4, isPositive: true, text: "vs last month" }}
        />
        <KPICard
          title="Tasks Completed"
          value="98"
          icon={<ClipboardList size={24} />}
          trend={{ value: 4.2, isPositive: true, text: "vs last month" }}
        />
        <KPICard
          title="Leads Converted"
          value="28"
          icon={<BarChart3 size={24} />}
          trend={{ value: 12.3, isPositive: true, text: "vs last month" }}
        />
        <KPICard
          title="Service Requests"
          value="42"
          icon={<MessageSquare size={24} />}
          trend={{ value: 2.5, isPositive: false, text: "vs last month" }}
        />
      </div>

      <div className="mb-8">
        <ChartContainer title="Lead Funnel">
          {isClient && (
            <SimpleBarChart 
              data={mockLeadFunnelData} 
              barColor="#1E3A8A" 
            />
          )}
        </ChartContainer>
      </div>

      <div className="mb-8">
        <SectionHeader 
          title="RM Heads" 
          description="Performance of Relationship Manager Heads"
          action={
            <Button className="bg-financial-900 hover:bg-financial-800">
              Reassign Leads
            </Button>
          }
        />
        
        <Card className="shadow-sm">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="financial-table">
                <thead>
                  <tr>
                    <th>RM Head</th>
                    <th>Leads Assigned</th>
                    <th>Conversion Rate</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockRMHeadData.map((head) => (
                    <tr key={head.id}>
                      <td className="font-medium">{head.name}</td>
                      <td>{head.leadsAssigned}</td>
                      <td>{head.conversionRate}</td>
                      <td>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
