import React, { useState, useEffect } from 'react';
import { MapPin, Info, Star, Phone, Clock, ArrowRight } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

// Fix for default Leaflet icon issue with Webpack/Vite
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

// Using a subset or same mock data as ResourceMap for now.
// Ideally, this might fetch different data or featured locations.
const MOCK_HOME_MAP_RESOURCES: Resource[] = [
  {
    id: 1,
    name: "Dr. Sharma's Pet Clinic",
    type: 'vet',
    address: "24B, Jessore Road",
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
    address: "Dumdum Park",
    description: "Dog-friendly area in Dumdum Park.",
    latitude: 22.6385,
    longitude: 88.3990
  },
  {
    id: 3,
    name: "Paws & Claws Pet Supply",
    type: 'store',
    address: "12/3, Birati Main Road",
    contact: "+91 87654 32109",
    description: "Local pet store with food and toys.",
    latitude: 22.6700,
    longitude: 88.4300
  }
];

const getIconForType = (type: Resource['type']) => {
  // This function can be imported from a shared utils file if it's identical to the one in ResourceMap.tsx
  switch(type) {
    case 'vet': return <Star className="text-red-500 w-3 h-3" />;
    case 'park': return <Star className="text-green-500 w-3 h-3" />;
    case 'store': return <Star className="text-blue-500 w-3 h-3" />;
    default: return <Star className="text-gray-500 w-3 h-3" />;
  }
};

const PetPulseMap = () => {
  const [resources, setResources] = useState<Resource[]>(MOCK_HOME_MAP_RESOURCES);
  // In a real app, you might fetch specific "featured" resources for the home page
  // useEffect(() => {
  //   fetch('http://localhost:3000/api/featured-resources') // Example endpoint
  //     .then(res => res.json())
  //     .then(data => setResources(data))
  //     .catch(err => console.error("Failed to fetch home page resources", err));
  // }, []);

  const northDumdumCenter: L.LatLngTuple = [22.647, 88.405]; // Centered on North Dumdum

  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">North Dumdum Pet Pulse</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Discover key pet resources and community spots in your North Dumdum neighborhood.
        </p>
      </div>

      <div className="relative rounded-xl overflow-hidden border-2 border-primary/20 shadow-xl">
        <MapContainer center={northDumdumCenter} zoom={13} scrollWheelZoom={false} style={{ height: '450px', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {resources.map((resource) => (
            <Marker key={resource.id} position={[resource.latitude, resource.longitude]}>
              <Popup>
                <div className="w-64 p-1">
                  <div className="flex items-center mb-1.5">
                    <span className="p-1.5 bg-primary/10 rounded-md mr-2">{getIconForType(resource.type)}</span>
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
      </div>

      <div className="mt-8 text-center">
        <Button asChild size="lg">
          <Link to="/network">
            Explore Full Network & Add Resources
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default PetPulseMap;