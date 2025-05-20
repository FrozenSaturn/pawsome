
import React, { useState } from 'react';
import { Users, Plus, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface LocalGroup {
  id: number;
  name: string;
  image: string;
  members: number;
  nextMeetup: string | null;
  location: string;
  description: string;
}

const MOCK_GROUPS: LocalGroup[] = [
  {
    id: 1,
    name: "North Dumdum Morning Walkers",
    image: "https://images.unsplash.com/photo-1601758174944-c2926b1ce22e",
    members: 24,
    nextMeetup: "Sunday, 7:00 AM",
    location: "Dumdum Park",
    description: "Early morning dog walking group for North Dumdum pet parents. We meet regularly for social walks and pet exercise."
  },
  {
    id: 2,
    name: "Birati Cat Welfare",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba",
    members: 18,
    nextMeetup: null,
    location: "Birati, North Dumdum",
    description: "Dedicated to cat welfare in Birati area. We help with TNR programs, cat adoptions and provide care information."
  },
  {
    id: 3,
    name: "Dumdum Pet Parents",
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b",
    members: 32,
    nextMeetup: "Saturday, 5:30 PM",
    location: "Community Garden, North Dumdum",
    description: "A general group for all pet parents in North Dumdum. We share resources, organize meetups and support each other."
  }
];

const LocalGroups = () => {
  const [groups] = useState<LocalGroup[]>(MOCK_GROUPS);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Local Pet Groups & Meetups</h2>
          <p className="text-muted-foreground">Connect with fellow pet lovers in North Dumdum</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus size={16} />
              <span>Create Group</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Local Group</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="groupName">Group Name</Label>
                <Input id="groupName" placeholder="North Dumdum Pet Lovers" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Location in North Dumdum</Label>
                <Input id="location" placeholder="Birati, Dum Dum Park, etc." />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Group Description</Label>
                <Textarea id="description" placeholder="Tell us about your group..." />
              </div>
              <Button type="submit" className="w-full mt-2">Create Group</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((group) => (
          <div key={group.id} className="border rounded-lg overflow-hidden bg-white hover-scale">
            <div className="aspect-video relative">
              <img 
                src={`${group.image}?auto=format&fit=crop&w=600&h=350`}
                alt={group.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium">
                <div className="flex items-center gap-1">
                  <Users size={12} />
                  <span>{group.members} members</span>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-1">{group.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">{group.location}</p>
              <p className="text-sm mb-3 line-clamp-2">{group.description}</p>
              
              {group.nextMeetup && (
                <div className="flex items-center gap-2 text-sm text-primary mb-3">
                  <Calendar size={14} />
                  <span>Next meetup: {group.nextMeetup}</span>
                </div>
              )}
              
              <Button variant="outline" size="sm" className="w-full mt-2">View Group</Button>
            </div>
          </div>
        ))}
        
        {/* Create New Group Card */}
        <div className="border rounded-lg overflow-hidden bg-muted/30 border-dashed flex flex-col items-center justify-center p-8 text-center h-full">
          <div className="mb-4 rounded-full bg-primary/10 p-3">
            <Plus className="text-primary" size={24} />
          </div>
          <h3 className="font-medium mb-2">Create New Group</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Start a local pet group in your North Dumdum neighborhood
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Get Started</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              {/* Same form as above */}
              <DialogHeader>
                <DialogTitle>Create New Local Group</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="groupName2">Group Name</Label>
                  <Input id="groupName2" placeholder="North Dumdum Pet Lovers" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="location2">Location in North Dumdum</Label>
                  <Input id="location2" placeholder="Birati, Dum Dum Park, etc." />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description2">Group Description</Label>
                  <Textarea id="description2" placeholder="Tell us about your group..." />
                </div>
                <Button type="submit" className="w-full mt-2">Create Group</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default LocalGroups;
