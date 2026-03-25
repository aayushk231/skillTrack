import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import NotesList from './pages/NotesList';
import NoteEditor from './pages/NoteEditor';
import TopicList from './pages/TopicList';
import QuizEngine from './pages/QuizEngine';
import QuizResults from './pages/QuizResults';
import ProgressTracker from './pages/ProgressTracker';
import './index.css';

const Layout = ({ children }) => (
  <div className="app-container">
    <nav className="navbar">
      <h2>SkillTrack</h2>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/notes">Notes</Link>
        <Link to="/quiz">Quiz</Link>
        <Link to="/progress">Progress</Link>
      </div>
    </nav>
    <main className="main-content">{children}</main>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notes" element={<NotesList />} />
          <Route path="/notes/new" element={<NoteEditor />} />
          <Route path="/notes/edit/:id" element={<NoteEditor />} />
          <Route path="/quiz" element={<TopicList />} />
          <Route path="/quiz/:topicId" element={<QuizEngine />} />
          <Route path="/quiz/results" element={<QuizResults />} />
          <Route path="/progress" element={<ProgressTracker />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;