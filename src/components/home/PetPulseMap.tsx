import React, { useState, useEffect } from 'react';
import { MapPin, Info, Star, Phone, Clock, ArrowRight, Heart } from 'lucide-react'; // Added Heart
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // For info box

// Leaflet Icon Fix (same as before)
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface Resource {
  id: number;
  name: string;
  type: 'vet' | 'park' | 'store' | 'other';
  address: string;
  contact?: string;
  hours?: string;
  description: string;
  latitude: number;
  longitude: number;
}

const MOCK_HOME_MAP_RESOURCES: Resource[] = [ // Keep using this or fetch specific featured ones
  {
    id: 1,
    name: "Dr. Sharma's Pet Clinic",
    type: 'vet',
    address: "24B, Jessore Road, North Dumdum",
    contact: "+91 98765 43210",
    hours: "Mon-Sat: 10AM - 8PM",
    description: "Full-service veterinary clinic.",
    latitude: 22.6512,
    longitude: 88.4035
  },
  {
    id: 2,
    name: "Dumdum Park Pet Corner",
    type: 'park',
    address: "Dumdum Park, North Dumdum",
    description: "Dog-friendly area in Dumdum Park.",
    latitude: 22.6385,
    longitude: 88.3990
  },
  {
    id: 3,
    name: "Paws & Claws Pet Supply",
    type: 'store',
    address: "12/3, Birati Main Road, North Dumdum",
    contact: "+91 87654 32109",
    description: "Local pet store with food and toys.",
    latitude: 22.6700,
    longitude: 88.4300
  }
];

const getIconForMapMarker = (type: Resource['type']) => {
  switch(type) {
    case 'vet': return <Heart className="text-red-500 w-3 h-3 fill-red-500" />; // Filled for more impact
    case 'park': return <MapPin className="text-green-500 w-3 h-3 fill-green-500" />;
    case 'store': return <Star className="text-blue-500 w-3 h-3 fill-blue-500" />;
    default: return <MapPin className="text-gray-500 w-3 h-3 fill-gray-500" />;
  }
};

const PetPulseMap = () => {
  const [resources] = useState<Resource[]>(MOCK_HOME_MAP_RESOURCES);
  const northDumdumCenter: L.LatLngTuple = [22.647, 88.405];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-brand-light/30"> {/* Subtle gradient background */}
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <MapPin className="mx-auto h-16 w-16 text-primary mb-4 animate-bounce" /> {/* Added bounce animation */}
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            North Dumdum Pet Pulse Map
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover key pet resources, community spots, and upcoming events in your North Dumdum neighborhood.
          </p>
        </div>

        <Card className="relative rounded-xl overflow-hidden border-2 border-primary/20 shadow-2xl mb-10">
          <MapContainer center={northDumdumCenter} zoom={13} scrollWheelZoom={false} style={{ height: '450px', width: '100%' }} className="rounded-t-lg">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {resources.map((resource) => (
              <Marker key={resource.id} position={[resource.latitude, resource.longitude]}>
                <Popup>
                  <div className="w-64 p-1">
                    <div className="flex items-center mb-1.5">
                      <span className="p-1.5 bg-primary/10 rounded-md mr-2">{getIconForMapMarker(resource.type)}</span>
                      <h3 className="font-semibold text-base text-primary">{resource.name}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1 line-clamp-2">{resource.description}</p>
                    <p className="text-xs text-muted-foreground mb-1 flex items-center">
                      <MapPin size={12} className="mr-1 flex-shrink-0" /> {resource.address}
                    </p>
                    {resource.contact && (
                      <p className="text-xs text-muted-foreground flex items-center">
                        <Phone size={12} className="mr-1 flex-shrink-0" /> {resource.contact}
                      </p>
                    )}
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
          <div className="p-6 bg-slate-50 border-t border-primary/20 rounded-b-lg">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <Info size={24} className="text-brand-teal flex-shrink-0" />
                    <p className="text-sm text-foreground">
                        Our community map is growing! Help us add more pet-friendly spots in North Dumdum.
                    </p>
                </div>
                <Button asChild className="bg-brand-teal hover:bg-brand-teal/90 text-white w-full sm:w-auto flex-shrink-0">
                    <Link to="/network">
                        Explore & Contribute
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default PetPulseMap;

// Add to tailwind.config.ts if not already present:
// keyframes: {
//   bounce: {
//     '0%, 100%': { transform: 'translateY(-15%)', animationTimingFunction: 'cubic-bezier(0.8,0,1,1)' },
//     '50%': { transform: 'none', animationTimingFunction: 'cubic-bezier(0,0,0.2,1)' },
//   },
// },
// animation: {
//   bounce: 'bounce 1.5s infinite',
// }