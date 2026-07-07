const express = require("express");
const app = express();

app.use(express.json());
//Routes Import
const product = require("./routes/productRoute.js");

app.use("/api/v1", product);
module.exports = app;
