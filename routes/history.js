import { Router } from 'express';
const router = Router();

router.get('/', async (req, res, next) => {
    await db.read();
    let sensorData = db.data.values;
    res.render("history", { values: sensorData.reverse() });
});

export default router;
