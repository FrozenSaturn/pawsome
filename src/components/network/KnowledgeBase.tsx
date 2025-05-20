
import React from 'react';
import { FileText, BookOpen, Search, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface WikiArticle {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  category: string;
}

const MOCK_ARTICLES: WikiArticle[] = [
  {
    id: 1,
    title: "Vets in North Dumdum: A Comprehensive Directory",
    excerpt: "Detailed information about veterinary clinics in North Dumdum, including specialties, emergency services, and contact details.",
    author: "Dr. Sharma",
    category: "Healthcare"
  },
  {
    id: 2,
    title: "Monsoon Pet Care Tips for North Dumdum Residents",
    excerpt: "Seasonal advice for pet owners in North Dumdum dealing with the heavy monsoon season. Includes tips for keeping pets dry and preventing common monsoon-related health issues.",
    author: "Priya M.",
    category: "Seasonal Care"
  },
  {
    id: 3,
    title: "Local Pet-Friendly Housing in North Dumdum",
    excerpt: "Guide to apartment complexes and housing societies in North Dumdum that welcome pets, including any specific restrictions.",
    author: "Rahul S.",
    category: "Housing"
  },
  {
    id: 4,
    title: "Street Dog Feeding Guidelines for North Dumdum",
    excerpt: "Best practices for feeding community street dogs in North Dumdum, including recommended locations and appropriate foods.",
    author: "Animal Welfare Group",
    category: "Community Care"
  }
];

const KnowledgeBase = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Local Knowledge Base</h2>
          <p className="text-muted-foreground">"Pet Care in North Dumdum" Community Wiki</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus size={16} />
              <span>Add Article</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Contribute to the Knowledge Base</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="articleTitle">Article Title</Label>
                <Input id="articleTitle" placeholder="e.g., Best Pet Parks in North Dumdum" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="articleCategory">Category</Label>
                <Input id="articleCategory" placeholder="e.g., Recreation, Healthcare" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="articleContent">Content</Label>
                <Textarea id="articleContent" placeholder="Share your knowledge..." rows={10} />
              </div>
              <Button type="submit" className="w-full mt-2">Submit Article</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
        <Input placeholder="Search the knowledge base..." className="pl-10" />
      </div>
      
      <div className="bg-brand-light border border-yellow-200 p-6 rounded-lg mb-8 text-center">
        <BookOpen size={40} className="mx-auto mb-4 text-brand-orange" />
        <h3 className="font-semibold text-lg mb-2">Community-Driven Resource</h3>
        <p className="text-sm text-muted-foreground max-w-lg mx-auto">
          Our North Dumdum Pet Care Wiki is built by locals for locals. Share your expertise and learn from fellow pet lovers in our community.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MOCK_ARTICLES.map((article) => (
          <div key={article.id} className="border rounded-lg p-5 bg-white hover-scale">
            <div className="flex gap-3">
              <div className="mt-1">
                <div className="p-2 bg-secondary/10 rounded-lg">
                  <FileText size={18} className="text-secondary" />
                </div>
              </div>
              <div>
                <h3 className="font-medium text-lg mb-1">{article.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {article.excerpt}
                </p>
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <span>By: {article.author}</span>
                  <span className="bg-muted py-1 px-2 rounded">{article.category}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Add New Article Card */}
        <div className="border border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center bg-muted/30">
          <Plus size={24} className="mb-3 text-muted-foreground" />
          <h3 className="font-medium mb-1">Share Your Knowledge</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Contribute to North Dumdum's pet care knowledge base
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Add Article</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              {/* Same form as above */}
              <DialogHeader>
                <DialogTitle>Contribute to the Knowledge Base</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="articleTitle2">Article Title</Label>
                  <Input id="articleTitle2" placeholder="e.g., Best Pet Parks in North Dumdum" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="articleCategory2">Category</Label>
                  <Input id="articleCategory2" placeholder="e.g., Recreation, Healthcare" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="articleContent2">Content</Label>
                  <Textarea id="articleContent2" placeholder="Share your knowledge..." rows={10} />
                </div>
                <Button type="submit" className="w-full mt-2">Submit Article</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBase;
