import React, { useState } from 'react';
import './gpa.css';

const GPA = () => {
  const [subjects, setSubjects] = useState([{ grade: '', credits: '' }]);
  const [gpa, setGpa] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const handleChange = (index, event) => {
    const values = [...subjects];
    values[index][event.target.name] = event.target.value;
    setSubjects(values);
  };

  const handleAddSubject = () => {
    setSubjects([...subjects, { grade: '', credits: '' }]);
  };

  const handleRemoveSubject = (index) => {
    const values = [...subjects];
    values.splice(index, 1);
    setSubjects(values);
  };

  const calculateGPA = () => {
    const gradePoints = { S: 10, A: 9, B: 8, C: 7, D: 6, E: 5, F: 0, N: 0 };
    let totalCredits = 0;
    let totalPoints = 0;

    subjects.forEach((subject) => {
      const points = gradePoints[subject.grade.toUpperCase()] * parseFloat(subject.credits);
      totalPoints += points;
      totalCredits += parseFloat(subject.credits);
    });

    const calculatedGPA = totalPoints / totalCredits;
    setGpa(calculatedGPA.toFixed(2));
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`gpa-calculator-container ${darkMode ? 'dark-mode' : ''}`}>
      <h1>GPA Calculator</h1>
      <button onClick={toggleDarkMode} className="toggle-dark-mode">
        {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>
      <form className="gpa-form">
        {subjects.map((subject, index) => (
          <div key={index} className="subject-row">
            <input
              type="text"
              name="grade"
              placeholder="Grade (S, A, B, etc.)"
              value={subject.grade}
              onChange={(event) => handleChange(index, event)}
            />
            <input
              type="number"
              name="credits"
              placeholder="Credits"
              value={subject.credits}
              onChange={(event) => handleChange(index, event)}
            />
            <button type="button" onClick={() => handleRemoveSubject(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddSubject} className="add-subject-button">
          Add Subject
        </button>
      </form>
      <button onClick={calculateGPA} className="calculate-button">Calculate GPA</button>
      {gpa && <h2>Your GPA is: {gpa}</h2>}
    </div>
  );
};

export default GPA;
