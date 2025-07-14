import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiChef, FiHeart, FiAlertCircle, FiSmile } = FiIcons;

const ChefLeoDialog = ({ dialog, emotion, timeLeft }) => {
  const [isTyping, setIsTyping] = useState(false);
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    if (dialog) {
      setIsTyping(true);
      setDisplayText('');
      
      let index = 0;
      const typeInterval = setInterval(() => {
        if (index < dialog.length) {
          setDisplayText(dialog.substring(0, index + 1));
          index++;
        } else {
          setIsTyping(false);
          clearInterval(typeInterval);
        }
      }, 30);
      
      return () => clearInterval(typeInterval);
    }
  }, [dialog]);

  const getEmotionIcon = () => {
    switch (emotion) {
      case 'happy':
        return FiSmile;
      case 'concerned':
        return FiAlertCircle;
      default:
        return FiChef;
    }
  };

  const getEmotionColor = () => {
    switch (emotion) {
      case 'happy':
        return 'from-green-400 to-emerald-500';
      case 'concerned':
        return 'from-orange-400 to-red-500';
      default:
        return 'from-blue-400 to-purple-500';
    }
  };

  const getBackgroundColor = () => {
    if (timeLeft <= 10) return 'bg-red-500/20 border-red-400/30';
    if (emotion === 'happy') return 'bg-green-500/20 border-green-400/30';
    if (emotion === 'concerned') return 'bg-orange-500/20 border-orange-400/30';
    return 'bg-blue-500/20 border-blue-400/30';
  };

  return (
    <AnimatePresence>
      {dialog && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          className={`max-w-md mx-auto p-4 rounded-2xl backdrop-blur-sm border ${getBackgroundColor()} relative`}
        >
          {/* Chef Leo Avatar */}
          <div className="flex items-start space-x-3">
            <motion.div
              animate={{ 
                scale: isTyping ? [1, 1.1, 1] : 1,
                rotate: emotion === 'happy' ? [0, 5, -5, 0] : 0
              }}
              transition={{ 
                scale: { duration: 0.5, repeat: isTyping ? Infinity : 0 },
                rotate: { duration: 2, repeat: emotion === 'happy' ? Infinity : 0 }
              }}
              className={`w-12 h-12 rounded-full bg-gradient-to-r ${getEmotionColor()} flex items-center justify-center flex-shrink-0`}
            >
              <SafeIcon icon={getEmotionIcon()} className="text-xl text-white" />
            </motion.div>
            
            {/* Dialog Content */}
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <h3 className="font-semibold text-white">Chef Leo</h3>
                {emotion === 'happy' && (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="ml-2"
                  >
                    <SafeIcon icon={FiHeart} className="text-red-400 text-sm" />
                  </motion.div>
                )}
              </div>
              
              <motion.p
                className="text-white text-sm leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {displayText}
                {isTyping && (
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="ml-1"
                  >
                    |
                  </motion.span>
                )}
              </motion.p>
            </div>
          </div>
          
          {/* Speech Bubble Tail */}
          <div className="absolute -bottom-2 left-8 w-4 h-4 bg-inherit border-r border-b border-current transform rotate-45" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChefLeoDialog;