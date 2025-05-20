
import React, { useState } from 'react';
import { MapPin, Plus, Star, Phone, Clock, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Resource {
  id: number;
  name: string;
  type: 'vet' | 'park' | 'store' | 'other';
  address: string;
  contact: string;
  hours?: string;
  description: string;
  addedBy: string;
}

const MOCK_RESOURCES: Resource[] = [
  {
    id: 1,
    name: "Dr. Sharma's Pet Clinic",
    type: 'vet',
    address: "24B, Jessore Road, North Dumdum",
    contact: "+91 98765 43210",
    hours: "Mon-Sat: 10AM - 8PM",
    description: "Full-service veterinary clinic with emergency services. Dr. Sharma specializes in both dog and cat care.",
    addedBy: "Priya M."
  },
  {
    id: 2,
    name: "Dumdum Park Pet Corner",
    type: 'park',
    address: "Dumdum Park, North Dumdum",
    contact: "N/A",
    hours: "Open 6AM - 9PM daily",
    description: "Dog-friendly area in Dumdum Park with waste stations and water facilities.",
    addedBy: "Rahul S."
  },
  {
    id: 3,
    name: "Paws & Claws Pet Supply",
    type: 'store',
    address: "12/3, Birati Main Road, North Dumdum",
    contact: "+91 87654 32109",
    hours: "10AM - 9PM daily",
    description: "Local pet store with food, toys, and basic medicines. They also carry specialty foods for pets with dietary restrictions.",
    addedBy: "Amit K."
  }
];

const getIconForType = (type: string) => {
  switch(type) {
    case 'vet': return <Star className="text-red-500" />;
    case 'park': return <Star className="text-green-500" />;
    case 'store': return <Star className="text-blue-500" />;
    default: return <Star className="text-gray-500" />;
  }
};

const ResourceMap = () => {
  const [resources] = useState<Resource[]>(MOCK_RESOURCES);

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
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Place Name</Label>
                <Input id="name" placeholder="Dr. Sharma's Veterinary Clinic" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type">Type</Label>
                <Select>
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
                <Input id="address" placeholder="Full address" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contact">Contact Info</Label>
                <Input id="contact" placeholder="Phone number, website, etc." />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description & Useful Info</Label>
                <Textarea id="description" placeholder="Tell us about this place..." />
              </div>
              <Button type="submit" className="w-full mt-2">Submit Resource</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Placeholder (Left Column on Desktop) */}
        <div className="lg:col-span-2 bg-muted rounded-xl border relative h-[350px] lg:h-auto">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center p-6">
              <MapPin size={48} className="mx-auto mb-4 text-primary opacity-50" />
              <h3 className="text-xl font-medium mb-2">Interactive Map Coming Soon</h3>
              <p className="text-muted-foreground">
                Help us build the most comprehensive pet resource map for North Dumdum!
              </p>
            </div>
          </div>
          
          {/* Sample Map Markers (Visual only) */}
          {resources.map((resource) => (
            <div key={resource.id} className="absolute" style={{
              top: `${20 + Math.random() * 60}%`, 
              left: `${20 + Math.random() * 60}%`
            }}>
              <div className="w-6 h-6 rounded-full bg-background border border-primary flex items-center justify-center">
                {getIconForType(resource.type)}
              </div>
            </div>
          ))}
        </div>
        
        {/* Resource List (Right Column on Desktop) */}
        <div className="h-[400px] lg:h-[500px] overflow-y-auto space-y-4 pr-2">
          {resources.map((resource) => (
            <div key={resource.id} className="border rounded-lg p-4 hover:border-primary">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">{resource.name}</h3>
                <div className="w-6 h-6 rounded-full bg-background border border-primary flex items-center justify-center">
                  {getIconForType(resource.type)}
                </div>
              </div>
              
              <p className="text-sm flex items-start gap-2 mb-1">
                <MapPin size={14} className="mt-1 flex-shrink-0" />
                <span>{resource.address}</span>
              </p>
              
              <p className="text-sm flex items-start gap-2 mb-1">
                <Phone size={14} className="mt-1 flex-shrink-0" />
                <span>{resource.contact}</span>
              </p>
              
              {resource.hours && (
                <p className="text-sm flex items-start gap-2 mb-1">
                  <Clock size={14} className="mt-1 flex-shrink-0" />
                  <span>{resource.hours}</span>
                </p>
              )}
              
              <p className="text-sm flex items-start gap-2 mt-2">
                <Info size={14} className="mt-1 flex-shrink-0" />
                <span>{resource.description}</span>
              </p>
              
              <p className="text-xs text-muted-foreground mt-2">
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
              {/* Same form as above */}
              <DialogHeader>
                <DialogTitle>Suggest a Local Gem in North Dumdum</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name2">Place Name</Label>
                  <Input id="name2" placeholder="Dr. Sharma's Veterinary Clinic" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="type2">Type</Label>
                  <Select>
                    <SelectTrigger id="type2">
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
                  <Label htmlFor="address2">Address in North Dumdum</Label>
                  <Input id="address2" placeholder="Full address" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="contact2">Contact Info</Label>
                  <Input id="contact2" placeholder="Phone number, website, etc." />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description2">Description & Useful Info</Label>
                  <Textarea id="description2" placeholder="Tell us about this place..." />
                </div>
                <Button type="submit" className="w-full mt-2">Submit Resource</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default ResourceMap;
