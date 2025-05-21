import React, { useState, useEffect } from 'react';
import { MapPin, Plus, Star, Phone, Clock, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Ensure Leaflet's CSS is imported if not globally available via index.html
import L from 'leaflet'; // Import L for custom icons if needed, or for LatLng type
import { ZAxis } from 'recharts';

// Fix for default Leaflet icon issue with Webpack/Vite
// You might need to copy these icon images to your public folder
// or use a CDN if they don't load correctly.
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
  contact: string;
  hours?: string;
  description: string;
  addedBy: string;
  latitude: number; // Added latitude
  longitude: number; // Added longitude
}

// Updated Mock Resources with approximate coordinates for North Dumdum area
const MOCK_RESOURCES_WITH_COORDS: Resource[] = [
  {
    id: 1,
    name: "Dr. Sharma's Pet Clinic",
    type: 'vet',
    address: "24B, Jessore Road, North Dumdum",
    contact: "+91 98765 43210",
    hours: "Mon-Sat: 10AM - 8PM",
    description: "Full-service veterinary clinic with emergency services. Dr. Sharma specializes in both dog and cat care.",
    addedBy: "Priya M.",
    latitude: 22.6512, // Approximate
    longitude: 88.4035 // Approximate
  },
  {
    id: 2,
    name: "Dumdum Park Pet Corner",
    type: 'park',
    address: "Dumdum Park, North Dumdum",
    contact: "N/A",
    hours: "Open 6AM - 9PM daily",
    description: "Dog-friendly area in Dumdum Park with waste stations and water facilities.",
    addedBy: "Rahul S.",
    latitude: 22.6385, // Approximate
    longitude: 88.3990 // Approximate
  },
  {
    id: 3,
    name: "Paws & Claws Pet Supply",
    type: 'store',
    address: "12/3, Birati Main Road, North Dumdum",
    contact: "+91 87654 32109",
    hours: "10AM - 9PM daily",
    description: "Local pet store with food, toys, and basic medicines. They also carry specialty foods for pets with dietary restrictions.",
    addedBy: "Amit K.",
    latitude: 22.6700, // Approximate (Birati is a bit further North)
    longitude: 88.4300 // Approximate
  },
  {
    id: 4,
    name: "North Dumdum Veterinary Hospital (Govt.)",
    type: 'vet',
    address: "Near North Dumdum Municipality Office",
    contact: "N/A (Check Municipality)",
    hours: "Daytime hours",
    description: "Government veterinary hospital offering subsidized services.",
    addedBy: "Community Update",
    latitude: 22.6450, // Approximate
    longitude: 88.4050  // Approximate
  }
];

const getIconForType = (type: Resource['type']) => {
  switch(type) {
    case 'vet': return <Star className="text-red-500 w-4 h-4" />;
    case 'park': return <Star className="text-green-500 w-4 h-4" />;
    case 'store': return <Star className="text-blue-500 w-4 h-4" />;
    default: return <Star className="text-gray-500 w-4 h-4" />;
  }
};

// For custom marker icons (optional, default blue marker will be used otherwise)
const createLeafletIcon = (type: Resource['type']) => {
  let iconUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png'; // Default
  // You can customize icons based on type here if you have different image files
  // For simplicity, we'll use default icons but you could color them or use different images.
  // Example:
  // if (type === 'vet') iconUrl = '/icons/vet-marker.png';

  return new L.Icon({
    iconUrl: iconUrl,
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
};


const ResourceMap = () => {
  const [resources, setResources] = useState<Resource[]>(MOCK_RESOURCES_WITH_COORDS);
  // TODO: Replace with API call to fetch resources from backend
  // useEffect(() => {
  //   fetch('http://localhost:3000/api/resources') // Assuming you create this endpoint
  //     .then(res => res.json())
  //     .then(data => setResources(data))
  //     .catch(err => console.error("Failed to fetch resources", err));
  // }, []);

  const northDumdumCenter: L.LatLngTuple = [22.647, 88.405]; // Adjusted center a bit

  // State for the "Add Resource" dialog
  const [newResourceName, setNewResourceName] = useState('');
  const [newResourceType, setNewResourceType] = useState<Resource['type'] | ''>('');
  const [newResourceAddress, setNewResourceAddress] = useState('');
  const [newResourceContact, setNewResourceContact] = useState('');
  const [newResourceDescription, setNewResourceDescription] = useState('');
  // For a real app, you'd also get lat/lng for new resources, perhaps via a map click or geocoding service

  const handleAddResource = async (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (!newResourceName || !newResourceType || !newResourceAddress) {
      alert("Please fill in Name, Type, and Address.");
      return;
    }
    const newResourceData = {
      name: newResourceName,
      type: newResourceType,
      address: newResourceAddress,
      contact: newResourceContact,
      description: newResourceDescription,
      // In a real app, you'd geocode the address here or get lat/lng from map interaction
      // For mock, let's add it near the map center or require manual input
      latitude: northDumdumCenter[0] + (Math.random() - 0.5) * 0.01, // Randomize slightly
      longitude: northDumdumCenter[1] + (Math.random() - 0.5) * 0.01,
      addedBy: "User Input", // Or get logged-in user
      id: Date.now() // Temporary ID
    };

    // TODO: POST to backend API
    // For now, just update local state
    setResources(prev => [...prev, newResourceData as Resource]);

    // Reset form (optional: close dialog)
    setNewResourceName('');
    setNewResourceType('');
    setNewResourceAddress('');
    // ... reset other fields
    console.log("New resource submitted (locally):", newResourceData);
    // Here you would typically close the dialog: find a way to control Dialog's open state
  };


  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Community-Curated North Dumdum Resource Map</h2>
          <p className="text-muted-foreground">Find and share local pet resources</p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus size={16} />
              <span>Add Resource</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Suggest a Local Gem in North Dumdum</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddResource} className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Place Name</Label>
                <Input id="name" placeholder="Dr. Sharma's Veterinary Clinic" value={newResourceName} onChange={e => setNewResourceName(e.target.value)} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type">Type</Label>
                <Select onValueChange={(value) => setNewResourceType(value as Resource['type'])} value={newResourceType} required>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vet">Veterinary Clinic</SelectItem>
                    <SelectItem value="park">Pet-Friendly Park</SelectItem>
                    <SelectItem value="store">Pet Store</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Address in North Dumdum</Label>
                <Input id="address" placeholder="Full address" value={newResourceAddress} onChange={e => setNewResourceAddress(e.target.value)} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contact">Contact Info</Label>
                <Input id="contact" placeholder="Phone number, website, etc." value={newResourceContact} onChange={e => setNewResourceContact(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description & Useful Info</Label>
                <Textarea id="description" placeholder="Tell us about this place..." value={newResourceDescription} onChange={e => setNewResourceDescription(e.target.value)} />
              </div>
              {/* Add Lat/Lng fields for now if not using map click to set */}
              <Button type="submit" className="w-full mt-2">Submit Resource</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Container (Left Column on Desktop) */}
        <div className="lg:col-span-2 bg-muted rounded-xl border relative h-[400px] lg:h-[500px] overflow-hidden">
          <MapContainer center={northDumdumCenter} zoom={14} scrollWheelZoom={true} style={{ height: '100%', width: '100%', zIndex:0 }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {resources.map((resource) => (
              <Marker key={resource.id} position={[resource.latitude, resource.longitude]} icon={createLeafletIcon(resource.type)}>
                <Popup>
                  <div className="text-sm">
                    <h3 className="font-bold text-base mb-1">{resource.name}</h3>
                    <p className="flex items-start gap-1 mb-0.5">
                      <MapPin size={12} className="mt-0.5 flex-shrink-0" />
                      <span>{resource.address}</span>
                    </p>
                    <p className="flex items-center gap-1 mb-0.5">
                      <Phone size={12} className="flex-shrink-0" />
                      <span>{resource.contact || "N/A"}</span>
                    </p>
                    {resource.hours && (
                      <p className="flex items-center gap-1 mb-0.5">
                        <Clock size={12} className="flex-shrink-0" />
                        <span>{resource.hours}</span>
                      </p>
                    )}
                    <p className="text-xs mt-1">{resource.description}</p>
                    <p className="text-xs text-muted-foreground mt-2">Added by: {resource.addedBy}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Resource List (Right Column on Desktop) */}
        <div className="h-[400px] lg:h-[500px] overflow-y-auto space-y-4 pr-2">
          {resources.length === 0 && <p className="text-muted-foreground">No resources found. Be the first to add one!</p>}
          {resources.map((resource) => (
            <div key={resource.id} className="border rounded-lg p-4 hover:border-primary bg-card">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-md">{resource.name}</h3>
                <div className="w-6 h-6 rounded-full bg-background border border-primary/30 flex items-center justify-center p-0.5">
                  {getIconForType(resource.type)}
                </div>
              </div>

              <p className="text-sm flex items-start gap-2 mb-1 text-muted-foreground">
                <MapPin size={14} className="mt-0.5 flex-shrink-0 text-primary" />
                <span>{resource.address}</span>
              </p>

              <p className="text-sm flex items-start gap-2 mb-1 text-muted-foreground">
                <Phone size={14} className="mt-0.5 flex-shrink-0 text-primary" />
                <span>{resource.contact || "N/A"}</span>
              </p>

              {resource.hours && (
                <p className="text-sm flex items-start gap-2 mb-1 text-muted-foreground">
                  <Clock size={14} className="mt-0.5 flex-shrink-0 text-primary" />
                  <span>{resource.hours}</span>
                </p>
              )}

              <p className="text-sm flex items-start gap-2 mt-2 text-muted-foreground">
                <Info size={14} className="mt-0.5 flex-shrink-0 text-primary" />
                <span>{resource.description}</span>
              </p>

              <p className="text-xs text-muted-foreground/70 mt-3">
                Added by: {resource.addedBy}
              </p>
            </div>
          ))}

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full mt-4">
                <Plus size={16} className="mr-2" />
                Suggest a Local Gem
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
               {/* Form is reused, so no need to duplicate the onSubmit logic here if it's the same */}
              <DialogHeader>
                <DialogTitle>Suggest a Local Gem in North Dumdum</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddResource} className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name-dialog">Place Name</Label>
                  <Input id="name-dialog" placeholder="Dr. Sharma's Veterinary Clinic" value={newResourceName} onChange={e => setNewResourceName(e.target.value)} required/>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="type-dialog">Type</Label>
                   <Select onValueChange={(value) => setNewResourceType(value as Resource['type'])} value={newResourceType} required>
                    <SelectTrigger id="type-dialog">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vet">Veterinary Clinic</SelectItem>
                      <SelectItem value="park">Pet-Friendly Park</SelectItem>
                      <SelectItem value="store">Pet Store</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="address-dialog">Address in North Dumdum</Label>
                  <Input id="address-dialog" placeholder="Full address" value={newResourceAddress} onChange={e => setNewResourceAddress(e.target.value)} required/>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="contact-dialog">Contact Info</Label>
                  <Input id="contact-dialog" placeholder="Phone number, website, etc." value={newResourceContact} onChange={e => setNewResourceContact(e.target.value)} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description-dialog">Description & Useful Info</Label>
                  <Textarea id="description-dialog" placeholder="Tell us about this place..." value={newResourceDescription} onChange={e => setNewResourceDescription(e.target.value)} />
                </div>
                <Button type="submit" className="w-full mt-2">Submit Resource</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default ResourceMap;