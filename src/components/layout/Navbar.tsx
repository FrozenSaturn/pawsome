
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Network, Users, HeartHandshake, BookOpen, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  to: string;
  active?: boolean;
}

const NavItem = ({ icon: Icon, label, to, active }: NavItemProps) => (
  <Link to={to} className={cn(
    "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors",
    active 
      ? "bg-primary/10 text-primary font-medium" 
      : "hover:bg-accent hover:text-primary"
  )}>
    <Icon size={18} />
    <span>{label}</span>
  </Link>
);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const path = window.location.pathname;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="border-b sticky top-0 bg-background/95 backdrop-blur-sm z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-orange to-brand-teal flex items-center justify-center">
            <span className="text-white font-bold text-lg">PF</span>
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">Pet-Friendly</h1>
            <p className="text-xs text-muted-foreground leading-tight">North Dumdum</p>
          </div>
        </Link>

        {/* Mobile Menu Button */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          <NavItem icon={Home} label="Home" to="/" active={path === '/'} />
          <NavItem 
            icon={Network} 
            label="North Dumdum Network" 
            to="/network" 
            active={path === '/network'} 
          />
          <NavItem icon={Users} label="Adopt" to="/adopt" active={path === '/adopt'} />
          <NavItem 
            icon={HeartHandshake} 
            label="Volunteer" 
            to="/volunteer" 
            active={path === '/volunteer'} 
          />
          <NavItem 
            icon={BookOpen} 
            label="Impact Stories" 
            to="/stories" 
            active={path === '/stories'} 
          />
        </nav>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden flex flex-col p-4 gap-2 border-t animate-fade-in">
          <NavItem icon={Home} label="Home" to="/" active={path === '/'} />
          <NavItem 
            icon={Network} 
            label="North Dumdum Network" 
            to="/network" 
            active={path === '/network'} 
          />
          <NavItem icon={Users} label="Adopt" to="/adopt" active={path === '/adopt'} />
          <NavItem 
            icon={HeartHandshake} 
            label="Volunteer" 
            to="/volunteer" 
            active={path === '/volunteer'} 
          />
          <NavItem 
            icon={BookOpen} 
            label="Impact Stories" 
            to="/stories" 
            active={path === '/stories'} 
          />
        </nav>
      )}
    </header>
  );
};

export default Navbar;
