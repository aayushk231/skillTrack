import { Router } from "express";
import data from '../data.json' with { type: 'json' };

const router = Router();

router.get('/', (req, res) => {
    const topicIds = Object.keys(data);
    // const topics = topicIds.map((id) => ({[id]: data[id].title}));
    let topics = {};
    for (let ids of topicIds){
        topics[ids] = data[ids].title;
    }
    res.status(200).json({
        "msg": "success",
        "data": topics
    })
})

export default router;