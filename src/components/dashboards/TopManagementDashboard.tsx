
import { useEffect, useState } from "react";
import { BarChart3, TrendingUp, Users, Wallet } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KPICard } from "@/components/dashboard/KPICard";
import { SectionHeader } from "@/components/dashboard/SectionHeader";
import { ChartContainer } from "@/components/dashboard/ChartContainer";
import { SimpleLineChart } from "@/components/dashboard/SimpleLineChart";
import { SimpleBarChart } from "@/components/dashboard/SimpleBarChart";

// Mock data for the dashboard
const mockAUMData = [
  { name: "Jan", value: 2500000 },
  { name: "Feb", value: 3200000 },
  { name: "Mar", value: 3800000 },
  { name: "Apr", value: 4100000 },
  { name: "May", value: 4700000 },
  { name: "Jun", value: 5200000 },
];

const mockTeamRevenueData = [
  { name: "Team Alpha", value: 420000 },
  { name: "Team Beta", value: 380000 },
  { name: "Team Gamma", value: 290000 },
  { name: "Team Delta", value: 350000 },
];

const mockTeamPerformanceData = [
  {
    id: 1,
    name: "Team Alpha",
    leadsClosed: 78,
    aum: "₹42,00,000",
    revenue: "₹4,20,000",
  },
  {
    id: 2,
    name: "Team Beta",
    leadsClosed: 65,
    aum: "₹38,00,000",
    revenue: "₹3,80,000",
  },
  {
    id: 3,
    name: "Team Gamma",
    leadsClosed: 42,
    aum: "₹29,00,000",
    revenue: "₹2,90,000",
  },
  {
    id: 4,
    name: "Team Delta",
    leadsClosed: 58,
    aum: "₹35,00,000",
    revenue: "₹3,50,000",
  },
];

export const TopManagementDashboard = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Top Management Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Overview of company-wide performance and metrics
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard
          title="Total AUM"
          value="₹5.2Cr"
          icon={<Wallet size={24} />}
          trend={{ value: 12.4, isPositive: true, text: "vs last month" }}
        />
        <KPICard
          title="Monthly SIPs"
          value="₹42.8L"
          icon={<TrendingUp size={24} />}
          trend={{ value: 8.2, isPositive: true, text: "vs last month" }}
        />
        <KPICard
          title="Demat Accounts"
          value="1,284"
          icon={<BarChart3 size={24} />}
          trend={{ value: 4.5, isPositive: true, text: "vs last month" }}
        />
        <KPICard
          title="Total Revenue"
          value="₹1.44Cr"
          icon={<Users size={24} />}
          trend={{ value: 6.8, isPositive: true, text: "vs last month" }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartContainer title="AUM Growth (Last 6 Months)">
          {isClient && (
            <SimpleLineChart 
              data={mockAUMData} 
              lineColor="#1E3A8A" 
            />
          )}
        </ChartContainer>
        
        <ChartContainer title="Team Revenue">
          {isClient && (
            <SimpleBarChart 
              data={mockTeamRevenueData} 
              barColor="#1E3A8A" 
            />
          )}
        </ChartContainer>
      </div>

      <div className="mb-8">
        <SectionHeader 
          title="Team Performance" 
          description="Overview of team metrics and KPIs"
        />
        
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Teams Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="financial-table">
                <thead>
                  <tr>
                    <th>Team Name</th>
                    <th>Leads Closed</th>
                    <th>AUM Managed</th>
                    <th>Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {mockTeamPerformanceData.map((team) => (
                    <tr key={team.id}>
                      <td className="font-medium">{team.name}</td>
                      <td>{team.leadsClosed}</td>
                      <td>{team.aum}</td>
                      <td>{team.revenue}</td>
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
