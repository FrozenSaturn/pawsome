import React, { useState, useEffect } from 'react';
import { ArrowRight, UserCircle, CalendarDays, MapPin as MapPinIcon } from 'lucide-react'; // Renamed MapPin to avoid conflict
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge'; // Import Badge
import { Card } from '../ui/card';

interface ImpactStory {
  id: number;
  title: string;
  location: string;
  summary: string;
  image: string;
  author?: string;
  date?: string;
}

const FeaturedStory = () => {
  const [story, setStory] = useState<ImpactStory | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:3000/api/impact-stories');
        if (!response.ok) {
          let errorText = `Failed to fetch impact stories. Status: ${response.status}`;
          // ... (error handling as in previous FeaturedStory update) ...
          throw new Error(errorText);
        }
        const data = await response.json();
        if (data && data.length > 0) {
          setStory(data[0]);
        } else {
          setStory(null);
          setError('No impact stories available to feature.');
        }
      } catch (err: any) {
        console.error("Error in fetchStory:", err);
        setError(err.message || 'Could not load featured story.');
        setStory(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStory();
  }, []);

  if (isLoading) {
    // Skeleton remains the same
    return (
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 md:order-1">
              <Skeleton className="h-8 w-3/4 mb-4" />
              <Skeleton className="h-6 w-1/2 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4 mb-6" />
              <Skeleton className="h-10 w-48" />
            </div>
            <div className="order-1 md:order-2">
              <Skeleton className="rounded-xl aspect-square md:aspect-[4/5] w-full" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !story) {
    // Error display remains similar
    return (
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-5xl mx-auto text-center bg-red-50 border border-red-200 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-3 text-red-700">Featured Impact Story</h2>
          <p className="text-red-600">{error || "No featured story to display at the moment."}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <Badge variant="outline" className="text-sm uppercase tracking-wider border-primary text-primary py-1 px-3 mb-3">
                Real Stories, Real Impact
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Featured Community Story</h2>
            <p className="text-lg text-muted-foreground">Discover how our North Dumdum community comes together for our animal friends.</p>
          </div>

          <Card className="grid md:grid-cols-2 items-center overflow-hidden shadow-2xl border-transparent bg-gradient-to-br from-brand-light to-white"> {/* Updated card background */}
            <div className="order-2 md:order-1 p-6 md:p-8 lg:p-10">
              {story.location && (
                <div className="mb-3">
                  <Badge variant="secondary" className="bg-brand-teal text-brand-teal-foreground"> {/* Use brand.teal */}
                    <MapPinIcon size={14} className="mr-1.5" /> {story.location}
                  </Badge>
                </div>
              )}
              <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-foreground leading-tight">
                {story.title}
              </h3>
              <p className="text-muted-foreground text-md lg:text-lg mb-6 leading-relaxed line-clamp-5">
                {story.summary}
              </p>
              <div className="text-xs text-muted-foreground mb-6 space-y-1">
                {story.author && <p className="flex items-center"><UserCircle size={14} className="mr-1.5 text-primary"/> By {story.author}</p>}
                {story.date && <p className="flex items-center"><CalendarDays size={14} className="mr-1.5 text-primary"/> {new Date(story.date).toLocaleDateString()}</p>}
              </div>
              <Button asChild variant="default" size="lg" className="group bg-primary hover:bg-primary/90 text-primary-foreground text-base">
                <Link to={`/stories#story-${story.id}`} className="flex items-center gap-2"> {/* Link to specific story on stories page */}
                  <span>Read Full Story</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>

            <div className="order-1 md:order-2 h-64 md:h-full min-h-[300px] md:min-h-full">
              <img
                src={story.image || "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=80"}
                alt={story.title || "Featured story image"}
                className="w-full h-full object-cover "
              />
            </div>
          </Card>
           <div className="text-center mt-10">
                <Button variant="outline" asChild>
                    <Link to="/stories">View All Impact Stories</Link>
                </Button>
            </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedStory;