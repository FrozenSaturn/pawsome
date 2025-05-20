
import React, { useState } from 'react';
import { AlertTriangle, Search, Filter, Clock, MapPin, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface ActionPost {
  id: number;
  type: 'transport' | 'lost' | 'found' | 'urgentHelp';
  title: string;
  description: string;
  location: string;
  postedBy: string;
  postedTime: string;
  status: 'active' | 'resolved';
}

const MOCK_POSTS: ActionPost[] = [
  {
    id: 1,
    type: 'transport',
    title: "Need transport for injured stray dog to vet",
    description: "Found an injured stray near Dumdum metro station. Need help transporting to Dr. Sharma's clinic.",
    location: "Near Dumdum Metro Station",
    postedBy: "Amit S.",
    postedTime: "2 hours ago",
    status: 'active'
  },
  {
    id: 2,
    type: 'lost',
    title: "Lost cat - Ginger tabby with white paws",
    description: "My cat Tommy went missing yesterday evening from Birati area. He's a ginger tabby with white paws and a blue collar.",
    location: "Birati Main Road area",
    postedBy: "Priya M.",
    postedTime: "1 day ago",
    status: 'active'
  },
  {
    id: 3,
    type: 'found',
    title: "Found: Small white dog near park",
    description: "Found a small white dog (possibly a Spitz mix) near Dumdum Park. No collar but very friendly. Currently safe with me.",
    location: "Dumdum Park",
    postedBy: "Rahul K.",
    postedTime: "5 hours ago",
    status: 'active'
  },
  {
    id: 4,
    type: 'urgentHelp',
    title: "Urgent: Foster needed for 3 puppies",
    description: "Rescued 3 puppies from Jessore Road. Need temporary foster for 2 weeks until adoption event.",
    location: "North Dumdum",
    postedBy: "Maya D.",
    postedTime: "12 hours ago",
    status: 'active'
  }
];

const getTypeLabel = (type: string) => {
  switch(type) {
    case 'transport': return 'Transport';
    case 'lost': return 'Lost Pet';
    case 'found': return 'Found Pet';
    case 'urgentHelp': return 'Urgent Help';
    default: return 'Other';
  }
};

const getTypeColor = (type: string) => {
  switch(type) {
    case 'transport': return 'bg-blue-100 text-blue-800';
    case 'lost': return 'bg-red-100 text-red-800';
    case 'found': return 'bg-green-100 text-green-800';
    case 'urgentHelp': return 'bg-orange-100 text-orange-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const ActionBoard = () => {
  const [posts] = useState<ActionPost[]>(MOCK_POSTS);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">North Dumdum Pet Action Board</h2>
          <p className="text-muted-foreground">Immediate local needs and updates</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus size={16} />
              <span>Post Need</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Post Local Need</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="postType">Type</Label>
                <Select>
                  <SelectTrigger id="postType">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="transport">Need Transport</SelectItem>
                    <SelectItem value="lost">Lost Pet</SelectItem>
                    <SelectItem value="found">Found Pet</SelectItem>
                    <SelectItem value="urgentHelp">Urgent Help</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="postTitle">Title</Label>
                <Input id="postTitle" placeholder="Brief title of your need" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="postDesc">Description</Label>
                <Textarea id="postDesc" placeholder="Provide details about your need..." />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="postLocation">Location in North Dumdum</Label>
                <Input id="postLocation" placeholder="Specific location" />
              </div>
              <Button type="submit" className="w-full mt-2">Post to Action Board</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="mb-6 flex gap-4 flex-col sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <Input 
            placeholder="Search posts..." 
            className="pl-10" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select>
          <SelectTrigger className="w-[180px] sm:w-[140px]">
            <div className="flex items-center gap-2">
              <Filter size={16} />
              <span>Filter</span>
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Posts</SelectItem>
            <SelectItem value="transport">Transport</SelectItem>
            <SelectItem value="lost">Lost Pets</SelectItem>
            <SelectItem value="found">Found Pets</SelectItem>
            <SelectItem value="urgentHelp">Urgent Help</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded mb-6">
        <div className="flex items-start">
          <AlertTriangle className="text-yellow-500 mr-3 mt-1" size={20} />
          <div>
            <h3 className="font-medium">Action Board Guideline</h3>
            <p className="text-sm text-muted-foreground">
              This board is for immediate pet-related needs in North Dumdum. For lost/found pets, please include a photo and detailed description.
            </p>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="border rounded-lg p-4 bg-white hover:border-primary">
            <div className="flex justify-between items-start mb-2">
              <Badge variant="outline" className={getTypeColor(post.type)}>
                {getTypeLabel(post.type)}
              </Badge>
              <div className="text-xs flex items-center text-muted-foreground">
                <Clock size={12} className="mr-1" />
                {post.postedTime}
              </div>
            </div>
            
            <h3 className="font-medium text-lg mb-2">{post.title}</h3>
            <p className="text-sm mb-3">{post.description}</p>
            
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
              <MapPin size={12} />
              <span>{post.location}</span>
            </div>
            
            <div className="flex justify-between items-center pt-2 border-t">
              <span className="text-xs">Posted by: {post.postedBy}</span>
              <Button variant="outline" size="sm">Respond</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActionBoard;
