
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-muted mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-orange to-brand-teal flex items-center justify-center">
                <span className="text-white font-bold text-sm">PF</span>
              </div>
              <h2 className="font-bold">Pet-Friendly North Dumdum</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              Making North Dumdum Pawsome, Together! A community-powered hyper-local pet network & resource hub.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-primary">Home</Link></li>
              <li><Link to="/network" className="hover:text-primary">North Dumdum Network</Link></li>
              <li><Link to="/adopt" className="hover:text-primary">Adopt</Link></li>
              <li><Link to="/volunteer" className="hover:text-primary">Volunteer</Link></li>
              <li><Link to="/stories" className="hover:text-primary">Impact Stories</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Connect With Us</h3>
            <div className="flex gap-4 mb-4">
              <a href="#" className="hover:text-primary" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-primary" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-primary" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              Email: contact@petfriendlynorthdumdum.org
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t text-center text-sm text-muted-foreground">
          <p>© 2025 Pet-Friendly North Dumdum. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
