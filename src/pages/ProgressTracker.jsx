import { useState, useEffect } from 'react';

export default function ProgressTracker() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedProgress = JSON.parse(localStorage.getItem('progress')) || [];
    setHistory(savedProgress);
  }, []);

  return (
    <div className="progress-container">
      <h2>Progress Tracker</h2>
      {history.length === 0 ? (
        <p>No quizzes taken yet.</p>
      ) : (
        <table className="progress-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Topic</th>
              <th>Score</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {history.map(record => (
              <tr key={record.id}>
                <td>{record.date}</td>
                <td>{record.topic}</td>
                <td>{record.score} / {record.total}</td>
                <td>{record.timeTaken} sec</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}