import React, { useState, useEffect } from 'react';
import { BookOpen, Feather, MessageSquare, PlusCircle, Send, UserCircle, CalendarDays, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from '@/components/ui/separator';

interface ImpactStory {
  id: number;
  title: string;
  location: string;
  summary: string;
  fullStory: string;
  image: string;
  author: string;
  date: string;
}

const StoriesPage = () => {
  const [stories, setStories] = useState<ImpactStory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const [isSubmitStoryOpen, setIsSubmitStoryOpen] = useState(false);

  useEffect(() => {
    const fetchStories = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:3000/api/impact-stories');
        if (!response.ok) {
          throw new Error(`Failed to fetch stories. Status: ${response.status}`);
        }
        const data = await response.json();
        setStories(data);
      } catch (err: any) {
        setError(err.message || 'Could not load impact stories.');
        console.error("Error fetching impact stories:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStories();
  }, []);

  const handleStorySubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newStoryData = {
      title: formData.get('story-title') as string,
      location: formData.get('story-location') as string,
      summary: formData.get('story-summary') as string,
      fullStory: formData.get('story-full') as string,
      image: formData.get('story-image-url') as string,
      author: formData.get('story-author') as string,
      // date: new Date().toISOString().split('T')[0] // Auto-generate date
    };

    if (!newStoryData.title || !newStoryData.summary || !newStoryData.fullStory || !newStoryData.author || !newStoryData.location) {
        toast({ variant: "destructive", title: "Missing Fields", description: "Please fill out all required fields." });
        return;
    }

    console.log("New story to submit (frontend):", newStoryData);
    // TODO: Implement backend POST request to a new '/api/impact-stories' endpoint
    // For now, we'll just log it and show a success message.
    toast({ title: "Story Submitted!", description: `Thank you, ${newStoryData.author}, for sharing "${newStoryData.title}"!` });
    setIsSubmitStoryOpen(false); // Close dialog
    // Optionally, add to local state for immediate display (will be overwritten on next fetch)
    // setStories(prev => [...prev, { ...newStoryData, id: Date.now(), date: new Date().toISOString().split('T')[0] } as ImpactStory]);
  };


  const renderStoryCard = (story: ImpactStory) => (
    <Card key={story.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <CardHeader className="p-0 relative">
        <img
          src={story.image || `https://placekitten.com/600/400?image=${story.id}`}
          alt={story.title}
          className="w-full h-56 object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
            <CardTitle className="text-2xl font-bold text-white drop-shadow-md">{story.title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <div className="flex items-center text-xs text-muted-foreground mb-3 space-x-3">
            <span className="flex items-center"><UserCircle size={14} className="mr-1"/> By {story.author}</span>
            <span className="flex items-center"><CalendarDays size={14} className="mr-1"/> {new Date(story.date).toLocaleDateString()}</span>
            <span className="flex items-center"><MapPin size={14} className="mr-1"/> {story.location}</span>
        </div>
        <CardDescription className="text-base text-foreground/80 mb-4 line-clamp-4">{story.summary}</CardDescription>
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto">Read Full Story</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-3xl font-bold mb-2">{story.title}</DialogTitle>
                    <div className="flex items-center text-sm text-muted-foreground mb-4 space-x-4">
                        <span className="flex items-center"><UserCircle size={16} className="mr-1"/> By {story.author}</span>
                        <span className="flex items-center"><CalendarDays size={16} className="mr-1"/> {new Date(story.date).toLocaleDateString()}</span>
                        <span className="flex items-center"><MapPin size={16} className="mr-1"/> {story.location}</span>
                    </div>
                </DialogHeader>
                <img src={story.image || `https://placekitten.com/600/300?image=${story.id}`} alt={story.title} className="w-full h-auto max-h-[300px] object-cover rounded-md mb-6"/>
                <div className="prose prose-sm sm:prose-base max-w-none text-foreground/90 leading-relaxed whitespace-pre-line">
                    <p className="font-semibold text-lg mb-3">{story.summary}</p>
                    <Separator className="my-4"/>
                    {story.fullStory}
                </div>
            </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );

  const renderSkeletonCard = (index: number) => (
    <Card key={index} className="overflow-hidden">
      <Skeleton className="h-56 w-full" />
      <CardContent className="p-6">
        <Skeleton className="h-7 w-3/4 mb-3" />
        <Skeleton className="h-4 w-1/2 mb-2" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-5/6 mb-4" />
        <Skeleton className="h-10 w-32" />
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto px-4 py-10">
      <header className="text-center mb-12">
        <BookOpen className="mx-auto h-20 w-20 text-primary mb-6 opacity-90" />
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Impact Stories from North Dumdum</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Read inspiring tales of rescue, adoption, and community kindness towards animals in our locality.
        </p>
      </header>

      <div className="text-center mb-12">
        <Dialog open={isSubmitStoryOpen} onOpenChange={setIsSubmitStoryOpen}>
            <DialogTrigger asChild>
                <Button size="lg" className="text-lg py-3 px-6">
                    <Feather size={20} className="mr-2" /> Share Your Story
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl">Share Your Impact Story</DialogTitle>
                    <DialogDescription>
                        Inspire others by sharing a positive pet-related story from North Dumdum.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleStorySubmit} className="grid gap-5 py-4">
                     <div className="grid gap-2">
                        <Label htmlFor="story-title">Title of Your Story</Label>
                        <Input name="story-title" id="story-title" placeholder="e.g., How Max Found His Way Home" required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="story-author">Your Name (Author)</Label>
                        <Input name="story-author" id="story-author" placeholder="Your Name" required />
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="story-location">Location (e.g., Birati, Dum Dum Park)</Label>
                        <Input name="story-location" id="story-location" placeholder="Specific area in North Dumdum" required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="story-summary">Short Summary (1-2 sentences)</Label>
                        <Textarea name="story-summary" id="story-summary" placeholder="A brief overview of the story" rows={2} required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="story-full">Full Story</Label>
                        <Textarea name="story-full" id="story-full" placeholder="Tell us the whole story..." rows={6} required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="story-image-url">Image URL (Optional)</Label>
                        <Input name="story-image-url" id="story-image-url" type="url" placeholder="https://example.com/your_story_image.jpg" />
                    </div>
                    <Button type="submit" className="w-full mt-2">
                        <Send size={16} className="mr-2"/> Submit Story
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, index) => renderSkeletonCard(index))}
        </div>
      )}

      {!isLoading && error && (
        <div className="text-center py-10">
          <MessageSquare size={48} className="mx-auto text-destructive mb-4" />
          <p className="text-destructive text-xl">{error}</p>
          <p className="text-muted-foreground mt-2">Please try refreshing or check back later.</p>
        </div>
      )}

      {!isLoading && !error && stories.length === 0 && (
        <div className="text-center py-10">
          <BookOpen size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-xl text-muted-foreground">No impact stories shared yet.</p>
          <p className="text-muted-foreground mt-2">Be the first to share an inspiring tale from North Dumdum!</p>
        </div>
      )}

      {!isLoading && !error && stories.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map(story => renderStoryCard(story))}
        </div>
      )}
    </div>
  );
};

export default StoriesPage;