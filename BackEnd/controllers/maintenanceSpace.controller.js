const maintenanceSpaceService = require("../services/maintenanceSpace.service");

// Create a new maintenance space
async function createSpace(req, res) {
  try {
    const space = await maintenanceSpaceService.createSpace(req.body);
    res.status(201).json(space);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get all maintenance spaces
async function getAllSpaces(req, res) {
  try {
    const spaces = await maintenanceSpaceService.getAllSpaces();
    res.status(200).json(spaces);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get a single space by ID
async function getSpaceById(req, res) {
  try {
    const space = await maintenanceSpaceService.getSpaceById(req.params.id);
    if (!space) return res.status(404).json({ error: "Space not found" });
    res.status(200).json(space);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Update a space
async function updateSpace(req, res) {
  try {
    const updated = await maintenanceSpaceService.updateSpace(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: "Space not found" });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Delete a space
async function deleteSpace(req, res) {
  try {
    const deleted = await maintenanceSpaceService.deleteSpace(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Space not found" });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createSpace,
  getAllSpaces,
  getSpaceById,
  updateSpace,
  deleteSpace,
}; 