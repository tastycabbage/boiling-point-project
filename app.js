import createError from "http-errors";
import express from "express";
import { JSONFilePreset } from "lowdb";

global.db; (async() => db = await JSONFilePreset('db.json', {values: []}))();

import sensorRouter from "./routes/sensor";
import historyRouter from "./routes/history";

let app = express();

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(express.json({ type: ["application/json"] }))
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));

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