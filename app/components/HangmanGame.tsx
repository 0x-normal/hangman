'use client';

import { useState, useEffect } from 'react';

// EXACT word database from original HTML
const wordDatabase = {
  easy: [
    'APPLE', 'BOOK', 'CHAIR', 'DOOR', 'FISH', 'GAME', 'HAND', 'JUMP',
    'KING', 'LAMP', 'MILK', 'NOSE', 'OPEN', 'PARK', 'RAIN', 'SNOW',
    'TREE', 'WALL', 'BIRD', 'CAKE', 'DESK', 'FIRE', 'GIFT', 'HOME',
    'STAR', 'TIME', 'WATER', 'BEACH', 'BREAD', 'CLOCK', 'DANCE', 'EARTH',
    'GRASS', 'HAPPY', 'HOUSE', 'LIGHT', 'MONEY', 'MUSIC', 'PAPER', 'PHONE',
    'PLANT', 'QUICK', 'RIVER', 'SHOE', 'SLEEP', 'SMILE', 'SPORT', 'STONE',
    'TABLE', 'UNCLE', 'VOICE', 'WATCH', 'YOUNG', 'ZEBRA', 'BRAVE', 'CLEAN',
    'DRESS', 'EMPTY', 'FRESH', 'GLASS', 'GREEN', 'HORSE', 'KNIFE', 'LEARN',
    'MONTH', 'NIGHT', 'OCEAN', 'PEACE', 'QUEEN', 'ROUND', 'SEVEN', 'TEACH',
    'WORLD', 'BROWN', 'CHILD', 'DRINK', 'EIGHT', 'FLOOR', 'GREAT', 'HEART',
    'LUNCH', 'MOUTH', 'NEVER', 'OFTEN', 'PLACE', 'RIGHT', 'THING', 'THREE',
    'UNDER', 'WHITE', 'WRITE', 'YEAR', 'BLACK', 'CLOSE', 'DREAM', 'EARLY',
    'FIELD', 'GRAND', 'HEAVY', 'LARGE', 'NORTH', 'POINT', 'QUIET', 'SHORT',
    'SMALL', 'SOUTH', 'SPEAK', 'SPEND', 'STAND', 'STORE', 'SWEET', 'THANK',
    'THINK', 'TRAIN', 'TRUCK', 'TRUTH', 'VISIT', 'WOMAN'
  ],
  medium: [
    'COMPUTER', 'KEYBOARD', 'ELEPHANT', 'MOUNTAIN', 'CHOCOLATE', 'ADVENTURE',
    'BEAUTIFUL', 'BUTTERFLY', 'CALENDAR', 'DIFFERENT', 'EDUCATION', 'EXCITING',
    'FANTASTIC', 'IMPORTANT', 'KNOWLEDGE', 'LANGUAGE', 'NECESSARY', 'SOMETHING',
    'WONDERFUL', 'CHILDREN', 'QUESTION', 'REMEMBER', 'YESTERDAY', 'TOGETHER',
    'BIRTHDAY', 'FAVORITE', 'POSSIBLE', 'BUSINESS', 'BUILDING', 'CUSTOMER',
    'DISCOVER', 'EXERCISE', 'GRATEFUL', 'HOSPITAL', 'INTEREST', 'INTERNET',
    'JOURNEY', 'KITCHEN', 'MATERIAL', 'NEIGHBOR', 'ORDINARY', 'PRACTICE',
    'RESEARCH', 'SEPARATE', 'TEACHING', 'UNIVERSE', 'VACATION', 'WEATHER',
    'MARRIAGE', 'AIRPLANE', 'BASEBALL', 'BATHROOM', 'BEDROOM', 'BREAKFAST',
    'BROTHER', 'CAPTAIN', 'CHICKEN', 'COMPLETE', 'DAUGHTER', 'DECISION',
    'DIRECTOR', 'DISTANCE', 'DOCUMENT', 'ENTRANCE', 'ENVELOPE', 'FOOTBALL',
    'FOURTEEN', 'FRIENDLY', 'HOSPITAL', 'HUNDREDS', 'INCREASE', 'MACHINE',
    'MAGAZINE', 'MESSAGE', 'MIDNIGHT', 'MOUNTAIN', 'NATIONAL', 'NOTEBOOK',
    'NOVEMBER', 'ORGANIZE', 'PATIENCE', 'PERSONAL', 'PLEASURE', 'POSITION',
    'PRACTICE', 'PRECIOUS', 'PREPARED', 'PRESENCE', 'PRESSURE', 'PRINCESS',
    'PROBABLY', 'PROGRESS', 'PROMISED', 'SANDWICH', 'SATURDAY', 'SCHEDULE',
    'SHOULDER', 'SITUATION', 'SOFTWARE', 'STANDARD', 'STRAIGHT', 'STRENGTH',
    'STRUGGLE', 'SUDDENLY', 'SURPRISE', 'SWIMMING', 'TEACHING', 'THOUSAND',
    'TOMORROW', 'TREASURE', 'TRIANGLE', 'UMBRELLA', 'UNIVERSE', 'VACATION'
  ],
  hard: [
    'ACCELERATION', 'ACHIEVEMENT', 'ACKNOWLEDGE', 'AGRICULTURAL', 'ALPHABETICAL',
    'ANNIVERSARY', 'APPRECIATION', 'ARCHAEOLOGY', 'ARCHITECTURE', 'ARISTOCRACY',
    'ASTRONOMICAL', 'ATMOSPHERE', 'AUTHENTICATION', 'AUTOBIOGRAPHY', 'BIODIVERSITY',
    'BIOTECHNOLOGY', 'BREAKTHROUGH', 'BUREAUCRACY', 'CARDIOVASCULAR', 'CHAMPIONSHIP',
    'CHARACTERISTICS', 'CHOREOGRAPHY', 'CINEMATOGRAPHY', 'CIVILIZATION', 'COLLABORATION',
    'COMMUNICATION', 'COMPREHENSIVE', 'CONCENTRATION', 'CONFIGURATION', 'CONGRESSIONAL',
    'CONSCIOUSNESS', 'CONSERVATION', 'CONSTELLATION', 'CONSTITUTIONAL', 'CONSTRUCTION',
    'CONTEMPORARY', 'CONTROVERSIAL', 'CONVERSATION', 'COORDINATION', 'CORRESPONDENT',
    'CRYPTOCURRENCY', 'DETERMINATION', 'DISAPPOINTING', 'DISCRIMINATION', 'DISTRIBUTION',
    'EFFECTIVENESS', 'ELECTROMAGNETIC', 'ENCYCLOPEDIA', 'ENTERTAINMENT', 'ENTREPRENEUR',
    'ENVIRONMENTAL', 'ESTABLISHMENT', 'EVOLUTIONARY', 'EXPERIMENTAL', 'EXTRAORDINARY',
    'FUNDAMENTALLY', 'GEOGRAPHICAL', 'GOVERNMENTAL', 'HUMANITARIAN', 'ILLUSTRATION',
    'IMAGINATION', 'IMPLEMENTATION', 'INDEPENDENTLY', 'INFRASTRUCTURE', 'INSTITUTIONAL',
    'INSTRUMENTAL', 'INTELLECTUAL', 'INTELLIGENCE', 'INTERMEDIATE', 'INTERNATIONAL',
    'INTERPRETATION', 'INTRODUCTION', 'INVESTIGATION', 'KINDERGARTEN', 'MANUFACTURING',
    'MASSACHUSETTS', 'MEDITERRANEAN', 'MICROORGANISM', 'MISCELLANEOUS', 'NEIGHBORHOOD',
    'NEVERTHELESS', 'NOTIFICATION', 'PHARMACEUTICAL', 'PHILOSOPHICAL', 'PHOTOGRAPHER',
    'PRECIPITATION', 'PROFESSIONAL', 'PRONUNCIATION', 'PSYCHOLOGICAL', 'QUESTIONNAIRE',
    'RECOMMENDATION', 'REFRIGERATOR', 'REHABILITATION', 'RESPONSIBILITY', 'REVOLUTIONARY',
    'SATISFACTION', 'SEMICONDUCTOR', 'SIMULTANEOUSLY', 'SOPHISTICATED', 'SPECIFICATION',
    'STRAIGHTFORWARD', 'SUBSTANTIALLY', 'SUPPLEMENTARY', 'TECHNOLOGICAL', 'TELECOMMUNICATION',
    'TEMPERATURE', 'TERMINOLOGY', 'THUNDERSTORM', 'TRADITIONALLY', 'TRANSFORMATION',
    'TRANSPORTATION', 'UNDERSTANDING', 'UNFORTUNATELY', 'UNPRECEDENTED', 'UNSUCCESSFULLY'
  ]
};

type Difficulty = 'easy' | 'medium' | 'hard';

const hangmanParts = ['top-beam', 'support', 'rope', 'head', 'body', 'left-arm', 'right-arm', 'left-leg', 'right-leg'];
const maxWrong = 9;

export default function HangmanGame() {
  const [showDifficulty, setShowDifficulty] = useState(true);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('medium');
  const [sliderValue, setSliderValue] = useState(2);
  
  // Game state
  const [currentWord, setCurrentWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [hintsLeft, setHintsLeft] = useState(3);
  const [usedWords, setUsedWords] = useState<string[]>([]);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [allTimeWins, setAllTimeWins] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  const difficulties = [
    { value: 1, name: 'easy', label: 'EASY', icon: '😊', color: '#4caf50' },
    { value: 2, name: 'medium', label: 'MEDIUM', icon: '😎', color: '#ff9800' },
    { value: 3, name: 'hard', label: 'HARD', icon: '😈', color: '#f44336' }
  ];

  const currentDiff = difficulties.find(d => d.value === sliderValue) || difficulties[1];
  const sliderPercentage = ((sliderValue - 1) / 2) * 100;

  const startGame = () => {
    setShowDifficulty(false);
    setUsedWords([]);
    initGame();
  };

  const initGame = () => {
    const wordPool = wordDatabase[selectedDifficulty];
    
    let availableWords = wordPool.filter(word => !usedWords.includes(word));
    if (availableWords.length === 0) {
      setUsedWords([]);
      availableWords = wordPool;
    }
    
    const newWord = availableWords[Math.floor(Math.random() * availableWords.length)];
    setCurrentWord(newWord);
    setUsedWords([...usedWords, newWord]);
    setGuessedLetters([]);
    setWrongGuesses(0);
    setHintsLeft(3);
  };

  const guessLetter = (letter: string) => {
    if (guessedLetters.includes(letter)) return;
    
    const newGuessed = [...guessedLetters, letter];
    setGuessedLetters(newGuessed);
    
    if (!currentWord.includes(letter)) {
      const newWrong = wrongGuesses + 1;
      setWrongGuesses(newWrong);
      
      if (newWrong >= maxWrong) {
        setTimeout(() => endGame(false), 500);
      }
    } else {
      if (currentWord.split('').every(l => newGuessed.includes(l))) {
        setTimeout(() => endGame(true), 500);
      }
    }
  };

  const useHint = () => {
    if (hintsLeft <= 0) return;
    
    const unguessed = currentWord.split('').filter(l => !guessedLetters.includes(l));
    if (unguessed.length > 0) {
      const randomLetter = unguessed[Math.floor(Math.random() * unguessed.length)];
      guessLetter(randomLetter);
      setHintsLeft(hintsLeft - 1);
    }
  };

  const endGame = (won: boolean) => {
    setGameWon(won);
    setShowModal(true);
    
    if (won) {
      setCurrentStreak(currentStreak + 1);
      setAllTimeWins(allTimeWins + 1);
      createConfetti();
    } else {
      setCurrentStreak(0);
    }
  };

  const createConfetti = () => {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#ffd700', '#4caf50', '#ff6b6b'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      Object.assign(confetti.style, {
        position: 'fixed',
        width: '10px',
        height: '10px',
        backgroundColor: colors[Math.floor(Math.random() * colors.length)],
        left: Math.random() * 100 + '%',
        top: '-10px',
        borderRadius: Math.random() > 0.5 ? '50%' : '0',
        opacity: '1',
        zIndex: '9999',
        pointerEvents: 'none'
      });
      
      document.body.appendChild(confetti);
      
      const duration = 2000 + Math.random() * 1000;
      const rotation = Math.random() * 360;
      const xMovement = (Math.random() - 0.5) * 200;
      
      confetti.animate([
        { transform: 'translateY(0) translateX(0) rotate(0deg)', opacity: '1' },
        { transform: `translateY(${window.innerHeight + 10}px) translateX(${xMovement}px) rotate(${rotation}deg)`, opacity: '0' }
      ], { duration, easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' });
      
      setTimeout(() => confetti.remove(), duration);
    }
  };

  const nextWord = () => {
    setShowModal(false);
    initGame();
  };

  const letters = 'QWERTYUIOPASDFGHJKLZXCVBNM';

  if (showDifficulty) {
    return (
      <>
        <div className="difficulty-screen">
          <div className="difficulty-header">
            <button className="back-btn-diff" onClick={() => window.location.reload()}>‹</button>
            <div className="difficulty-title">
              <h1>HANGMAN</h1>
              <p className="subtitle">Guess all the letters that make up the word before you hang!</p>
            </div>
            <button className="star-btn">⭐</button>
          </div>

          <div className="difficulty-content">
            <div className="difficulty-icon">
              <div className="icon-circle">{currentDiff.icon}</div>
            </div>

            <div className="difficulty-label" style={{ color: currentDiff.color }}>
              {currentDiff.label}
            </div>

            <div className="difficulty-slider">
              <div className="slider-track">
                <div 
                  className="slider-fill" 
                  style={{ 
                    width: `${sliderPercentage}%`,
                    background: `linear-gradient(90deg, ${currentDiff.color}, ${currentDiff.color}dd)`
                  }}
                />
                <input
                  type="range"
                  min="1"
                  max="3"
                  value={sliderValue}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    setSliderValue(val);
                    const diff = difficulties.find(d => d.value === val);
                    if (diff) setSelectedDifficulty(diff.name as Difficulty);
                  }}
                  className="slider-input"
                />
                <div 
                  className="slider-knob"
                  style={{ 
                    left: `${sliderPercentage}%`,
                    background: currentDiff.color 
                  }}
                />
              </div>
              <p className="slider-description">Drag to adjust difficulty</p>
            </div>

            <div className="difficulty-buttons">
              <button className="stats-btn-diff">📊</button>
              <button className="play-btn" onClick={startGame}>PLAY</button>
              <button className="help-btn">❓</button>
            </div>
          </div>
        </div>

        <style jsx global>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: 'Arial Black', Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 10px;
            overflow-x: hidden;
            position: relative;
          }

          body::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: 
              radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
            pointer-events: none;
            animation: backgroundShift 20s ease-in-out infinite;
          }

          @keyframes backgroundShift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }

          body::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background-image: 
              radial-gradient(2px 2px at 20% 30%, white, transparent),
              radial-gradient(2px 2px at 60% 70%, white, transparent),
              radial-gradient(1px 1px at 50% 50%, white, transparent),
              radial-gradient(1px 1px at 80% 10%, white, transparent),
              radial-gradient(2px 2px at 90% 60%, white, transparent),
              radial-gradient(1px 1px at 33% 80%, white, transparent),
              radial-gradient(1px 1px at 15% 90%, white, transparent);
            background-size: 200% 200%;
            background-position: 0% 0%;
            opacity: 0.3;
            animation: twinkle 4s ease-in-out infinite;
            pointer-events: none;
          }

          @keyframes twinkle {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.6; }
          }

          .difficulty-screen {
            background: linear-gradient(180deg, #d64545 0%, #8b3a3a 100%);
            border-radius: 30px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            width: 100%;
            max-width: 540px;
            position: relative;
            overflow: hidden;
            animation: slideInDown 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          }

          @keyframes slideInDown {
            from {
              transform: translateY(-50px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }

          .difficulty-header {
            background: #c23838;
            padding: 20px;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            position: relative;
          }

          .difficulty-header::before {
            content: '';
            position: absolute;
            bottom: -100px;
            right: -50px;
            width: 200px;
            height: 200px;
            background: rgba(0, 0, 0, 0.1);
            border-radius: 50%;
          }

          .back-btn-diff, .star-btn {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.2);
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;
            flex-shrink: 0;
          }

          .back-btn-diff:hover, .star-btn:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: scale(1.05);
          }

          .back-btn-diff:active, .star-btn:active {
            transform: scale(0.95);
          }

          .difficulty-title {
            flex: 1;
            text-align: center;
            padding: 0 10px;
          }

          .difficulty-title h1 {
            color: white;
            font-size: 36px;
            margin: 0;
            font-weight: bold;
            letter-spacing: 3px;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
          }

          .subtitle {
            color: rgba(255, 255, 255, 0.9);
            font-size: 14px;
            margin: 10px 0 0 0;
            font-weight: normal;
            line-height: 1.4;
          }

          .difficulty-content {
            background: linear-gradient(180deg, #f5e6d3 0%, #f0d9c0 100%);
            padding: 40px 30px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 30px;
          }

          .difficulty-icon {
            margin: 20px 0;
          }

          .icon-circle {
            width: 120px;
            height: 120px;
            borderRadius: 50%;
            background: white;
            border: 8px solid #2d2d2d;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 60px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            transition: all 0.3s ease;
            animation: iconPulse 2s ease-in-out infinite;
          }

          @keyframes iconPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }

          .difficulty-label {
            font-size: 42px;
            font-weight: bold;
            letter-spacing: 3px;
            text-shadow: 0 2px 5px rgba(255, 152, 0, 0.3);
            transition: all 0.3s ease;
          }

          .difficulty-slider {
            width: 100%;
            max-width: 350px;
            text-align: center;
          }

          .slider-track {
            position: relative;
            width: 100%;
            height: 60px;
            background: white;
            border-radius: 30px;
            box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.1);
            overflow: hidden;
          }

          .slider-fill {
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            border-radius: 30px;
            transition: all 0.3s ease;
            pointer-events: none;
          }

          .slider-input {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            cursor: pointer;
            z-index: 10;
          }

          .slider-knob {
            position: absolute;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: 4px solid white;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
            transition: all 0.3s ease;
            pointer-events: none;
          }

          .slider-description {
            text-align: center;
            color: #666;
            font-weight: 600;
            margin-top: 15px;
            font-size: 14px;
          }

          .difficulty-buttons {
            display: flex;
            gap: 15px;
            width: 100%;
          }

          .play-btn {
            flex: 1;
            background: linear-gradient(135deg, #ff8c42 0%, #ff6b35 100%);
            color: white;
            border: none;
            padding: 18px 40px;
            font-size: 24px;
            font-weight: bold;
            border-radius: 15px;
            cursor: pointer;
            box-shadow: 0 8px 25px rgba(255, 107, 53, 0.4);
            transition: all 0.3s ease;
            letter-spacing: 2px;
          }

          .play-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 35px rgba(255, 107, 53, 0.5);
          }

          .play-btn:active {
            transform: translateY(-1px);
          }

          .stats-btn-diff, .help-btn {
            width: 60px;
            height: 60px;
            border-radius: 15px;
            border: none;
            font-size: 28px;
            cursor: pointer;
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
            transition: all 0.3s ease;
          }

          .stats-btn-diff {
            background: linear-gradient(135deg, #ff8c42 0%, #ff6b35 100%);
          }

          .help-btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          }

          .stats-btn-diff:hover, .help-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          }

          .stats-btn-diff:active, .help-btn:active {
            transform: translateY(-1px);
          }

          @media (max-width: 640px) {
            .difficulty-title h1 {
              font-size: 28px;
            }
            .subtitle {
              font-size: 12px;
            }
            .icon-circle {
              width: 100px;
              height: 100px;
              font-size: 50px;
            }
            .difficulty-label {
              font-size: 36px;
            }
            .play-btn {
              font-size: 20px;
              padding: 15px 30px;
            }
            .stats-btn-diff, .help-btn {
              width: 50px;
              height: 50px;
              font-size: 24px;
            }
          }
        `}</style>
      </>
    );
  }

  return (
    <>
      <div className="game-container">
        <div className="game-title">
          <div className="title-main">
            <span className="title-icon">🎮</span>
            <span className="title-text">HANGMAN</span>
            <span className="title-icon">🎮</span>
          </div>
          <div className="word-counter">
            Word {usedWords.length} of {wordDatabase[selectedDifficulty].length}
          </div>
        </div>

        <div className="header">
          <button className="back-btn" onClick={() => window.location.reload()}>‹</button>
          <div className="stats">
            <div className="stat-box">
              <div className="stat-label">CURRENT STREAK</div>
              <div className="stat-value">{currentStreak}</div>
            </div>
            <div className="stat-box">
              <div className="stat-label">ALL TIME</div>
              <div className="stat-value">{allTimeWins}</div>
            </div>
          </div>
          <button className="flag-btn">🇬🇧</button>
        </div>

        <div className="hangman-canvas">
          <svg viewBox="0 0 400 250" style={{ width: '100%', maxWidth: '400px', height: 'auto' }}>
            <line x1="50" y1="220" x2="350" y2="220" stroke="#ff8c42" strokeWidth="10" strokeLinecap="round"/>
            <line x1="150" y1="220" x2="150" y2="20" stroke="#c0504d" strokeWidth="10" strokeLinecap="round"/>
            {wrongGuesses >= 1 && (
              <line x1="150" y1="20" x2="280" y2="20" stroke="#c0504d" strokeWidth="10" strokeLinecap="round" className="hangman-part"/>
            )}
            {wrongGuesses >= 2 && (
              <line x1="150" y1="50" x2="200" y2="20" stroke="#c0504d" strokeWidth="8" strokeLinecap="round" className="hangman-part"/>
            )}
            {wrongGuesses >= 3 && (
              <line x1="280" y1="20" x2="280" y2="60" stroke="#3d3d3d" strokeWidth="6" className="hangman-part"/>
            )}
            {wrongGuesses >= 4 && (
              <circle cx="280" cy="85" r="25" stroke="#3d3d3d" strokeWidth="6" fill="none" className="hangman-part"/>
            )}
            {wrongGuesses >= 5 && (
              <line x1="280" y1="110" x2="280" y2="170" stroke="#3d3d3d" strokeWidth="6" strokeLinecap="round" className="hangman-part"/>
            )}
            {wrongGuesses >= 6 && (
              <line x1="280" y1="130" x2="250" y2="150" stroke="#3d3d3d" strokeWidth="6" strokeLinecap="round" className="hangman-part"/>
            )}
            {wrongGuesses >= 7 && (
              <line x1="280" y1="130" x2="310" y2="150" stroke="#3d3d3d" strokeWidth="6" strokeLinecap="round" className="hangman-part"/>
            )}
            {wrongGuesses >= 8 && (
              <line x1="280" y1="170" x2="255" y2="210" stroke="#3d3d3d" strokeWidth="6" strokeLinecap="round" className="hangman-part"/>
            )}
            {wrongGuesses >= 9 && (
              <line x1="280" y1="170" x2="305" y2="210" stroke="#3d3d3d" strokeWidth="6" strokeLinecap="round" className="hangman-part"/>
            )}
          </svg>
        </div>

        <div className="word-display">
          {currentWord.split('').map((letter, idx) => (
            <div key={idx} className="letter-box">
              {guessedLetters.includes(letter) && (
                <span className="letter">{letter}</span>
              )}
              <div className="letter-line" />
            </div>
          ))}
        </div>

        <div className="keyboard">
          {letters.split('').map(letter => (
            <button
              key={letter}
              onClick={() => guessLetter(letter)}
              disabled={guessedLetters.includes(letter)}
              className={`key ${guessedLetters.includes(letter) ? 'disabled' : ''}`}
            >
              {letter}
            </button>
          ))}
        </div>

        <button 
          className="hint-btn" 
          onClick={useHint} 
          disabled={hintsLeft === 0}
          style={{ opacity: hintsLeft === 0 ? 0.5 : 1 }}
        >
          💡
          <span className="hint-count">{hintsLeft}</span>
        </button>
      </div>

      {showModal && (
        <div className="modal show" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-title">
              {gameWon ? 'LEVEL COMPLETE!' : 'LEVEL FAILED'}
            </div>
            <div className="modal-subtitle">The correct answer is:</div>
            <div className="modal-answer">
              {currentWord.split('').map((letter, idx) => (
                <div 
                  key={idx} 
                  className="answer-letter"
                  style={{ 
                    animationDelay: `${idx * 0.05}s`,
                    background: gameWon 
                      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                      : 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)'
                  }}
                >
                  {letter}
                </div>
              ))}
            </div>
            <div className="modal-buttons">
              <button className="modal-btn home-btn">🏠</button>
              <button className="modal-btn next-btn" onClick={nextWord}>PLAY NEXT</button>
              <button className="modal-btn stats-btn-modal">📊</button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Arial Black', Arial, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 10px;
          overflow-x: hidden;
          position: relative;
        }

        body::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
          pointer-events: none;
          animation: backgroundShift 20s ease-in-out infinite;
        }

        @keyframes backgroundShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        body::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background-image: 
            radial-gradient(2px 2px at 20% 30%, white, transparent),
            radial-gradient(2px 2px at 60% 70%, white, transparent),
            radial-gradient(1px 1px at 50% 50%, white, transparent),
            radial-gradient(1px 1px at 80% 10%, white, transparent),
            radial-gradient(2px 2px at 90% 60%, white, transparent),
            radial-gradient(1px 1px at 33% 80%, white, transparent),
            radial-gradient(1px 1px at 15% 90%, white, transparent);
          background-size: 200% 200%;
          background-position: 0% 0%;
          opacity: 0.3;
          animation: twinkle 4s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }

        .game-container {
          background: white;
          border-radius: 30px;
          padding: 30px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          width: 100%;
          max-width: 900px;
          min-height: 600px;
          animation: slideInDown 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        @keyframes slideInDown {
          from {
            transform: translateY(-50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .game-title {
          text-align: center;
          margin-bottom: 20px;
        }

        .title-main {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          font-size: 32px;
          font-weight: bold;
          color: #667eea;
          letter-spacing: 3px;
          text-shadow: 0 2px 10px rgba(102, 126, 234, 0.3);
        }

        .title-icon {
          animation: bounce 2s ease-in-out infinite;
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .word-counter {
          font-size: 14px;
          color: #999;
          margin-top: 8px;
          font-weight: normal;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          gap: 15px;
          flex-wrap: wrap;
        }

        .back-btn, .flag-btn {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          color: white;
          font-size: 24px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
        }

        .back-btn:hover, .flag-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
        }

        .back-btn:active, .flag-btn:active {
          transform: translateY(-1px);
        }

        .stats {
          display: flex;
          gap: 20px;
          flex: 1;
          justify-content: center;
          flex-wrap: wrap;
        }

        .stat-box {
          text-align: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 12px 20px;
          border-radius: 12px;
          min-width: 120px;
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
          transition: transform 0.3s ease;
        }

        .stat-box:hover {
          transform: translateY(-3px);
        }

        .stat-label {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.9);
          font-weight: bold;
          letter-spacing: 1px;
        }

        .stat-value {
          font-size: 24px;
          font-weight: bold;
          color: white;
          margin-top: 5px;
        }

        .hangman-canvas {
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          border-radius: 20px;
          padding: 20px;
          margin: 20px 0;
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: inset 0 4px 15px rgba(0, 0, 0, 0.1);
          min-height: 300px;
        }

        .hangman-part {
          animation: drawLine 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        @keyframes drawLine {
          from {
            stroke-dasharray: 1000;
            stroke-dashoffset: 1000;
          }
          to {
            stroke-dasharray: 1000;
            stroke-dashoffset: 0;
          }
        }

        .word-display {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
          padding: 30px 20px;
          min-height: 100px;
        }

        .letter-box {
          position: relative;
          width: 50px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .letter {
          font-size: 32px;
          font-weight: bold;
          color: #667eea;
          animation: letterPop 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        @keyframes letterPop {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .letter-line {
          position: absolute;
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);
          width: 40px;
          height: 4px;
          background: linear-gradient(90deg, #667eea, #764ba2);
          border-radius: 2px;
        }

        .keyboard {
          display: grid;
          grid-template-columns: repeat(10, 1fr);
          gap: 8px;
          padding: 20px;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          border-radius: 20px;
          box-shadow: inset 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .key {
          aspect-ratio: 1;
          border: none;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          font-size: 18px;
          font-weight: bold;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
          min-height: 45px;
        }

        .key:hover:not(.disabled) {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
        }

        .key:active:not(.disabled) {
          transform: translateY(-1px) scale(0.95);
        }

        .key.disabled {
          opacity: 0.3;
          cursor: not-allowed;
          transform: scale(0.9);
        }

        .hint-btn {
          position: relative;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
          border: 5px solid white;
          box-shadow: 0 8px 25px rgba(255, 215, 0, 0.4);
          cursor: pointer;
          margin: 20px auto;
          display: block;
          font-size: 36px;
          transition: all 0.3s ease;
        }

        .hint-btn:hover:not(:disabled) {
          transform: translateY(-5px) rotate(5deg);
          box-shadow: 0 12px 35px rgba(255, 215, 0, 0.5);
        }

        .hint-btn:active:not(:disabled) {
          transform: translateY(-2px) rotate(5deg) scale(0.95);
        }

        .hint-btn:disabled {
          cursor: not-allowed;
        }

        .hint-count {
          position: absolute;
          top: -5px;
          right: -5px;
          background: #ff6b6b;
          color: white;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: bold;
          border: 3px solid white;
          box-shadow: 0 3px 10px rgba(255, 107, 107, 0.5);
        }

        .modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: none;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .modal.show {
          display: flex;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-content {
          background: white;
          border-radius: 30px;
          padding: 50px;
          max-width: 600px;
          width: 100%;
          text-align: center;
          transform: scale(1);
          opacity: 1;
          transition: all 0.3s ease;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          animation: modalBounce 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        @keyframes modalBounce {
          0% {
            transform: scale(0.3);
            opacity: 0;
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .modal-title {
          font-size: 48px;
          font-weight: bold;
          margin-bottom: 20px;
          letter-spacing: 2px;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .modal-subtitle {
          font-size: 18px;
          color: #666;
          margin-bottom: 30px;
          font-weight: normal;
        }

        .modal-answer {
          display: flex;
          gap: 10px;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 40px;
        }

        .answer-letter {
          width: 50px;
          height: 60px;
          color: white;
          font-size: 28px;
          font-weight: bold;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
          animation: letterDrop 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }

        @keyframes letterDrop {
          0% {
            transform: translateY(-50px) rotate(-10deg);
            opacity: 0;
          }
          60% {
            transform: translateY(10px) rotate(5deg);
          }
          100% {
            transform: translateY(0) rotate(0);
            opacity: 1;
          }
        }

        .modal-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          align-items: center;
        }

        .modal-btn {
          padding: 15px 30px;
          border: none;
          border-radius: 15px;
          font-size: 18px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        }

        .modal-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .modal-btn:active {
          transform: translateY(-1px);
        }

        .home-btn, .stats-btn-modal {
          width: 60px;
          height: 60px;
          font-size: 28px;
          padding: 0;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        }

        .next-btn {
          flex: 1;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          letter-spacing: 2px;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .game-container {
            max-width: 700px;
            padding: 25px;
          }
        }

        @media (max-width: 768px) {
          .game-container {
            padding: 20px;
            min-height: auto;
          }

          .title-main {
            font-size: 24px;
            gap: 10px;
          }

          .header {
            gap: 10px;
          }

          .stats {
            gap: 10px;
          }

          .stat-box {
            min-width: 100px;
            padding: 10px 15px;
          }

          .stat-label {
            font-size: 10px;
          }

          .stat-value {
            font-size: 20px;
          }

          .word-display {
            gap: 8px;
            padding: 20px 10px;
          }

          .letter-box {
            width: 40px;
            height: 50px;
          }

          .letter {
            font-size: 28px;
          }

          .letter-line {
            width: 35px;
          }

          .keyboard {
            grid-template-columns: repeat(10, 1fr);
            gap: 6px;
            padding: 15px;
          }

          .key {
            font-size: 16px;
            min-height: 40px;
          }

          .hint-btn {
            width: 70px;
            height: 70px;
            font-size: 32px;
          }

          .modal-content {
            padding: 30px;
          }

          .modal-title {
            font-size: 36px;
          }

          .modal-subtitle {
            font-size: 16px;
          }

          .answer-letter {
            width: 40px;
            height: 50px;
            font-size: 24px;
          }
        }

        @media (max-width: 480px) {
          .title-main {
            font-size: 20px;
          }

          .word-counter {
            font-size: 12px;
          }

          .back-btn, .flag-btn {
            width: 40px;
            height: 40px;
            font-size: 20px;
          }

          .stat-box {
            min-width: 90px;
            padding: 8px 12px;
          }

          .stat-label {
            font-size: 9px;
          }

          .stat-value {
            font-size: 18px;
          }

          .word-display {
            gap: 6px;
          }

          .letter-box {
            width: 35px;
            height: 45px;
          }

          .letter {
            font-size: 24px;
          }

          .letter-line {
            width: 30px;
            height: 3px;
          }

          .keyboard {
            gap: 4px;
            padding: 10px;
          }

          .key {
            font-size: 14px;
            min-height: 35px;
            border-radius: 8px;
          }

          .hint-btn {
            width: 60px;
            height: 60px;
            font-size: 28px;
          }

          .hint-count {
            width: 24px;
            height: 24px;
            font-size: 12px;
          }

          .modal-content {
            padding: 20px;
          }

          .modal-title {
            font-size: 28px;
          }

          .modal-subtitle {
            font-size: 14px;
            margin-bottom: 20px;
          }

          .answer-letter {
            width: 35px;
            height: 45px;
            font-size: 20px;
          }

          .modal-buttons {
            gap: 10px;
            flex-wrap: wrap;
          }

          .home-btn, .stats-btn-modal {
            width: 50px;
            height: 50px;
            font-size: 24px;
          }

          .next-btn {
            font-size: 16px;
            padding: 12px 20px;
          }
        }
      `}</style>
    </>
  );
}