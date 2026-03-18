import React from 'react';
import { Link } from 'react-router-dom';
import { useProgress } from '../App';

function Home() {
  const { progress } = useProgress();
  const totalCorrect = Object.keys(progress.correctCountries).length;

  return (
    <div className="home">
      <div className="home-hero">
        <div className="home-globe">🌍</div>
        <h2>Flag Explorer</h2>
        <p>Learn the flags of every country in the world through fun quizzes and an interactive map!</p>
      </div>

      <div className="home-cards-main">
        <Link to="/quiz" className="home-card home-card-primary">
          <div className="home-card-icon">🎯</div>
          <h3>Flag Quiz</h3>
          <p>Test your knowledge! Can you name the country from its flag?</p>
        </Link>

        <Link to="/map" className="home-card home-card-primary">
          <div className="home-card-icon">🗺️</div>
          <h3>World Map</h3>
          <p>Explore countries on an interactive map and discover fun facts!</p>
        </Link>
      </div>

      <div className="home-secondary-links">
        <Link to="/badges" className="home-badges-link">
          ⭐ {totalCorrect > 0 ? `${totalCorrect} countries learned — view badges` : 'View your badges'}
        </Link>
        <Link to="/settings" className="home-settings-link">
          ⚙️ Quiz settings
        </Link>
      </div>
    </div>
  );
}

export default Home;
