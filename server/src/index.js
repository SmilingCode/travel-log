const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config();

const middleWares = require("./middlewares");
const logsRouter = require("./api/logs");
const ratingsRouter = require("./api/ratings");

const app = express();

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(morgan("common"));
app.use(helmet());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);
app.use(express.json());

// Static files
app.use(express.static(path.join(__dirname, "../../client/build")));
// Serve React Client
app.get("/", (req, res) => {
  // res.json({
  //   message: "Hello World!",
  // });
  res.sendFile(
    path.join(path.join(__dirname, "../../client/build"), "index.html")
  );
});

app.use("/api/logs", logsRouter);
app.use("/api/ratings", ratingsRouter);

app.use(middleWares.notFound);
app.use(middleWares.errorHandler);

const port = process.env.PORT || 1337;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
