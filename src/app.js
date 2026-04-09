import express from 'express';
import questions from './controllers/questions.js'
import topics from './controllers/topics.js'
import cors from 'cors';
import env from './config/env.js';

const app = express();
app.use(cors({
    origin: env.FE_URL
}));

app.use('/question', questions);
app.use('/topics', topics);

app.get('/health', (req, res) => {
    res.send("alive");
})

export default app;