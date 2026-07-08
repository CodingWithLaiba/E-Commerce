const express = require("express");
const app = express();
app.set("query parser", "extended");

const errorMiddleware = require("./middleware/error.js");

app.use(express.json());
//Routes Import
const product = require("./routes/productRoute.js");
const user = require("./routes/userRoute.js")
app.use("/api/v1", product);
app.use("/api/v1", user);
//Middleware for error
app.use(errorMiddleware);

module.exports = app;
