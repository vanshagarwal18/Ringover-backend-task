const { addToQueue } = require("../utils/addToQueue");
const { taskSchema } = require("../helpers/taskSchema");

exports.addSmsTask = async (req, res, next) => {
  try {
    // JOI Validation
    const result = await taskSchema.validateAsync(req.body);

    // Putting the task in Queue
    await addToQueue(result);

    // Sending success message if task is added to queue successfully
    res.status(200).json({
      status: "success",
      message: "SMS task added successfully.",
    });
  } catch (err) {
    if (err.isJoi) {
      return res.status(422).json({
        status: "error",
        message: err.details[0].message,
      });
    }
    res.status(500).json({
      status: "error",
      message: err,
    });
  }
};
