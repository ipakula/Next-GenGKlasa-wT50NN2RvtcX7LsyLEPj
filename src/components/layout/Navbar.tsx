
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LogIn, Menu, Home } from 'lucide-react';

interface NavbarProps {
  toggleSidebar?: () => void;
  isAuthenticated?: boolean;
}

export function Navbar({ toggleSidebar, isAuthenticated = false }: NavbarProps) {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';
  const isProjectView = location.pathname.startsWith('/projects/');
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border px-4 lg:px-8 py-4 transition-all duration-300">
      <div className="flex justify-between items-center mx-auto max-w-7xl">
        <div className="flex items-center gap-4">
          {!isLandingPage && isAuthenticated && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden" 
              onClick={toggleSidebar}
              aria-label="Toggle sidebar"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
          <Link 
            to="/" 
            className="flex items-center gap-2"
          >
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold">NS</span>
            </div>
            <span className="font-medium">NeuriStartup</span>
          </Link>
        </div>
        
        <div className="flex items-center gap-2">
          {isLandingPage || !isAuthenticated ? (
            <Link to="/login">
              <Button className="flex items-center gap-2">
                <LogIn className="h-4 w-4" />
                <span>Login</span>
              </Button>
            </Link>
          ) : (
            <>
              {isProjectView && (
                <Link to="/" className="mr-4">
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Home className="h-4 w-4" />
                    <span>Landing Page</span>
                  </Button>
                </Link>
              )}
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center cursor-pointer">
                <span className="text-primary-foreground font-medium">U</span>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
