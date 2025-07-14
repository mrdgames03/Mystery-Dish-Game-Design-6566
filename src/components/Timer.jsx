import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiClock } = FiIcons;

const Timer = ({ timeLeft }) => {
  const getTimerColor = () => {
    if (timeLeft <= 10) return 'text-red-400 bg-red-500/20';
    if (timeLeft <= 20) return 'text-orange-400 bg-orange-500/20';
    return 'text-cyan-400 bg-cyan-500/20';
  };

  const getProgressColor = () => {
    if (timeLeft <= 10) return 'from-red-400 to-red-600';
    if (timeLeft <= 20) return 'from-orange-400 to-orange-600';
    return 'from-cyan-400 to-blue-500';
  };

  const progress = (timeLeft / 60) * 100;

  return (
    <motion.div
      animate={timeLeft <= 10 ? { scale: [1, 1.05, 1] } : {}}
      transition={{ duration: 0.5, repeat: timeLeft <= 10 ? Infinity : 0 }}
      className={`flex items-center space-x-3 px-4 py-2 rounded-2xl backdrop-blur-sm ${getTimerColor()}`}
    >
      <SafeIcon icon={FiClock} className="text-xl" />
      <div className="flex items-center space-x-2">
        <span className="font-mono text-lg font-bold">
          {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
        </span>
        <div className="w-16 h-2 bg-white/20 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: '100%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
            className={`h-full bg-gradient-to-r ${getProgressColor()}`}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Timer;