import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import quizData from '../data/quizData.json';

// Helper to shuffle questions
const shuffleArray = (array) => [...array].sort(() => 0.5 - Math.random());

export default function QuizEngine() {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [time, setTime] = useState(0);

  useEffect(() => {
    // Load and shuffle questions, take only 5
    const topicData = quizData[topicId];
    if (topicData && topicData.questions.length >= 5) {
      const shuffled = shuffleArray(topicData.questions).slice(0, 5);
      setQuestions(shuffled);
    } else {
      setQuestions(topicData ? topicData.questions : []); 
    }
  }, [topicId]);

  // Stopwatch timer
  useEffect(() => {
    const timerInterval = setInterval(() => setTime(t => t + 1), 1000);
    return () => clearInterval(timerInterval);
  }, []);

  const handleSelect = (questionId, option) => {
    setAnswers({ ...answers, [questionId]: option });
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length < questions.length) {
      return alert("Please answer all questions before submitting.");
    }

    let correctCount = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.answer) correctCount++;
    });

    const historyData = {
      id: Date.now().toString(),
      topic: quizData[topicId].title,
      score: correctCount,
      total: questions.length,
      timeTaken: time,
      date: new Date().toLocaleDateString()
    };

    const progressHistory = JSON.parse(localStorage.getItem('progress')) || [];
    localStorage.setItem('progress', JSON.stringify([historyData, ...progressHistory]));

    const resultData = {
      ...historyData,
      questions: questions,
      userAnswers: answers
    };

    navigate('/quiz/results', { state: resultData });
  };

  if (questions.length === 0) return <p>Loading questions...</p>;

  // Format time as MM:SS
  const formattedTime = `${Math.floor(time / 60).toString().padStart(2, '0')}:${(time % 60).toString().padStart(2, '0')}`;

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h2>{quizData[topicId].title} Quiz</h2>
        <div className="timer">⏱ {formattedTime}</div>
      </div>
      
      {questions.map((q, index) => (
        <div key={q.id} className="question-block">
          <p><strong>{index + 1}. {q.question}</strong></p>
          <div className="options-list">
            {q.options.map(opt => (
              <label key={opt} className="option-label">
                <input 
                  type="radio" 
                  name={`question-${q.id}`} 
                  value={opt}
                  checked={answers[q.id] === opt}
                  onChange={() => handleSelect(q.id, opt)}
                />
                {opt}
              </label>
            ))}
          </div>
        </div>
      ))}
      <button onClick={handleSubmit} className="submit-btn">Submit Quiz</button>
    </div>
  );
}