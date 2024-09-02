// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Optional CSS file for Sidebar styles

function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-btn" onClick={toggleSidebar}>
        &times;
      </button>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/faq">FAQ</Link></li>
        <li><Link to="/resources">Resources</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;
