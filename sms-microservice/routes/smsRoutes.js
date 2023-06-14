const express = require("express");
const router = express.Router();
const { addSmsTask } = require("../controllers/smsController");
const { getJobSchedule } = require("../controllers/grpc/getJobSchedule");

router.post("/add-task", addSmsTask);
router.get("/schedule", getJobSchedule);

module.exports = router;
