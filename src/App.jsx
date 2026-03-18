import React, { useState, useEffect, createContext, useContext } from 'react';
import { Routes, Route, NavLink, Link } from 'react-router-dom';
import Home from './pages/Home';
import QuizPage from './pages/QuizPage';
import Settings from './pages/Settings';
import WorldMap from './pages/WorldMap';
import Badges from './pages/Badges';

// ── Contexts ──
export const SettingsContext = createContext();
export const useSettings = () => useContext(SettingsContext);
export const ProgressContext = createContext();
export const useProgress = () => useContext(ProgressContext);

// ── Settings persistence ──
const SETTINGS_KEY = 'flag-explorer-settings';
const ALL_CONTINENTS = ['Africa', 'Asia', 'Europe', 'North America', 'South America', 'Oceania'];

const DEFAULT_SETTINGS = {
  numFlags: 25,
  quizMode: 'multiple',
  continents: [...ALL_CONTINENTS],
  smartRepetition: false,
};

function loadSettings() {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    const p = JSON.parse(raw);
    return {
      numFlags: (Number(p.numFlags) >= 10 && Number(p.numFlags) <= 25) ? Number(p.numFlags) : 25,
      quizMode: p.quizMode === 'typing' ? 'typing' : 'multiple',
      continents: (Array.isArray(p.continents) ? p.continents.filter(c => ALL_CONTINENTS.includes(c)) : [...ALL_CONTINENTS]).length > 0
        ? (Array.isArray(p.continents) ? p.continents.filter(c => ALL_CONTINENTS.includes(c)) : [...ALL_CONTINENTS])
        : [...ALL_CONTINENTS],
      smartRepetition: !!p.smartRepetition,
    };
  } catch { return DEFAULT_SETTINGS; }
}

function saveSettings(s) {
  try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(s)); } catch {}
}

// ── Progress persistence ──
const PROGRESS_KEY = 'flag-explorer-progress';

const DEFAULT_PROGRESS = {
  correctCountries: {},    // { [code]: true }
  continentCorrect: {},    // { [continent]: count }
  perfectQuizzes: 0,
  wrongCounts: {},         // { [code]: count } for smart repetition
};

function loadProgress() {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const p = JSON.parse(raw);
    return {
      correctCountries: (typeof p.correctCountries === 'object' && p.correctCountries) || {},
      continentCorrect: (typeof p.continentCorrect === 'object' && p.continentCorrect) || {},
      perfectQuizzes: Number(p.perfectQuizzes) || 0,
      wrongCounts: (typeof p.wrongCounts === 'object' && p.wrongCounts) || {},
    };
  } catch { return DEFAULT_PROGRESS; }
}

function saveProgress(p) {
  try { localStorage.setItem(PROGRESS_KEY, JSON.stringify(p)); } catch {}
}

function App() {
  const [settings, setSettings] = useState(loadSettings);
  const [progress, setProgress] = useState(loadProgress);

  useEffect(() => { saveSettings(settings); }, [settings]);
  useEffect(() => { saveProgress(progress); }, [progress]);

  // Helper: record quiz results
  const recordQuizResults = (results) => {
    // results = [{ code, continent, correct: bool }, ...]
    setProgress(prev => {
      const next = {
        correctCountries: { ...prev.correctCountries },
        continentCorrect: { ...prev.continentCorrect },
        perfectQuizzes: prev.perfectQuizzes,
        wrongCounts: { ...prev.wrongCounts },
      };
      let allCorrect = true;
      for (const r of results) {
        if (r.correct) {
          next.correctCountries[r.code] = true;
          next.continentCorrect[r.continent] = (next.continentCorrect[r.continent] || 0) + 1;
        } else {
          allCorrect = false;
          next.wrongCounts[r.code] = (next.wrongCounts[r.code] || 0) + 1;
        }
      }
      if (allCorrect && results.length > 0) next.perfectQuizzes++;
      return next;
    });
  };

  const resetProgress = () => {
    setProgress(DEFAULT_PROGRESS);
  };

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      <ProgressContext.Provider value={{ progress, recordQuizResults, resetProgress }}>
        <div className="app">
          <div className="app-bg" />
          <nav className="nav-bar">
            <Link to="/" className="nav-logo">
              <span className="nav-logo-icon">🌍</span>
              <h1>Flag Explorer</h1>
            </Link>
            <div className="nav-links">
              <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                <span className="nav-link-icon">🏠</span> Home
              </NavLink>
              <NavLink to="/quiz" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                <span className="nav-link-icon">🎯</span> Quiz
              </NavLink>
              <NavLink to="/map" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                <span className="nav-link-icon">🗺️</span> Map
              </NavLink>
              <NavLink to="/badges" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                <span className="nav-link-icon">⭐</span> Badges
              </NavLink>
              <NavLink to="/settings" className={({ isActive }) => `nav-link nav-link-subtle ${isActive ? 'active' : ''}`}>
                <span className="nav-link-icon">⚙️</span>
              </NavLink>
            </div>
          </nav>

          <main className="page">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/quiz" element={<QuizPage />} />
              <Route path="/map" element={<WorldMap />} />
              <Route path="/badges" element={<Badges />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </ProgressContext.Provider>
    </SettingsContext.Provider>
  );
}

export default App;
