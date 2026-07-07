const express = require("express");
const app = express();
app.set("query parser", "extended");

const errorMiddleware = require("./middleware/error.js");

app.use(express.json());
//Routes Import
const product = require("./routes/productRoute.js");

app.use("/api/v1", product);
//Middleware for error
app.use(errorMiddleware);

module.exports = app;
