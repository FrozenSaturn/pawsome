import React, { useState } from 'react';
import { HeartHandshake, Users, Home, Truck, Megaphone, CalendarDays, User, Mail, Phone, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from "@/components/ui/use-toast"; // Assuming you might want to use toasts later

const volunteerOptions = [
  {
    icon: Home,
    title: "Foster a Pet",
    description: "Provide a temporary, loving home for an animal in need while they await their forever family. Fostering saves lives!",
    details: "This involves caring for a pet (dog, cat, puppy, or kitten) in your home, providing food, shelter, basic training, and lots of love. We'll support you with necessary supplies and medical care guidance.",
  },
  {
    icon: Truck,
    title: "Transport Assistance",
    description: "Help with transporting animals to vet appointments, foster homes, or adoption events in and around North Dumdum.",
    details: "If you have a vehicle and some free time, you can make a huge difference by helping animals get the care and new homes they need. Journeys are typically within the North Dumdum locality.",
  },
  {
    icon: Megaphone,
    title: "Awareness & Campaigns",
    description: "Join us in spreading awareness about responsible pet ownership, adoption drives, and local animal welfare issues in North Dumdum.",
    details: "Help us design materials, distribute flyers, manage social media posts for our North Dumdum campaigns, or talk to people at local community events.",
  },
  {
    icon: CalendarDays,
    title: "Event Support",
    description: "Assist during adoption camps, vaccination drives, and other community events held in North Dumdum.",
    details: "Volunteers are crucial for setting up, managing stalls, handling animals (if experienced), and interacting with visitors during our local events.",
  },
  {
    icon: Users,
    title: "Community Outreach",
    description: "Help us connect with more people in North Dumdum, identify areas of need, and build our local volunteer network.",
    details: "Engage with local communities, schools, and groups to promote animal welfare and our organization's activities in the North Dumdum area."
  }
];

const VolunteerPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interests: [] as string[],
    availability: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (interest: string) => {
    setFormData(prev => {
      const newInterests = prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest];
      return { ...prev, interests: newInterests };
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email || formData.interests.length === 0) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please provide your name, email, and select at least one interest.",
      });
      return;
    }
    console.log("Volunteer Interest Form Submitted:", formData);
    // TODO: Implement backend submission here
    // For now, just show a success message and clear the form.
    setIsSubmitted(true);
    toast({
      title: "Thank You for Your Interest!",
      description: "We've received your volunteer application and will get in touch soon regarding opportunities in North Dumdum.",
    });
    // Reset form after a delay or keep it to show submission success
    // setFormData({ name: '', email: '', phone: '', interests: [], availability: '', message: '' });
  };


  return (
    <div className="container mx-auto px-4 py-10">
      <header className="text-center mb-12">
        <HeartHandshake className="mx-auto h-20 w-20 text-primary mb-6 opacity-90" />
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Volunteer With Us</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Make a difference in the lives of animals in North Dumdum. Your time and skills are invaluable to our community efforts.
        </p>
      </header>

      <section className="mb-16">
        <h2 className="text-3xl font-semibold text-center mb-10 text-foreground">How You Can Help in North Dumdum</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {volunteerOptions.map((option) => (
            <Card key={option.title} className="hover:shadow-xl transition-shadow duration-300 flex flex-col bg-card">
              <CardHeader className="items-center text-center">
                <div className="p-4 bg-primary/10 rounded-full mb-3 inline-block">
                  <option.icon className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-2xl text-primary">{option.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground text-center">{option.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="volunteer-form" className="py-12 bg-muted/50 rounded-xl">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center mb-8 text-foreground">Volunteer Interest Form (North Dumdum)</h2>
          {isSubmitted ? (
            <div className="text-center p-8 bg-green-100 border border-green-300 rounded-lg">
              <HeartHandshake className="mx-auto h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-2xl font-semibold text-green-700 mb-2">Thank You!</h3>
              <p className="text-green-600">
                Your interest form has been submitted. We appreciate your willingness to help animals in North Dumdum and will contact you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="text-lg flex items-center mb-1">
                    <User size={18} className="mr-2 text-primary" /> Your Name
                  </Label>
                  <Input type="text" name="name" id="name" placeholder="Full Name" value={formData.name} onChange={handleInputChange} required className="text-base"/>
                </div>
                <div>
                  <Label htmlFor="email" className="text-lg flex items-center mb-1">
                    <Mail size={18} className="mr-2 text-primary" /> Email Address
                  </Label>
                  <Input type="email" name="email" id="email" placeholder="you@example.com" value={formData.email} onChange={handleInputChange} required className="text-base"/>
                </div>
              </div>
              <div>
                <Label htmlFor="phone" className="text-lg flex items-center mb-1">
                  <Phone size={18} className="mr-2 text-primary" /> Phone Number (Optional)
                </Label>
                <Input type="tel" name="phone" id="phone" placeholder="Your contact number" value={formData.phone} onChange={handleInputChange} className="text-base"/>
              </div>

              <div>
                <Label className="text-lg block mb-2">Areas of Interest (North Dumdum Focus)</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                  {volunteerOptions.map(option => (
                    <div key={option.title} className="flex items-center space-x-2">
                      <Checkbox
                        id={`interest-${option.title.toLowerCase().replace(/\s+/g, '-')}`}
                        checked={formData.interests.includes(option.title)}
                        onCheckedChange={() => handleCheckboxChange(option.title)}
                      />
                      <Label htmlFor={`interest-${option.title.toLowerCase().replace(/\s+/g, '-')}`} className="font-normal text-base">
                        {option.title}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="availability" className="text-lg flex items-center mb-1">
                   <CalendarDays size={18} className="mr-2 text-primary" /> Your Availability
                </Label>
                <Textarea
                  name="availability"
                  id="availability"
                  placeholder="e.g., Weekends, Weekday evenings from 6 PM (specifically for North Dumdum activities)"
                  value={formData.availability}
                  onChange={handleInputChange}
                  rows={3}
                  className="text-base"
                />
              </div>

              <div>
                <Label htmlFor="message" className="text-lg flex items-center mb-1">
                   <MessageSquare size={18} className="mr-2 text-primary" /> Additional Message (Optional)
                </Label>
                <Textarea
                  name="message"
                  id="message"
                  placeholder="Any specific skills you'd like to offer, or questions you have about volunteering in North Dumdum?"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="text-base"
                />
              </div>
              <Button type="submit" size="lg" className="w-full text-lg py-3">
                <HeartHandshake size={20} className="mr-2" /> Submit Interest
              </Button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};

export default VolunteerPage;