import { Router } from 'express';
const router = Router();

router.get('/', async (req, res, next) => {
    await db.read();

    res.render("sensor", { data: db.data.values });
});

router.post("/", async (req, res, next) => {
    let reqTime = Date.now();
    let now = new Date(reqTime);
    
    req.body["timestamp"] = reqTime;

    req.body["createdAt"] = {};
    req.body["createdAt"]["day"] = now.getDate();
    req.body["createdAt"]["month"] = now.getMonth();
    req.body["createdAt"]["year"] = now.getFullYear();
    req.body["createdAt"]["hours"] = now.getHours();
    req.body["createdAt"]["minutes"] = now.getMinutes();
    req.body["createdAt"]["seconds"] = now.getSeconds();
    req.body["createdAt"]["milliseconds"] = now.getMilliseconds();

    await db.update(({ values }) => values.push(req.body));
    
    console.log(req.body);
    res.status(200);
});

export default router;