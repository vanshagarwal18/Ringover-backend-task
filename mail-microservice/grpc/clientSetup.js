// Packages
const grpc = require("@grpc/grpc-js");
const path = require("path");
const protoLoader = require("@grpc/proto-loader");
const promisify = require("grpc-promisify");
const packageDef = protoLoader.loadSync(
  path.resolve(__dirname, "../../proto/taskSchedule.proto"),
  {}
);
const grpcObject = grpc.loadPackageDefinition(packageDef);
const taskPackage = grpcObject.taskPackage;

const client = new taskPackage.taskSchedule(
  "localhost:40000",
  grpc.credentials.createInsecure()
);
promisify(client);

module.exports = client;
