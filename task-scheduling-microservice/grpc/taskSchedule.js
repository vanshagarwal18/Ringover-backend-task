const grpc = require("@grpc/grpc-js");
const path = require("path");
const protoLoader = require("@grpc/proto-loader");
const services = require("../services/taskSchedule");
const packageDef = protoLoader.loadSync(
  path.resolve(__dirname, "../../proto/taskSchedule.proto"),
  {}
);
const grpcObject = grpc.loadPackageDefinition(packageDef);
const taskPackage = grpcObject.taskPackage;

global.grpcServer.addService(taskPackage.taskSchedule.service, services);
