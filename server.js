const http = require("http");
const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

const app = require("./app");

const server = http.createServer(app);

mongoose.connection.once("connected", () => {
  console.log("MongoDB connected");
  server.listen(process.env.PORT);
});
