
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Transition } from '@/components/ui/transition';
import { Check, Clock, AlertTriangle, MoreVertical, RefreshCw, DollarSign } from 'lucide-react';

type ActivityStatus = 'completed' | 'in_progress' | 'failed';

interface Activity {
  id: string;
  agent: string;
  action: string;
  status: ActivityStatus;
  timestamp: string;
  duration: string;
  cost?: number; // Optional cost field
}

interface ActivityTableProps {
  activities: Activity[];
  onRefresh: () => void;
  showCost?: boolean; // Optional prop to show/hide cost column
}

export function ActivityTable({ activities, onRefresh, showCost = false }: ActivityTableProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Activity</CardTitle>
        <Button variant="outline" size="sm" onClick={onRefresh}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agent</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Duration</TableHead>
                {showCost && <TableHead>Cost</TableHead>}
                <TableHead className="w-[60px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activities.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={showCost ? 7 : 6} className="text-center h-32 text-muted-foreground">
                    No activity recorded yet
                  </TableCell>
                </TableRow>
              ) : (
                activities.map((activity, index) => (
                  <Transition 
                    key={activity.id}
                    type="fade"
                    delay={index * 50}
                  >
                    <TableRow>
                      <TableCell className="font-medium">{activity.agent}</TableCell>
                      <TableCell>{activity.action}</TableCell>
                      <TableCell>
                        {activity.status === 'completed' && (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1 w-fit">
                            <Check className="h-3.5 w-3.5" />
                            <span>Completed</span>
                          </Badge>
                        )}
                        {activity.status === 'in_progress' && (
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 flex items-center gap-1 w-fit">
                            <Clock className="h-3.5 w-3.5" />
                            <span>In Progress</span>
                          </Badge>
                        )}
                        {activity.status === 'failed' && (
                          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 flex items-center gap-1 w-fit">
                            <AlertTriangle className="h-3.5 w-3.5" />
                            <span>Failed</span>
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>{activity.timestamp}</TableCell>
                      <TableCell>{activity.duration}</TableCell>
                      {showCost && (
                        <TableCell>
                          <div className="flex items-center text-sm">
                            <DollarSign className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                            <span>{activity.cost?.toFixed(2) || '0.00'}</span>
                          </div>
                        </TableCell>
                      )}
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>View details</DropdownMenuItem>
                            <DropdownMenuItem>Retry action</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  </Transition>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

export default ActivityTable;
