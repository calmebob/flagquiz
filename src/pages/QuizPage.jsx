import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSettings, useProgress } from '../App';
import countries, { getFlagUrl } from '../data/countries';
import confetti from 'canvas-confetti';

// ── Security ──
const MAX_INPUT_LENGTH = 100;
function sanitizeInput(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/[^\p{L}\p{N}\s\-'.]/gu, '').slice(0, MAX_INPUT_LENGTH);
}

// ── Helpers ──
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function normalize(str) {
  return String(str).toLowerCase().replace(/[^a-z0-9]/g, '').trim();
}

function isCorrectTyping(input, country) {
  const norm = normalize(sanitizeInput(input));
  if (!norm) return false;
  if (norm === normalize(country.name)) return true;
  if (country.misspellings && country.misspellings.some(m => normalize(m) === norm)) return true;
  return false;
}

function getHint(country) {
  const name = country.name.toLowerCase();
  const nameWords = name.split(/\s+/);
  for (const fact of country.funFacts) {
    const fl = fact.toLowerCase();
    if (!fl.includes(name) && !nameWords.some(w => w.length > 3 && fl.includes(w))) return fact;
  }
  return country.funFacts[0].replace(new RegExp(country.name, 'gi'), '____');
}

// ── Quiz builder with smart repetition ──
function buildQuizQuestions(settings, wrongCounts) {
  const pool = countries.filter(c => settings.continents.includes(c.continent));
  if (pool.length < 4) return [];

  const count = Math.min(settings.numFlags, pool.length);
  let selected;

  if (settings.smartRepetition && wrongCounts && Object.keys(wrongCounts).length > 0) {
    // Smart repetition: prioritize frequently-wrong countries
    const wrongPool = pool.filter(c => wrongCounts[c.code] > 0)
      .sort((a, b) => (wrongCounts[b.code] || 0) - (wrongCounts[a.code] || 0));
    const normalPool = pool.filter(c => !wrongCounts[c.code]);

    // Take up to half from wrong pool, rest random
    const wrongCount = Math.min(Math.ceil(count / 2), wrongPool.length);
    const normalCount = count - wrongCount;

    selected = [
      ...shuffle(wrongPool).slice(0, wrongCount),
      ...shuffle(normalPool).slice(0, normalCount),
    ];

    // If we still don't have enough, fill from the full pool
    if (selected.length < count) {
      const usedCodes = new Set(selected.map(c => c.code));
      const remaining = pool.filter(c => !usedCodes.has(c.code));
      selected = [...selected, ...shuffle(remaining).slice(0, count - selected.length)];
    }

    selected = shuffle(selected); // Randomize order
  } else {
    selected = shuffle(pool).slice(0, count);
  }

  return selected.map(country => {
    const similarCountry = countries.find(c => c.code === country.similarFlag && c.code !== country.code);
    const otherPool = pool.filter(c => c.code !== country.code && c.code !== country.similarFlag);
    const randomTwo = shuffle(otherPool).slice(0, 2);
    let options = [
      { name: country.name, correct: true },
      ...(similarCountry ? [{ name: similarCountry.name, correct: false }] : [{ name: shuffle(otherPool)[0]?.name || 'Unknown', correct: false }]),
      ...randomTwo.map(c => ({ name: c.name, correct: false })),
    ];
    const usedNames = new Set();
    options = options.filter(o => { if (usedNames.has(o.name)) return false; usedNames.add(o.name); return true; });
    while (options.length < 4) {
      const fill = otherPool.find(c => !usedNames.has(c.name));
      if (!fill) break;
      usedNames.add(fill.name);
      options.push({ name: fill.name, correct: false });
    }
    return { country, options: shuffle(options) };
  });
}

// ── Components ──
function FlagDisplay({ code }) {
  return <img className="quiz-flag-img" src={getFlagUrl(code)} alt="Flag" draggable={false} />;
}

function HintButton({ country }) {
  const [showHint, setShowHint] = useState(false);
  const hint = getHint(country);
  return (
    <div className="hint-area">
      {!showHint ? (
        <button className="hint-btn" onClick={() => setShowHint(true)} title="Get a hint">💡</button>
      ) : (
        <div className="hint-text">💡 {hint}</div>
      )}
    </div>
  );
}

function QuizMultipleChoice({ questions, onFinish }) {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showNext, setShowNext] = useState(false);
  const [results, setResults] = useState([]);

  const q = questions[current];
  if (!q) return null;

  const handleSelect = (option) => {
    if (selected !== null) return;
    setSelected(option.name);
    const correct = option.correct;
    if (correct) setScore(s => s + 1);
    setResults(prev => [...prev, { code: q.country.code, continent: q.country.continent, correct }]);
    setShowNext(true);
  };

  const handleNext = () => {
    if (current + 1 >= questions.length) { onFinish(score, results); return; }
    setCurrent(c => c + 1);
    setSelected(null);
    setShowNext(false);
  };

  const isLast = current + 1 >= questions.length;

  return (
    <div className="quiz">
      <div className="quiz-progress">
        <div className="quiz-progress-bar">
          <div className="quiz-progress-fill" style={{ width: `${((current + 1) / questions.length) * 100}%` }} />
        </div>
        <span className="quiz-progress-text">{current + 1} / {questions.length}</span>
        <span className="quiz-score">⭐ {score}</span>
      </div>
      <div className="quiz-flag-container">
        <FlagDisplay code={q.country.code} />
        <div className="quiz-question">Which country does this flag belong to?</div>
        {selected === null && <HintButton key={current} country={q.country} />}
        <div className="quiz-options">
          {q.options.map((opt) => {
            let cn = 'quiz-option';
            if (selected !== null) {
              if (opt.correct) cn += ' correct';
              else if (opt.name === selected && !opt.correct) cn += ' incorrect';
            }
            return <button key={opt.name} className={cn} onClick={() => handleSelect(opt)} disabled={selected !== null}>{opt.name}</button>;
          })}
        </div>
        {selected !== null && (
          <div className={`quiz-feedback ${q.options.find(o => o.name === selected)?.correct ? 'correct' : 'incorrect'}`}>
            {q.options.find(o => o.name === selected)?.correct ? '✅ Correct! Great job!' : `❌ Not quite! It's ${q.country.name}`}
          </div>
        )}
        {showNext && (
          <button className="quiz-next-btn" onClick={isLast ? () => onFinish(score, results) : handleNext}>
            {isLast ? '🏁 See Results' : 'Next Flag →'}
          </button>
        )}
      </div>
    </div>
  );
}

function QuizTyping({ questions, onFinish }) {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [input, setInput] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => { if (inputRef.current && !submitted) inputRef.current.focus(); }, [current, submitted]);

  const q = questions[current];
  if (!q) return null;

  const handleSubmit = () => {
    if (!input.trim() || submitted) return;
    const correct = isCorrectTyping(input, q.country);
    setIsCorrect(correct);
    if (correct) setScore(s => s + 1);
    setResults(prev => [...prev, { code: q.country.code, continent: q.country.continent, correct }]);
    setSubmitted(true);
  };

  const handleKeyDown = (e) => { if (e.key === 'Enter') { if (submitted) handleNext(); else handleSubmit(); } };

  const handleNext = () => {
    if (current + 1 >= questions.length) { onFinish(score, results); return; }
    setCurrent(c => c + 1);
    setInput(''); setSubmitted(false); setIsCorrect(false);
  };

  const isLast = current + 1 >= questions.length;

  return (
    <div className="quiz">
      <div className="quiz-progress">
        <div className="quiz-progress-bar">
          <div className="quiz-progress-fill" style={{ width: `${((current + 1) / questions.length) * 100}%` }} />
        </div>
        <span className="quiz-progress-text">{current + 1} / {questions.length}</span>
        <span className="quiz-score">⭐ {score}</span>
      </div>
      <div className="quiz-flag-container">
        <FlagDisplay code={q.country.code} />
        <div className="quiz-question">Type the name of this country!</div>
        {!submitted && <HintButton key={current} country={q.country} />}
        <div className="quiz-input-area">
          <input ref={inputRef} type="text" className={`quiz-text-input ${submitted ? (isCorrect ? 'correct' : 'incorrect') : ''}`}
            value={input} onChange={e => setInput(sanitizeInput(e.target.value))} onKeyDown={handleKeyDown}
            placeholder="Type country name..." disabled={submitted} autoComplete="off" spellCheck={false} maxLength={MAX_INPUT_LENGTH} />
          {!submitted && <button className="quiz-submit-btn" onClick={handleSubmit} disabled={!input.trim()}>Check Answer</button>}
        </div>
        {submitted && (
          <div className={`quiz-feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
            {isCorrect
              ? (normalize(input) === normalize(q.country.name) ? '✅ Correct! Great job!' : `✅ Correct! (The exact spelling is: ${q.country.name})`)
              : `❌ Not quite! The answer is ${q.country.name}`}
          </div>
        )}
        {submitted && (
          <button className="quiz-next-btn" onClick={isLast ? () => onFinish(score, results) : handleNext}>
            {isLast ? '🏁 See Results' : 'Next Flag →'}
          </button>
        )}
      </div>
    </div>
  );
}

function Results({ score, total, onPlayAgain }) {
  const isPerfect = score === total;
  const pct = Math.round((score / total) * 100);
  useEffect(() => {
    if (isPerfect) {
      const end = Date.now() + 3000;
      const frame = () => {
        confetti({ particleCount: 4, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#FF6B6B','#4ECDC4','#FFE66D','#9B59B6'] });
        confetti({ particleCount: 4, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#FF6B6B','#4ECDC4','#FFE66D','#9B59B6'] });
        if (Date.now() < end) requestAnimationFrame(frame);
      };
      frame();
    }
  }, [isPerfect]);

  const msg = isPerfect ? "You're a flag genius!" : pct >= 80 ? "Amazing work!" : pct >= 60 ? "Good job! Keep practicing!" : pct >= 40 ? "Nice effort! Try again!" : "Keep exploring!";
  const ico = isPerfect ? '🏆' : pct >= 80 ? '🌟' : pct >= 60 ? '👏' : pct >= 40 ? '💪' : '🌍';

  return (
    <div className="results">
      <div className={`results-card ${isPerfect ? 'perfect-screen' : ''}`}>
        <div className="results-icon">{ico}</div>
        <h2>{isPerfect ? 'PERFECT SCORE!' : 'Quiz Complete!'}</h2>
        <div className={`results-score ${isPerfect ? 'perfect' : ''}`}>{score} / {total}</div>
        <p className="results-message">{msg}</p>
        <div className="results-buttons">
          <button className="btn-primary" onClick={onPlayAgain}>🔄 Play Again</button>
          <Link to="/badges" className="btn-secondary">⭐ Badges</Link>
          <Link to="/" className="btn-secondary">🏠 Home</Link>
        </div>
      </div>
    </div>
  );
}

// ── Main ──
function QuizPage() {
  const { settings } = useSettings();
  const { progress, recordQuizResults } = useProgress();
  const [phase, setPhase] = useState('playing');
  const [questions, setQuestions] = useState([]);
  const [finalScore, setFinalScore] = useState(0);

  useEffect(() => {
    if (phase === 'playing' && questions.length === 0) {
      const q = buildQuizQuestions(settings, progress.wrongCounts);
      if (q.length === 0) return;
      setQuestions(q);
    }
  }, [phase, questions.length, settings, progress.wrongCounts]);

  const handleFinish = useCallback((score, results) => {
    setFinalScore(score);
    setPhase('results');
    if (results) recordQuizResults(results);
  }, [recordQuizResults]);

  const handlePlayAgain = useCallback(() => { setQuestions([]); setFinalScore(0); setPhase('playing'); }, []);

  if (phase === 'playing' && questions.length === 0) {
    const pool = countries.filter(c => settings.continents.includes(c.continent));
    if (pool.length < 4) {
      return (
        <div className="mode-select" style={{ textAlign: 'center' }}>
          <h2>Not enough countries!</h2>
          <p style={{ color: '#636E72', marginBottom: 24 }}>Enable more continents in Settings.</p>
          <Link to="/settings" className="btn-primary">⚙️ Go to Settings</Link>
        </div>
      );
    }
    return null;
  }

  if (phase === 'results') return <Results score={finalScore} total={questions.length} onPlayAgain={handlePlayAgain} />;
  if (settings.quizMode === 'typing') return <QuizTyping questions={questions} onFinish={handleFinish} />;
  return <QuizMultipleChoice questions={questions} onFinish={handleFinish} />;
}

export default QuizPage;
