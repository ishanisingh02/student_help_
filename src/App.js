import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FrontPage from './FrontPage'; // Adjust the import as necessary
import MainPage from './MainPage'; // Your main page component
import CGPA from './Cgpa'; // Correct the import to match the filename
import ToDoList from './tdl'; // Correctly import the ToDoList component
import TeacherReviewSystem from './trs';
import Calendar from './Calendar';
import ProgressTracker from './ProgressTracker';
import GPA from './gpa';
import QuizApp from './QuizApp';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/cgpa-calculator" element={<CGPA />} />
        <Route path="/todo-list" element={<ToDoList />} /> {/* Add the new route here */}
        <Route path="/teacher-review" element={<TeacherReviewSystem/>}/>
        <Route path="/calendar" element={<Calendar/>}/>
        <Route path="/Pt" element={<ProgressTracker/>}/>
        <Route path="/gpa" element={<GPA/>}/>
        <Route path="/quiz" element={<QuizApp/>}/>

        
      </Routes>
    </Router>
  );
}

export default App;
