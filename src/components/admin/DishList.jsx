import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiEdit, FiTrash2, FiEye, FiTarget, FiClock } = FiIcons;

const DishList = ({ dishes, onEdit, onDelete }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500/20 text-green-400';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'hard': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getDifficultyIcon = (difficulty) => {
    switch (difficulty) {
      case 'easy': return '🟢';
      case 'medium': return '🟡';
      case 'hard': return '🔴';
      default: return '⚪';
    }
  };

  return (
    <div className="space-y-4">
      {dishes.length === 0 ? (
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-12 text-center">
          <div className="text-6xl mb-4">🍽️</div>
          <h3 className="text-xl font-semibold text-white mb-2">No dishes found</h3>
          <p className="text-gray-300">Create your first dish to get started!</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {dishes.map((dish, index) => (
            <motion.div
              key={dish.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/15 transition-all group"
            >
              {/* Dish Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-1">{dish.name}</h3>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(dish.difficulty)}`}>
                      {getDifficultyIcon(dish.difficulty)} {dish.difficulty}
                    </span>
                    <span className="text-gray-400 text-xs">
                      {dish.hints.length} hints
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => onEdit(dish)}
                    className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-all"
                  >
                    <SafeIcon icon={FiEdit} className="text-sm" />
                  </button>
                  <button
                    onClick={() => onDelete(dish.id)}
                    className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all"
                  >
                    <SafeIcon icon={FiTrash2} className="text-sm" />
                  </button>
                </div>
              </div>

              {/* Hints Preview */}
              <div className="space-y-2 mb-4">
                {dish.hints.slice(0, 2).map((hint, i) => (
                  <div key={i} className="flex items-center space-x-2 text-sm text-gray-300">
                    <span className="text-lg">{hint.emoji}</span>
                    <span className="truncate">{hint.content}</span>
                  </div>
                ))}
                {dish.hints.length > 2 && (
                  <div className="text-xs text-gray-400">
                    +{dish.hints.length - 2} more hints
                  </div>
                )}
              </div>

              {/* Answers Preview */}
              <div className="border-t border-white/10 pt-3">
                <div className="flex items-center space-x-2 mb-2">
                  <SafeIcon icon={FiTarget} className="text-xs text-gray-400" />
                  <span className="text-xs text-gray-400">Correct Answers:</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {dish.correctAnswers.slice(0, 3).map((answer, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-white/10 text-white text-xs rounded-full"
                    >
                      {answer}
                    </span>
                  ))}
                  {dish.correctAnswers.length > 3 && (
                    <span className="px-2 py-1 bg-white/10 text-gray-400 text-xs rounded-full">
                      +{dish.correctAnswers.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DishList;