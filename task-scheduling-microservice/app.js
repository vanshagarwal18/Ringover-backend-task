const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const morgan = require("morgan");
const { consumeFromQueue } = require("./utils/consumeFromQueue");

const taskRoutes = require("./routes/taskRoutes");

const app = express();
dotenv.config({ path: "./config/config.env" });

app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: "50mb" }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
//DB connection
require("./config/db");
// First all the messages are consumed from the message queue and added to RDBMS
consumeFromQueue();

app.use("/task", taskRoutes);

var PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on ${PORT}`);
});

//GRPC
const grpc = require("@grpc/grpc-js");
var GRPC_PORT = process.env.GRPC_PORT;

global.grpcServer = new grpc.Server();
require("./grpc/taskSchedule");

grpcServer.bindAsync(
  `127.0.0.1:${GRPC_PORT}`,
  grpc.ServerCredentials.createInsecure(),
  (error) => {
    if (error) console.log(`Error for grpc:${error}`);
    else console.log(`Job Scheduling GRPC listening on port ${GRPC_PORT}`);
    grpcServer.start();
  }
);
