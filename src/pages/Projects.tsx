
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import  Navbar  from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { PageTransition } from '@/components/layout/PageTransition';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Transition } from '@/components/ui/transition';
import { PlusCircle, LayoutGrid, List, Workflow, Clock, DollarSign } from 'lucide-react';

// Define project type
interface Project {
  id: string;
  name: string;
  description: string;
  activeWorkflows: number;
  lastActivity: string;
  monthlyCost: number;
}

// Mock data for projects
const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Marketing Automation',
    description: 'Email campaigns, blog posts, and social media content',
    activeWorkflows: 3,
    lastActivity: 'Today, 3:15 PM',
    monthlyCost: 24.50,
  },
  {
    id: '2',
    name: 'Lead Generation',
    description: 'LinkedIn and Twitter lead scraping and qualification',
    activeWorkflows: 2,
    lastActivity: 'Yesterday, 11:30 AM',
    monthlyCost: 18.75,
  },
  {
    id: '3',
    name: 'Content Creation',
    description: 'Automated blog post and newsletter generation',
    activeWorkflows: 1,
    lastActivity: '3 days ago',
    monthlyCost: 12.20,
  },
];

export default function Projects() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [projects, setProjects] = useState(mockProjects);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <PageTransition>
      <div className="min-h-screen flex w-full">
        <Navbar toggleSidebar={toggleSidebar} isAuthenticated={true} />
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        
        <main className={`flex-1 pt-16 transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
          <div className="container mx-auto p-4 md:p-6 max-w-7xl">
            <div className="mb-8 flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold mb-2">Projects</h1>
                <p className="text-muted-foreground">
                  Manage your AI-powered workflow projects
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-secondary rounded-md flex">
                  <Button 
                    variant={viewMode === 'grid' ? 'secondary' : 'ghost'} 
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-r-none"
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant={viewMode === 'list' ? 'secondary' : 'ghost'} 
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
                <Button className="flex items-center gap-2">
                  <PlusCircle className="h-4 w-4" />
                  <span>New Project</span>
                </Button>
              </div>
            </div>
            
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((project, index) => (
                  <Transition 
                    key={project.id}
                    type="scale"
                    delay={index * 100}
                  >
                    <Link to={`/projects/${project.id}`} className="block h-full">
                      <Card className="h-full hover:shadow-md transition-all">
                        <CardHeader>
                          <CardTitle>{project.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground mb-4">
                            {project.description}
                          </p>
                          <div className="flex flex-col space-y-2">
                            <div className="flex items-center text-sm">
                              <Workflow className="h-4 w-4 mr-2 text-primary" />
                              <span>{project.activeWorkflows} active workflows</span>
                            </div>
                            <div className="flex items-center text-sm">
                              <Clock className="h-4 w-4 mr-2 text-primary" />
                              <span>Last activity: {project.lastActivity}</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="border-t pt-4">
                          <div className="flex items-center text-sm font-medium">
                            <DollarSign className="h-4 w-4 mr-1 text-primary" />
                            <span>${project.monthlyCost.toFixed(2)}/month</span>
                          </div>
                        </CardFooter>
                      </Card>
                    </Link>
                  </Transition>
                ))}
              </div>
            ) : (
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium text-sm">Project Name</th>
                      <th className="px-4 py-3 text-left font-medium text-sm">Active Workflows</th>
                      <th className="px-4 py-3 text-left font-medium text-sm">Last Activity</th>
                      <th className="px-4 py-3 text-left font-medium text-sm">Monthly Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map((project, index) => (
                      <Transition 
                        key={project.id}
                        type="fade"
                        delay={index * 50}
                        className="block w-full"
                      >
                        <tr className="border-t hover:bg-muted/50">
                          <td className="px-4 py-3">
                            <Link to={`/projects/${project.id}`} className="block">
                              <div className="font-medium">{project.name}</div>
                              <div className="text-sm text-muted-foreground">{project.description}</div>
                            </Link>
                          </td>
                          <td className="px-4 py-3 align-middle">{project.activeWorkflows}</td>
                          <td className="px-4 py-3 align-middle">{project.lastActivity}</td>
                          <td className="px-4 py-3 align-middle">${project.monthlyCost.toFixed(2)}</td>
                        </tr>
                      </Transition>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </PageTransition>
  );
}
