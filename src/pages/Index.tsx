
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PawBuddy from '@/components/PawBuddy';
import HomePage from '@/pages/HomePage';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <HomePage />
      </main>
      <Footer />
      <PawBuddy />
    </div>
  );
};

export default Index;
