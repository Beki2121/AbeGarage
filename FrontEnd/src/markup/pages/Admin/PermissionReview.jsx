import React, { useState, useEffect } from "react";
import permissionService from "../../../services/permission.service";
import { FaCheckCircle, FaTimesCircle, FaRegStickyNote } from "react-icons/fa";

const statusBadge = (status) => {
  if (status === "accepted")
    return (
      <span className="badge bg-success">
        <FaCheckCircle /> Accepted
      </span>
    );
  if (status === "rejected")
    return (
      <span className="badge bg-danger">
        <FaTimesCircle /> Rejected
      </span>
    );
  return <span className="badge bg-warning text-dark">Pending</span>;
};

// Helper to format date as YYYY-MM-DD
const formatDate = (dateString) => {
  if (!dateString) return "";
  return dateString.slice(0, 10);
};

// Helper to format time as HH:mm (24-hour)
const formatTime = (timeString) => {
  if (!timeString) return "-";
  return timeString.length >= 5 ? timeString.slice(0, 5) : timeString;
};

const PermissionReview = () => {
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState({});

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const data = await permissionService.getAllRequests();
      setRequests(data);
    } catch (err) {
      setMessage("Failed to load requests");
    }
  };

  const handleResponseChange = (id, value) => {
    setResponse({ ...response, [id]: value });
  };

  const handleAction = async (id, status) => {
    try {
      await permissionService.reviewRequest(id, {
        status,
        response_message: response[id] || "",
        reviewed_by: 1, // TODO: use actual admin id from auth
      });
      setMessage(`Request ${status}`);
      fetchRequests();
    } catch (err) {
      setMessage("Failed to update request");
    }
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header bg-primary text-white d-flex align-items-center">
              <FaRegStickyNote className="me-2" />
              <h4 className="mb-0">Review Permission Requests</h4>
            </div>
            <div className="card-body">
              {message && <div className="alert alert-info">{message}</div>}
              <div className="table-responsive">
                <table className="table table-bordered table-striped align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Employee</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th>Start Time</th>
                      <th>End Time</th>
                      <th>Reason</th>
                      <th>Status</th>
                      <th>Response</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.length === 0 ? (
                      <tr>
                        <td colSpan="9" className="text-center text-muted">
                          No requests found.
                        </td>
                      </tr>
                    ) : (
                      requests.map((r) => (
                        <tr key={r.id}>
                          <td>
                            <span className="fw-bold">
                              {r.employee_first_name} {r.employee_last_name}
                            </span>
                          </td>
                          <td>{formatDate(r.start_date)}</td>
                          <td>{formatDate(r.end_date)}</td>
                          <td>{formatTime(r.start_time)}</td>
                          <td>{formatTime(r.end_time)}</td>
                          <td>{r.reason}</td>
                          <td>{statusBadge(r.status)}</td>
                          <td>
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              value={response[r.id] || ""}
                              onChange={(e) =>
                                handleResponseChange(r.id, e.target.value)
                              }
                              placeholder="Response message"
                              disabled={r.status !== "pending"}
                            />
                          </td>
                          <td>
                            {r.status === "pending" ? (
                              <div className="d-flex gap-2">
                                <button
                                  className="btn btn-success btn-sm"
                                  title="Accept"
                                  onClick={() => handleAction(r.id, "accepted")}
                                >
                                  <FaCheckCircle />
                                </button>
                                <button
                                  className="btn btn-danger btn-sm"
                                  title="Reject"
                                  onClick={() => handleAction(r.id, "rejected")}
                                >
                                  <FaTimesCircle />
                                </button>
                              </div>
                            ) : (
                              <span className="text-muted">-</span>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PermissionReview;
