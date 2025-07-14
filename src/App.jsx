import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GameScreen from './components/GameScreen';
import MenuScreen from './components/MenuScreen';
import ResultScreen from './components/ResultScreen';
import AdminPage from './components/AdminPage';
import Header from './components/Header';
import { gameData } from './data/gameData';
import './App.css';

function App() {
  const [gameState, setGameState] = useState('menu'); // menu, playing, result, admin
  const [currentLevel, setCurrentLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [lives, setLives] = useState(3);
  const [gameStats, setGameStats] = useState({
    correctGuesses: 0,
    totalGuesses: 0,
    streak: 0,
    maxStreak: 0
  });
  const [isAdmin, setIsAdmin] = useState(false);

  // Check for admin mode (you can add authentication here)
  useEffect(() => {
    const checkAdmin = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const adminMode = urlParams.get('admin') === 'true';
      setIsAdmin(adminMode);
      
      if (adminMode) {
        setGameState('admin');
      }
    };
    
    checkAdmin();
  }, []);

  const startGame = () => {
    setGameState('playing');
    setCurrentLevel(0);
    setScore(0);
    setTimeLeft(60);
    setLives(3);
    setGameStats({
      correctGuesses: 0,
      totalGuesses: 0,
      streak: 0,
      maxStreak: 0
    });
  };

  const endGame = (reason) => {
    // Save final score to localStorage for high scores
    const finalScore = {
      score,
      stats: gameStats,
      date: new Date().toISOString(),
      reason,
      levelsCompleted: currentLevel + (reason === 'completed' ? 1 : 0)
    };
    
    const savedScores = JSON.parse(localStorage.getItem('mystery-dish-scores') || '[]');
    savedScores.push(finalScore);
    
    // Keep only top 10 scores
    savedScores.sort((a, b) => b.score - a.score);
    savedScores.splice(10);
    
    localStorage.setItem('mystery-dish-scores', JSON.stringify(savedScores));
    
    setGameState('result');
  };

  const nextLevel = () => {
    if (currentLevel < gameData.length - 1) {
      setCurrentLevel(currentLevel + 1);
      setTimeLeft(60);
    } else {
      endGame('completed');
    }
  };

  const handleCorrectGuess = () => {
    const newScore = score + 100 + (timeLeft * 2);
    setScore(newScore);
    setGameStats(prev => ({
      ...prev,
      correctGuesses: prev.correctGuesses + 1,
      totalGuesses: prev.totalGuesses + 1,
      streak: prev.streak + 1,
      maxStreak: Math.max(prev.maxStreak, prev.streak + 1)
    }));
  };

  const handleWrongGuess = () => {
    const newLives = lives - 1;
    setLives(newLives);
    setGameStats(prev => ({
      ...prev,
      totalGuesses: prev.totalGuesses + 1,
      streak: 0
    }));
    
    if (newLives <= 0) {
      endGame('lives');
    }
  };

  const backToMenu = () => {
    setGameState('menu');
    // Remove admin parameter from URL
    const url = new URL(window.location);
    url.searchParams.delete('admin');
    window.history.replaceState({}, '', url);
  };

  const goToAdmin = () => {
    setGameState('admin');
    // Add admin parameter to URL
    const url = new URL(window.location);
    url.searchParams.set('admin', 'true');
    window.history.replaceState({}, '', url);
  };

  const backToGame = () => {
    setGameState('menu');
  };

  // Add keyboard shortcut for admin access
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        goToAdmin();
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800">
      {/* Logo Header - Always visible */}
      <Header />
      
      <AnimatePresence mode="wait">
        {gameState === 'menu' && (
          <MenuScreen key="menu" onStartGame={startGame} />
        )}
        
        {gameState === 'playing' && (
          <GameScreen
            key="game"
            level={gameData[currentLevel]}
            levelNumber={currentLevel + 1}
            score={score}
            timeLeft={timeLeft}
            setTimeLeft={setTimeLeft}
            lives={lives}
            onCorrectGuess={handleCorrectGuess}
            onWrongGuess={handleWrongGuess}
            onNextLevel={nextLevel}
            onGameEnd={endGame}
            gameStats={gameStats}
            totalLevels={gameData.length}
          />
        )}
        
        {gameState === 'result' && (
          <ResultScreen
            key="result"
            score={score}
            stats={gameStats}
            onBackToMenu={backToMenu}
            onPlayAgain={startGame}
          />
        )}
        
        {gameState === 'admin' && (
          <AdminPage
            key="admin"
            onBackToGame={backToGame}
          />
        )}
      </AnimatePresence>
      
      {/* Admin Access Hint */}
      {gameState === 'menu' && (
        <div className="fixed bottom-4 right-4 text-xs text-white/30">
          Press Ctrl+Shift+A for admin
        </div>
      )}
    </div>
  );
}

export default App;