
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const FeaturedStory = () => {
  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold mb-3">Featured Impact Story</h2>
            <div className="mb-4">
              <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                Birati, North Dumdum
              </span>
            </div>
            <h3 className="text-xl font-semibold mb-3">
              Luna's Journey: From Streets to Forever Home
            </h3>
            <p className="text-muted-foreground mb-4">
              When Luna was found injured near Birati Railway Station in North Dumdum, local volunteers rallied together. Through community support, she received medical care, rehabilitation, and eventually found her forever family right here in North Dumdum.
            </p>
            <Button asChild variant="outline" className="group">
              <Link to="/stories" className="flex items-center gap-1">
                <span>Read full story</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
          
          <div className="order-1 md:order-2">
            <div className="rounded-xl overflow-hidden border aspect-square md:aspect-[4/5] bg-muted relative">
              <img 
                src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&h=1000" 
                alt="Luna - rescued dog from North Dumdum" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white">
                <p className="text-sm">Luna with her new family in North Dumdum</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedStory;
