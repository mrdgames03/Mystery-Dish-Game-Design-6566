import React from 'react';
import { motion } from 'framer-motion';

const EmojiPicker = ({ onSelect, onClose }) => {
  const foodEmojis = [
    '🍕', '🍔', '🍟', '🌭', '🥪', '🌮', '🌯', '🥙', '🧆', '🥚',
    '🍳', '🥘', '🍲', '🥗', '🍿', '🧈', '🥛', '🍞', '🥖', '🥨',
    '🧀', '🥓', '🥩', '🍗', '🍖', '🦴', '🌶️', '🫑', '🥒', '🥬',
    '🥕', '🧄', '🧅', '🍄', '🥜', '🌰', '🍯', '🥥', '🥝', '🍇',
    '🍓', '🫐', '🍈', '🍉', '🍑', '🍒', '🍐', '🍊', '🍋', '🍌',
    '🥭', '🍍', '🥑', '🍅', '🍆', '🥔', '🍠', '🥐', '🥯', '🍞',
    '🥖', '🥨', '🧀', '🥚', '🍳', '🧈', '🥞', '🧇', '🥓', '🥩',
    '🍗', '🍖', '🦴', '🌭', '🍔', '🍟', '🍕', '🥪', '🌮', '🌯',
    '🥙', '🧆', '🥘', '🍲', '🥗', '🍿', '🧈', '🥛', '☕', '🍵',
    '🧃', '🥤', '🧋', '🍶', '🍾', '🍷', '🍸', '🍹', '🍺', '🍻'
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="absolute top-full left-0 right-0 mt-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 z-50 max-h-48 overflow-y-auto"
    >
      <div className="grid grid-cols-8 gap-2">
        {foodEmojis.map((emoji) => (
          <button
            key={emoji}
            type="button"
            onClick={() => onSelect(emoji)}
            className="w-8 h-8 text-lg hover:bg-white/20 rounded-lg transition-all flex items-center justify-center"
          >
            {emoji}
          </button>
        ))}
      </div>
      
      <div className="mt-3 pt-3 border-t border-white/10">
        <button
          type="button"
          onClick={onClose}
          className="w-full text-center text-sm text-gray-400 hover:text-white transition-colors"
        >
          Close
        </button>
      </div>
    </motion.div>
  );
};

export default EmojiPicker;