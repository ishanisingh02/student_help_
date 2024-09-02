import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // Updated import
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Title } from "chart.js";
import "./ProgressTracker.css";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title);

const ProgressTracker = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState("All");
  const [hoveredArea, setHoveredArea] = useState(null);

  const navigate = useNavigate();  // Updated hook

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const closeTracker = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const handleWeekChange = (event) => {
    setSelectedWeek(event.target.value);
  };

  const filterData = () => {
    if (selectedWeek === "All") {
      return [50, 70, 80, 90];
    } else if (selectedWeek === "Week 1") {
      return [50];
    } else if (selectedWeek === "Week 2") {
      return [70];
    } else if (selectedWeek === "Week 3") {
      return [80];
    } else if (selectedWeek === "Week 4") {
      return [90];
    }
  };

  const handleAreaHover = (area) => {
    setHoveredArea(area);
  };

  const data = {
    labels: selectedWeek === "All" ? ["Week 1", "Week 2", "Week 3", "Week 4"] : [selectedWeek],
    datasets: [
      {
        label: "Progress",
        data: filterData(),
        borderColor: darkMode ? "rgba(255, 206, 86, 1)" : "rgba(54, 162, 235, 1)",
        backgroundColor: darkMode ? "rgba(255, 206, 86, 0.2)" : "rgba(54, 162, 235, 0.2)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
        },
      },
      x: {
        grid: {
          color: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Student Progress",
        color: darkMode ? "#fff" : "#000",
      },
    },
    responsive: true,
  };

  return (
    <div className={`progress-tracker ${darkMode ? "dark" : "light"}`}>
      <div className="header">
        <button className="toggle-btn" onClick={toggleDarkMode}>
          {darkMode ? "🌙" : "☀️"}
        </button>
        <button className="close-btn" onClick={closeTracker}>✖</button>
      </div>
      <div className="filters">
        <label htmlFor="week-select">Select Week: </label>
        <select id="week-select" value={selectedWeek} onChange={handleWeekChange}>
          <option value="All">All</option>
          <option value="Week 1">Week 1</option>
          <option value="Week 2">Week 2</option>
          <option value="Week 3">Week 3</option>
          <option value="Week 4">Week 4</option>
        </select>
      </div>
      <Line data={data} options={options} />
      <div className="summary">
        <h3>Summary of Achievements</h3>
        <p>Great progress in Week 3 with a significant improvement in studies!</p>
      </div>
      <div className="areas-of-improvement">
        <h3>Areas of Improvement</h3>
        <ul>
          <li
            onMouseEnter={() => handleAreaHover("Time Management")}
            onMouseLeave={() => handleAreaHover(null)}
            className={hoveredArea === "Time Management" ? "hovered" : ""}
          >
            Time Management
          </li>
          <li
            onMouseEnter={() => handleAreaHover("Consistency in Studies")}
            onMouseLeave={() => handleAreaHover(null)}
            className={hoveredArea === "Consistency in Studies" ? "hovered" : ""}
          >
            Consistency in Studies
          </li>
          <li
            onMouseEnter={() => handleAreaHover("Practice More on Weak Subjects")}
            onMouseLeave={() => handleAreaHover(null)}
            className={hoveredArea === "Practice More on Weak Subjects" ? "hovered" : ""}
          >
            Practice More on Weak Subjects
          </li>
        </ul>
        {hoveredArea && <div className="tooltip">{`Focus on ${hoveredArea} to improve your performance.`}</div>}
      </div>
    </div>
  );
};

export default ProgressTracker;
