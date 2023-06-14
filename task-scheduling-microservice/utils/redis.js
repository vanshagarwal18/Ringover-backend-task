// const logger = require('../../../CRM-Backend/src/utils/winston');
const redis = require("redis");
const client = redis.createClient(6379, "127.0.0.1");

client.connect().then(() =>
  client.ping().then((res, err) => {
    if (err) console.log(err);
    else console.log("Redis server connected ");
  })
);

module.exports = client;
