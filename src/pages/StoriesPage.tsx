
import React from 'react';
import { BookOpen } from 'lucide-react';
import PlaceholderPage from '@/components/shared/PlaceholderPage';

const StoriesPage = () => {
  return (
    <PlaceholderPage
      title="Impact Stories Coming Soon"
      description="We're collecting inspiring stories from the North Dumdum community. Soon you'll be able to read about local rescue efforts, adoption successes, and community initiatives."
      icon={<BookOpen className="w-8 h-8 text-primary" />}
    />
  );
};

export default StoriesPage;
