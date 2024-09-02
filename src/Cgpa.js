import React, { useState } from 'react';
import './Cgpa.css';
import { FaTimes } from 'react-icons/fa';
function CGPA() {
  const [semesters, setSemesters] = useState([{ gpa: '', credits: '' }]);
  const [cgpa, setCgpa] = useState(null);
  const [theme, setTheme] = useState('light');

  const handleChange = (index, event) => {
    const values = [...semesters];
    values[index][event.target.name] = event.target.value;
    setSemesters(values);
  };

  const addSemester = () => {
    setSemesters([...semesters, { gpa: '', credits: '' }]);
  };

  const removeSemester = (index) => {
    const values = [...semesters];
    values.splice(index, 1);
    setSemesters(values);
  };

  const calculateCGPA = () => {
    let totalCredits = 0;
    let totalPoints = 0;

    semesters.forEach((semester) => {
      const gpa = parseFloat(semester.gpa);
      const credits = parseFloat(semester.credits);
      if (!isNaN(gpa) && !isNaN(credits)) {
        totalCredits += credits;
        totalPoints += gpa * credits;
      }
    });

    if (totalCredits === 0) {
      setCgpa(0);
    } else {
      setCgpa((totalPoints / totalCredits).toFixed(2));
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const closeWindow = () => {
    window.history.back(); // Go back to the previous page
  };

  return (
    <div className="cgpa-calculator-container">
      <button className="close-btn" onClick={closeWindow}>
        <FaTimes />
      </button>
      <h1>CGPA Calculator</h1>
      <p>Enter your GPA and credits for each semester to calculate your CGPA.</p>

      {semesters.map((semester, index) => (
        <div key={index} className="semester-input">
          <input
            type="number"
            name="gpa"
            placeholder="GPA (e.g., 8.5)"
            value={semester.gpa}
            onChange={(event) => handleChange(index, event)}
          />
          <input
            type="number"
            name="credits"
            placeholder="Credits (e.g., 25)"
            value={semester.credits}
            onChange={(event) => handleChange(index, event)}
          />
          <button className="remove-btn" onClick={() => removeSemester(index)}>
            Remove
          </button>
        </div>
      ))}

      <button className="add-btn" onClick={addSemester}>Add Semester</button>
      <button className="calculate-btn" onClick={calculateCGPA}>Calculate CGPA</button>
      <button className="theme-btn" onClick={toggleTheme}>
        Toggle {theme === 'light' ? 'Dark' : 'Light'} Theme
      </button>

      {cgpa !== null && <h2>Your CGPA: {cgpa}</h2>}
    </div>
  );
}

export default CGPA;
