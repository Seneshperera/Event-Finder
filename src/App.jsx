import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './components/Home';
import EventDetails from './components/Eventdetails';
import OrganizerRegister from './components/OrgnaizerRegister';
import AddEvent from './components/AddEvent';

const App = () => (
  <Router>
    <div className="min-h-screen bg-neutral-50">
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/event/:eventId" element={<EventDetails />} />
          <Route path="/organizer/register" element={<OrganizerRegister />} />
          <Route path="/organizer/add-event" element={<AddEvent />} />
        </Routes>
      </AnimatePresence>
    </div>
  </Router>
);

export default App;
