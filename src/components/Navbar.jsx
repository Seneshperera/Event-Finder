import React from 'react';
import { Link } from 'react-router-dom';
import { Music2, Menu, Plus } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isLoggedIn] = React.useState(false); // This would be managed by your auth system

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-white/30 border-b border-neutral-200 shadow-sm">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Music2 className="h-5 w-5 text-indigo-600" />
          <span className="text-lg font-semibold text-neutral-900">EchoEvents</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-6 text-sm">
          <Link to="/" className="text-white hover:text-indigo-600 transition-colors">
            Home
          </Link>
          <a href="#upcoming" className="text-white hover:text-indigo-600 transition-colors">
            Upcoming Shows
          </a>
          {isLoggedIn ? (
            <Link 
              to="/organizer/add-event"
              className="flex items-center space-x-2 bg-indigo-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-indigo-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Add Event</span>
            </Link>
          ) : (
            <Link 
              to="/organizer/register"
              className="bg-indigo-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-indigo-700 transition-colors"
            >
              Register
            </Link>
          )}
        </div>
        
        <button 
          className="md:hidden text-neutral-600"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/30 backdrop-blur-lg border-b border-neutral-200 shadow-sm py-2">
          <div className="container mx-auto space-y-2 text-center">
            <Link to="/" className="block text-white hover:text-indigo-600 transition-colors">
              Home
            </Link>
            <a href="#upcoming" className="block text-white hover:text-indigo-600 transition-colors">
              Upcoming Shows
            </a>
            {isLoggedIn ? (
              <Link 
                to="/organizer/add-event"
                className="block text-indigo-600 hover:text-indigo-700 transition-colors"
              >
                Add Event
              </Link>
            ) : (
              <Link 
                to="/organizer/register"
                className="block text-indigo-600 hover:text-indigo-700 transition-colors"
              >
                Register
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;