import React from 'react';
import { Users, Heart, CalendarDays as Calendar, Home, Share2, MessageCircle } from 'lucide-react'; // CalendarDays is more specific
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Using Shadcn Card

interface HelpOptionProps {
  icon: React.ElementType;
  title: string;
  description: string;
  className?: string;
  iconBgClass?: string;
  iconColorClass?: string;
}

const HelpOption = ({ icon: Icon, title, description, className, iconBgClass, iconColorClass }: HelpOptionProps) => (
  <Card className={cn(
    "text-center transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 border-border/50",
    className // Allows passing bg-brand-light or bg-accent/50 etc.
  )}>
    <CardHeader className="items-center pt-8 pb-4">
      <div className={cn("mb-4 rounded-full p-4 w-fit transition-colors", iconBgClass || 'bg-primary/10')}>
        <Icon className={cn("h-8 w-8", iconColorClass || 'text-primary')} size={32} />
      </div>
      <CardTitle className="text-xl font-semibold text-foreground">{title}</CardTitle>
    </CardHeader>
    <CardContent className="pb-8">
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </CardContent>
  </Card>
);

const HowToHelp = () => {
  const helpOptionsData: HelpOptionProps[] = [
    {
      icon: Users,
      title: "Adopt a Local Pet",
      description: "Give a forever home to a North Dumdum rescue. Browse our adoption listings and change a life.",
      className: "bg-brand-light hover:border-brand-orange/50",
      iconBgClass: "bg-brand-orange/10",
      iconColorClass: "text-brand-orange",
    },
    {
      icon: Heart,
      title: "Volunteer Your Time",
      description: "Offer your skills and time for fostering, transport, or events in North Dumdum and nearby areas.",
      className: "bg-accent/10 hover:border-accent/50", // Using theme accent
      iconBgClass: "bg-accent/20",
      iconColorClass: "text-accent-foreground", // Adjusted for accent bg
    },
    {
      icon: Calendar,
      title: "Join Local Groups",
      description: "Connect with fellow North Dumdum pet lovers for meetups, walks, and community discussions.",
      className: "bg-brand-light hover:border-brand-orange/50",
      iconBgClass: "bg-brand-teal/10", // Using brand.teal
      iconColorClass: "text-brand-teal",
    },
    {
      icon: Home,
      title: "Foster Temporarily",
      description: "Provide a safe, temporary haven for pets in need within the North Dumdum area until they find a forever home.",
      className: "bg-accent/10 hover:border-accent/50",
      iconBgClass: "bg-accent/20",
      iconColorClass: "text-accent-foreground",
    },
    {
      icon: Share2,
      title: "Share Local Resources",
      description: "Add pet-friendly places, vets, and services in North Dumdum to our community-powered map.",
      className: "bg-brand-light hover:border-brand-orange/50",
      iconBgClass: "bg-primary/10",
      iconColorClass: "text-primary",
    },
    {
      icon: MessageCircle,
      title: "Spread The Word",
      description: "Share adoption posts, urgent needs, and success stories from our North Dumdum community network.",
      className: "bg-accent/10 hover:border-accent/50",
      iconBgClass: "bg-brand-yellow/20", // Using brand.yellow
      iconColorClass: "text-yellow-600", // Darker yellow text for contrast
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            How You Can Help Locally in North Dumdum
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Every action, big or small, contributes to a better life for pets in our community. Discover how you can make an impact!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {helpOptionsData.map((option) => (
            <HelpOption
              key={option.title}
              icon={option.icon}
              title={option.title}
              description={option.description}
              className={option.className}
              iconBgClass={option.iconBgClass}
              iconColorClass={option.iconColorClass}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowToHelp;