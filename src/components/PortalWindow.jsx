import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiEye, FiZap } = FiIcons;

const PortalWindow = ({ hint, hintNumber, totalHints, isAnswering }) => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="relative"
    >
      {/* Portal Frame */}
      <div className="relative w-80 h-80 md:w-96 md:h-96">
        {/* Magical Portal Effect */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 p-2"
        >
          <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-900 to-indigo-900" />
        </motion.div>
        
        {/* Inner Portal Glow */}
        <motion.div
          animate={{ 
            scale: [1, 1.05, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute inset-4 rounded-full bg-gradient-to-r from-cyan-400/20 to-purple-400/20 backdrop-blur-sm"
        />
        
        {/* Hint Content */}
        <div className="absolute inset-6 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center overflow-hidden">
          <motion.div
            key={hint.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center p-4"
          >
            {hint.type === 'image' ? (
              <div className="relative">
                <img
                  src={hint.content}
                  alt="Mystery dish hint"
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-lg" />
              </div>
            ) : (
              <div className="text-white">
                <div className="text-6xl mb-4">{hint.emoji}</div>
                <p className="text-lg font-medium">{hint.content}</p>
              </div>
            )}
          </motion.div>
        </div>
        
        {/* Hint Counter */}
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
          <div className="flex items-center space-x-2 text-white text-sm">
            <SafeIcon icon={FiEye} className="text-cyan-400" />
            <span>Hint {hintNumber} of {totalHints}</span>
          </div>
        </div>
        
        {/* Processing Animation */}
        {isAnswering && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="text-4xl text-yellow-400"
            >
              <SafeIcon icon={FiZap} />
            </motion.div>
          </motion.div>
        )}
      </div>
      
      {/* Portal Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.sin(i) * 10, 0],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 2 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3
            }}
            className="absolute w-2 h-2 bg-cyan-400 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + i * 10}%`
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default PortalWindow;