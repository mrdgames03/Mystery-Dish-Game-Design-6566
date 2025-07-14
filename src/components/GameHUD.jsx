import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiTrophy, FiHeart, FiZap, FiTarget } = FiIcons;

const GameHUD = ({ levelNumber, score, timeLeft, lives, streak }) => {
  return (
    <div className="w-full max-w-4xl mx-auto mb-4">
      <div className="flex items-center justify-between bg-white/10 backdrop-blur-sm rounded-2xl p-4">
        {/* Level */}
        <div className="flex items-center space-x-2">
          <SafeIcon icon={FiTarget} className="text-xl text-purple-400" />
          <div>
            <p className="text-xs text-white/60">Level</p>
            <p className="text-lg font-bold text-white">{levelNumber}</p>
          </div>
        </div>
        
        {/* Score */}
        <div className="flex items-center space-x-2">
          <SafeIcon icon={FiTrophy} className="text-xl text-yellow-400" />
          <div>
            <p className="text-xs text-white/60">Score</p>
            <p className="text-lg font-bold text-white">{score.toLocaleString()}</p>
          </div>
        </div>
        
        {/* Streak */}
        <div className="flex items-center space-x-2">
          <motion.div
            animate={streak > 0 ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.5, repeat: streak > 0 ? Infinity : 0 }}
          >
            <SafeIcon icon={FiZap} className="text-xl text-orange-400" />
          </motion.div>
          <div>
            <p className="text-xs text-white/60">Streak</p>
            <p className="text-lg font-bold text-white">{streak}</p>
          </div>
        </div>
        
        {/* Lives */}
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={i < lives ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <SafeIcon 
                  icon={FiHeart} 
                  className={`text-xl ${i < lives ? 'text-red-400' : 'text-white/30'}`} 
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameHUD;