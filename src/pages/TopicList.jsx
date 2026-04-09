import { useNavigate } from 'react-router-dom';
import env from '../config/env';
import { useEffect, useState } from 'react';

export default function TopicList() {
  const navigate = useNavigate();
  const [topics, setTopics] = useState({});
  const [status, setStatus] = useState("success");

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await fetch(`${env.BE_URL}/topics`);
        if (!res.ok){
          setStatus("error");
          return;
        }
        const result = await res.json();
        setTopics(result.data);
        setStatus("success");
      } catch (err) {
        console.log(err);
        setStatus("error");
      }
      return;
    }
    fetchTopics();
  }, []);
  
  if (status === "error") return <p>Error in Retriving topics</p>;
  return (
    <div>
      <h2>Select a Quiz Topic</h2>
      <div className="grid-container">
        {Object.keys(topics).map(topicKey => (
          <div key={topicKey} className="card quiz-card" onClick={() => navigate(`/quiz/${topicKey}`)}>
            <h3>{topics[topicKey]}</h3>
            <p>15 Questions Available (5 per quiz)</p>
          </div>
        ))}
      </div>
    </div>
  );
}