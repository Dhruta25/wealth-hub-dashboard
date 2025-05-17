
import { useState } from "react";
import { BarChart3, CreditCard, Calendar, Bell, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KPICard } from "@/components/dashboard/KPICard";
import { SectionHeader } from "@/components/dashboard/SectionHeader";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
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
import { Textarea } from "@/components/ui/textarea";

// Mock data for the dashboard
const mockLeadsData = [
  {
    id: 1,
    name: "Vikram Desai",
    status: "New",
    lastContacted: "Not contacted",
    notes: "Interested in mutual funds",
  },
  {
    id: 2,
    name: "Meera Kapoor",
    status: "Contacted",
    lastContacted: "Yesterday",
    notes: "Follow up next week",
  },
  {
    id: 3,
    name: "Rahul Khanna",
    status: "Meeting",
    lastContacted: "3 days ago",
    notes: "Meeting scheduled for next Monday",
  },
  {
    id: 4,
    name: "Priya Malhotra",
    status: "Proposal",
    lastContacted: "1 week ago",
    notes: "Sent investment proposal, awaiting feedback",
  },
];

const mockTasksData = [
  {
    id: 1,
    title: "Follow up with Meera Kapoor",
    dueDate: "Today",
    priority: "High",
    status: "Pending",
  },
  {
    id: 2,
    title: "Prepare proposal for Rahul Khanna",
    dueDate: "Tomorrow",
    priority: "Medium",
    status: "In Progress",
  },
  {
    id: 3,
    title: "Submit KYC documents for Priya Malhotra",
    dueDate: "22 May 2023",
    priority: "Low",
    status: "Pending",
  },
];

const mockServiceRequestsData = [
  {
    id: "SR-2023-001",
    clientName: "Meera Kapoor",
    status: "Open",
    dateRaised: "18 May 2023",
  },
  {
    id: "SR-2023-002",
    clientName: "Rahul Khanna",
    status: "In Progress",
    dateRaised: "15 May 2023",
  },
];

export const RelationshipManagerDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("leads");
  const [isLeadDialogOpen, setIsLeadDialogOpen] = useState(false);
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [isServiceDialogOpen, setIsServiceDialogOpen] = useState(false);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Relationship Manager Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Manage your leads, clients, tasks, and service requests
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <KPICard
          title="Your AUM"
          value="₹82.5L"
          icon={<CreditCard size={24} />}
          trend={{ value: 5.2, isPositive: true, text: "vs last month" }}
        />
        <KPICard
          title="Leads Converted"
          value="4"
          icon={<BarChart3 size={24} />}
          trend={{ value: 33.3, isPositive: true, text: "vs last month" }}
        />
        <KPICard
          title="Tasks Due Today"
          value="1"
          icon={<Calendar size={24} />}
          className="bg-blue-50"
        />
      </div>

      <Tabs defaultValue="leads" value={selectedTab} onValueChange={setSelectedTab} className="mb-8">
        <TabsList className="grid grid-cols-3 w-full max-w-md mb-6">
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="service">Service Requests</TabsTrigger>
        </TabsList>
        
        <TabsContent value="leads">
          <SectionHeader 
            title="My Leads" 
            description="Manage your assigned leads"
            action={
              <Button 
                className="bg-financial-900 hover:bg-financial-800"
                onClick={() => setIsLeadDialogOpen(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Lead
              </Button>
            }
          />
          
          <Card className="shadow-sm">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="financial-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Status</th>
                      <th>Last Contacted</th>
                      <th>Notes</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockLeadsData.map((lead) => (
                      <tr key={lead.id}>
                        <td className="font-medium">{lead.name}</td>
                        <td>
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                            {lead.status}
                          </span>
                        </td>
                        <td>{lead.lastContacted}</td>
                        <td className="truncate max-w-[200px]">{lead.notes}</td>
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
        </TabsContent>
        
        <TabsContent value="tasks">
          <SectionHeader 
            title="My Tasks" 
            description="Manage your pending tasks"
            action={
              <Button 
                className="bg-financial-900 hover:bg-financial-800"
                onClick={() => setIsTaskDialogOpen(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
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
                      <th>Title</th>
                      <th>Due Date</th>
                      <th>Priority</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockTasksData.map((task) => (
                      <tr key={task.id}>
                        <td className="font-medium">{task.title}</td>
                        <td>
                          <span className={task.dueDate === "Today" ? "text-red-600 font-medium" : ""}>
                            {task.dueDate}
                          </span>
                        </td>
                        <td>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            task.priority === "High"
                              ? "bg-red-100 text-red-800"
                              : task.priority === "Medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}>
                            {task.priority}
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
                          <Button variant="outline" size="sm">
                            Mark Complete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="service">
          <SectionHeader 
            title="Service Requests" 
            description="Manage client service tickets"
            action={
              <Button 
                className="bg-financial-900 hover:bg-financial-800"
                onClick={() => setIsServiceDialogOpen(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Raise Ticket
              </Button>
            }
          />
          
          <Card className="shadow-sm">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="financial-table">
                  <thead>
                    <tr>
                      <th>Ticket ID</th>
                      <th>Client Name</th>
                      <th>Status</th>
                      <th>Date Raised</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockServiceRequestsData.map((ticket) => (
                      <tr key={ticket.id}>
                        <td className="font-medium">{ticket.id}</td>
                        <td>{ticket.clientName}</td>
                        <td>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            ticket.status === "Open"
                              ? "bg-yellow-100 text-yellow-800"
                              : ticket.status === "In Progress"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                          }`}>
                            {ticket.status}
                          </span>
                        </td>
                        <td>{ticket.dateRaised}</td>
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
        </TabsContent>
      </Tabs>

      {/* Add Lead Dialog */}
      <Dialog open={isLeadDialogOpen} onOpenChange={setIsLeadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Lead</DialogTitle>
            <DialogDescription>
              Enter lead details to create a new lead.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter lead name" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="email@example.com" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" placeholder="+91 98765 43210" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="investment-interest">Investment Interest</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select interest" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mutual_funds">Mutual Funds</SelectItem>
                    <SelectItem value="stocks">Stocks</SelectItem>
                    <SelectItem value="bonds">Bonds</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lead-source">Lead Source</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="referral">Referral</SelectItem>
                    <SelectItem value="website">Website</SelectItem>
                    <SelectItem value="event">Event</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea id="notes" placeholder="Add any additional notes" />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsLeadDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-financial-900 hover:bg-financial-800">
              Save Lead
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Task Dialog */}
      <Dialog open={isTaskDialogOpen} onOpenChange={setIsTaskDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
            <DialogDescription>
              Enter task details to create a new task.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Enter task title" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Enter task description" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="due-date">Due Date</Label>
                <Input id="due-date" type="date" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTaskDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-financial-900 hover:bg-financial-800">
              Create Task
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Raise Service Ticket Dialog */}
      <Dialog open={isServiceDialogOpen} onOpenChange={setIsServiceDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Raise Service Ticket</DialogTitle>
            <DialogDescription>
              Create a service ticket for a client issue.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="client">Client Name</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select client" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="meera_kapoor">Meera Kapoor</SelectItem>
                  <SelectItem value="rahul_khanna">Rahul Khanna</SelectItem>
                  <SelectItem value="priya_malhotra">Priya Malhotra</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="issue">Issue Description</Label>
              <Textarea id="issue" placeholder="Describe the issue" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="urgency">Urgency</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select urgency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsServiceDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-financial-900 hover:bg-financial-800">
              Submit Ticket
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
