require("dotenv").config();
const express = require("express");
const { create } = require("express-handlebars");
const { getTodos } = require("./database");

const app = express();

const hbs = create({
    partialsDir: ["views/components"],
    extname: ".hbs",
});

app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", "./views");

app.get("/", async (req, res) => {
    const { data, ok } = await getTodos();

    if (!ok) return res.sendStatus(404);
    // console.log(data);
    // console.log(process.env.HOME);

    res.render(process.env.HOME_RENDER, { data: data });
});

app.use(express.static(__dirname + "/public"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log("😍😍😍"));
