
import React from 'react';
import Hero from '@/components/home/Hero';
import HowToHelp from '@/components/home/HowToHelp';
import PetPulseMap from '@/components/home/PetPulseMap';
import FeaturedStory from '@/components/home/FeaturedStory';

const HomePage = () => {
  return (
    <>
      <Hero />
      <HowToHelp />
      <PetPulseMap />
      <FeaturedStory />
    </>
  );
};

export default HomePage;
