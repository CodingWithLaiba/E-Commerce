const dotenv = require("dotenv");
const app = require("./app.js");
const path = require("path");
const connectDataBase = require("./config/database.js")
//config
dotenv.config({
  path: path.join(__dirname, "config", "config.env"),
});
// connection to database
connectDataBase()

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port http://localhost:${process.env.PORT}`);
});
