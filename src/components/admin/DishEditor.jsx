import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import EmojiPicker from './EmojiPicker';

const { FiSave, FiX, FiPlus, FiTrash2, FiImage, FiType } = FiIcons;

const DishEditor = ({ dish, onSave, onCancel, isLoading }) => {
  const [formData, setFormData] = useState(dish);
  const [showEmojiPicker, setShowEmojiPicker] = useState(null);

  useEffect(() => {
    setFormData(dish);
  }, [dish]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleHintChange = (hintIndex, field, value) => {
    const newHints = [...formData.hints];
    newHints[hintIndex] = {
      ...newHints[hintIndex],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      hints: newHints
    }));
  };

  const addHint = () => {
    const newHint = {
      id: Date.now(),
      type: 'emoji',
      content: '',
      emoji: '🍽️'
    };
    setFormData(prev => ({
      ...prev,
      hints: [...prev.hints, newHint]
    }));
  };

  const removeHint = (hintIndex) => {
    const newHints = formData.hints.filter((_, index) => index !== hintIndex);
    setFormData(prev => ({
      ...prev,
      hints: newHints
    }));
  };

  const handleAnswerChange = (answerIndex, value) => {
    const newAnswers = [...formData.correctAnswers];
    newAnswers[answerIndex] = value;
    setFormData(prev => ({
      ...prev,
      correctAnswers: newAnswers
    }));
  };

  const addAnswer = () => {
    setFormData(prev => ({
      ...prev,
      correctAnswers: [...prev.correctAnswers, '']
    }));
  };

  const removeAnswer = (answerIndex) => {
    const newAnswers = formData.correctAnswers.filter((_, index) => index !== answerIndex);
    setFormData(prev => ({
      ...prev,
      correctAnswers: newAnswers
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim()) {
      alert('Please enter a dish name');
      return;
    }
    
    if (formData.hints.length === 0) {
      alert('Please add at least one hint');
      return;
    }
    
    if (formData.correctAnswers.filter(a => a.trim()).length === 0) {
      alert('Please add at least one correct answer');
      return;
    }

    // Clean up data
    const cleanedData = {
      ...formData,
      hints: formData.hints.filter(hint => hint.content.trim()),
      correctAnswers: formData.correctAnswers.filter(answer => answer.trim())
    };

    onSave(cleanedData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white/10 backdrop-blur-sm rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">
          {dish.name ? 'Edit Dish' : 'Create New Dish'}
        </h2>
        <button
          onClick={onCancel}
          className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all"
        >
          <SafeIcon icon={FiX} className="text-lg" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Dish Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="e.g., Spaghetti Carbonara"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Difficulty
            </label>
            <select
              value={formData.difficulty}
              onChange={(e) => handleInputChange('difficulty', e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>

        {/* Hints */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="block text-sm font-medium text-gray-300">
              Hints *
            </label>
            <button
              type="button"
              onClick={addHint}
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg flex items-center space-x-1 text-sm transition-all"
            >
              <SafeIcon icon={FiPlus} className="text-sm" />
              <span>Add Hint</span>
            </button>
          </div>
          
          <div className="space-y-4">
            {formData.hints.map((hint, index) => (
              <div key={hint.id} className="bg-white/5 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-300">Hint {index + 1}</span>
                  {formData.hints.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeHint(index)}
                      className="p-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded transition-all"
                    >
                      <SafeIcon icon={FiTrash2} className="text-sm" />
                    </button>
                  )}
                </div>
                
                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Emoji</label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setShowEmojiPicker(showEmojiPicker === index ? null : index)}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-2xl text-center hover:bg-white/15 transition-all"
                      >
                        {hint.emoji}
                      </button>
                      {showEmojiPicker === index && (
                        <EmojiPicker
                          onSelect={(emoji) => {
                            handleHintChange(index, 'emoji', emoji);
                            setShowEmojiPicker(null);
                          }}
                          onClose={() => setShowEmojiPicker(null)}
                        />
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Description</label>
                    <input
                      type="text"
                      value={hint.content}
                      onChange={(e) => handleHintChange(index, 'content', e.target.value)}
                      placeholder="e.g., Long pasta strands with creamy sauce"
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Correct Answers */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="block text-sm font-medium text-gray-300">
              Correct Answers *
            </label>
            <button
              type="button"
              onClick={addAnswer}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg flex items-center space-x-1 text-sm transition-all"
            >
              <SafeIcon icon={FiPlus} className="text-sm" />
              <span>Add Answer</span>
            </button>
          </div>
          
          <div className="space-y-2">
            {formData.correctAnswers.map((answer, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                  placeholder="e.g., spaghetti carbonara"
                  className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
                {formData.correctAnswers.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeAnswer(index)}
                    className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all"
                  >
                    <SafeIcon icon={FiTrash2} className="text-sm" />
                  </button>
                )}
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Add multiple variations (e.g., "carbonara", "spaghetti carbonara", "pasta carbonara")
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end space-x-3 pt-6 border-t border-white/10">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 disabled:opacity-50 text-white rounded-xl flex items-center space-x-2 transition-all"
          >
            {isLoading ? (
              <>
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <SafeIcon icon={FiSave} className="text-lg" />
                <span>Save Dish</span>
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default DishEditor;