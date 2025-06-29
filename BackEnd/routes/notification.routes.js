const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notification.controller");

// Get notifications for employee
router.get("/", notificationController.getNotifications);

// Mark notification as read
router.post("/read", notificationController.markAsRead);

module.exports = router;
