import { Router } from 'express';
const router = Router();

router.get('/', async (req, res, next) => {
    await db.read();
    let sensorData = db.data.values;
    res.render("sensor", { dates: sensorData });
});

router.post("/", async (req, res, next) => {
    req.body["timestamp"] = Date.now();
    await db.update(({ values }) => values.push(req.body));
    
    console.log(req.body);
    res.status(200);
});

export default router;