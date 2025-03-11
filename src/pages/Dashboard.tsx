
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageTransition } from '@/components/layout/PageTransition';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { Transition } from '@/components/ui/transition';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Mail, FileText, Search, Globe, ArrowRight } from 'lucide-react';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const workflowTypes = [
    {
      id: 'emails',
      name: 'Emails',
      icon: Mail,
      description: 'Manage email automation workflows',
      count: 3,
    },
    {
      id: 'blog',
      name: 'Blog & SEO',
      icon: FileText,
      description: 'Automated content creation and SEO optimization',
      count: 2,
    },
    {
      id: 'leads',
      name: 'Lead Generation',
      icon: Search,
      description: 'Automated lead generation and qualification',
      count: 1,
    },
    {
      id: 'website',
      name: 'Website',
      icon: Globe,
      description: 'Website management and optimization',
      count: 2,
    },
  ];
  
  return (
    <PageTransition>
      <div className="min-h-screen flex w-full">
        <Navbar toggleSidebar={toggleSidebar} isAuthenticated={true} />
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        
        <main className={`flex-1 pt-16 transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
          <div className="container mx-auto p-4 md:p-6 max-w-7xl">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Project Dashboard</h1>
              <p className="text-muted-foreground">
                Select a workflow area to manage
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {workflowTypes.map((workflow, index) => (
                <Transition 
                  key={workflow.id}
                  type="fade"
                  delay={index * 100}
                >
                  <Card className="hover:shadow-md transition-all">
                    <CardHeader className="flex flex-row items-start justify-between pb-2">
                      <div>
                        <div className="flex items-center">
                          <workflow.icon className="h-5 w-5 text-primary mr-2" />
                          <CardTitle>{workflow.name}</CardTitle>
                        </div>
                        <CardDescription className="mt-1">
                          {workflow.description}
                        </CardDescription>
                      </div>
                      <Badge variant="outline" className="ml-2">
                        {workflow.count} workflows
                      </Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Configure and monitor your {workflow.name.toLowerCase()} automation workflows.
                      </p>
                    </CardContent>
                    <CardFooter className="border-t pt-4">
                      <Button className="ml-auto flex items-center gap-2" size="sm">
                        <span>Manage</span>
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </Transition>
              ))}
            </div>
          </div>
        </main>
      </div>
    </PageTransition>
  );
}
