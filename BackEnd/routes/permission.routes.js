const express = require("express");
const router = express.Router();
const permissionController = require("../controllers/permission.controller");
// You may want to add authentication middleware here

// Employee submits a request
router.post("/", permissionController.createRequest);

// Admin views all requests
router.get("/", permissionController.getAllRequests);

// Admin accepts/rejects a request
router.put("/:id", permissionController.reviewRequest);

// Employee views their own requests
router.get("/my", permissionController.getMyRequests);

module.exports = router;
