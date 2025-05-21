import React, { useState, useEffect } from 'react';
import { ArrowRight, Info as InfoIcon, AlertTriangle, CheckCircle, Heart } from 'lucide-react'; // Added icons
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton'; // For loading state

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
        const response = await fetch('http://localhost:3000/api/action-snippets'); // Absolute URL
        if (!response.ok) {
          throw new Error('Failed to fetch action snippets');
        }
        const data = await response.json();
        if (data && data.length > 0) {
          setActionSnippets(data);
        } else {
          setActionSnippets([{ id: 0, type: 'info', text: 'Welcome to Pawsome Dumdum Connect! Explore local pet resources.' }]);
        }
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Could not load local updates.');
        setActionSnippets([{ id: 0, type: 'error', text: 'Could not load local updates at the moment.' }]);
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
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, [actionSnippets]);

  const currentSnippet = actionSnippets[currentSnippetIndex];

  const getSnippetInfo = (type?: string): { label: string; icon: React.ElementType; colorClass: string } => {
    switch (type?.toLowerCase()) {
      case 'event': return { label: 'Upcoming Event', icon: CheckCircle, colorClass: 'text-brand-teal' }; // Using brand.teal
      case 'urgent': return { label: 'Urgent Need', icon: AlertTriangle, colorClass: 'text-destructive' };
      case 'adoption': return { label: 'Adoption Alert', icon: ArrowRight, colorClass: 'text-brand-orange' }; // Using brand.orange
      case 'info': return { label: 'Quick Update', icon: InfoIcon, colorClass: 'text-blue-400' };
      case 'error': return { label: 'System Alert', icon: AlertTriangle, colorClass: 'text-red-400' };
      default: return { label: 'Local Update', icon: InfoIcon, colorClass: 'text-muted-foreground' };
    }
  };

  const snippetInfo = currentSnippet ? getSnippetInfo(currentSnippet.type) : getSnippetInfo('info');


  return (
    <section className="relative text-white overflow-hidden min-h-[70vh] md:min-h-[80vh] flex items-center">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1548199973-03cce0bbc87b')] bg-cover bg-center animate-kenburns">
        {/* Kenburns effect requires adding this animation to tailwind.config.ts if not already present:
        keyframes: { kenburns: { '0%': { transform: 'scale(1) translate(0,0)' }, '100%': { transform: 'scale(1.1) translate(-2%, 1%)' } } },
        animation: { kenburns: 'kenburns 30s ease-out infinite alternate' } */}
      </div>
      <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-slate-900/70 to-primary/30"></div> {/* Adjusted overlay */}

      <div className="relative container mx-auto px-4 py-16 md:py-24 z-10">
        <div className="max-w-3xl animate-fade-in text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 !leading-tight shadow-black/50 text-shadow-lg">
            Making North Dumdum <br className="hidden sm:block" />Pawsome, Together!
          </h1>
          <p className="text-lg md:text-xl mb-10 text-gray-200 leading-relaxed max-w-2xl mx-auto md:mx-0">
            Join our hyper-local community of pet lovers, rescuers, and adopters making a real difference in North Dumdum, West Bengal.
          </p>

          <div className="flex flex-col sm:flex-row justify-center md:justify-start items-center gap-4 mb-16">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-3 shadow-lg transform hover:scale-105 transition-transform duration-150 w-full sm:w-auto">
              <Link to="/network">
                <ArrowRight className="mr-2 h-5 w-5" /> Explore Network
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-black hover:bg-white/20 hover:text-white text-lg px-8 py-3 shadow-lg transform hover:scale-105 transition-transform duration-150 w-full sm:w-auto">
              <Link to="/volunteer">
                <Heart className="mr-2 h-5 w-5" /> Volunteer Locally
              </Link>
            </Button>
          </div>

          <div className="mt-12 p-5 border border-white/20 rounded-xl backdrop-blur-md bg-slate-800/50 max-w-xl mx-auto md:mx-0 shadow-2xl">
            {isLoading ? (
              <div className="flex items-center space-x-3">
                <Skeleton className="h-6 w-6 rounded-full bg-slate-700" />
                <Skeleton className="h-4 w-3/4 bg-slate-700" />
              </div>
            ) : currentSnippet ? (
              <>
                <div className={`flex items-center text-sm font-semibold uppercase ${snippetInfo.colorClass} mb-2`}>
                  <snippetInfo.icon size={18} className="mr-2" />
                  {snippetInfo.label}
                </div>
                <p className={`text-lg text-gray-100 transition-opacity duration-300 ease-in-out ${fade ? 'opacity-0' : 'opacity-100'}`}>
                  {currentSnippet.text}
                </p>
                {!error && (
                  <Link to="/network" className="group text-sm text-primary-foreground/80 hover:text-primary-foreground hover:underline flex items-center gap-1 mt-3 transition-colors">
                    <span>See more updates</span>
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                )}
              </>
            ) : (
              <p className="text-lg text-gray-300">No local updates at the moment.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

// Add to tailwind.config.ts for text-shadow and kenburns:
// const plugin = require('tailwindcss/plugin')
//
// theme: {
//   extend: {
//     textShadow: {
//       DEFAULT: '0 2px 4px rgba(0,0,0,0.10)',
//       sm: '0 1px 2px rgba(0,0,0,0.10)',
//       lg: '0 4px 8px rgba(0,0,0,0.10)',
//     },
//     keyframes: {
//       kenburns: {
//         '0%': { transform: 'scale(1) translate(0,0)', filter: 'brightness(1)' },
//         '50%': { filter: 'brightness(1.05)'},
//         '100%': { transform: 'scale(1.1) translate(-2%, 1%)', filter: 'brightness(1)' },
//       },
//     },
//     animation: {
//       kenburns: 'kenburns 40s ease-out infinite alternate',
//     },
//   }
// },
// plugins: [
//   plugin(function({ matchUtilities, theme }) {
//     matchUtilities(
//       { 'text-shadow': (value) => ({ textShadow: value, }), },
//       { values: theme('textShadow') }
//     )
//   }),
// ]