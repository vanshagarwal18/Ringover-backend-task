const { scheduleTasks } = require("../../utils/scheduleTask");
const Task = require("../../models/Task");

exports.getJobSchedule = async (call, callback) => {
  try {
    // Fetch all tasks from the database of particular type
    let tasks = await Task.findAll({
      where: {
        type: call.request.type,
      },
      order: [["priority"]],
    });
    tasks = tasks.map((t) => t.dataValues);

    let schedule = [];
    for (const task of tasks) {
      await scheduleTasks(task, schedule);
    }

    return callback(null, { schedule });
  } catch (err) {
    console.log(err);
  }
};
