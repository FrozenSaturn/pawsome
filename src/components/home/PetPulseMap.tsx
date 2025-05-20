
import React from 'react';
import { MapPin, Info } from 'lucide-react';

const PetPulseMap = () => {
  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-3">North Dumdum Pet Pulse Map</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Discover pet resources, events and services in your North Dumdum neighborhood
        </p>
      </div>
      
      <div className="relative rounded-xl overflow-hidden border border-border bg-muted/30">
        {/* Map Placeholder */}
        <div className="h-[400px] bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
          <div className="text-center p-6 max-w-md">
            <MapPin size={48} className="mx-auto mb-4 text-primary opacity-50" />
            <h3 className="text-xl font-medium mb-2">Interactive Map Coming Soon</h3>
            <p className="text-muted-foreground mb-4">
              Our community-powered map will show vets, pet shops, adoption centers, and pet-friendly areas across North Dumdum.
            </p>
            <div className="inline-flex items-center gap-2 bg-background p-3 rounded-lg border">
              <Info size={16} className="text-secondary" />
              <span className="text-sm">Help us build this resource for North Dumdum!</span>
            </div>
          </div>
        </div>
        
        {/* Sample Map Markers (Visual only) */}
        <div className="absolute top-1/4 left-1/3">
          <div className="animate-pulse w-4 h-4 bg-primary rounded-full"></div>
        </div>
        <div className="absolute top-2/3 left-2/3">
          <div className="animate-pulse w-4 h-4 bg-primary rounded-full"></div>
        </div>
        <div className="absolute top-1/2 left-1/2">
          <div className="animate-pulse w-4 h-4 bg-primary rounded-full"></div>
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Want to suggest a pet-friendly location in North Dumdum? Join our network!
        </p>
      </div>
    </section>
  );
};

export default PetPulseMap;
