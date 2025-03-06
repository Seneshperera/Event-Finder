import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, ArrowLeft, Share2, Heart } from 'lucide-react';

const mockEvent = {
  _id: '1',
  title: 'Summer Beach Festival',
  date: '2024-03-25',
  time: '6:00 PM',
  location: 'Mount Lavinia Beach',
  image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80',
  category: 'Festival',
  description: 'Join us for an unforgettable evening of music by the beach.',
  artists: ['The Beach Band', 'Coastal Rhythms', 'Wave Makers'],
  ticketPrice: '2500 LKR'
};

const EventDetails = () => {
  const { eventId } = useParams();
  const [isLiked, setIsLiked] = React.useState(false);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link 
            to="/"
            className="flex items-center text-neutral-600 hover:text-indigo-600 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Events
          </Link>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsLiked(!isLiked)}
              className={`p-2 rounded-full ${
                isLiked ? 'text-red-500' : 'text-neutral-600'
              } hover:bg-neutral-100 transition-colors`}
            >
              <Heart className="h-5 w-5" fill={isLiked ? 'currentColor' : 'none'} />
            </button>
            
            <button className="p-2 rounded-full text-neutral-600 hover:bg-neutral-100 transition-colors">
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl overflow-hidden shadow-sm">
          <div className="relative h-96">
            <img 
              src={mockEvent.image} 
              alt={mockEvent.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-sm font-medium text-indigo-600">{mockEvent.category}</span>
            </div>
          </div>

          <div className="p-8">
            <h1 className="text-3xl font-bold text-neutral-900 mb-6">{mockEvent.title}</h1>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div className="flex items-center text-neutral-600">
                  <Calendar className="h-5 w-5 mr-3" />
                  <span>{new Date(mockEvent.date).toLocaleDateString('en-US', { 
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}</span>
                </div>
                
                <div className="flex items-center text-neutral-600">
                  <Clock className="h-5 w-5 mr-3" />
                  <span>{mockEvent.time}</span>
                </div>
                
                <div className="flex items-center text-neutral-600">
                  <MapPin className="h-5 w-5 mr-3" />
                  <span>{mockEvent.location}</span>
                </div>
              </div>

              <div className="bg-neutral-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">Ticket Information</h3>
                <p className="text-neutral-600 mb-4">Starting from {mockEvent.ticketPrice}</p>
                <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                  Book Tickets
                </button>
              </div>
            </div>

            <div className="prose max-w-none">
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">About the Event</h2>
              <p className="text-neutral-600 mb-6">{mockEvent.description}</p>

              <h2 className="text-xl font-semibold text-neutral-900 mb-4">Featured Artists</h2>
              <ul className="list-disc list-inside text-neutral-600">
                {mockEvent.artists.map((artist, index) => (
                  <li key={index}>{artist}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
