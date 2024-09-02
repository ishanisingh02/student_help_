import React, { useState } from 'react';
import './trs.css';
import { FaStar } from 'react-icons/fa';

const TeacherReviewSystem = () => {
  const [faculty, setFaculty] = useState([
    { id: 1, name: 'John Doe', knowledge: 4, teaching: 3, fairness: 5, organization: 4 },
    { id: 2, name: 'Jane Smith', knowledge: 5, teaching: 4, fairness: 4, organization: 5 },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newFaculty, setNewFaculty] = useState({ name: '', knowledge: 0, teaching: 0, fairness: 0, organization: 0 });
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddFaculty = (e) => {
    e.preventDefault();
    setFaculty([...faculty, { id: faculty.length + 1, ...newFaculty }]);
    setNewFaculty({ name: '', knowledge: 0, teaching: 0, fairness: 0, organization: 0 });
  };

  const handleRatingChange = (id, category, rating) => {
    const updatedFaculty = faculty.map(fac => fac.id === id ? { ...fac, [category]: rating } : fac);
    setFaculty(updatedFaculty);
  };

  const filteredFaculty = faculty.filter(fac => fac.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`teacher-review-system ${isDarkMode ? 'dark-mode' : ''}`}>
      <button className="toggle-dark-mode" onClick={toggleDarkMode}>
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      <h1>Teacher Review System</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search faculty..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <form className="add-faculty-form" onSubmit={handleAddFaculty}>
        <h2>Add Faculty</h2>
        <input
          type="text"
          placeholder="Faculty Name"
          value={newFaculty.name}
          onChange={(e) => setNewFaculty({ ...newFaculty, name: e.target.value })}
          required
        />
        <div className="rating-inputs">
          <RatingInput
            category="Knowledge"
            value={newFaculty.knowledge}
            onChange={(rating) => setNewFaculty({ ...newFaculty, knowledge: rating })}
          />
          <RatingInput
            category="Teaching"
            value={newFaculty.teaching}
            onChange={(rating) => setNewFaculty({ ...newFaculty, teaching: rating })}
          />
          <RatingInput
            category="Fairness"
            value={newFaculty.fairness}
            onChange={(rating) => setNewFaculty({ ...newFaculty, fairness: rating })}
          />
          <RatingInput
            category="Organization"
            value={newFaculty.organization}
            onChange={(rating) => setNewFaculty({ ...newFaculty, organization: rating })}
          />
        </div>
        <button type="submit">Add Faculty</button>
      </form>

      <div className="faculty-list">
        {filteredFaculty.map(fac => (
          <div key={fac.id} className="faculty-card">
            <h2>{fac.name}</h2>
            <Rating category="Knowledge" value={fac.knowledge} onChange={(rating) => handleRatingChange(fac.id, 'knowledge', rating)} />
            <Rating category="Teaching" value={fac.teaching} onChange={(rating) => handleRatingChange(fac.id, 'teaching', rating)} />
            <Rating category="Fairness" value={fac.fairness} onChange={(rating) => handleRatingChange(fac.id, 'fairness', rating)} />
            <Rating category="Organization" value={fac.organization} onChange={(rating) => handleRatingChange(fac.id, 'organization', rating)} />
          </div>
        ))}
      </div>
    </div>
  );
};

const Rating = ({ category, value, onChange }) => {
  return (
    <div className="rating">
      <span>{category}: </span>
      {[...Array(5)].map((_, i) => (
        <FaStar
          key={i}
          className={i < value ? 'star selected' : 'star'}
          onClick={() => onChange(i + 1)}
        />
      ))}
    </div>
  );
};

const RatingInput = ({ category, value, onChange }) => {
  return (
    <div className="rating-input">
      <span>{category}: </span>
      {[...Array(5)].map((_, i) => (
        <FaStar
          key={i}
          className={i < value ? 'star selected' : 'star'}
          onClick={() => onChange(i + 1)}
        />
      ))}
    </div>
  );
};

export default TeacherReviewSystem;
