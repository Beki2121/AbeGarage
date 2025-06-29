import React, { useState, useEffect } from "react";
import permissionService from "../../../services/permission.service";
import {
  FaCalendarAlt,
  FaClock,
  FaRegStickyNote,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { useAuth } from "../../../Context/AuthContext";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";

const PermissionRequest = () => {
  const { employee } = useAuth();
  const [form, setForm] = useState({
    start_date: "",
    end_date: "",
    start_time: "",
    end_time: "",
    reason: "",
  });
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (employee?.employee_id) fetchRequests();
    // eslint-disable-next-line
  }, [employee?.employee_id]);

  const fetchRequests = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await permissionService.getMyRequests(employee.employee_id);
      setRequests(data);
    } catch (err) {
      setError("Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTimeChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await permissionService.createRequest({
        ...form,
        employee_id: employee.employee_id,
      });
      setMessage("Request submitted!");
      setForm({
        start_date: "",
        end_date: "",
        start_time: "",
        end_time: "",
        reason: "",
      });
      fetchRequests();
    } catch (err) {
      setError("Failed to submit request");
    } finally {
      setLoading(false);
    }
  };

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

  // Helper to format date as yyyy-mm-dd
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return dateString.slice(0, 10);
  };

  // Helper to format time as HH:mm (24-hour)
  const formatTime = (timeString) => {
    if (!timeString) return "-";
    return timeString.length >= 5 ? timeString.slice(0, 5) : timeString;
  };

  // Generate 24-hour time options
  const timeOptions = Array.from(
    { length: 24 },
    (_, i) => (i < 10 ? `0${i}` : `${i}`) + ":00"
  );

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow mb-4">
            <div className="card-header bg-primary text-white d-flex align-items-center">
              <FaRegStickyNote className="me-2" />
              <h4 className="mb-0">Request Time Off / Permission</h4>
            </div>
            <div className="card-body">
              {message && <div className="alert alert-success">{message}</div>}
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit} className="mb-4">
                <div className="row g-2 align-items-end">
                  <div className="col-md-3">
                    <label className="form-label">
                      <FaCalendarAlt className="me-1" /> Start Date
                    </label>
                    <input
                      type="date"
                      name="start_date"
                      value={form.start_date}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">
                      <FaCalendarAlt className="me-1" /> End Date
                    </label>
                    <input
                      type="date"
                      name="end_date"
                      value={form.end_date}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-md-2">
                    <label className="form-label">
                      <FaClock className="me-1" /> Start Time
                    </label>
                    <select
                      name="start_time"
                      value={form.start_time}
                      onChange={handleChange}
                      className="form-control"
                      required={false}
                    >
                      <option value="">--:--</option>
                      {timeOptions.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-2">
                    <label className="form-label">
                      <FaClock className="me-1" /> End Time
                    </label>
                    <select
                      name="end_time"
                      value={form.end_time}
                      onChange={handleChange}
                      className="form-control"
                      required={false}
                    >
                      <option value="">--:--</option>
                      {timeOptions.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-10 mt-2">
                    <label className="form-label">Reason</label>
                    <input
                      type="text"
                      name="reason"
                      value={form.reason}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Reason for time off"
                      required
                    />
                  </div>
                  <div className="col-md-2 mt-2 d-grid">
                    <button
                      type="submit"
                      className="btn btn-outline-primary w-100 fw-bold py-2"
                      disabled={loading}
                    >
                      {loading ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                </div>
              </form>
              <h5 className="mb-3">My Requests</h5>
              {loading ? (
                <div className="text-center py-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-bordered align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Start</th>
                        <th>End</th>
                        <th>Reason</th>
                        <th>Status</th>
                        <th>Response</th>
                      </tr>
                    </thead>
                    <tbody>
                      {requests.length === 0 ? (
                        <tr>
                          <td colSpan="7" className="text-center text-muted">
                            No requests yet.
                          </td>
                        </tr>
                      ) : (
                        requests.map((r) => (
                          <tr key={r.id}>
                            <td>{formatDate(r.start_date)}</td>
                            <td>{formatDate(r.end_date)}</td>
                            <td>{formatTime(r.start_time)}</td>
                            <td>{formatTime(r.end_time)}</td>
                            <td>{r.reason}</td>
                            <td>{statusBadge(r.status)}</td>
                            <td>{r.response_message || "-"}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PermissionRequest;
