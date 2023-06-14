const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const morgan = require("morgan");

const mailRoutes = require("./routes/mailRoutes");

const app = express();
dotenv.config({ path: "./config/config.env" });

app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: "50mb" }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/mail", mailRoutes);

var PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on ${PORT}`);
});
