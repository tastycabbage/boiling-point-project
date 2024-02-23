import { Router } from 'express';
const router = Router();

router.get('/', async (req, res, next) => {
    await db.read();
    let sensorData = db.data.values.at(-1);
    res.render("sensor", { temp: sensorData.temp, tds: (sensorData.tds / 1000) * 100, tdsraw: sensorData.tds, lng: sensorData.lng, lat: sensorData.lat });
});

router.post("/", async (req, res, next) => {
    req.body["timestamp"] = Date.now();
    await db.update(({ values }) => values.push(req.body));
    
    console.log(req.body);
    res.status(200);
});

export default router;