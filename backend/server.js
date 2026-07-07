const dotenv = require("dotenv");
const app = require("./app.js");
const path = require("path");
const connectDataBase = require("./config/database.js");
//handleng Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});
//config
dotenv.config({
  path: path.join(__dirname, "config", "config.env"),
});
// connection to database
connectDataBase();

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on port http://localhost:${process.env.PORT}`);
});

//Undandle Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandle Promise Rejection`);
  server.close(() => {
    process.exit(1);
  });
});
