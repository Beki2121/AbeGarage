const db = require("../config/db.config");

// Create a new announcement (admin only)
exports.createAnnouncement = async (req, res) => {
  const { title, message } = req.body;
  try {
    await db.query("INSERT INTO announcements (title, message) VALUES (?, ?)", [
      title,
      message,
    ]);
    res.status(201).json({ message: "Announcement created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get latest active announcement for an employee
exports.getLatestAnnouncement = async (req, res) => {
  const employee_id = req.query.employee_id;
  try {
    const [announcement] = await db.query(
      "SELECT * FROM announcements WHERE is_active = 1 ORDER BY created_at DESC LIMIT 1"
    );
    if (!announcement.length) return res.json(null);

    // Check if employee has read it
    const [read] = await db.query(
      "SELECT * FROM announcement_reads WHERE announcement_id = ? AND employee_id = ?",
      [announcement[0].announcement_id, employee_id]
    );
    res.json({ ...announcement[0], read: !!read.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mark as read
exports.markAsRead = async (req, res) => {
  const { announcement_id, employee_id } = req.body;
  try {
    await db.query(
      "INSERT IGNORE INTO announcement_reads (announcement_id, employee_id) VALUES (?, ?)",
      [announcement_id, employee_id]
    );
    res.json({ message: "Marked as read" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all unread announcements for an employee
exports.getUnreadAnnouncements = async (req, res) => {
  const employee_id = req.query.employee_id;
  try {
    // Get all active announcements not read by this employee
    const [unread] = await db.query(
      `SELECT * FROM announcements WHERE is_active = 1 AND announcement_id NOT IN (
        SELECT announcement_id FROM announcement_reads WHERE employee_id = ?
      ) ORDER BY created_at DESC`,
      [employee_id]
    );
    res.json(unread);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all announcements for an employee, with read/unread status
exports.getAllAnnouncements = async (req, res) => {
  const employee_id = req.query.employee_id;
  try {
    // Get all announcements
    let announcementsResult = await db.query(
      `SELECT a.*, 
        (SELECT COUNT(*) FROM announcement_reads ar WHERE ar.announcement_id = a.announcement_id AND ar.employee_id = ?) as \`read\`
      FROM announcements a
      WHERE a.is_active = 1
      ORDER BY a.created_at DESC`,
      [employee_id]
    );
    let announcements = Array.isArray(announcementsResult[0])
      ? announcementsResult[0]
      : announcementsResult;
    // Convert read from 0/1 to boolean
    const result = announcements.map((a) => ({ ...a, read: !!a.read }));
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
