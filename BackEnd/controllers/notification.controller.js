const db = require("../config/db.config");

// Get notifications for employee
exports.getNotifications = async (req, res) => {
  const { employee_id } = req.query;
  try {
    const [rows] = await db.query(
      "SELECT * FROM notifications WHERE employee_id = ? ORDER BY created_at DESC",
      [employee_id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mark as read
exports.markAsRead = async (req, res) => {
  const { id } = req.body;
  try {
    await db.query("UPDATE notifications SET is_read = 1 WHERE id = ?", [id]);
    res.json({ message: "Marked as read" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
