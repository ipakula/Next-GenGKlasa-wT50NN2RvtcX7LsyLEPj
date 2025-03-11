
import React, { useState } from 'react';
import  Navbar  from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { PageTransition } from '@/components/layout/PageTransition';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { DollarSign, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';

// Mock data
const costData = {
  totalCost: 28.75,
  projectedCost: 42.10,
  budget: 50.00,
  breakdown: [
    {
      service: "OpenAI API",
      cost: 15.40,
      change: 12,
    },
    {
      service: "GitHub Actions",
      cost: 5.25,
      change: -8,
    },
    {
      service: "Google API",
      cost: 8.10,
      change: 3,
    },
  ],
  history: [
    { date: '2023-06-01', openai: 12.5, github: 4.2, google: 6.8, other: 2.1 },
    { date: '2023-07-01', openai: 14.2, github: 4.8, google: 7.2, other: 2.3 },
    { date: '2023-08-01', openai: 13.8, github: 5.1, google: 6.5, other: 1.9 },
    { date: '2023-09-01', openai: 15.4, github: 5.2, google: 8.1, other: 2.2 },
  ],
  serviceDistribution: [
    { name: 'OpenAI API', value: 15.40, color: '#4f46e5' },
    { name: 'GitHub Actions', value: 5.25, color: '#0ea5e9' },
    { name: 'Google API', value: 8.10, color: '#10b981' },
    { name: 'Other Services', value: 2.10, color: '#f59e0b' },
  ],
  dailyUsage: [
    { name: 'Monday', tokens: 12500 },
    { name: 'Tuesday', tokens: 18700 },
    { name: 'Wednesday', tokens: 14900 },
    { name: 'Thursday', tokens: 21300 },
    { name: 'Friday', tokens: 16800 },
    { name: 'Saturday', tokens: 4200 },
    { name: 'Sunday', tokens: 3100 },
  ],
};

export default function Costs() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const formatCurrency = (value: number) => {
    return `$${value.toFixed(2)}`;
  };
  
  const costPercentOfBudget = (costData.totalCost / costData.budget) * 100;
  const projectedPercentOfBudget = (costData.projectedCost / costData.budget) * 100;
  
  return (
    <PageTransition>
      <div className="min-h-screen flex w-full">
        <Navbar toggleSidebar={toggleSidebar} isAuthenticated={true} />
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        
        <main className={`flex-1 pt-16 transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
          <div className="container mx-auto p-4 md:p-6 max-w-7xl">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Cost Management</h1>
              <p className="text-muted-foreground">
                Monitor and optimize the costs of your AI workflows
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Current Month Cost</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatCurrency(costData.totalCost)}</div>
                  <div className="flex justify-between items-center mt-2">
                    <CardDescription>
                      {costPercentOfBudget.toFixed(0)}% of budget
                    </CardDescription>
                    <Progress value={costPercentOfBudget} className="h-2 w-24" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Projected Cost</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatCurrency(costData.projectedCost)}</div>
                  <div className="flex justify-between items-center mt-2">
                    <CardDescription>
                      {projectedPercentOfBudget.toFixed(0)}% of budget
                    </CardDescription>
                    <Progress value={projectedPercentOfBudget} className="h-2 w-24" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Monthly Budget</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatCurrency(costData.budget)}</div>
                  <div className="mt-2">
                    <CardDescription>
                      {costData.budget > costData.projectedCost 
                        ? `${formatCurrency(costData.budget - costData.projectedCost)} remaining`
                        : `${formatCurrency(costData.projectedCost - costData.budget)} over budget`
                      }
                    </CardDescription>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="usage">Usage</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="md:col-span-2">
                    <CardHeader>
                      <CardTitle>Cost Trends</CardTitle>
                      <CardDescription>Monthly cost breakdown by service</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={costData.history}
                            margin={{
                              top: 5,
                              right: 30,
                              left: 20,
                              bottom: 5,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip formatter={(value) => [`$${value}`, 'Cost']} />
                            <Line type="monotone" dataKey="openai" stroke="#4f46e5" name="OpenAI API" />
                            <Line type="monotone" dataKey="github" stroke="#0ea5e9" name="GitHub Actions" />
                            <Line type="monotone" dataKey="google" stroke="#10b981" name="Google API" />
                            <Line type="monotone" dataKey="other" stroke="#f59e0b" name="Other" />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Cost Distribution</CardTitle>
                      <CardDescription>Current month by service</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={costData.serviceDistribution}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                              nameKey="name"
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            >
                              {costData.serviceDistribution.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value) => [`$${value}`, 'Cost']} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="services">
                <Card>
                  <CardHeader>
                    <CardTitle>Service Costs</CardTitle>
                    <CardDescription>Cost breakdown by service</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {costData.breakdown.map((service, index) => (
                        <div key={service.service} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <div className="font-medium">{service.service}</div>
                            <div className="font-bold">{formatCurrency(service.cost)}</div>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <div className="flex items-center">
                              {service.change > 0 ? (
                                <TrendingUp className="h-4 w-4 text-red-500 mr-1" />
                              ) : (
                                <TrendingDown className="h-4 w-4 text-green-500 mr-1" />
                              )}
                              <span className={service.change > 0 ? 'text-red-500' : 'text-green-500'}>
                                {service.change > 0 ? '+' : ''}{service.change}% from last month
                              </span>
                            </div>
                            <div className="text-muted-foreground">
                              {((service.cost / costData.totalCost) * 100).toFixed(0)}% of total
                            </div>
                          </div>
                          <Progress value={(service.cost / costData.totalCost) * 100} className="h-2" />
                        </div>
                      ))}
                      
                      <div className="pt-4 border-t">
                        <div className="flex justify-between items-center font-medium">
                          <div>Total Cost</div>
                          <div>{formatCurrency(costData.totalCost)}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="usage">
                <Card>
                  <CardHeader>
                    <CardTitle>Token Usage</CardTitle>
                    <CardDescription>OpenAI API token consumption</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={costData.dailyUsage}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip formatter={(value) => [`${value.toLocaleString()} tokens`, 'Usage']} />
                          <Bar dataKey="tokens" fill="#4f46e5" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="mt-6 p-4 bg-muted/50 rounded-md flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Cost Savings Tip</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          You could save approximately $5.30 per month by optimizing your prompts and reducing token usage.
                          Consider using more efficient system prompts or reducing the frequency of certain workflows.
                        </p>
                      </div>
                    </div>
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
