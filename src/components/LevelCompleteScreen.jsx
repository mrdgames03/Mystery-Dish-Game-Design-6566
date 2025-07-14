import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiTrophy, FiArrowRight, FiHome, FiTarget, FiZap, FiClock } = FiIcons;

const LevelCompleteScreen = ({ 
  levelNumber, 
  score, 
  timeLeft, 
  pointsEarned, 
  onContinue, 
  onExit, 
  gameStats,
  isLastLevel 
}) => {
  const getPerformanceMessage = () => {
    if (timeLeft >= 45) return { message: "Lightning Fast!", color: "text-yellow-400", emoji: "⚡" };
    if (timeLeft >= 30) return { message: "Great Speed!", color: "text-green-400", emoji: "🚀" };
    if (timeLeft >= 15) return { message: "Good Timing!", color: "text-blue-400", emoji: "👍" };
    return { message: "Just Made It!", color: "text-orange-400", emoji: "😅" };
  };

  const performance = getPerformanceMessage();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-md w-full text-center"
      >
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="mb-6"
        >
          <div className="text-6xl mb-2">🎉</div>
          <h2 className="text-2xl font-bold text-white mb-2">Level Complete!</h2>
          <p className={`text-lg ${performance.color} font-semibold`}>
            {performance.emoji} {performance.message}
          </p>
        </motion.div>

        {/* Level Info */}
        <div className="bg-white/10 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-300">Level {levelNumber}</span>
            <div className="flex items-center space-x-2">
              <SafeIcon icon={FiClock} className="text-cyan-400" />
              <span className="text-white">{timeLeft}s remaining</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Points Earned</span>
            <span className="text-2xl font-bold text-yellow-400">+{pointsEarned}</span>
          </div>
        </div>

        {/* Current Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white/5 rounded-lg p-3">
            <SafeIcon icon={FiTrophy} className="text-yellow-400 text-lg mx-auto mb-1" />
            <p className="text-xs text-gray-300">Score</p>
            <p className="text-sm font-bold text-white">{score.toLocaleString()}</p>
          </div>
          
          <div className="bg-white/5 rounded-lg p-3">
            <SafeIcon icon={FiZap} className="text-orange-400 text-lg mx-auto mb-1" />
            <p className="text-xs text-gray-300">Streak</p>
            <p className="text-sm font-bold text-white">{gameStats.streak}</p>
          </div>
          
          <div className="bg-white/5 rounded-lg p-3">
            <SafeIcon icon={FiTarget} className="text-green-400 text-lg mx-auto mb-1" />
            <p className="text-xs text-gray-300">Correct</p>
            <p className="text-sm font-bold text-white">{gameStats.correctGuesses}</p>
          </div>
        </div>

        {/* Chef Leo's Encouragement */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-xl p-4 mb-6"
        >
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center">
              <span className="text-sm">👨‍🍳</span>
            </div>
            <span className="text-sm font-semibold text-white">Chef Leo</span>
          </div>
          <p className="text-sm text-gray-200 italic">
            {isLastLevel 
              ? "What a culinary journey! You've mastered every dish like a true chef!"
              : "Your taste buds are on fire! Ready for the next delicious challenge?"
            }
          </p>
        </motion.div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button
            onClick={onExit}
            className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition-all"
          >
            <SafeIcon icon={FiHome} className="text-lg" />
            <span>Save & Exit</span>
          </button>
          
          {!isLastLevel && (
            <button
              onClick={onContinue}
              className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition-all"
            >
              <span>Continue</span>
              <SafeIcon icon={FiArrowRight} className="text-lg" />
            </button>
          )}
        </div>

        {/* Next Level Preview */}
        {!isLastLevel && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-xs text-gray-400 mt-4"
          >
            Next: Level {levelNumber + 1} • New mystery dish awaits!
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default LevelCompleteScreen;