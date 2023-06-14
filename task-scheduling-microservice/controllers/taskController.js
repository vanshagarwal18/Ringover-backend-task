const { scheduleTasks } = require("../utils/scheduleTask");
const Task = require("../models/Task");
const redisClient = require("../utils/redis");

exports.addTask = async (qm) => {
  try {
    //Add task to database
    await Task.create(qm);

    //Delete redis queue as soon as new task is added
    await redisClient.del("jobQueue");
  } catch (err) {
    console.log(err);
  }
};

exports.getSchedule = async (req, res, next) => {
  try {
    //To check if job queue exists or not
    const result = await redisClient.exists("jobQueue");

    //If job queue does not exist new queue is made which contains job schedule
    if (result !== 1) {
      // Fetch all tasks from the database
      let tasks = await Task.findAll({
        order: [["priority"]],
      });
      tasks = tasks.map((t) => t.dataValues);

      let schedule = [];
      for (const task of tasks) {
        await scheduleTasks(task, schedule);
      }
      schedule.forEach(
        async (job) => await redisClient.rPush("jobQueue", JSON.stringify(job))
      );
    }

    // To add to schdule to get it in response
    let schedule = await redisClient.lRange("jobQueue", 0, -1);
    schedule = schedule.map((sch) => JSON.parse(sch));

    res.status(200).json({
      status: "success",
      data: {
        schedule,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
