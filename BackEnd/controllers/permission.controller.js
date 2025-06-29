const permissionService = require("../services/permission.service");
const db = require("../config/db.config");

// Employee submits a request
exports.createRequest = async (req, res) => {
  try {
    const { employee_id, start_date, end_date, start_time, end_time, reason } =
      req.body;
    await permissionService.createRequest(
      employee_id,
      start_date,
      end_date,
      start_time,
      end_time,
      reason
    );
    res.json({ message: "Request submitted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin views all requests
exports.getAllRequests = async (req, res) => {
  try {
    const requests = await permissionService.getAllRequests();
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin accepts/rejects a request
exports.reviewRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, response_message, reviewed_by } = req.body;
    await permissionService.reviewRequest(
      id,
      status,
      response_message,
      reviewed_by
    );
    // Fetch the employee_id, start_date, and end_date for this request
    const [rows] = await db.query(
      "SELECT employee_id, start_date, end_date FROM permission_requests WHERE id = ?",
      [id]
    );
    const request = rows[0];
    if (request) {
      let notifMsg = "";
      const dateRange =
        request.start_date === request.end_date
          ? request.start_date
          : `${request.start_date} to ${request.end_date}`;
      if (status === "accepted") {
        notifMsg = `Congratulations, your time-off request for ${dateRange} was accepted!`;
      } else if (status === "rejected") {
        notifMsg = `Sorry, your time-off request for ${dateRange} was rejected. Reason: ${response_message}`;
      }
      await db.query(
        "INSERT INTO notifications (employee_id, message) VALUES (?, ?)",
        [request.employee_id, notifMsg]
      );
    }
    res.json({ message: `Request ${status}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Employee views their own requests
exports.getMyRequests = async (req, res) => {
  try {
    // Accept employee_id from req.user, req.query, or req.body
    const employee_id =
      req.user?.employee_id || req.query.employee_id || req.body.employee_id;
    if (!employee_id) {
      return res.status(400).json({ error: "employee_id is required" });
    }
    const requests = await permissionService.getRequestsByEmployee(employee_id);
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
