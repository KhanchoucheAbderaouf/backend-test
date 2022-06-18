require("dotenv").config();
const express = require("express");
const cors = require("cors");
const compression = require("compression");

//express server configuration
const app = express().use("*", cors());
app.use(compression());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//index endpoint just to verify that the api is running
app.get("/", (req, res) => {
    return res.json({
        name: "Backend test Biapi",
    });
});

//DB Connection
require("./configs/db").connection();

//Import Routes
const routes = require("./src/routes/index");
app.use("/", routes);

//Run the server
const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log("server up and running on PORT :", port);
});
