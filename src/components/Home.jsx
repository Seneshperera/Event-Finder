import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock } from 'lucide-react';
import backgroundImage from '../assets/images/background3.jpeg';

const mockEvents = [
  {
    _id: '1',
    title: 'Summer Beach Festival',
    date: '2024-03-25',
    time: '6:00 PM',
    location: 'Mount Lavinia Beach',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80',
    category: 'Festival'
  },
  {
    _id: '2',
    title: 'Classical Night',
    date: '2024-03-28',
    time: '7:30 PM',
    location: 'Colombo National Theatre',
    image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&q=80',
    category: 'Classical'
  },
  {
    _id: '3',
    title: 'Rock Revolution',
    date: '2024-04-01',
    time: '8:00 PM',
    location: 'Viharamahadevi Park',
    image: 'https://images.unsplash.com/photo-1501612780327-45045538702b?auto=format&fit=crop&q=80',
    category: 'Rock'
  },
  {
    _id: '4',
    title: 'Jazz Evening',
    date: '2024-04-05',
    time: '7:00 PM',
    location: 'Galle Face Green',
    image: 'https://images.unsplash.com/photo-1529074963761-98e40b66a44f?auto=format&fit=crop&q=80',
    category: 'Jazz'
  },
  {
    _id: '5',
    title: 'Electronic Beats',
    date: '2024-04-10',
    time: '9:00 PM',
    location: 'Colombo Club',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80',
    category: 'Electronic'
  },
  {
    _id: '6',
    title: 'Electronic Beats',
    date: '2024-04-10',
    time: '9:00 PM',
    location: 'Colombo Club',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80',
    category: 'Electronic'
  }
];

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'Festival', 'Classical', 'Rock', 'Jazz', 'Electronic'];

  const filteredEvents =
    selectedCategory === 'All'
      ? mockEvents
      : mockEvents.filter(event => event.category === selectedCategory);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-12 min-h-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl mt-10  font-bold text-white mb-4">
          Discover Live Music in Sri Lanka
        </h1>
        <p className="text-neutral-200 text-lg max-w-2xl mx-auto">
          Experience the best live music events across the island. From classical concerts to beach festivals.
        </p>
      </div>

      <motion.div className="flex justify-center flex-wrap gap-4 mb-12" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        {categories.map(category => (
          <motion.button
            key={category}
            onClick={() => setSelectedCategory(category)}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            className={`px-4 py-2 rounded-full transition-colors ${selectedCategory === category ? 'bg-indigo-600 text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'}`}
          >
            {category}
          </motion.button>
        ))}
      </motion.div>

      <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        {filteredEvents.map(event => (
          <motion.div key={event._id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} whileHover={{ scale: 1.05 }} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="relative h-48 overflow-hidden">
              <img src={event.image} alt={event.title} className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300" />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                <span className="text-sm font-medium text-indigo-600">{event.category}</span>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">{event.title}</h3>
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-neutral-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="text-sm">{new Date(event.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center text-neutral-600">
                  <Clock className="h-4 w-4 mr-2" />
                  <span className="text-sm">{event.time}</span>
                </div>
                <div className="flex items-center text-neutral-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span className="text-sm">{event.location}</span>
                </div>
              </div>
              <Link to={`/event/${event._id}`} className="inline-block w-full text-center bg-neutral-100 hover:bg-neutral-200 text-neutral-900 py-2 rounded-lg transition-colors">
                View Details
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Home;
