import React, { useState, useEffect } from 'react';
import { Heart, PawPrint, Mail, Phone as PhoneIcon, Info, Filter, Search, Users, Plus, MapPin, Link } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

interface AdoptablePet {
  id: number;
  name: string;
  type: 'Dog' | 'Cat' | string;
  breed: string;
  age: string;
  gender: 'Male' | 'Female' | string;
  description: string;
  image: string;
  contact: string;
  location: string;
}

const AdoptPage = () => {
  const [pets, setPets] = useState<AdoptablePet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterGender, setFilterGender] = useState('all');
  const [isListPetDialogOpen, setIsListPetDialogOpen] = useState(false); // Control dialog state

  const { toast } = useToast();

  const fetchPets = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:3000/api/adoptable-pets');
      if (!response.ok) {
        throw new Error(`Failed to fetch pets. Status: ${response.status}`);
      }
      const data = await response.json();
      setPets(data);
    } catch (err: any) {
      setError(err.message || 'Could not load pets for adoption.');
      console.error("Error fetching adoptable pets:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const filteredPets = pets
    .filter(pet => pet.name.toLowerCase().includes(searchTerm.toLowerCase()) || pet.breed.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(pet => filterType === 'all' || pet.type.toLowerCase() === filterType.toLowerCase())
    .filter(pet => filterGender === 'all' || pet.gender.toLowerCase() === filterGender.toLowerCase());

  const handleListPetSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newPetData = {
        name: formData.get('name') as string,
        type: formData.get('type') as string,
        breed: formData.get('breed') as string,
        age: formData.get('age') as string,
        gender: formData.get('gender') as string,
        description: formData.get('description') as string,
        image: formData.get('image') as string,
        contact: formData.get('contact') as string,
        location: formData.get('location') as string,
    };

    if (!newPetData.name || !newPetData.type || !newPetData.breed || !newPetData.age || !newPetData.gender || !newPetData.description || !newPetData.contact || !newPetData.location ) {
        toast({ variant: "destructive", title: "Missing Fields", description: "Please fill out all required fields." });
        return;
    }
    
    try {
        const response = await fetch('http://localhost:3000/api/adoptable-pets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPetData),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || `Failed to list pet. Status: ${response.status}`);
        }

        toast({ title: "Pet Listed!", description: `${result.pet.name} has been successfully listed for adoption.` });
        fetchPets(); // Re-fetch pets to include the new one
        setIsListPetDialogOpen(false); // Close the dialog
        event.currentTarget.reset(); // Reset form fields

    } catch (err: any) {
        console.error("Error listing pet:", err);
        toast({ variant: "destructive", title: "Listing Failed", description: err.message || "Could not list the pet. Please try again." });
    }
  };


  const renderPetCard = (pet: AdoptablePet) => (
    <Card key={pet.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card">
      <CardHeader className="p-0">
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={pet.image || `https://placekitten.com/400/300?image=${pet.id}`} // Fallback image
            alt={`Photo of ${pet.name}`}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-2xl font-bold text-primary">{pet.name}</CardTitle>
          <Badge variant={pet.type === 'Dog' ? "default" : "secondary"} className="capitalize">
            <PawPrint size={14} className="mr-1" /> {pet.type}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mb-1"><strong className="font-medium text-foreground">Breed:</strong> {pet.breed}</p>
        <p className="text-sm text-muted-foreground mb-1"><strong className="font-medium text-foreground">Age:</strong> {pet.age}</p>
        <p className="text-sm text-muted-foreground mb-3"><strong className="font-medium text-foreground">Gender:</strong> {pet.gender}</p>
        <CardDescription className="text-sm leading-relaxed line-clamp-3">{pet.description}</CardDescription>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-col items-start">
         <div className="w-full border-t pt-3 mt-3">
             <p className="text-sm text-muted-foreground mb-2 flex items-center">
                <MapPin size={14} className="mr-2 text-primary flex-shrink-0" /> {pet.location}, North Dumdum
            </p>
            <p className="text-sm text-muted-foreground mb-3 flex items-center">
                <Info size={14} className="mr-2 text-primary flex-shrink-0" /> Contact: {pet.contact}
            </p>
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                <Heart size={16} className="mr-2" /> Express Interest
            </Button>
        </div>
      </CardFooter>
    </Card>
  );

  const renderSkeletonCard = (index: number) => ( // Added index key
    <Card key={index} className="flex flex-col overflow-hidden">
      <Skeleton className="aspect-[4/3] w-full" />
      <CardContent className="p-4">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2 mb-1" />
        <Skeleton className="h-4 w-1/3 mb-3" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-2/3" />
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <Users className="mx-auto h-16 w-16 text-primary mb-4 opacity-80" />
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">Find Your New Best Friend</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Browse adoptable pets from shelters and rescuers in the North Dumdum area. Give a loving home to a deserving animal.
        </p>
      </div>

      <div className="mb-8 p-4 bg-accent/50 border border-accent rounded-lg flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex-1 w-full md:w-auto">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search by name, breed..."
                    className="pl-10 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
            <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full md:w-[150px]">
                    <div className="flex items-center gap-1">
                        <Filter size={14}/> <span>Type</span>
                    </div>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Dog">Dogs</SelectItem>
                    <SelectItem value="Cat">Cats</SelectItem>
                </SelectContent>
            </Select>
            <Select value={filterGender} onValueChange={setFilterGender}>
                <SelectTrigger className="w-full md:w-[150px]">
                     <div className="flex items-center gap-1">
                        <Filter size={14}/> <span>Gender</span>
                    </div>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Genders</SelectItem>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
            </Select>
        </div>
         <Dialog open={isListPetDialogOpen} onOpenChange={setIsListPetDialogOpen}> {/* Control dialog state */}
            <DialogTrigger asChild>
                <Button variant="outline" className="w-full md:w-auto">
                    <Plus size={16} className="mr-2"/> List a Pet for Adoption
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                    <DialogTitle>List a Pet for Adoption</DialogTitle>
                    <DialogDescription>
                        Fill in the details below to find a new home for a pet in North Dumdum.
                        Please ensure you have the right to rehome this pet.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleListPetSubmit} className="grid gap-4 py-4">
                    {/* Form fields remain the same as previous version */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-1.5">
                            <Label htmlFor="pet-name-dialog">Pet's Name</Label> {/* Changed ID to be unique */}
                            <Input name="name" id="pet-name-dialog" placeholder="e.g., Buddy" required />
                        </div>
                        <div className="grid gap-1.5">
                            <Label htmlFor="pet-type-dialog">Type (Dog, Cat, etc.)</Label> {/* Changed ID */}
                            <Input name="type" id="pet-type-dialog" placeholder="e.g., Dog" required />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-1.5">
                            <Label htmlFor="pet-breed-dialog">Breed</Label> {/* Changed ID */}
                            <Input name="breed" id="pet-breed-dialog" placeholder="e.g., Labrador Mix" required />
                        </div>
                        <div className="grid gap-1.5">
                            <Label htmlFor="pet-age-dialog">Age</Label> {/* Changed ID */}
                            <Input name="age" id="pet-age-dialog" placeholder="e.g., 2 years" required />
                        </div>
                    </div>
                     <div className="grid gap-1.5">
                        <Label htmlFor="pet-gender-dialog">Gender</Label> {/* Changed ID */}
                        <Select name="gender" required>
                            <SelectTrigger id="pet-gender-dialog">
                                <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Male">Male</SelectItem>
                                <SelectItem value="Female">Female</SelectItem>
                                <SelectItem value="Unknown">Unknown</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-1.5">
                        <Label htmlFor="pet-image-dialog">Image URL</Label> {/* Changed ID */}
                        <Input name="image" id="pet-image-dialog" type="url" placeholder="https://example.com/image.jpg" />
                         <small className="text-xs text-muted-foreground">Optional. If blank, a placeholder will be used.</small>
                    </div>
                    <div className="grid gap-1.5">
                        <Label htmlFor="pet-description-dialog">Description</Label> {/* Changed ID */}
                        <Textarea name="description" id="pet-description-dialog" placeholder="Tell us about the pet's personality, needs, etc." required />
                    </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-1.5">
                            <Label htmlFor="pet-contact-dialog">Your Contact Info</Label> {/* Changed ID */}
                            <Input name="contact" id="pet-contact-dialog" placeholder="Phone or Email" required />
                        </div>
                        <div className="grid gap-1.5">
                            <Label htmlFor="pet-location-dialog">Pet's Current Location (North Dumdum)</Label> {/* Changed ID */}
                            <Input name="location" id="pet-location-dialog" placeholder="e.g., Birati, Dum Dum Park area" required />
                        </div>
                    </div>
                    <Button type="submit" className="w-full mt-2">Submit for Listing</Button>
                </form>
            </DialogContent>
        </Dialog>
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, index) => renderSkeletonCard(index))}
        </div>
      )}

      {!isLoading && error && (
        <div className="text-center py-10">
          <Info size={48} className="mx-auto text-destructive mb-4" />
          <p className="text-destructive text-xl">{error}</p>
          <p className="text-muted-foreground mt-2">Please try refreshing the page or check back later.</p>
        </div>
      )}

      {!isLoading && !error && filteredPets.length === 0 && (
        <div className="text-center py-10">
          <PawPrint size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-xl text-muted-foreground">No pets found matching your criteria.</p>
          <p className="text-muted-foreground mt-2">Try adjusting your search or filters.</p>
        </div>
      )}

      {!isLoading && !error && filteredPets.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPets.map(pet => renderPetCard(pet))}
        </div>
      )}

      <div className="mt-12 text-center p-6 bg-brand-light rounded-lg border border-brand-yellow">
        <h3 className="text-2xl font-semibold text-brand-orange mb-3">Can't Adopt Right Now?</h3>
        <p className="text-muted-foreground mb-4 max-w-lg mx-auto">
            There are many other ways to help pets in North Dumdum! Consider volunteering, fostering, or donating to local shelters and rescue groups.
        </p>
        <Button variant="outline" asChild>
            <Link to="/volunteer">Learn About Volunteering</Link>
        </Button>
      </div>
    </div>
  );
};

export default AdoptPage;