import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiTrophy, FiTarget, FiZap, FiHome, FiPlay, FiAward, FiStar } = FiIcons;

const ResultScreen = ({ score, stats, onBackToMenu, onPlayAgain }) => {
  const [isNewHighScore, setIsNewHighScore] = useState(false);

  useEffect(() => {
    const savedScores = JSON.parse(localStorage.getItem('mystery-dish-scores') || '[]');
    const highestScore = savedScores.length > 0 ? savedScores[0].score : 0;
    setIsNewHighScore(score > highestScore);
  }, [score]);

  const accuracy = stats.totalGuesses > 0 ? Math.round((stats.correctGuesses / stats.totalGuesses) * 100) : 0;

  const getScoreRank = () => {
    if (score >= 2000) return { rank: 'Master Chef', color: 'from-yellow-400 to-orange-500', emoji: '👨‍🍳' };
    if (score >= 1500) return { rank: 'Sous Chef', color: 'from-purple-400 to-pink-500', emoji: '🥇' };
    if (score >= 1000) return { rank: 'Line Cook', color: 'from-blue-400 to-cyan-500', emoji: '🥈' };
    if (score >= 500) return { rank: 'Kitchen Helper', color: 'from-green-400 to-emerald-500', emoji: '🥉' };
    return { rank: 'Apprentice', color: 'from-gray-400 to-gray-600', emoji: '🍽️' };
  };

  const scoreRank = getScoreRank();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen flex flex-col items-center justify-center p-6 text-white"
      style={{ marginTop: '30px' }}
    >
      {/* Results Header */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-8"
      >
        <div className="text-6xl mb-4">{scoreRank.emoji}</div>
        <h1 className={`text-4xl font-bold bg-gradient-to-r ${scoreRank.color} bg-clip-text text-transparent mb-2`}>
          {scoreRank.rank}
        </h1>
        <p className="text-xl text-gray-300">Kitchen Adventure Complete!</p>
        
        {/* New High Score Badge */}
        {isNewHighScore && (
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 150 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-2 rounded-full mt-4 font-bold text-sm"
          >
            <SafeIcon icon={FiStar} className="text-lg" />
            <span>NEW HIGH SCORE!</span>
            <SafeIcon icon={FiStar} className="text-lg" />
          </motion.div>
        )}
      </motion.div>

      {/* Chef Leo's Final Message */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 max-w-md text-center"
      >
        <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <SafeIcon icon={FiTrophy} className="text-2xl text-white" />
        </div>
        <p className="text-sm text-gray-200 italic">
          {isNewHighScore 
            ? "Incredible! You've set a new kitchen record! Your culinary instincts are absolutely phenomenal!"
            : "What a delicious journey! You've got the instincts of a true chef. Every guess was seasoned with courage!"
          }
        </p>
      </motion.div>

      {/* Score Display */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm rounded-2xl p-6 mb-8 w-full max-w-md"
      >
        <div className="text-center">
          <SafeIcon icon={FiTrophy} className="text-4xl text-yellow-400 mx-auto mb-3" />
          <p className="text-3xl font-bold text-white mb-2">{score.toLocaleString()}</p>
          <p className="text-gray-300">Final Score</p>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="grid grid-cols-2 gap-4 mb-8 w-full max-w-md"
      >
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
          <SafeIcon icon={FiTarget} className="text-2xl text-green-400 mx-auto mb-2" />
          <p className="text-lg font-bold">{accuracy}%</p>
          <p className="text-xs text-gray-300">Accuracy</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
          <SafeIcon icon={FiZap} className="text-2xl text-orange-400 mx-auto mb-2" />
          <p className="text-lg font-bold">{stats.maxStreak}</p>
          <p className="text-xs text-gray-300">Best Streak</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
          <SafeIcon icon={FiTrophy} className="text-2xl text-purple-400 mx-auto mb-2" />
          <p className="text-lg font-bold">{stats.correctGuesses}</p>
          <p className="text-xs text-gray-300">Correct Guesses</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
          <SafeIcon icon={FiTarget} className="text-2xl text-blue-400 mx-auto mb-2" />
          <p className="text-lg font-bold">{stats.totalGuesses}</p>
          <p className="text-xs text-gray-300">Total Guesses</p>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
        className="flex space-x-4"
      >
        <button
          onClick={onPlayAgain}
          className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg flex items-center space-x-2 transition-all duration-300"
        >
          <SafeIcon icon={FiPlay} className="text-lg" />
          <span>Cook Again</span>
        </button>
        <button
          onClick={onBackToMenu}
          className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-bold py-3 px-6 rounded-xl border border-white/20 flex items-center space-x-2 transition-all duration-300"
        >
          <SafeIcon icon={FiHome} className="text-lg" />
          <span>Menu</span>
        </button>
      </motion.div>

      {/* Achievement Badges */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-8 text-center"
      >
        <p className="text-xs text-gray-400 mb-2">Achievements Unlocked:</p>
        <div className="flex justify-center space-x-2 flex-wrap">
          {accuracy >= 80 && (
            <div className="bg-yellow-400/20 text-yellow-400 px-3 py-1 rounded-full text-xs mb-2">
              Sharp Palate
            </div>
          )}
          {stats.maxStreak >= 3 && (
            <div className="bg-orange-400/20 text-orange-400 px-3 py-1 rounded-full text-xs mb-2">
              Hot Streak
            </div>
          )}
          {score >= 1000 && (
            <div className="bg-purple-400/20 text-purple-400 px-3 py-1 rounded-full text-xs mb-2">
              Kitchen Master
            </div>
          )}
          {isNewHighScore && (
            <div className="bg-gradient-to-r from-yellow-400/20 to-orange-400/20 text-yellow-400 px-3 py-1 rounded-full text-xs mb-2">
              Record Breaker
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ResultScreen;