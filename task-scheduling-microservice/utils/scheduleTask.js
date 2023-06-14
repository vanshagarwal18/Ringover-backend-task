const Task = require("../models/Task");

//Function to schedule task according to priority and dependencies
const scheduleTasks = async (t, schedule) => {
  if (schedule.find((task) => task.taskId === t.taskId)) {
    return;
  }
  if (!t.dependency) {
    return schedule.push(t);
  }
  const dependencyTask = await Task.findByPk(t.dependency);
  if (dependencyTask) await scheduleTasks(dependencyTask.dataValues, schedule);
  return schedule.push(t);
};
module.exports = { scheduleTasks };
