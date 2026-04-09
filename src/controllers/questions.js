import { Router } from "express";
import data from '../data.json' with { type: 'json' };

const router = Router();

const shuffleArray = (array) => [...array].sort(() => 0.5 - Math.random());

router.get('/:topicId', (req, res) => {
    const topicId = req.params.topicId;
    try{
        const topicData = data[topicId];
        if (topicData && topicData.questions.length >= 5) {
            const shuffled = shuffleArray(topicData.questions).slice(0, 5);
            res.status(200).json({
                "msg": "success",
                "data": shuffled,
                "title": topicData.title
            });
        } else {
            res.status(404).json({
                "msg": "Topic not found"
            });
        }
    } catch(err) {
        console.log(`[questions] Error: ${err}`);
        res.status(500).json({
            "msg": "Internal Server Error"
        });
    }
})

export default router;