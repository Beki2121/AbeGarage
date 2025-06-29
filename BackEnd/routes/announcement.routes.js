const express = require("express");
const router = express.Router();
const announcementController = require("../controllers/announcement.controller");

router.post("/api/announcements", announcementController.createAnnouncement);
router.get(
  "/api/announcements/latest",
  announcementController.getLatestAnnouncement
);
router.post("/api/announcements/read", announcementController.markAsRead);
router.post(
  "/api/announcements/read-multiple",
  announcementController.markMultipleAsRead
);
router.get(
  "/api/announcements/unread",
  announcementController.getUnreadAnnouncements
);
router.get(
  "/api/announcements/all",
  announcementController.getAllAnnouncements
);

module.exports = router;
