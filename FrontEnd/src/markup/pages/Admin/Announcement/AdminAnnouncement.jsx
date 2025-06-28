import React, { useState } from "react";
import axios from "../../../../axios/axiosConfig";
import { useAuth } from "../../../../Context/AuthContext";

export default function AdminAnnouncement() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { employee } = useAuth();
  const token = employee?.employee_token;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!title.trim() || !message.trim()) {
      setError("Both title and message are required.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(
        "/announcements",
        { title, message },
        { headers: { "x-access-token": token } }
      );
      setSuccess("Announcement added successfully!");
      setTitle("");
      setMessage("");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to add announcement. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="admin-announcement-form"
      style={{
        maxWidth: 500,
        margin: "40px auto",
        background: "#fff",
        padding: 32,
        borderRadius: 12,
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
      }}
    >
      <h2 style={{ marginBottom: 24 }}>Post Announcement</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="title" style={{ fontWeight: 600 }}>
            Title
          </label>
          <input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="form-control"
            required
            style={{ marginTop: 6 }}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="message" style={{ fontWeight: 600 }}>
            Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message"
            className="form-control"
            required
            rows={5}
            style={{ marginTop: 6 }}
          />
        </div>
        {error && (
          <div style={{ color: "#b71c1c", marginBottom: 12 }}>{error}</div>
        )}
        <button
          type="submit"
          disabled={loading}
          style={{
            minWidth: 120,
            background: "#1a237e",
            color: "#fff",
            fontWeight: 600,
            fontSize: 18,
            borderRadius: 8,
            border: "none",
            marginTop: 8,
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            letterSpacing: 1,
          }}
        >
          {loading ? "Submitting..." : "Send"}
        </button>
      </form>
      {success && (
        <div
          className="alert alert-success alert-dismissible fade show mt-3"
          role="alert"
        >
          {success}
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => setSuccess("")}
          ></button>
        </div>
      )}
    </div>
  );
}
