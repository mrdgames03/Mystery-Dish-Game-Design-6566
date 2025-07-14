import React from 'react';
import { motion } from 'framer-motion';

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute top-0 left-0 right-0 z-50 p-4"
    >
      <div className="max-w-6xl mx-auto">
        <motion.img
          src="https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1752480244051-maysalward-primary-logo-landscape.png"
          alt="Maysalward Logo"
          className="h-12 md:h-16 w-auto object-contain"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.header>
  );
};

export default Header;