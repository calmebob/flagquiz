import React from 'react';
import { useProgress } from '../App';

const COUNTRY_BADGES = [
  { threshold: 1, icon: '🌱', title: 'First Steps', desc: 'Correctly identified 1 country' },
  { threshold: 10, icon: '🌿', title: 'Beginner', desc: 'Correctly identified 10 countries' },
  { threshold: 25, icon: '🌳', title: 'Explorer', desc: 'Correctly identified 25 countries' },
  { threshold: 50, icon: '🌏', title: 'Globetrotter', desc: 'Correctly identified 50 countries' },
  { threshold: 100, icon: '🗺️', title: 'World Traveler', desc: 'Correctly identified 100 countries' },
  { threshold: 150, icon: '🧭', title: 'Flag Master', desc: 'Correctly identified 150 countries' },
  { threshold: 193, icon: '👑', title: 'World Champion', desc: 'Every UN member state!' },
];

const PERFECT_BADGES = [
  { threshold: 1, icon: '⭐', title: 'Perfect Start', desc: 'Completed 1 quiz with all correct' },
  { threshold: 3, icon: '💫', title: 'On a Roll', desc: '3 perfect quizzes' },
  { threshold: 5, icon: '💎', title: 'Quiz Champion', desc: '5 perfect quizzes' },
  { threshold: 10, icon: '🏆', title: 'Quiz Legend', desc: '10 perfect quizzes' },
];

const CONTINENTS = ['Africa', 'Asia', 'Europe', 'North America', 'South America', 'Oceania'];
const CONTINENT_EMOJI = { Africa: '🌍', Asia: '🌏', Europe: '🏰', 'North America': '🌎', 'South America': '🌎', Oceania: '🏝️' };

function Badges() {
  const { progress, resetProgress } = useProgress();

  const totalCorrect = Object.keys(progress.correctCountries).length;
  const perfectCount = progress.perfectQuizzes;

  // Find top continent
  let topContinent = null;
  let topCount = 0;
  for (const cont of CONTINENTS) {
    const count = progress.continentCorrect[cont] || 0;
    if (count > topCount) { topCount = count; topContinent = cont; }
  }

  return (
    <div className="badges-page">
      <h2>⭐ Achievement Badges</h2>

      <div className="badges-stats">
        <div className="badge-stat">
          <span className="badge-stat-num">{totalCorrect}</span>
          <span className="badge-stat-label">Countries Learned</span>
        </div>
        <div className="badge-stat">
          <span className="badge-stat-num">{perfectCount}</span>
          <span className="badge-stat-label">Perfect Quizzes</span>
        </div>
        <div className="badge-stat">
          <span className="badge-stat-num">{topContinent ? `${CONTINENT_EMOJI[topContinent]}` : '—'}</span>
          <span className="badge-stat-label">{topContinent ? `${topContinent} Expert` : 'No top continent yet'}</span>
        </div>
      </div>

      <div className="badges-section">
        <h3>🌍 Countries Mastered</h3>
        <div className="badges-grid">
          {COUNTRY_BADGES.map(b => {
            const earned = totalCorrect >= b.threshold;
            return (
              <div key={b.threshold} className={`badge-card ${earned ? 'earned' : 'locked'}`}>
                <div className="badge-icon">{earned ? b.icon : '🔒'}</div>
                <div className="badge-info">
                  <strong>{b.title}</strong>
                  <span>{b.desc}</span>
                </div>
                {earned && <div className="badge-check">✓</div>}
                {!earned && <div className="badge-progress">{totalCorrect}/{b.threshold}</div>}
              </div>
            );
          })}
        </div>
      </div>

      <div className="badges-section">
        <h3>🏆 Perfect Quizzes</h3>
        <div className="badges-grid">
          {PERFECT_BADGES.map(b => {
            const earned = perfectCount >= b.threshold;
            return (
              <div key={b.threshold} className={`badge-card ${earned ? 'earned' : 'locked'}`}>
                <div className="badge-icon">{earned ? b.icon : '🔒'}</div>
                <div className="badge-info">
                  <strong>{b.title}</strong>
                  <span>{b.desc}</span>
                </div>
                {earned && <div className="badge-check">✓</div>}
                {!earned && <div className="badge-progress">{perfectCount}/{b.threshold}</div>}
              </div>
            );
          })}
        </div>
      </div>

      <div className="badges-section">
        <h3>🌐 Continent Expert</h3>
        <p className="badges-section-desc">Your correct answer count by continent</p>
        <div className="badges-grid">
          {CONTINENTS.map(cont => {
            const count = progress.continentCorrect[cont] || 0;
            const isTop = cont === topContinent && topCount > 0;
            return (
              <div key={cont} className={`badge-card ${isTop ? 'earned' : count > 0 ? 'partial' : 'locked'}`}>
                <div className="badge-icon">{CONTINENT_EMOJI[cont]}</div>
                <div className="badge-info">
                  <strong>{cont}</strong>
                  <span>{count} correct answer{count !== 1 ? 's' : ''}</span>
                </div>
                {isTop && <div className="badge-check">👑</div>}
              </div>
            );
          })}
        </div>
      </div>

      <div className="badges-reset">
        <button className="badges-reset-btn" onClick={() => {
          if (window.confirm('Reset all progress and badges? This cannot be undone.')) resetProgress();
        }}>
          🗑️ Reset All Progress
        </button>
      </div>
    </div>
  );
}

export default Badges;
