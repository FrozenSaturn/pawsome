import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface ActionSnippet {
  id: number;
  type: string;
  text: string;
}

const Hero = () => {
  const [actionSnippets, setActionSnippets] = useState<ActionSnippet[]>([]);
  const [currentSnippetIndex, setCurrentSnippetIndex] = useState(0);
  const [fade, setFade] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/action-snippets');
        if (!response.ok) {
          throw new Error('Failed to fetch action snippets');
        }
        const data = await response.json();
        if (data && data.length > 0) {
          setActionSnippets(data);
        } else {
          setActionSnippets([{ id: 0, type: 'info', text: 'Welcome to Pawsome Dumdum Connect!' }]); // Default if empty
        }
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Could not load local updates.');
        setActionSnippets([{ id: 0, type: 'error', text: 'Could not load local updates.' }]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSnippets();
  }, []);

  useEffect(() => {
    if (actionSnippets.length <= 1) return;

    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setCurrentSnippetIndex(prevIndex => (prevIndex + 1) % actionSnippets.length);
        setFade(false);
      }, 500); // Fade transition duration
    }, 5000); // Time each snippet is shown

    return () => clearInterval(interval);
  }, [actionSnippets]);

  const currentSnippet = actionSnippets[currentSnippetIndex];

  const getSnippetTypeLabel = (type: string) => {
    switch (type?.toLowerCase()) {
      case 'event': return 'Upcoming Event';
      case 'urgent': return 'Urgent Need';
      case 'adoption': return 'Recent Adoption';
      case 'info': return 'Quick Update';
      case 'error': return 'System Alert';
      default: return 'Local Update';
    }
  };

  return (
    <section className="relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1548199973-03cce0bbc87b')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-primary/40"></div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-20 md:py-32 text-white">
        <div className="max-w-3xl animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">Making North Dumdum Pawsome, Together!</h1>
          <p className="text-lg md:text-xl mb-10 text-white/95">
            Join our hyper-local community of pet lovers, rescuers and adopters making a difference in North Dumdum, West Bengal.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-6">
              <Link to="/network">Explore Network</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/20 text-lg px-8 py-6">
              <Link to="/volunteer">Volunteer Locally</Link>
            </Button>
          </div>

          {/* Hyper-Local Action Snippet */}
          <div className="p-4 border border-white/30 rounded-lg backdrop-blur-sm bg-black/40 max-w-2xl min-h-[100px]">
            {isLoading ? (
              <p className="text-lg text-white/80">Loading local updates...</p>
            ) : error ? (
              <>
                <h3 className="text-sm font-medium uppercase text-red-400 mb-1">
                  {getSnippetTypeLabel(currentSnippet?.type)}
                </h3>
                <p className="text-lg text-red-300">{currentSnippet?.text}</p>
              </>
            ) : currentSnippet ? (
              <>
                <h3 className="text-sm font-medium uppercase text-white/70 mb-1">
                  {getSnippetTypeLabel(currentSnippet.type)}
                </h3>
                <p className={`text-lg transition-opacity duration-500 ${fade ? 'opacity-0' : 'opacity-100'}`}>
                  {currentSnippet.text}
                </p>
                <Link to="/network" className="flex items-center gap-1 mt-2 text-sm text-primary-foreground hover:underline">
                  <span>See more local updates</span>
                  <ArrowRight size={14} />
                </Link>
              </>
            ) : (
              <p className="text-lg text-white/80">No local updates at the moment.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;