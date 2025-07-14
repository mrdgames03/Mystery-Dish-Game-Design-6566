import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Timer from './Timer';
import ChefLeoDialog from './ChefLeoDialog';
import GameHUD from './GameHUD';
import PortalWindow from './PortalWindow';
import AnswerInput from './AnswerInput';
import LevelCompleteScreen from './LevelCompleteScreen';

const GameScreen = ({
  level,
  levelNumber,
  score,
  timeLeft,
  setTimeLeft,
  lives,
  onCorrectGuess,
  onWrongGuess,
  onNextLevel,
  onGameEnd,
  gameStats,
  totalLevels
}) => {
  const [currentHint, setCurrentHint] = useState(0);
  const [chefDialog, setChefDialog] = useState('');
  const [isAnswering, setIsAnswering] = useState(false);
  const [showLevelComplete, setShowLevelComplete] = useState(false);
  const [lastGuessCorrect, setLastGuessCorrect] = useState(null);
  const [pointsEarned, setPointsEarned] = useState(0);

  // Initialize Chef Leo's greeting
  useEffect(() => {
    if (levelNumber === 1) {
      setChefDialog("Welcome to the Great Guessing Kitchen! On the other side of that portal, your teammate just served a spicy clue. Let's stir things up!");
    } else {
      setChefDialog(`Level ${levelNumber}! Time to taste something new. Your senses are getting sharper!`);
    }
  }, [levelNumber]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0 && !showLevelComplete) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
        
        // Chef Leo reactions to time
        if (timeLeft === 10) {
          setChefDialog("Chop chop! We're running out of time! You've got this, just trust your senses!");
        } else if (timeLeft === 5) {
          setChefDialog("Final countdown! What does your gut tell you?");
        }
      }, 1000);

      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showLevelComplete) {
      setChefDialog("Time's up! Even the best chefs have off days. What matters is — we made a memory!");
      setTimeout(() => onGameEnd('time'), 2000);
    }
  }, [timeLeft, showLevelComplete, onGameEnd, setTimeLeft]);

  // Auto-advance hints
  useEffect(() => {
    if (currentHint < level.hints.length - 1 && !showLevelComplete) {
      const hintTimer = setTimeout(() => {
        setCurrentHint(currentHint + 1);
        setChefDialog("Ah! Another clue appears! The plot thickens like a good roux!");
      }, 8000);

      return () => clearTimeout(hintTimer);
    }
  }, [currentHint, level.hints.length, showLevelComplete]);

  const handleGuess = (guess) => {
    setIsAnswering(true);
    
    const isCorrect = level.correctAnswers.some(answer => 
      answer.toLowerCase().trim() === guess.toLowerCase().trim()
    );

    if (isCorrect) {
      setLastGuessCorrect(true);
      const points = 100 + (timeLeft * 2);
      setPointsEarned(points);
      setChefDialog("Bam! That's the flavor we needed! You're cooking with instinct!");
      onCorrectGuess();
      
      setTimeout(() => {
        setChefDialog("You, my friend, just plated perfection! If I had a Michelin star, I'd throw it your way!");
        setShowLevelComplete(true);
      }, 1500);
    } else {
      setLastGuessCorrect(false);
      setChefDialog("Hmm... that's not quite it. Don't worry — even Julia Child burned a soufflé now and then.");
      onWrongGuess();
    }
    
    setTimeout(() => setIsAnswering(false), 1000);
  };

  const handleContinue = () => {
    setShowLevelComplete(false);
    setCurrentHint(0);
    setLastGuessCorrect(null);
    setPointsEarned(0);
    onNextLevel();
  };

  const handleExit = () => {
    onGameEnd('exit');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col p-4 text-white relative overflow-hidden"
      style={{ marginTop: '30px' }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_70%)]" />

      {/* Game HUD */}
      <GameHUD
        levelNumber={levelNumber}
        score={score}
        timeLeft={timeLeft}
        lives={lives}
        streak={gameStats.streak}
      />

      {/* Main Game Area */}
      <div className="flex-1 flex flex-col items-center justify-center space-y-6 relative z-10">
        {/* Portal Window */}
        <PortalWindow
          hint={level.hints[currentHint]}
          hintNumber={currentHint + 1}
          totalHints={level.hints.length}
          isAnswering={isAnswering}
        />

        {/* Chef Leo Dialog */}
        <ChefLeoDialog
          dialog={chefDialog}
          emotion={lastGuessCorrect === true ? 'happy' : lastGuessCorrect === false ? 'concerned' : 'neutral'}
          timeLeft={timeLeft}
        />

        {/* Answer Input */}
        {!showLevelComplete && (
          <AnswerInput
            onGuess={handleGuess}
            disabled={isAnswering}
            placeholder="What dish do you see?"
          />
        )}

        {/* Timer */}
        <Timer timeLeft={timeLeft} />
      </div>

      {/* Level Complete Screen */}
      <AnimatePresence>
        {showLevelComplete && (
          <LevelCompleteScreen
            levelNumber={levelNumber}
            score={score}
            timeLeft={timeLeft}
            pointsEarned={pointsEarned}
            onContinue={handleContinue}
            onExit={handleExit}
            gameStats={gameStats}
            isLastLevel={levelNumber === totalLevels}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default GameScreen;