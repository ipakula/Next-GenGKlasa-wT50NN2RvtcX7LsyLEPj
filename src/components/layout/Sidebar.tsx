
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Settings,
  DollarSign,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const location = useLocation();
  
  const menuItems = [
    {
      name: 'Projects',
      path: '/projects',
      icon: LayoutDashboard,
    },
    {
      name: 'Settings',
      path: '/settings',
      icon: Settings,
    },
    {
      name: 'Costs',
      path: '/costs',
      icon: DollarSign,
    },
  ];
  
  const isActive = (path: string) => {
    if (path === '/projects' && (location.pathname === '/projects' || location.pathname.startsWith('/projects/'))) {
      return true;
    }
    return location.pathname === path;
  };
  
  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 z-40 h-full w-64 pt-16 transition-all duration-300 ease-in-out bg-sidebar border-r border-sidebar-border",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0 md:w-20"
      )}
    >
      <div className="flex flex-col h-full py-6">
        <Button 
          variant="ghost" 
          size="icon" 
          className={cn(
            "absolute top-4 right-4 md:hidden", 
            !isOpen && "hidden"
          )} 
          onClick={toggleSidebar}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className={cn(
            "hidden md:block absolute top-4 right-0 translate-x-1/2 bg-sidebar border border-sidebar-border rounded-full", 
          )} 
          onClick={toggleSidebar}
        >
          {isOpen ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button>
        
        <TooltipProvider>
          <nav className="space-y-1.5 flex-1 overflow-y-auto px-3">
            {menuItems.map((item) => {
              const active = isActive(item.path);
              
              return (
                <Tooltip key={item.path}>
                  <TooltipTrigger asChild>
                    <Link
                      to={item.path}
                      className={cn(
                        "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        active ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
                        !isOpen && "justify-center"
                      )}
                    >
                      <item.icon className={cn("h-5 w-5", !isOpen && "mx-auto")} />
                      {isOpen && <span className="ml-3">{item.name}</span>}
                    </Link>
                  </TooltipTrigger>
                  {!isOpen && (
                    <TooltipContent side="right">
                      <p>{item.name}</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              );
            })}
          </nav>
        </TooltipProvider>
        
        <div className={cn("px-3 py-4", !isOpen && "text-center")}>
          <div className={cn("px-3 py-2 text-xs text-sidebar-foreground/60", !isOpen && "hidden")}>
            <p>NeuriStartup</p>
            <p>v1.0.0</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
