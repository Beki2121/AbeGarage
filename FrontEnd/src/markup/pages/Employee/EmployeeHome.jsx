import React, { useEffect, useState } from "react";
import axios from "../../../services/axiosConfig";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

export default function EmployeeHome({ employee }) {
  const [announcement, setAnnouncement] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/announcements/latest?employee_id=${employee.employee_id}`)
      .then((res) => setAnnouncement(res.data));
  }, [employee.employee_id]);

  const markAsRead = () => {
    axios.post("/api/announcements/read", {
      announcement_id: announcement.announcement_id,
      employee_id: employee.employee_id,
    });
    setShowModal(false);
    setAnnouncement({ ...announcement, read: true });
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <h2>Welcome, {employee.employee_first_name}</h2>
        {announcement && !announcement.read && (
          <div
            style={{ position: "relative", cursor: "pointer" }}
            onClick={() => setShowModal(true)}
          >
            <NotificationsActiveIcon
              style={{ fontSize: 32, color: "#ffd600" }}
            />
            <span
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                background: "#d32f2f",
                color: "#fff",
                borderRadius: "50%",
                width: 16,
                height: 16,
                fontSize: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                boxShadow: "0 0 4px #fff",
              }}
            >
              !
            </span>
          </div>
        )}
      </div>
      {showModal && announcement && (
        <div
          className="modal"
          style={{
            position: "fixed",
            top: "30%",
            left: "50%",
            transform: "translate(-50%, -30%)",
            background: "#fff",
            color: "#181e5a",
            padding: 32,
            borderRadius: 12,
            boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
            zIndex: 1000,
          }}
        >
          <h3 style={{ marginBottom: 16 }}>{announcement.title}</h3>
          <p style={{ marginBottom: 24 }}>{announcement.message}</p>
          <button className="btn btn-primary" onClick={markAsRead}>
            Mark as Read
          </button>
          <button
            className="btn btn-secondary ms-2"
            onClick={() => setShowModal(false)}
          >
            Close
          </button>
        </div>
      )}
      {/* ...rest of your homepage... */}
    </div>
  );
}
