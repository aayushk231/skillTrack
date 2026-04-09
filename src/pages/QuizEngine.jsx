import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import env from '../config/env.js';

export default function QuizEngine() {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("fetched");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [time, setTime] = useState(0);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setStatus("fetching");
      try {
        const res = await fetch(`${env.BE_URL}/question/${topicId}`);
        if (!res.ok) {
          setStatus("error");
          return;
        }
        const result = await res.json();
        setQuestions(result['data']);
        setTitle(result['title']);
        setStatus("fetched");
      } catch (err) {
        console.error(err);
        setStatus("error");
      }
    };
    fetchData();
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
      topic: title,
      score: correctCount,
      total: questions.length,
      timeTaken: time,
      date: new Date().toLocaleDateString()
    };
    console.log(historyData);

    const progressHistory = JSON.parse(localStorage.getItem('progress')) || [];
    localStorage.setItem('progress', JSON.stringify([historyData, ...progressHistory]));

    const resultData = {
      ...historyData,
      questions: questions,
      userAnswers: answers
    };

    navigate('/quiz/results', { state: resultData });
  };

  if (status === "error") return <p>Error Retriving Questions...</p>;
  else if (status === "fetching") return <p>Loading Questions... Please Wait..</p>

  // Format time as MM:SS
  const formattedTime = `${Math.floor(time / 60).toString().padStart(2, '0')}:${(time % 60).toString().padStart(2, '0')}`;

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h2>{title} Quiz</h2>
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