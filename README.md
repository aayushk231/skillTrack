# SkillTrack: Mini Learning Hub 

**SkillTrack** is a lightweight, responsive web application designed for students and self-learners. It combines a structured **Notes Editor** with a dynamic **Quiz Engine** and an automated **Progress Tracker** to help users organize their thoughts and test their technical knowledge in one place.

Built with a "Digital Wellness" aesthetic, the app uses a soothing cream and forest green palette to reduce eye strain during long study sessions.

---

## Deployment
The project is live and can be accessed at:
**https://skill-track-web.vercel.app**

### Technical Stack:
* **Frontend:** React (State, Props, Hooks, Router)
* **Persistence:** Browser `localStorage`
* **Styling:** Custom Plain CSS (Soothing Cream & Forest Green Theme)
* **Data:** JSON-based question bank (60 Questions)

---

## Cloning and Building Locally

Follow these steps to get a local copy of the project up and running.

### Prerequisites
* **Node.js** (v16 or higher recommended)
* **npm** (comes with Node)

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/skilltrack.git](https://github.com/your-username/skilltrack.git)
cd skilltrack
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run the Development Server
```bash
npm run dev
```
The application will typically be available at http://localhost:5173.

---

## File Structure
```
skilltrack/
├── public/
├── src/
│   ├── data/
│   │   └── quizData.json       # Full 60-question bank (HTML, CSS, JS, React)
│   ├── pages/
│   │   ├── Home.jsx            # Navigation Hub with 3 main buttons
│   │   ├── NotesList.jsx       # Grid view of saved notes with delete option
│   │   ├── NoteEditor.jsx      # Create/Edit logic with Title and Textarea
│   │   ├── TopicList.jsx       # Selection screen for Quiz categories
│   │   ├── QuizEngine.jsx      # Randomized 5-question logic + Stopwatch
│   │   ├── QuizResults.jsx     # Detailed review (Correct vs User answers)
│   │   └── ProgressTracker.jsx # Historical table of scores from localStorage
│   ├── App.jsx                 # Main entry, Layout, and Router config
│   ├── index.css               # Soothing Cream & Forest Green styles
│   └── main.jsx                # React DOM render entry
├── package.json                # Project dependencies and scripts
└── README.md                   # Project documentation
```