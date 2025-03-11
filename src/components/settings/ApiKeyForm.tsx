
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Loader2, Lock } from 'lucide-react';

interface ApiKeyFormProps {
  title: string;
  description: string;
  keyName: string;
  apiKey?: string;
  onSave: (key: string) => void;
}

export function ApiKeyForm({ title, description, keyName, apiKey = '', onSave }: ApiKeyFormProps) {
  const [key, setKey] = useState(apiKey);
  const [showKey, setShowKey] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!key) {
      toast({
        title: "Key is required",
        description: `Please enter your ${keyName} key.`,
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSave(key);
      
      toast({
        title: "API Key saved",
        description: `Your ${keyName} key has been saved successfully.`,
      });
    } catch (error) {
      toast({
        title: "Failed to save API Key",
        description: "An error occurred while saving your API key. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <form onSubmit={handleSave}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor={keyName.toLowerCase().replace(' ', '-')}>
                {keyName} Key
              </Label>
              <div className="relative">
                <Input
                  id={keyName.toLowerCase().replace(' ', '-')}
                  type={showKey ? "text" : "password"}
                  placeholder={`Enter your ${keyName} API key`}
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full"
                  onClick={() => setShowKey(!showKey)}
                >
                  {showKey ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-xs text-muted-foreground flex items-center">
            <Lock className="h-3 w-3 mr-1" />
            Your API keys are encrypted and securely stored
          </div>
          <Button 
            type="submit" 
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving
              </>
            ) : (
              "Save Key"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

export default ApiKeyForm;
