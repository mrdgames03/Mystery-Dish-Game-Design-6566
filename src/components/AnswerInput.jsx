import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiSend, FiMic, FiKeyboard } = FiIcons;

const AnswerInput = ({ onGuess, disabled, placeholder }) => {
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onGuess(input.trim());
      setInput('');
    }
  };

  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    }
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="w-full max-w-md"
    >
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={disabled}
            placeholder={placeholder}
            className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-4 pr-24 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
          />
          
          {/* Voice Input Button */}
          <button
            type="button"
            onClick={handleVoiceInput}
            disabled={disabled || isListening}
            className="absolute right-16 top-1/2 transform -translate-y-1/2 p-2 text-white/60 hover:text-white transition-colors"
          >
            <motion.div
              animate={isListening ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.5, repeat: isListening ? Infinity : 0 }}
            >
              <SafeIcon 
                icon={FiMic} 
                className={`text-xl ${isListening ? 'text-red-400' : ''}`} 
              />
            </motion.div>
          </button>
          
          {/* Submit Button */}
          <button
            type="submit"
            disabled={!input.trim() || disabled}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 disabled:from-gray-400 disabled:to-gray-500 text-white p-2 rounded-xl transition-all duration-300 disabled:opacity-50"
          >
            <SafeIcon icon={FiSend} className="text-xl" />
          </button>
        </div>
        
        {/* Input Hint */}
        <div className="flex items-center justify-center mt-3 text-white/60 text-sm">
          <SafeIcon icon={FiKeyboard} className="mr-2" />
          <span>Type your guess or use voice input</span>
        </div>
      </form>
    </motion.div>
  );
};

export default AnswerInput;