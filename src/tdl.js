import React, { useState, useEffect } from 'react';
import './tdl.css';

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [showCongrats, setShowCongrats] = useState(false);

  useEffect(() => {
    if (tasks.length > 0 && tasks.every(task => task.completed)) {
      setShowCongrats(true);
    } else {
      setShowCongrats(false);
    }
  }, [tasks]);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', localStorage.getItem('dark-mode') === 'true');
  }, []);

  const addTask = () => {
    if (input.trim() === '' && editValue.trim() === '') return;
    if (editIndex !== null) {
      const updatedTasks = tasks.map((task, index) =>
        index === editIndex ? { ...task, text: editValue } : task
      );
      setTasks(updatedTasks);
      setEditIndex(null);
      setEditValue('');
    } else {
      setTasks([...tasks, { text: input, completed: false }]);
      setInput('');
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditValue(tasks[index].text);
  };

  const handleComplete = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleChange = (e) => {
    if (editIndex !== null) {
      setEditValue(e.target.value);
    } else {
      setInput(e.target.value);
    }
  };

  const handleModeSwitch = () => {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    localStorage.setItem('dark-mode', isDarkMode);
  };

  return (
    <div className="app">
      <button className="mode-switch" onClick={handleModeSwitch}>
        Toggle Dark Mode
      </button>
      <div className="todo-container">
        <div className="header">
          <h1>To-Do List</h1>
        </div>
        <div className="input-group">
          <input
            type="text"
            value={editIndex !== null ? editValue : input}
            onChange={handleChange}
            placeholder="Enter a task..."
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
          />
          <button className="add-button" onClick={addTask}>
            {editIndex !== null ? 'Update' : 'Add'}
          </button>
        </div>
        <ul className="task-list">
          {tasks.map((task, index) => (
            <li key={index}>
              <input
                type="checkbox"
                onChange={() => handleComplete(index)}
              />
              <span className={task.completed ? 'completed' : ''}>{task.text}</span>
              <button className="edit-button" onClick={() => handleEdit(index)}>Edit</button>
            </li>
          ))}
        </ul>
        {showCongrats && <div className="congrats-message">Congratulations! All tasks completed!</div>}
      </div>
    </div>
  );
};

export default ToDoList;