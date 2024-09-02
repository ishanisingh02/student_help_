import React, { useState } from 'react';
import './FrontPage.css';
import { FaRegSmile, FaMoon, FaSun } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function FrontPage() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <div className={`front-page ${darkMode ? 'dark' : 'light'}`}>
      <header>
        <nav className="navbar">
          <h1 className="logo">Scholar Sync</h1>
          <ul className="nav-links">
            <li><a href="#about"><FaRegSmile className="nav-icon" /> About</a></li>
            <li><a href="#services"><FaRegSmile className="nav-icon" /> Services</a></li>
            <li><a href="#contact"><FaRegSmile className="nav-icon" /> Contact</a></li>
          </ul>
          <button className="toggle-mode-btn" onClick={toggleDarkMode} aria-label="Toggle dark mode">
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </nav>
      </header>

      <section className="hero-section">
        <div className="hero-content">
          <h2>Welcome to StudentHelp</h2>
          <p>Your go-to platform for all student needs</p>
          <Link to="/main" className="hero-btn">Get Started</Link>
        </div>
        <div className="scroll-indicator"></div>
      </section>

      <footer>
        <p>&copy; 2024 StudentHelp. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default FrontPage;