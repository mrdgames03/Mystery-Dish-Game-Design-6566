import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiPlay, FiSettings, FiInfo, FiChef, FiTrophy, FiTarget } = FiIcons;

const MenuScreen = ({ onStartGame }) => {
  const [highScores, setHighScores] = useState([]);

  useEffect(() => {
    const savedScores = JSON.parse(localStorage.getItem('mystery-dish-scores') || '[]');
    setHighScores(savedScores.slice(0, 3)); // Show top 3 scores
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen flex flex-col items-center justify-center p-6 text-white"
      style={{ marginTop: '30px' }}
    >
      {/* High Scores */}
      {highScores.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6 w-full max-w-md"
        >
          <div className="flex items-center space-x-2 mb-4">
            <SafeIcon icon={FiTrophy} className="text-xl text-yellow-400" />
            <h3 className="text-lg font-semibold">High Scores</h3>
          </div>
          
          <div className="space-y-2">
            {highScores.map((scoreEntry, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 border-b border-white/10 last:border-b-0"
              >
                <div className="flex items-center space-x-3">
                  <span className={`text-lg ${index === 0 ? 'text-yellow-400' : index === 1 ? 'text-gray-300' : 'text-orange-400'}`}>
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                  </span>
                  <div>
                    <p className="text-sm font-medium">{scoreEntry.score.toLocaleString()} pts</p>
                    <p className="text-xs text-gray-400">{scoreEntry.levelsCompleted} levels</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">
                    {Math.round((scoreEntry.stats.correctGuesses / scoreEntry.stats.totalGuesses) * 100) || 0}% accuracy
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Chef Leo Introduction */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 max-w-md"
      >
        <div className="flex items-center mb-3">
          <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mr-3">
            <SafeIcon icon={FiChef} className="text-xl text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Chef Leo</h3>
            <p className="text-sm text-gray-300">Your Culinary Guide</p>
          </div>
        </div>
        <p className="text-sm text-gray-200 italic">
          "Ready to stir things up? I'll be your voice coach and emotional support through this delicious adventure!"
        </p>
      </motion.div>

      {/* Game Stats Preview */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-3 gap-4 mb-8 w-full max-w-md"
      >
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
          <SafeIcon icon={FiInfo} className="text-2xl text-blue-400 mx-auto mb-2" />
          <p className="text-xs text-gray-300">Levels</p>
          <p className="text-lg font-bold">12</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
          <SafeIcon icon={FiPlay} className="text-2xl text-green-400 mx-auto mb-2" />
          <p className="text-xs text-gray-300">Time</p>
          <p className="text-lg font-bold">60s</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
          <SafeIcon icon={FiSettings} className="text-2xl text-purple-400 mx-auto mb-2" />
          <p className="text-xs text-gray-300">Lives</p>
          <p className="text-lg font-bold">3</p>
        </div>
      </motion.div>

      {/* Start Button */}
      <motion.button
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onStartGame}
        className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-4 px-8 rounded-2xl shadow-lg flex items-center space-x-3 text-lg transition-all duration-300"
      >
        <SafeIcon icon={FiPlay} className="text-xl" />
        <span>Start Cooking!</span>
      </motion.button>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-xs text-gray-400 mt-8 text-center"
      >
        Guess the mystery dish from visual clues • React quickly • Trust your instincts
      </motion.p>
    </motion.div>
  );
};

export default MenuScreen;