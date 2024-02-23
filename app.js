import createError from "http-errors";
import express from "express";
import { JSONFilePreset } from "lowdb/node";

(async() => global.db = await JSONFilePreset('db.json', {values: []}))();

import sensorRouter from "./routes/sensor.js";
import historyRouter from "./routes/history.js";

let app = express();

app.set("views", process.cwd() + "/views");
app.set("view engine", "ejs");

app.use(express.json({ type: ["application/json"] }))
app.use(express.urlencoded({ extended: false }));
app.use(express.static(process.cwd() + "/public"));

app.use("/sensor", sensorRouter);
app.use("/history", historyRouter);

app.use((req, res, next) => {
    next(createError(404));
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    res.status(err.status || 500);
    res.render("error");
});

app.listen(3000, () => console.log("server is on"));