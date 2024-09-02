import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Optional CSS file for Header styles

function Header({ toggleSidebar }) {
  return (
    <header className="header">
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        ☰
      </button>
      <h1>Student Help</h1>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/faq">FAQ</Link></li>
          <li><Link to="/resources">Resources</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;