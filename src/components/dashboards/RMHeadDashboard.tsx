
import { useState } from "react";
import { BarChart3, Calendar, ClipboardList, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KPICard } from "@/components/dashboard/KPICard";
import { SectionHeader } from "@/components/dashboard/SectionHeader";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

// Mock data for the dashboard
const mockTeamLeadsData = [
  {
    id: 1,
    name: "Ananya Mishra",
    status: "New",
    assignedRM: "Deepak Kumar",
    lastUpdated: "2 hours ago",
  },
  {
    id: 2,
    name: "Rohit Verma",
    status: "Contacted",
    assignedRM: "Priya Singh",
    lastUpdated: "5 hours ago",
  },
  {
    id: 3,
    name: "Sanjay Patel",
    status: "Meeting",
    assignedRM: "Unassigned",
    lastUpdated: "1 day ago",
  },
  {
    id: 4,
    name: "Neha Gupta",
    status: "Proposal",
    assignedRM: "Deepak Kumar",
    lastUpdated: "2 days ago",
  },
  {
    id: 5,
    name: "Arjun Reddy",
    status: "Meeting",
    assignedRM: "Priya Singh",
    lastUpdated: "3 days ago",
  },
];

const mockTasksData = [
  {
    id: 1,
    title: "Review investment portfolio for Ananya Mishra",
    assignedRM: "Deepak Kumar",
    dueDate: "Today",
    status: "Pending",
  },
  {
    id: 2,
    title: "Schedule follow-up meeting with Rohit Verma",
    assignedRM: "Priya Singh",
    dueDate: "Tomorrow",
    status: "Pending",
  },
  {
    id: 3,
    title: "Prepare proposal for Neha Gupta",
    assignedRM: "Deepak Kumar",
    dueDate: "20 May 2023",
    status: "In Progress",
  },
  {
    id: 4,
    title: "Send KYC documents to Arjun Reddy",
    assignedRM: "Priya Singh",
    dueDate: "22 May 2023",
    status: "Pending",
  },
];

// Mock relationship managers for assignment
const mockRMs = [
  { id: 1, name: "Deepak Kumar" },
  { id: 2, name: "Priya Singh" },
  { id: 3, name: "Amit Sharma" },
  { id: 4, name: "Divya Patel" },
];

export const RMHeadDashboard = () => {
  const [isAssignLeadDialogOpen, setIsAssignLeadDialogOpen] = useState(false);
  const [isAssignTaskDialogOpen, setIsAssignTaskDialogOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [selectedTask, setSelectedTask] = useState<any>(null);

  const handleAssignLead = (lead: any) => {
    setSelectedLead(lead);
    setIsAssignLeadDialogOpen(true);
  };

  const handleAssignTask = (task: any) => {
    setSelectedTask(task);
    setIsAssignTaskDialogOpen(true);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">RM Head Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Manage team leads, tasks, and service requests
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard
          title="Team AUM"
          value="₹1.8Cr"
          icon={<CreditCard size={24} />}
          trend={{ value: 6.4, isPositive: true, text: "vs last month" }}
        />
        <KPICard
          title="SIPs Initiated"
          value="48"
          icon={<Calendar size={24} />}
          trend={{ value: 12.3, isPositive: true, text: "vs last month" }}
        />
        <KPICard
          title="Tasks Overdue"
          value="8"
          icon={<ClipboardList size={24} />}
          trend={{ value: 3.5, isPositive: false, text: "vs yesterday" }}
        />
        <KPICard
          title="Leads Converted"
          value="12"
          icon={<BarChart3 size={24} />}
          trend={{ value: 8.2, isPositive: true, text: "vs last month" }}
        />
      </div>

      <div className="mb-8">
        <SectionHeader 
          title="Team Leads" 
          description="All leads assigned to your team"
          action={
            <Button className="bg-financial-900 hover:bg-financial-800">
              Add New Lead
            </Button>
          }
        />
        
        <Card className="shadow-sm">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="financial-table">
                <thead>
                  <tr>
                    <th>Lead Name</th>
                    <th>Status</th>
                    <th>Assigned RM</th>
                    <th>Last Updated</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockTeamLeadsData.map((lead) => (
                    <tr key={lead.id}>
                      <td className="font-medium">{lead.name}</td>
                      <td>
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                          {lead.status}
                        </span>
                      </td>
                      <td>{lead.assignedRM}</td>
                      <td>{lead.lastUpdated}</td>
                      <td>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleAssignLead(lead)}
                        >
                          Assign
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

      <div className="mb-8">
        <SectionHeader 
          title="Tasks" 
          description="Team tasks and deadlines"
          action={
            <Button className="bg-financial-900 hover:bg-financial-800">
              Create Task
            </Button>
          }
        />
        
        <Card className="shadow-sm">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="financial-table">
                <thead>
                  <tr>
                    <th>Task Title</th>
                    <th>Assigned RM</th>
                    <th>Due Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockTasksData.map((task) => (
                    <tr key={task.id}>
                      <td className="font-medium">{task.title}</td>
                      <td>{task.assignedRM}</td>
                      <td>
                        <span className={task.dueDate === "Today" ? "text-red-600 font-medium" : ""}>
                          {task.dueDate}
                        </span>
                      </td>
                      <td>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          task.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : task.status === "In Progress"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                        }`}>
                          {task.status}
                        </span>
                      </td>
                      <td>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleAssignTask(task)}
                        >
                          Assign
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

      {/* Assign Lead Dialog */}
      <Dialog open={isAssignLeadDialogOpen} onOpenChange={setIsAssignLeadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Lead</DialogTitle>
            <DialogDescription>
              Select a relationship manager to assign this lead to.
            </DialogDescription>
          </DialogHeader>
          
          {selectedLead && (
            <div className="space-y-4">
              <div>
                <p className="font-medium">Lead: {selectedLead.name}</p>
                <p className="text-sm text-gray-500">Current Status: {selectedLead.status}</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="assign-rm">Relationship Manager</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select RM" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockRMs.map((rm) => (
                      <SelectItem key={rm.id} value={rm.name}>
                        {rm.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAssignLeadDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-financial-900 hover:bg-financial-800">
              Confirm Assignment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Assign Task Dialog */}
      <Dialog open={isAssignTaskDialogOpen} onOpenChange={setIsAssignTaskDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Task</DialogTitle>
            <DialogDescription>
              Select a relationship manager to assign this task to.
            </DialogDescription>
          </DialogHeader>
          
          {selectedTask && (
            <div className="space-y-4">
              <div>
                <p className="font-medium">Task: {selectedTask.title}</p>
                <p className="text-sm text-gray-500">Due Date: {selectedTask.dueDate}</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="assign-rm">Relationship Manager</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select RM" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockRMs.map((rm) => (
                      <SelectItem key={rm.id} value={rm.name}>
                        {rm.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAssignTaskDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-financial-900 hover:bg-financial-800">
              Confirm Assignment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
