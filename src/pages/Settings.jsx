import React from 'react';
import { useSettings, useProgress } from '../App';
import { getContinents } from '../data/countries';

const CONTINENT_EMOJIS = {
  'Africa': '🌍', 'Asia': '🌏', 'Europe': '🏰',
  'North America': '🌎', 'South America': '🌎', 'Oceania': '🏝️',
};

function Settings() {
  const { settings, setSettings } = useSettings();
  const { progress } = useProgress();
  const allContinents = getContinents();

  const wrongCount = Object.keys(progress.wrongCounts).length;

  const toggleContinent = (continent) => {
    setSettings(prev => {
      const isActive = prev.continents.includes(continent);
      if (isActive && prev.continents.length <= 1) return prev;
      return { ...prev, continents: isActive ? prev.continents.filter(c => c !== continent) : [...prev.continents, continent] };
    });
  };

  return (
    <div className="settings">
      <h2>⚙️ Settings</h2>

      <div className="settings-card">
        <h3>🎮 Quiz Mode</h3>
        <div className="mode-toggle">
          <button className={`mode-toggle-btn ${settings.quizMode === 'multiple' ? 'active' : ''}`}
            onClick={() => setSettings(p => ({ ...p, quizMode: 'multiple' }))}>
            <span className="mode-toggle-icon">🅰️</span>
            <div className="mode-toggle-text"><strong>Multiple Choice</strong><span>Pick from four options</span></div>
          </button>
          <button className={`mode-toggle-btn ${settings.quizMode === 'typing' ? 'active' : ''}`}
            onClick={() => setSettings(p => ({ ...p, quizMode: 'typing' }))}>
            <span className="mode-toggle-icon">⌨️</span>
            <div className="mode-toggle-text"><strong>Type the Answer</strong><span>Spell the country name</span></div>
          </button>
        </div>
      </div>

      <div className="settings-card">
        <h3>🔢 Number of Flags per Quiz</h3>
        <div className="settings-slider-container">
          <div className="settings-slider-value">{settings.numFlags}</div>
          <input type="range" className="settings-slider" min={10} max={25} step={1}
            value={settings.numFlags} onChange={e => setSettings(p => ({ ...p, numFlags: parseInt(e.target.value) }))} />
          <div className="settings-slider-labels"><span>10 flags</span><span>25 flags</span></div>
        </div>
      </div>

      <div className="settings-card">
        <h3>🧠 Smart Repetition</h3>
        <div className="smart-rep-toggle" onClick={() => setSettings(p => ({ ...p, smartRepetition: !p.smartRepetition }))}>
          <div className={`toggle-switch ${settings.smartRepetition ? 'on' : ''}`}>
            <div className="toggle-knob" />
          </div>
          <div className="smart-rep-text">
            <strong>{settings.smartRepetition ? 'Enabled' : 'Disabled'}</strong>
            <span>
              {settings.smartRepetition
                ? `Prioritizing ${wrongCount} flag${wrongCount !== 1 ? 's' : ''} you've missed before`
                : 'When enabled, quizzes focus more on flags you get wrong'}
            </span>
          </div>
        </div>
      </div>

      <div className="settings-card">
        <h3>🌍 Continents to Include</h3>
        <div className="continent-grid">
          {allContinents.map(continent => {
            const isActive = settings.continents.includes(continent);
            return (
              <div key={continent} className={`continent-toggle ${isActive ? 'active' : ''}`} onClick={() => toggleContinent(continent)}>
                <div className="continent-checkbox">{isActive && '✓'}</div>
                <span className="continent-name">{CONTINENT_EMOJIS[continent] || '🌐'} {continent}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Settings;
