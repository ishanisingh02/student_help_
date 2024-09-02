import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./QuizApp.css";

const quizData = {
  "Computer Science": [
    { question: "What is the time complexity of binary search?", options: ["O(log n)", "O(n)", "O(n log n)", "O(1)"], answer: "O(log n)" },
    { question: "Which language is primarily used for AI?", options: ["Python", "Java", "C++", "JavaScript"], answer: "Python" },
    { question: "What does HTML stand for?", options: ["HyperText Markup Language", "HighText Machine Language", "HyperTech Markup Language", "HyperText Management Language"], answer: "HyperText Markup Language" },
    { question: "What is React primarily used for?", options: ["Web Development", "Mobile Development", "Game Development", "Data Science"], answer: "Web Development" },
    { question: "What is the main feature of OOP?", options: ["Encapsulation", "Recursion", "Iteration", "Abstraction"], answer: "Encapsulation" },
  ],
  "Electrical Engineering": [
    { question: "What is Ohm's Law?", options: ["V = IR", "P = VI", "V = I/R", "P = I^2R"], answer: "V = IR" },
    { question: "What does AC stand for?", options: ["Alternating Current", "Analog Current", "Active Current", "Average Current"], answer: "Alternating Current" },
    { question: "Which device converts AC to DC?", options: ["Rectifier", "Transformer", "Inverter", "Capacitor"], answer: "Rectifier" },
    { question: "What is the unit of electric current?", options: ["Ampere", "Volt", "Ohm", "Watt"], answer: "Ampere" },
    { question: "What is the SI unit of capacitance?", options: ["Farad", "Henry", "Coulomb", "Tesla"], answer: "Farad" },
  ],
  "Mechanical Engineering": [
    { question: "What is the second law of thermodynamics?", options: ["Entropy of an isolated system always increases", "Energy cannot be created or destroyed", "For every action, there is an equal and opposite reaction", "PV = nRT"], answer: "Entropy of an isolated system always increases" },
    { question: "Which is the hardest material known?", options: ["Diamond", "Graphite", "Steel", "Titanium"], answer: "Diamond" },
    { question: "What does CAD stand for?", options: ["Computer-Aided Design", "Computer Analysis Design", "Controlled-Automated Design", "Computed Aided Drafting"], answer: "Computer-Aided Design" },
    { question: "Which engine has the highest efficiency?", options: ["Diesel Engine", "Petrol Engine", "Electric Engine", "Steam Engine"], answer: "Diesel Engine" },
    { question: "What is the primary material used in 3D printing?", options: ["PLA", "Steel", "Concrete", "Plastic"], answer: "PLA" },
  ],
  "Civil Engineering": [
    { question: "What is the main ingredient in concrete?", options: ["Cement", "Sand", "Gravel", "Water"], answer: "Cement" },
    { question: "What does RCC stand for?", options: ["Reinforced Cement Concrete", "Rigid Concrete Construction", "Resilient Composite Concrete", "Rotational Casting Concrete"], answer: "Reinforced Cement Concrete" },
    { question: "Which type of foundation is best for tall buildings?", options: ["Pile Foundation", "Spread Footing", "Raft Foundation", "Pad Foundation"], answer: "Pile Foundation" },
    { question: "What is the primary load-bearing structure in bridges?", options: ["Beams", "Columns", "Trusses", "Arches"], answer: "Trusses" },
    { question: "What is the process of determining land boundaries?", options: ["Surveying", "Excavating", "Mapping", "Drafting"], answer: "Surveying" },
  ],
  "Chemical Engineering": [
    { question: "What is the process of separating mixtures using heat?", options: ["Distillation", "Filtration", "Evaporation", "Crystallization"], answer: "Distillation" },
    { question: "Which gas is released in the Haber process?", options: ["Ammonia", "Oxygen", "Hydrogen", "Nitrogen"], answer: "Ammonia" },
    { question: "What is the common name for sodium chloride?", options: ["Table Salt", "Baking Soda", "Lime", "Bleach"], answer: "Table Salt" },
    { question: "Which process is used to make plastics?", options: ["Polymerization", "Oxidation", "Reduction", "Saponification"], answer: "Polymerization" },
    { question: "What is the pH of pure water?", options: ["7", "5", "9", "2"], answer: "7" },
  ],
};

const QuizApp = () => {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizComplete(false);
  };

  const handleAnswer = (answer) => {
    if (answer === quizData[selectedSubject][currentQuestionIndex].answer) {
      setScore(score + 1);
    }
    if (currentQuestionIndex + 1 < quizData[selectedSubject].length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizComplete(true);
    }
  };

  return (
    <motion.div 
      className="quiz-app"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="title">Engineering Quiz</h1>
      <select value={selectedSubject} onChange={handleSubjectChange} className="subject-select">
        <option value="" disabled>Select a Subject</option>
        {Object.keys(quizData).map((subject) => (
          <option key={subject} value={subject}>{subject}</option>
        ))}
      </select>

      {selectedSubject && !quizComplete && (
        <motion.div 
          className="quiz-question"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2>{quizData[selectedSubject][currentQuestionIndex].question}</h2>
          {quizData[selectedSubject][currentQuestionIndex].options.map((option, index) => (
            <motion.button 
              key={index} 
              className="quiz-option" 
              onClick={() => handleAnswer(option)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {option}
            </motion.button>
          ))}
        </motion.div>
      )}

      {quizComplete && (
        <motion.div 
          className="quiz-result"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2>Quiz Complete!</h2>
          <p>Your Score: {score}/{quizData[selectedSubject].length}</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default QuizApp;
