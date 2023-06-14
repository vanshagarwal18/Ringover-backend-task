const client = require("../../grpc/clientSetup");

exports.getJobSchedule = async (req, res) => {
  try {
    //using grpc to get job schedule
    const response = await client.getJobSchedule({
      type: "mail",
    });
    res.status(200).json({
      status: "success",
      message: response,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err,
    });
  }
};
