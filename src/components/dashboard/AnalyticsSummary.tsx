
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Transition } from '@/components/ui/transition';
import { BarChart, ActivityIcon, MailIcon, FileTextIcon } from 'lucide-react';

interface AnalyticsSummary {
  totalActions: number;
  emailsSent: number;
  blogsPublished: number;
  leadsScrapped: number;
}

interface AnalyticsSummaryProps {
  data: AnalyticsSummary;
}

export function AnalyticsSummary({ data }: AnalyticsSummaryProps) {
  const stats = [
    {
      name: 'Total Actions',
      value: data.totalActions,
      change: '+12%',
      icon: ActivityIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      name: 'Emails Sent',
      value: data.emailsSent,
      change: '+5%',
      icon: MailIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      name: 'Blogs Published',
      value: data.blogsPublished,
      change: '+18%',
      icon: FileTextIcon,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      name: 'Leads Generated',
      value: data.leadsScrapped,
      change: '+7%',
      icon: BarChart,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Transition 
          key={stat.name}
          type="scale"
          delay={index * 100}
        >
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
              <div className={`${stat.bgColor} p-2 rounded-full ${stat.color}`}>
                <stat.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <CardDescription className={stat.color}>
                {stat.change} from last week
              </CardDescription>
            </CardContent>
          </Card>
        </Transition>
      ))}
    </div>
  );
}

export default AnalyticsSummary;
