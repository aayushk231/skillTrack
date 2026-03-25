import { useNavigate } from 'react-router-dom';
import quizData from '../data/quizData.json';

export default function TopicList() {
  const navigate = useNavigate();
  const topics = Object.keys(quizData);

  return (
    <div>
      <h2>Select a Quiz Topic</h2>
      <div className="grid-container">
        {topics.map(topicKey => (
          <div key={topicKey} className="card quiz-card" onClick={() => navigate(`/quiz/${topicKey}`)}>
            <h3>{quizData[topicKey].title}</h3>
            <p>15 Questions Available (5 per quiz)</p>
          </div>
        ))}
      </div>
    </div>
  );
}