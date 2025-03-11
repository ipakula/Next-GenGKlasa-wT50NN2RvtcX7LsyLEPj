
import React, { useState } from 'react';
import  Navbar  from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { PageTransition } from '@/components/layout/PageTransition';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { FileJson, Cloud, Bot, ArrowRight, Key, Save } from 'lucide-react';

export default function Settings() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { toast } = useToast();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const handleSaveSettings = (category: string) => {
    toast({
      title: "Settings saved",
      description: `${category} settings have been updated successfully.`,
    });
  };
  
  return (
    <PageTransition>
      <div className="min-h-screen flex w-full">
        <Navbar toggleSidebar={toggleSidebar} isAuthenticated={true} />
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        
        <main className={`flex-1 pt-16 transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
          <div className="container mx-auto p-4 md:p-6 max-w-7xl">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Settings</h1>
              <p className="text-muted-foreground">
                Configure API keys, integrations, and workflow parameters
              </p>
            </div>
            
            <Tabs defaultValue="api-keys" className="space-y-4">
              <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-2 md:grid-cols-4 gap-2">
                <TabsTrigger value="api-keys" className="flex items-center gap-2">
                  <Key className="h-4 w-4" />
                  <span>API Keys</span>
                </TabsTrigger>
                <TabsTrigger value="integrations" className="flex items-center gap-2">
                  <Cloud className="h-4 w-4" />
                  <span>Integrations</span>
                </TabsTrigger>
                <TabsTrigger value="workflows" className="flex items-center gap-2">
                  <FileJson className="h-4 w-4" />
                  <span>Workflows</span>
                </TabsTrigger>
                <TabsTrigger value="ai-params" className="flex items-center gap-2">
                  <Bot className="h-4 w-4" />
                  <span>AI Parameters</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="api-keys">
                <Card>
                  <CardHeader>
                    <CardTitle>API Keys</CardTitle>
                    <CardDescription>
                      Manage API keys for external services
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <div className="font-medium">OpenAI API Key</div>
                      <div className="text-sm text-muted-foreground mb-2">
                        Used for generating content with ChatGPT and other OpenAI models
                      </div>
                      <div className="flex gap-2">
                        <Input type="password" placeholder="sk-..." className="flex-1" />
                        <Button onClick={() => handleSaveSettings("API Keys")}>Save</Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="font-medium">Google Sheets API</div>
                      <div className="text-sm text-muted-foreground mb-2">
                        Used for storing waitlist signups and other data
                      </div>
                      <div className="grid gap-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm mb-1 block">Client ID</label>
                            <Input placeholder="Google client ID" />
                          </div>
                          <div>
                            <label className="text-sm mb-1 block">Client Secret</label>
                            <Input type="password" placeholder="Google client secret" />
                          </div>
                        </div>
                        <div>
                          <label className="text-sm mb-1 block">Sheet ID</label>
                          <Input placeholder="Google sheet ID" />
                        </div>
                        <Button className="w-fit" onClick={() => handleSaveSettings("Google Sheets")}>Save Google Sheets Settings</Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="font-medium">GitHub Token</div>
                      <div className="text-sm text-muted-foreground mb-2">
                        Used for publishing content to GitHub repositories
                      </div>
                      <div className="flex gap-2">
                        <Input type="password" placeholder="GitHub personal access token" className="flex-1" />
                        <Button onClick={() => handleSaveSettings("GitHub Token")}>Save</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="integrations">
                <Card>
                  <CardHeader>
                    <CardTitle>External Integrations</CardTitle>
                    <CardDescription>
                      Connect to external services for expanded functionality
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <Card className="border border-muted">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Email Service</CardTitle>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <p className="text-sm text-muted-foreground mb-4">Connect to an email service provider for sending automated emails.</p>
                          <div className="flex justify-between items-center">
                            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Not Connected</Badge>
                            <Button size="sm" variant="outline">
                              <span>Connect</span>
                              <ArrowRight className="h-4 w-4 ml-1" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="border border-muted">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">GitHub</CardTitle>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <p className="text-sm text-muted-foreground mb-4">Connect to GitHub for automated content publishing.</p>
                          <div className="flex justify-between items-center">
                            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Not Connected</Badge>
                            <Button size="sm" variant="outline">
                              <span>Connect</span>
                              <ArrowRight className="h-4 w-4 ml-1" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="border border-muted">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Social Media</CardTitle>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <p className="text-sm text-muted-foreground mb-4">Connect to social media platforms for content distribution.</p>
                          <div className="flex justify-between items-center">
                            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Not Connected</Badge>
                            <Button size="sm" variant="outline">
                              <span>Connect</span>
                              <ArrowRight className="h-4 w-4 ml-1" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="workflows">
                <Card>
                  <CardHeader>
                    <CardTitle>Workflow Configuration</CardTitle>
                    <CardDescription>
                      Configure parameters for each workflow type
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="font-medium">Email Automation</div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm mb-1 block">Email Frequency</label>
                          <select className="w-full border border-input px-3 py-2 rounded-md">
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="biweekly">Bi-weekly</option>
                            <option value="monthly">Monthly</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-sm mb-1 block">Time of Day</label>
                          <Input type="time" defaultValue="09:00" />
                        </div>
                      </div>
                      <Button onClick={() => handleSaveSettings("Email Workflow")}>
                        <Save className="h-4 w-4 mr-2" />
                        Save Email Settings
                      </Button>
                    </div>
                    
                    <div className="border-t pt-6 space-y-4">
                      <div className="font-medium">Blog Automation</div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm mb-1 block">Publication Frequency</label>
                          <select className="w-full border border-input px-3 py-2 rounded-md">
                            <option value="weekly">Weekly</option>
                            <option value="biweekly">Bi-weekly</option>
                            <option value="monthly">Monthly</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-sm mb-1 block">Target Word Count</label>
                          <Input type="number" defaultValue="1000" min="500" max="3000" step="100" />
                        </div>
                      </div>
                      <Button onClick={() => handleSaveSettings("Blog Workflow")}>
                        <Save className="h-4 w-4 mr-2" />
                        Save Blog Settings
                      </Button>
                    </div>
                    
                    <div className="border-t pt-6 space-y-4">
                      <div className="font-medium">Lead Scraping</div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm mb-1 block">Sources</label>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <Badge className="cursor-pointer">LinkedIn</Badge>
                            <Badge className="cursor-pointer bg-muted text-muted-foreground">Twitter</Badge>
                            <Badge className="cursor-pointer bg-muted text-muted-foreground">Reddit</Badge>
                            <Badge className="cursor-pointer">Google</Badge>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm mb-1 block">Search Frequency</label>
                          <select className="w-full border border-input px-3 py-2 rounded-md">
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                          </select>
                        </div>
                      </div>
                      <Button onClick={() => handleSaveSettings("Lead Scraping Workflow")}>
                        <Save className="h-4 w-4 mr-2" />
                        Save Lead Scraping Settings
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="ai-params">
                <Card>
                  <CardHeader>
                    <CardTitle>AI Parameters</CardTitle>
                    <CardDescription>
                      Configure AI model parameters for content generation
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="font-medium">Content Generation</div>
                        <div>
                          <label className="text-sm mb-1 block">Preferred Model</label>
                          <select className="w-full border border-input px-3 py-2 rounded-md">
                            <option value="gpt-4o">GPT-4o</option>
                            <option value="gpt-4">GPT-4</option>
                            <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-sm mb-1 block">Temperature</label>
                          <Input type="range" min="0" max="1" step="0.1" defaultValue="0.7" />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Precise (0.0)</span>
                            <span>Creative (1.0)</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="font-medium">Writing Style</div>
                        <div>
                          <label className="text-sm mb-1 block">Tone</label>
                          <select className="w-full border border-input px-3 py-2 rounded-md">
                            <option value="professional">Professional</option>
                            <option value="friendly">Friendly & Conversational</option>
                            <option value="enthusiastic">Enthusiastic</option>
                            <option value="authoritative">Authoritative</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-sm mb-1 block">Content Length</label>
                          <select className="w-full border border-input px-3 py-2 rounded-md">
                            <option value="short">Short (250-500 words)</option>
                            <option value="medium">Medium (500-1000 words)</option>
                            <option value="long">Long (1000-2000 words)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <Button onClick={() => handleSaveSettings("AI Parameters")}>
                      <Save className="h-4 w-4 mr-2" />
                      Save AI Settings
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </PageTransition>
  );
}

// We need to add Badge component for this file
import { Badge } from "@/components/ui/badge";
