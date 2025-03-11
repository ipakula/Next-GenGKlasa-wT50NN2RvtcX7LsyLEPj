
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, LineChart } from '@/components/ui/chart';
import { Transition } from '@/components/ui/transition';
import { DollarSign, TrendingUp, TrendingDown, HelpCircle, Download } from 'lucide-react';

interface CostCategory {
  name: string;
  value: number;
  limit: number;
  color: string;
}

const mockCostData = {
  totalSpent: 124.50,
  previousPeriod: 110.25,
  forecastNextMonth: 135.75,
  categories: [
    { name: 'OpenAI API', value: 68.25, limit: 100, color: 'bg-blue-500' },
    { name: 'External APIs', value: 32.15, limit: 50, color: 'bg-purple-500' },
    { name: 'Mailing Service', value: 14.10, limit: 25, color: 'bg-green-500' },
    { name: 'Other', value: 10.00, limit: 30, color: 'bg-amber-500' },
  ],
  dailyData: [
    { day: '05/01', value: 3.25 },
    { day: '05/02', value: 4.10 },
    { day: '05/03', value: 2.75 },
    { day: '05/04', value: 5.20 },
    { day: '05/05', value: 3.90 },
    { day: '05/06', value: 4.30 },
    { day: '05/07', value: 3.10 },
  ],
  monthlyData: [
    { month: 'Jan', value: 85.40 },
    { month: 'Feb', value: 95.20 },
    { month: 'Mar', value: 110.25 },
    { month: 'Apr', value: 124.50 },
    { month: 'May', value: 0, forecast: 135.75 },
  ],
};

export function CostDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold">Cost Management</h1>
        <div className="flex items-center gap-2">
          <Select defaultValue="thisMonth">
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="thisMonth">This Month</SelectItem>
              <SelectItem value="lastMonth">Last Month</SelectItem>
              <SelectItem value="lastThreeMonths">Last 3 Months</SelectItem>
              <SelectItem value="thisYear">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" title="Export cost report">
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" title="Cost management help">
            <HelpCircle className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Transition type="fade" delay={0}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Spent
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <div className="flex items-baseline">
                  <DollarSign className="h-5 w-5 text-muted-foreground mr-1" />
                  <span className="text-3xl font-bold">{mockCostData.totalSpent.toFixed(2)}</span>
                </div>
                <div className="flex items-center">
                  {mockCostData.totalSpent > mockCostData.previousPeriod ? (
                    <>
                      <TrendingUp className="h-4 w-4 mr-1 text-red-500" />
                      <span className="text-sm text-red-500">
                        +{((mockCostData.totalSpent - mockCostData.previousPeriod) / mockCostData.previousPeriod * 100).toFixed(1)}%
                      </span>
                    </>
                  ) : (
                    <>
                      <TrendingDown className="h-4 w-4 mr-1 text-green-500" />
                      <span className="text-sm text-green-500">
                        -{((mockCostData.previousPeriod - mockCostData.totalSpent) / mockCostData.previousPeriod * 100).toFixed(1)}%
                      </span>
                    </>
                  )}
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Compared to ${mockCostData.previousPeriod.toFixed(2)} last period</p>
            </CardContent>
          </Card>
        </Transition>

        <Transition type="fade" delay={100}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Forecast (Next Month)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline">
                <DollarSign className="h-5 w-5 text-muted-foreground mr-1" />
                <span className="text-3xl font-bold">{mockCostData.forecastNextMonth.toFixed(2)}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Based on your current usage patterns</p>
            </CardContent>
          </Card>
        </Transition>

        <Transition type="fade" delay={200}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Daily Average
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline">
                <DollarSign className="h-5 w-5 text-muted-foreground mr-1" />
                <span className="text-3xl font-bold">
                  {(mockCostData.totalSpent / 30).toFixed(2)}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Over the last 30 days</p>
            </CardContent>
          </Card>
        </Transition>
      </div>

      <Tabs defaultValue="breakdown">
        <TabsList className="mb-4">
          <TabsTrigger value="breakdown">Cost Breakdown</TabsTrigger>
          <TabsTrigger value="daily">Daily Costs</TabsTrigger>
          <TabsTrigger value="monthly">Monthly Trend</TabsTrigger>
        </TabsList>
        
        <TabsContent value="breakdown">
          <Card>
            <CardHeader>
              <CardTitle>Cost Breakdown</CardTitle>
              <CardDescription>
                View your costs by category and usage limits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {mockCostData.categories.map((category, index) => (
                  <Transition key={category.name} type="fade" delay={index * 100}>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{category.name}</span>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">${category.value.toFixed(2)}</span>
                          <span className="text-muted-foreground text-xs">of ${category.limit.toFixed(2)}</span>
                        </div>
                      </div>
                      <Progress 
                        value={(category.value / category.limit) * 100} 
                        className="h-2" 
                      />
                    </div>
                  </Transition>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="daily">
          <Card>
            <CardHeader>
              <CardTitle>Daily Cost Trend</CardTitle>
              <CardDescription>
                View your daily costs for the current period
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BarChart 
                data={mockCostData.dailyData.map(d => ({
                  name: d.day,
                  value: d.value
                }))}
                index="name"
                categories={["value"]}
                colors={["blue"]}
                valueFormatter={(value) => `$${value.toFixed(2)}`}
                yAxisWidth={60}
                className="mt-6 h-72"
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="monthly">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Cost Trend</CardTitle>
              <CardDescription>
                View your costs over the past months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LineChart 
                data={mockCostData.monthlyData.map(d => ({
                  month: d.month,
                  Actual: d.value,
                  Forecast: d.forecast || null
                }))}
                index="month"
                categories={["Actual", "Forecast"]}
                colors={["blue", "gray"]}
                valueFormatter={(value) => `$${value.toFixed(2)}`}
                yAxisWidth={60}
                className="mt-6 h-72"
              />
            </CardContent>
            <CardFooter className="border-t pt-4">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">Note:</span> Forecast is based on historical data and may vary.
              </p>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default CostDashboard;
