
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';

interface IntegrationCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
  configurable?: boolean;
  configPath?: string;
}

export function IntegrationCard({
  title,
  description,
  icon,
  enabled,
  onToggle,
  configurable = false,
  configPath,
}: IntegrationCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div className="space-y-1">
          <CardTitle className="flex items-center">
            <span className="mr-2">{icon}</span>
            {title}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <Switch
          checked={enabled}
          onCheckedChange={onToggle}
          className="data-[state=checked]:bg-primary"
        />
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground">
          {enabled
            ? "Integration is active and connected."
            : "Integration is currently disabled."}
        </div>
      </CardContent>
      {configurable && configPath && (
        <CardFooter>
          <Button variant="outline" size="sm" asChild className="ml-auto">
            <Link to={configPath}>
              Configure
              <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}

export default IntegrationCard;
