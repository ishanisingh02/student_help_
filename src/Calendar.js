import React, { useState } from 'react';
import './Calendar.css';

const Calendar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [tasks, setTasks] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [newTask, setNewTask] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const handleDateClick = (day) => {
    setSelectedDate(day);
  };

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    if (newTask && selectedDate) {
      const key = `${currentYear}-${currentMonth + 1}-${selectedDate}`;
      setTasks({
        ...tasks,
        [key]: [...(tasks[key] || []), newTask],
      });
      setNewTask('');
    }
  };

  const goToPreviousMonth = () => {
    setCurrentMonth((prevMonth) => {
      if (prevMonth === 0) {
        setCurrentYear(currentYear - 1);
        return 11;
      }
      return prevMonth - 1;
    });
  };

  const goToNextMonth = () => {
    setCurrentMonth((prevMonth) => {
      if (prevMonth === 11) {
        setCurrentYear(currentYear + 1);
        return 0;
      }
      return prevMonth + 1;
    });
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`calendar-container ${darkMode ? 'dark-mode' : ''}`}>
      <div className="calendar-header">
        <button onClick={goToPreviousMonth}>&lt;</button>
        <h2>{`${monthNames[currentMonth]} ${currentYear}`}</h2>
        <button onClick={goToNextMonth}>&gt;</button>
        <button className="dark-mode-toggle" onClick={toggleDarkMode}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
      <div className="calendar-grid">
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
          const key = `${currentYear}-${currentMonth + 1}-${day}`;
          return (
            <div
              key={day}
              className={`calendar-day ${tasks[key] ? 'has-tasks' : ''}`}
              onClick={() => handleDateClick(day)}
            >
              <span className="day-number">{day}</span>
              {tasks[key] && (
                <ul className="tasks-list">
                  {tasks[key].map((task, idx) => (
                    <li key={idx}>{task}</li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
      {selectedDate && (
        <div className="task-input-container">
          <h3>Add Task for {`${selectedDate} ${monthNames[currentMonth]}`}</h3>
          <form onSubmit={handleTaskSubmit}>
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Enter task"
            />
            <button type="submit">Add Task</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Calendar;
