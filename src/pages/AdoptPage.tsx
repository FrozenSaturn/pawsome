
import React from 'react';
import { Users } from 'lucide-react';
import PlaceholderPage from '@/components/shared/PlaceholderPage';

const AdoptPage = () => {
  return (
    <PlaceholderPage
      title="Adoption Feature Coming Soon"
      description="We're working on a local adoption platform for North Dumdum. Soon you'll be able to browse adoptable pets from nearby shelters and individual rescuers."
      icon={<Users className="w-8 h-8 text-primary" />}
    />
  );
};

export default AdoptPage;
