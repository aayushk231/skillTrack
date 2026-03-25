import { useLocation, useNavigate } from 'react-router-dom';

export default function QuizResults() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <p>No results found. Go take a quiz!</p>;

  const { topic, score, total, timeTaken, questions, userAnswers } = state;
  const formattedTime = `${Math.floor(timeTaken / 60).toString().padStart(2, '0')}:${(timeTaken % 60).toString().padStart(2, '0')}`;

  return (
    <div className="results-container">
      <div className="text-center">
        <h2>Quiz Complete!</h2>
        <h3>Topic: {topic}</h3>
        <div className="score-board">
          <p className="score">Score: {score} / {total}</p>
          <p>Time Taken: ⏱ {formattedTime}</p>
        </div>
      </div>

      <div className="review-section">
        <h3 className="text-center">Detailed Review</h3>
        {questions && questions.map((q, index) => {
          const isCorrect = userAnswers[q.id] === q.answer;
          
          return (
            <div key={q.id} className={`review-card ${isCorrect ? 'correct-card' : 'wrong-card'}`}>
              <p className="review-question"><strong>{index + 1}. {q.question}</strong></p>
              
              <div className="review-answers">
                <p>Your Answer: <span className={isCorrect ? 'text-success' : 'text-danger'}>
                  {userAnswers[q.id]}
                </span></p>
                
                {!isCorrect && (
                  <p>Correct Answer: <span className="text-success">{q.answer}</span></p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="button-group justify-center">
        <button onClick={() => navigate('/quiz')}>Take Another Quiz</button>
        <button className="secondary-btn" onClick={() => navigate('/progress')}>View Progress Tracker</button>
      </div>
    </div>
  );
}