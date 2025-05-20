
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PlaceholderPageProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
}

const PlaceholderPage = ({ title, description, icon, className }: PlaceholderPageProps) => {
  return (
    <div className={cn("min-h-[70vh] flex flex-col items-center justify-center px-4", className)}>
      <div className="text-center max-w-md">
        <div className="mx-auto mb-6 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          {icon}
        </div>
        <h1 className="text-3xl font-bold mb-3">{title}</h1>
        <p className="text-muted-foreground mb-6">
          {description}
        </p>
        <Button asChild variant="outline" className="flex items-center gap-2">
          <Link to="/">
            <ArrowLeft size={16} />
            <span>Return to Home</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default PlaceholderPage;
