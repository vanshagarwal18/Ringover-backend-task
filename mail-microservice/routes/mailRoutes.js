const express = require("express");
const router = express.Router();
const { addMailTask } = require("../controllers/mailController");
const { getJobSchedule } = require("../controllers/grpc/getJobSchedule");

router.post("/add-task", addMailTask);
router.get("/schedule", getJobSchedule);

module.exports = router;
