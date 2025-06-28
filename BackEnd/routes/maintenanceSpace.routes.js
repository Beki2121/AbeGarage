const express = require("express");
const router = express.Router();
const maintenanceSpaceController = require("../controllers/maintenanceSpace.controller");

router.post("/", maintenanceSpaceController.createSpace);
router.get("/", maintenanceSpaceController.getAllSpaces);
router.get("/:id", maintenanceSpaceController.getSpaceById);
router.put("/:id", maintenanceSpaceController.updateSpace);
router.delete("/:id", maintenanceSpaceController.deleteSpace);

module.exports = router; 