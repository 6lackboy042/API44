import { useState, useEffect } from "react";

// List of questions
const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Lisbon"],
    answer: "Paris",
    category: "Geography",
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: "4",
    category: "Mathematics",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars",
    category: "Science",
  },
];

export default function QuizApp() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredQuestions, setFilteredQuestions] = useState(questions);

  // Update questions based on category selection
  useEffect(() => {
    if (selectedCategory) {
      setFilteredQuestions(questions.filter(q => q.category === selectedCategory));
      setCurrentQuestion(0);
    } else {
      setFilteredQuestions(questions);
    }
  }, [selectedCategory]);

  // Handle answer selection
  function handleAnswer(option) {
    if (option === filteredQuestions[currentQuestion].answer) {
      setScore(score + 1);
    }
    if (currentQuestion + 1 < filteredQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  }

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto", background: "#fff", borderRadius: "10px", boxShadow: "0px 0px 10px rgba(0,0,0,0.1)" }}>
      {/* Category Selection */}
      <div>
        <label>Select Category:</label>
        <select onChange={(e) => setSelectedCategory(e.target.value || null)}>
          <option value="">All</option>
          <option value="Geography">Geography</option>
          <option value="Mathematics">Mathematics</option>
          <option value="Science">Science</option>
        </select>
      </div>
      
      {/* Show Results */}
      {showResults ? (
        <div>
          <h2>Quiz Completed!</h2>
          <p>Your Score: {score} / {filteredQuestions.length}</p>
        </div>
      ) : (
        <div>
          <h2>Question {currentQuestion + 1} of {filteredQuestions.length}</h2>
          <p>{filteredQuestions[currentQuestion].question}</p>
          <div>
            {filteredQuestions[currentQuestion].options.map((option, index) => (
              <button key={index} onClick={() => handleAnswer(option)} style={{ display: "block", width: "100%", padding: "10px", margin: "5px 0", background: "blue", color: "white", border: "none", borderRadius: "5px" }}>
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
