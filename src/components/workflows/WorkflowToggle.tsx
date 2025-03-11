
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface WorkflowToggleProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export function WorkflowToggle({
  checked,
  onCheckedChange,
  label,
  disabled = false,
}: WorkflowToggleProps) {
  return (
    <div className="flex items-center space-x-2">
      {label && <Label htmlFor="workflow-toggle">{label}</Label>}
      <Switch
        id="workflow-toggle"
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        className="data-[state=checked]:bg-primary"
      />
    </div>
  );
}

export default WorkflowToggle;
