
import React from 'react';
import { Users, Heart, Calendar, Home, Share2, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HelpOptionProps {
  icon: React.ElementType;
  title: string;
  description: string;
  className?: string;
}

const HelpOption = ({ icon: Icon, title, description, className }: HelpOptionProps) => (
  <div className={cn(
    "p-6 rounded-xl transition-all hover-scale", 
    className || "bg-accent/50"
  )}>
    <div className="mb-4 rounded-full bg-brand-orange/10 p-3 w-fit">
      <Icon className="text-brand-orange" size={24} />
    </div>
    <h3 className="font-semibold text-lg mb-2">{title}</h3>
    <p className="text-muted-foreground text-sm">{description}</p>
  </div>
);

const HowToHelp = () => {
  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-3">How You Can Help Locally</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          There are many ways to make a difference for pets in North Dumdum. Choose what works best for you!
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <HelpOption 
          icon={Users} 
          title="Adopt a Local Pet"
          description="Give a forever home to a North Dumdum rescue. Check our local adoption listings."
          className="bg-brand-light"
        />
        
        <HelpOption 
          icon={Heart} 
          title="Volunteer Your Time"
          description="Offer your skills and time to help pets in North Dumdum and surrounding areas."
          className="bg-accent/50"
        />
        
        <HelpOption 
          icon={Calendar} 
          title="Join Local Groups"
          description="Connect with fellow North Dumdum pet lovers for meetups, walks and discussions."
          className="bg-brand-light"
        />
        
        <HelpOption 
          icon={Home} 
          title="Foster Temporarily"
          description="Provide a temporary home for pets in need in the North Dumdum area."
          className="bg-accent/50"
        />
        
        <HelpOption 
          icon={Share2} 
          title="Share Local Resources"
          description="Add pet-friendly places and services in North Dumdum to our community map."
          className="bg-brand-light"
        />
        
        <HelpOption 
          icon={MessageCircle} 
          title="Spread The Word"
          description="Share adoption posts and success stories from our North Dumdum community."
          className="bg-accent/50"
        />
      </div>
    </section>
  );
};

export default HowToHelp;
