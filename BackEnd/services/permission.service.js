const db = require("../config/db.config");

exports.createRequest = (
  employee_id,
  start_date,
  end_date,
  start_time,
  end_time,
  reason
) => {
  return db.query(
    "INSERT INTO permission_requests (employee_id, start_date, end_date, start_time, end_time, reason) VALUES (?, ?, ?, ?, ?, ?)",
    [employee_id, start_date, end_date, start_time, end_time, reason]
  );
};

exports.getAllRequests = () => {
  return db.query(`
    SELECT pr.*, ei.employee_first_name, ei.employee_last_name
    FROM permission_requests pr
    JOIN employee_info ei ON pr.employee_id = ei.employee_id
    ORDER BY pr.created_at DESC
  `);
};

exports.reviewRequest = (id, status, response_message, reviewed_by) => {
  return db.query(
    "UPDATE permission_requests SET status=?, response_message=?, reviewed_at=NOW(), reviewed_by=? WHERE id=?",
    [status, response_message, reviewed_by, id]
  );
};

exports.getRequestsByEmployee = (employee_id) => {
  return db.query(
    "SELECT * FROM permission_requests WHERE employee_id=? ORDER BY created_at DESC",
    [employee_id]
  );
};
