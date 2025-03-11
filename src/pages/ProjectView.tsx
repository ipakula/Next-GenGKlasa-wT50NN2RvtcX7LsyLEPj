
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import  Navbar  from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { PageTransition } from '@/components/layout/PageTransition';
import { WorkflowStatus } from '@/components/dashboard/WorkflowStatus';
import { ActivityTable } from '@/components/dashboard/ActivityTable';
import { AnalyticsSummary } from '@/components/dashboard/AnalyticsSummary';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';

// Define proper types
type WorkflowStatusType = "running" | "idle" | "error";
type ActivityStatus = "completed" | "failed" | "in_progress";

interface Activity {
  id: string;
  agent: string;
  action: string;
  status: ActivityStatus;
  timestamp: string;
  duration: string;
  cost: number;
}

interface Project {
  id: string;
  name: string;
  description: string;
}

// Mock data
const mockProjects: Project[] = [
  { id: '1', name: 'Marketing Automation', description: 'Email campaigns, blog posts, and social media content' },
  { id: '2', name: 'Lead Generation', description: 'LinkedIn and Twitter lead scraping and qualification' },
  { id: '3', name: 'Content Creation', description: 'Automated blog post and newsletter generation' },
];

const mockWorkflows = [
  { id: 'email', name: 'Email Automation', active: true, status: 'running' as WorkflowStatusType, lastRun: 'Today, 2:30 PM' },
  { id: 'blog', name: 'Blog Automation', active: false, status: 'idle' as WorkflowStatusType, lastRun: 'Yesterday, 10:15 AM' },
  { id: 'leads', name: 'Lead Scraping', active: true, status: 'error' as WorkflowStatusType, lastRun: 'Today, 11:45 AM' },
];

const mockActivities: Activity[] = [
  { id: '1', agent: 'Email Agent', action: 'Sent weekly newsletter', status: 'completed' as ActivityStatus, timestamp: 'Today, 2:30 PM', duration: '45s', cost: 0.12 },
  { id: '2', agent: 'Blog Agent', action: 'Created draft article', status: 'completed' as ActivityStatus, timestamp: 'Yesterday, 10:15 AM', duration: '3m 20s', cost: 0.35 },
  { id: '3', agent: 'Lead Agent', action: 'Scraping LinkedIn profiles', status: 'failed' as ActivityStatus, timestamp: 'Today, 11:45 AM', duration: '1m 12s', cost: 0.08 },
  { id: '4', agent: 'Email Agent', action: 'Generating follow-up emails', status: 'in_progress' as ActivityStatus, timestamp: 'Now', duration: '30s', cost: 0.05 },
];

const mockAnalytics = {
  totalActions: 145,
  emailsSent: 78,
  blogsPublished: 12,
  leadsScrapped: 55,
};

export default function ProjectView() {
  const { id } = useParams<{ id: string }>();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [project, setProject] = useState<Project | null>(null);
  const [workflows, setWorkflows] = useState(mockWorkflows);
  const [activities, setActivities] = useState(mockActivities);
  const [analytics, setAnalytics] = useState(mockAnalytics);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    // In a real app, this would fetch project data from an API
    const foundProject = mockProjects.find(p => p.id === id) || null;
    setProject(foundProject);
  }, [id]);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const handleWorkflowToggle = (id: string, active: boolean) => {
    setWorkflows(prev => 
      prev.map(workflow => 
        workflow.id === id 
          ? { ...workflow, active, status: active ? 'running' as WorkflowStatusType : 'idle' as WorkflowStatusType } 
          : workflow
      )
    );
    
    toast({
      title: `${active ? 'Activated' : 'Deactivated'} workflow`,
      description: `The ${id} workflow has been ${active ? 'activated' : 'deactivated'}.`,
    });
  };
  
  const refreshActivities = () => {
    // In a real app, this would fetch from an API
    toast({
      title: "Refreshed",
      description: "Activity log has been refreshed.",
    });
  };
  
  if (!project) {
    return (
      <PageTransition>
        <div className="min-h-screen flex w-full">
          <Navbar toggleSidebar={toggleSidebar} isAuthenticated={true} />
          <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
          
          <main className={`flex-1 pt-16 transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
            <div className="container mx-auto p-4 md:p-6 max-w-7xl">
              <div className="flex items-center justify-center h-[70vh]">
                <p className="text-lg text-muted-foreground">Project not found or loading...</p>
              </div>
            </div>
          </main>
        </div>
      </PageTransition>
    );
  }
  
  return (
    <PageTransition>
      <div className="min-h-screen flex w-full">
        <Navbar toggleSidebar={toggleSidebar} isAuthenticated={true} />
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        
        <main className={`flex-1 pt-16 transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
          <div className="container mx-auto p-4 md:p-6 max-w-7xl">
            <div className="mb-8 flex items-start justify-between">
              <div>
                <div className="flex items-center mb-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="mr-2" 
                    onClick={() => navigate('/projects')}
                  >
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Back
                  </Button>
                  <h1 className="text-3xl font-bold">{project.name}</h1>
                </div>
                <p className="text-muted-foreground">
                  {project.description}
                </p>
              </div>
              
              <Link to="/dashboard">
                <Button variant="outline">Manage Workflows</Button>
              </Link>
            </div>
            
            <Tabs defaultValue="overview" className="mb-8">
              <TabsList className="mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="workflows">Workflows</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>
              <TabsContent value="overview">
                <h2 className="text-xl font-semibold mb-4">Analytics Overview</h2>
                <AnalyticsSummary data={analytics} />
              </TabsContent>
              <TabsContent value="workflows">
                <h2 className="text-xl font-semibold mb-4">Workflow Status</h2>
                <WorkflowStatus
                  workflowStatuses={workflows}
                  onToggle={handleWorkflowToggle}
                />
              </TabsContent>
              <TabsContent value="activity">
                <ActivityTable
                  activities={activities}
                  onRefresh={refreshActivities}
                  showCost={true}
                />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </PageTransition>
  );
}
