
import React from 'react';
import { HeartHandshake } from 'lucide-react';
import PlaceholderPage from '@/components/shared/PlaceholderPage';

const VolunteerPage = () => {
  return (
    <PlaceholderPage
      title="Volunteer Opportunities Coming Soon"
      description="We're building a volunteer coordination system for North Dumdum pet welfare initiatives. Soon you'll be able to register as a volunteer and find opportunities to help."
      icon={<HeartHandshake className="w-8 h-8 text-primary" />}
    />
  );
};

export default VolunteerPage;
