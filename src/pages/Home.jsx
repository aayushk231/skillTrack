import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <h1>Welcome to SkillTrack</h1>
      <p>Your mini learning hub for tracking notes and testing your knowledge.</p>
      <div className="button-group">
        <button onClick={() => navigate('/notes')}>My Notes</button>
        <button onClick={() => navigate('/quiz')}>Take a Quiz</button>
        <button onClick={() => navigate('/progress')}>Progress Tracker</button>
      </div>
    </>
  );
}