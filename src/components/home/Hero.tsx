
import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface ActionSnippet {
  id: number;
  type: string;
  text: string;
}

const MOCK_SNIPPETS: ActionSnippet[] = [
  { id: 1, type: 'event', text: 'Join our pet vaccination camp in Birati this Sunday!' },
  { id: 2, type: 'urgent', text: 'Temporary fosters needed for 5 puppies rescued from Dum Dum Park' },
  { id: 3, type: 'adoption', text: 'Raja - a 2 year old indie dog looking for a loving home in North Dumdum' },
  { id: 4, type: 'event', text: 'Pet care workshop at North Dumdum community center next Saturday' }
];

const Hero = () => {
  const [currentSnippet, setCurrentSnippet] = useState<ActionSnippet>(MOCK_SNIPPETS[0]);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        const nextIndex = MOCK_SNIPPETS.findIndex(s => s.id === currentSnippet.id) + 1;
        setCurrentSnippet(MOCK_SNIPPETS[nextIndex % MOCK_SNIPPETS.length]);
        setFade(false);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSnippet]);

  return (
    <section className="relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1548199973-03cce0bbc87b')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-primary/30"></div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-16 md:py-24 text-white">
        <div className="max-w-3xl animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Making North Dumdum Pawsome, Together!</h1>
          <p className="text-lg md:text-xl mb-8 text-white/90">
            Join our hyper-local community of pet lovers, rescuers and adopters making a difference in North Dumdum, West Bengal.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link to="/network">Explore North Dumdum Network</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/20">
              <Link to="/volunteer">Volunteer Locally</Link>
            </Button>
          </div>

          {/* Hyper-Local Action Snippet */}
          <div className="mt-12 p-4 border border-white/20 rounded-lg backdrop-blur-sm bg-black/30 max-w-2xl">
            <h3 className="text-sm font-medium uppercase text-white/70 mb-2">
              {currentSnippet.type === 'event' ? 'Upcoming Event' : 
               currentSnippet.type === 'urgent' ? 'Urgent Need' : 'Recent Adoption'}
            </h3>
            <p className={`text-lg transition-opacity duration-500 ${fade ? 'opacity-0' : 'opacity-100'}`}>
              {currentSnippet.text}
            </p>
            <Link to="/network" className="flex items-center gap-1 mt-2 text-sm text-primary-foreground hover:underline">
              <span>See more local updates</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
