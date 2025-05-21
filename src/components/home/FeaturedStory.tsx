import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react'; // Ensure ArrowRight is imported
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';

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
        // Use the absolute URL for your backend
        const response = await fetch('http://localhost:3000/api/impact-stories');
        if (!response.ok) {
          // Try to get a more specific error message if the response is not ok
          let errorText = `Failed to fetch impact stories. Status: ${response.status}`;
          try {
            const errorData = await response.json(); // Try to parse as JSON
            errorText = errorData.error || errorData.message || errorText;
          } catch (e) {
            // If not JSON, it might be HTML, try to get text
            const textError = await response.text();
            // Avoid showing full HTML in error, check if it's a short message or generic HTML
            if (textError && textError.length < 200 && !textError.trim().toLowerCase().startsWith('<!doctype html')) {
              errorText = textError;
            } else {
                console.error("Received HTML error page instead of JSON:", textError.substring(0,500) + "...");
            }
          }
          throw new Error(errorText);
        }
        const data = await response.json();
        if (data && data.length > 0) {
          setStory(data[0]); // Display the first story as featured
        } else {
          setStory(null); // Explicitly set to null if no stories
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
    return (
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 md:order-1">
              <Skeleton className="h-8 w-3/4 mb-4" /> {/* Adjusted margin */}
              <Skeleton className="h-6 w-1/2 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4 mb-6" /> {/* Adjusted margin */}
              <Skeleton className="h-10 w-48" /> {/* Adjusted width */}
            </div>
            <div className="order-1 md:order-2">
              <Skeleton className="rounded-xl aspect-square md:aspect-[4/5] w-full" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  // If there's an error OR if there's no story after loading (e.g., API returned empty array)
  if (error || !story) {
    return (
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-5xl mx-auto text-center bg-red-50 border border-red-200 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-3 text-red-700">Featured Impact Story</h2>
          <p className="text-red-600">{error || "No featured story to display at the moment."}</p>
           {error && error.includes("Status: 404") && (
            <p className="text-sm text-red-500 mt-2">
              It seems the API endpoint for stories (`/api/impact-stories`) was not found on the server.
            </p>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Featured Impact Story</h2>
            {story.location && (
              <div className="mb-4">
                <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                  {story.location}
                </span>
              </div>
            )}
            <h3 className="text-2xl font-semibold mb-4 text-gray-700">
              {story.title}
            </h3>
            <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
              {story.summary}
            </p>
            <Button asChild variant="outline" className="group text-base py-3 px-6">
              <Link to="/stories" className="flex items-center gap-2">
                <span>Read Full Story & More</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          <div className="order-1 md:order-2">
            <div className="rounded-xl overflow-hidden border-2 border-primary/20 shadow-lg aspect-square md:aspect-[4/5] bg-muted relative group">
              <img
                src={story.image || "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&h=1000"}
                alt={story.title || "Featured story image"}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 md:p-6 text-white">
                <p className="text-sm md:text-base font-medium">{story.title}</p>
                 {story.author && story.date && <p className="text-xs opacity-80">By {story.author} - {story.date}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedStory;