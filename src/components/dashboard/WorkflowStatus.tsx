
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { WorkflowToggle } from '@/components/workflows/WorkflowToggle';
import { Transition } from '@/components/ui/transition';
import { CircleCheck, Workflow, Clock, AlertTriangle } from 'lucide-react';

interface WorkflowStatusProps {
  workflowStatuses: {
    id: string;
    name: string;
    active: boolean;
    status: 'running' | 'idle' | 'error';
    lastRun?: string;
  }[];
  onToggle: (id: string, active: boolean) => void;
}

export function WorkflowStatus({ workflowStatuses, onToggle }: WorkflowStatusProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {workflowStatuses.map((workflow, index) => (
        <Transition 
          key={workflow.id}
          type="scale"
          delay={index * 100}
        >
          <Card className="overflow-hidden border border-border h-full">
            <CardHeader className="pb-2 relative">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Workflow className="h-5 w-5 text-primary" />
                    {workflow.name}
                  </CardTitle>
                  <CardDescription>
                    {workflow.lastRun 
                      ? `Last run: ${workflow.lastRun}` 
                      : 'Not run yet'}
                  </CardDescription>
                </div>
                <WorkflowToggle 
                  checked={workflow.active} 
                  onCheckedChange={(checked) => onToggle(workflow.id, checked)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mt-2">
                {workflow.status === 'running' && (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
                    <CircleCheck className="h-3.5 w-3.5" />
                    <span>Running</span>
                  </Badge>
                )}
                {workflow.status === 'idle' && (
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span>Idle</span>
                  </Badge>
                )}
                {workflow.status === 'error' && (
                  <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 flex items-center gap-1">
                    <AlertTriangle className="h-3.5 w-3.5" />
                    <span>Error</span>
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        </Transition>
      ))}
    </div>
  );
}

export default WorkflowStatus;
