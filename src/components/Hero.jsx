import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative h-96 flex items-center justify-center mb-16 bg-gradient-to-r from-black via-gray-900 to-black"
    >
      {/* Content */}
      <div className="text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Discover Live Music in Sri Lanka
        </h1>
        <p className="text-white text-lg max-w-2xl mx-auto">
          Experience the best live music events across the island. From classical concerts to beach festivals.
        </p>
      </div>
    </motion.div>
  );
};

export default Hero;
