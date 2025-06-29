import React, { useState, useEffect } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import loginService from "../../../services/login.service";
import { useAuth } from "../../../Context/AuthContext";
import Avatar from "react-avatar";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure bootstrap CSS is imported
import "./Header.css";
import { useTranslation } from "react-i18next";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import axios from "../../../axios/axiosConfig";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import BuildIcon from "@mui/icons-material/Build";

function Header(props) {
  const { isLogged, setIsLogged, employee } = useAuth();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1200);
  const [showMenu, setShowMenu] = useState(false);
  const { t, i18n } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [allAnnouncements, setAllAnnouncements] = useState([]);
  const [unreadAnnouncements, setUnreadAnnouncements] = useState([]);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [showZoomModal, setShowZoomModal] = useState(false);

  const updateMedia = () => {
    setIsMobile(window.innerWidth < 1200);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, []);

  const fetchAnnouncements = async () => {
    if (!employee?.employee_id) return;
    try {
      console.log("Fetching announcements for employee:", employee.employee_id);

      // Get all announcements
      const allRes = await axios.get(
        `/announcements/all?employee_id=${employee.employee_id}`
      );
      console.log("All announcements response:", allRes.data);

      // Get unread announcements
      const unreadRes = await axios.get(
        `/announcements/unread?employee_id=${employee.employee_id}`
      );
      console.log("Unread announcements response:", unreadRes.data);

      let all = Array.isArray(allRes.data)
        ? allRes.data
        : allRes.data
        ? [allRes.data]
        : [];
      let unread = Array.isArray(unreadRes.data)
        ? unreadRes.data
        : unreadRes.data
        ? [unreadRes.data]
        : [];

      console.log("Processed all announcements:", all);
      console.log("Processed unread announcements:", unread);

      setAllAnnouncements(all);
      setUnreadAnnouncements(unread);
    } catch (error) {
      console.error("Error fetching announcements:", error);
      setAllAnnouncements([]);
      setUnreadAnnouncements([]);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, [employee?.employee_id]);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const logOut = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      loginService.logOut();
      setIsLogged(false);
      navigate("/login");
    }
  };

  const handleAdminClick = (event) => {
    event.preventDefault();
    navigate("/admin");
  };

  const handleProfileClick = (event) => {
    event.preventDefault();
    navigate(`/admin/employee-profile/${employee?.employee_id}`);
  };

  const isAdmin = employee?.employee_role === 3;
  console.log("is user admin", isAdmin);

  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
  };

  const markAsRead = async (announcement_id) => {
    await axios.post("/announcements/read", {
      announcement_id,
      employee_id: employee.employee_id,
    });
    await fetchAnnouncements();
  };

  const handleBellClick = async () => {
    await fetchAnnouncements();
    setShowModal(true);
  };

  // Mark all as read
  const markAllAsRead = async () => {
    if (!unreadAnnouncements.length) return;

    console.log(
      "Marking all as read. Unread announcements:",
      unreadAnnouncements
    );

    try {
      // Use the new efficient endpoint to mark all announcements as read in one request
      const announcement_ids = unreadAnnouncements.map(
        (a) => a.announcement_id
      );

      console.log(
        "Sending request to mark",
        announcement_ids.length,
        "announcements as read"
      );

      await axios.post("/announcements/read-multiple", {
        announcement_ids,
        employee_id: employee.employee_id,
      });

      console.log("All announcements marked as read successfully");

      await fetchAnnouncements();
    } catch (error) {
      console.error("Error marking all as read:", error);
    }
  };

  // Handle announcement click
  const handleAnnouncementClick = (announcement) => {
    setSelectedAnnouncement(announcement);
    setShowZoomModal(true);
  };

  // Close zoom modal
  const closeZoomModal = () => {
    setShowZoomModal(false);
    setSelectedAnnouncement(null);
  };

  // Helper function to truncate text
  const truncateText = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  // Helper function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();

    // Reset time to compare only dates
    const dateOnly = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    const nowOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const diffTime = nowOnly - dateOnly;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    if (diffDays === 0) {
      // Today - show "Today"
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  // Debug logs
  console.log("Employee:", employee);
  console.log("All announcements:", allAnnouncements);
  console.log("Unread announcements:", unreadAnnouncements);
  console.log("Show modal:", showModal);

  return (
    <div>
      <header className="main-header header-style-one">
        <div className="header-top">
          <div className="auto-container">
            <div className="inner-container">
              <div className="left-column">
                <div className="text">
                  <BuildIcon
                    style={{
                      fontSize: 20,
                      color: "#ffffff",
                      marginRight: 8,
                      verticalAlign: "middle",
                    }}
                  />
                  24hr Workshop Open for Emergency Service
                </div>
                <div className="office-hour">
                  Monday - Friday 8:00 - 18:30 | Saturday 8:00 - 12:00
                </div>
              </div>
              <div className="right-column d-flex">
                <div style={{ marginRight: 16 }}>
                  <button
                    onClick={() => handleLanguageChange("en")}
                    style={{
                      marginRight: 4,
                      padding: "2px 8px",
                      borderRadius: 4,
                      border: "1px solid #ccc",
                      background: i18n.language === "en" ? "#1a237e" : "#fff",
                      color: i18n.language === "en" ? "#fff" : "#222",
                      cursor: "pointer",
                    }}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => handleLanguageChange("it")}
                    style={{
                      padding: "2px 8px",
                      borderRadius: 4,
                      border: "1px solid #ccc",
                      background: i18n.language === "it" ? "#1a237e" : "#fff",
                      color: i18n.language === "it" ? "#fff" : "#222",
                      cursor: "pointer",
                    }}
                  >
                    IT
                  </button>
                </div>
                {isLogged ? (
                  <div
                    className="link-btn"
                    style={{ display: "flex", alignItems: "center", gap: 16 }}
                  >
                    <span className="welcome-admin-text">
                      <strong>
                        {isAdmin
                          ? "Welcome Admin!"
                          : `Welcome ${employee?.employee_first_name || ""}!`}
                      </strong>
                    </span>
                    {/* Notification bell for employees only */}
                    {isLogged && employee?.employee_role === 1 && (
                      <div
                        style={{
                          position: "relative",
                          display: "inline-block",
                          marginLeft: 16,
                          cursor: "pointer",
                          padding: 8,
                          borderRadius: "50%",
                          transition: "background-color 0.2s ease",
                          backgroundColor: "rgba(255, 214, 0, 0.1)",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor =
                            "rgba(255, 214, 0, 0.2)";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor =
                            "rgba(255, 214, 0, 0.1)";
                        }}
                        onClick={handleBellClick}
                        title="View notifications"
                      >
                        <NotificationsActiveIcon
                          style={{
                            fontSize: 32,
                            color:
                              unreadAnnouncements.length > 0
                                ? "#ff0000"
                                : "#ffffff",
                          }}
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="phone-number">
                    Schedule Appointment:{" "}
                    <a
                      href="tel:+390461996222"
                      style={{
                        color: "#ffffff",
                        fontWeight: 700,
                        textDecoration: "none",
                        WebkitTextFillColor: "#ffffff",
                        MozTextFillColor: "#ffffff",
                      }}
                    >
                      +39 0461 996222
                    </a>
                  </div>
                )}
                {isLogged && (
                  <div className="employee_profile">
                    <Avatar
                      name={`${employee?.employee_first_name} ${employee?.employee_last_name}`}
                      size="50"
                      textSizeRatio={2}
                      color="#EE100E"
                      round={true}
                      style={{ cursor: "pointer" }}
                      onClick={handleProfileClick}
                      className="avatar"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="header-upper">
          <div className="auto-container">
            <div className="inner-container">
              <div className="logo-box left-box">
                <div className="logo">
                  <Link to="/">
                    <img
                      src="/eurodiesel-logo.jpg"
                      alt="EURODIESEL PARMA S.p.A."
                      style={{ height: 60 }}
                    />
                  </Link>
                </div>
              </div>
              <div className="right-column">
                <div className="nav-outer">
                  {isMobile && (
                    <div className="hamburger-container">
                      <div className="">
                        <DropdownButton
                          className="dropdown-button"
                          id="dropdown-basic-button"
                          variant="none"
                          title={
                            <div className="hamburger-icon">
                              <span className="hamburger-line"></span>
                              <span className="hamburger-line"></span>
                              <span className="hamburger-line"></span>
                            </div>
                          }
                        >
                          <Dropdown.Item as={Link} to="/">
                            Home
                          </Dropdown.Item>
                          <Dropdown.Item as={Link} to="/about">
                            About Us
                          </Dropdown.Item>
                          <Dropdown.Item as={Link} to="/services">
                            Services
                          </Dropdown.Item>
                          <Dropdown.Item as={Link} to="/contact">
                            Contact
                          </Dropdown.Item>
                          <Dropdown.Item as={Link} to="/admin">
                            Dashboard
                          </Dropdown.Item>
                        </DropdownButton>
                      </div>
                    </div>
                  )}
                  {!isMobile && (
                    <nav className="main-menu navbar-expand-md navbar-light">
                      <div
                        className="collapse navbar-collapse show clearfix"
                        id="navbarSupportedContent"
                      >
                        <ul className="navigation navbar-nav">
                          <li className="dropdown">
                            <NavLink
                              to="/"
                              className={({ isActive }) =>
                                isActive ? "nav-link active-nav" : "nav-link"
                              }
                              style={{
                                textDecoration: "none",
                                padding: "10px 15px",
                                borderRadius: "4px",
                                transition: "all 0.3s ease",
                                display: "block",
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.color = "#1a237e";
                                e.target.style.backgroundColor =
                                  "rgba(26, 35, 126, 0.1)";
                                e.target.style.transform = "translateY(-2px)";
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.color = "";
                                e.target.style.backgroundColor = "";
                                e.target.style.transform = "translateY(0)";
                              }}
                            >
                              Home
                            </NavLink>
                          </li>
                          <li className="dropdown">
                            <NavLink
                              to="/about"
                              className={({ isActive }) =>
                                isActive ? "nav-link active-nav" : "nav-link"
                              }
                              style={{
                                textDecoration: "none",
                                padding: "10px 15px",
                                borderRadius: "4px",
                                transition: "all 0.3s ease",
                                display: "block",
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.color = "#1a237e";
                                e.target.style.backgroundColor =
                                  "rgba(26, 35, 126, 0.1)";
                                e.target.style.transform = "translateY(-2px)";
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.color = "";
                                e.target.style.backgroundColor = "";
                                e.target.style.transform = "translateY(0)";
                              }}
                            >
                              About Us
                            </NavLink>
                          </li>
                          <li className="dropdown">
                            <NavLink
                              to="/services"
                              className={({ isActive }) =>
                                isActive ? "nav-link active-nav" : "nav-link"
                              }
                              style={{
                                textDecoration: "none",
                                padding: "10px 15px",
                                borderRadius: "4px",
                                transition: "all 0.3s ease",
                                display: "block",
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.color = "#1a237e";
                                e.target.style.backgroundColor =
                                  "rgba(26, 35, 126, 0.1)";
                                e.target.style.transform = "translateY(-2px)";
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.color = "";
                                e.target.style.backgroundColor = "";
                                e.target.style.transform = "translateY(0)";
                              }}
                            >
                              Services
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/contact"
                              className={({ isActive }) =>
                                isActive ? "nav-link active-nav" : "nav-link"
                              }
                              style={{
                                textDecoration: "none",
                                padding: "10px 15px",
                                borderRadius: "4px",
                                transition: "all 0.3s ease",
                                display: "block",
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.color = "#1a237e";
                                e.target.style.backgroundColor =
                                  "rgba(26, 35, 126, 0.1)";
                                e.target.style.transform = "translateY(-2px)";
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.color = "";
                                e.target.style.backgroundColor = "";
                                e.target.style.transform = "translateY(0)";
                              }}
                            >
                              Contact
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/admin"
                              className={({ isActive }) =>
                                isActive ? "nav-link active-nav" : "nav-link"
                              }
                              style={{
                                textDecoration: "none",
                                padding: "10px 15px",
                                borderRadius: "4px",
                                transition: "all 0.3s ease",
                                display: "block",
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.color = "#1a237e";
                                e.target.style.backgroundColor =
                                  "rgba(26, 35, 126, 0.1)";
                                e.target.style.transform = "translateY(-2px)";
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.color = "";
                                e.target.style.backgroundColor = "";
                                e.target.style.transform = "translateY(0)";
                              }}
                            >
                              Dashboard
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </nav>
                  )}
                </div>
                <div className="search-btn"></div>
                {isLogged ? (
                  <div className="signing-btn">
                    <Link
                      to="/"
                      className="theme-btn btn-style-one blue"
                      onClick={logOut}
                    >
                      Log out
                    </Link>
                  </div>
                ) : (
                  <div className="signing-btn">
                    <Link to="/login" className="theme-btn btn-style-one">
                      Login
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
      {showModal && employee?.employee_role === 1 && (
        <>
          {/* Backdrop */}
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.5)",
              zIndex: 9999,
            }}
            onClick={() => setShowModal(false)}
          />
          {/* Modal */}
          <div
            className="custom-notification-modal"
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "#fff",
              color: "#181e5a",
              padding: 0,
              borderRadius: 18,
              boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
              zIndex: 10000,
              minWidth: "350px",
              maxWidth: "95vw",
              maxHeight: "80vh",
              overflowY: "auto",
              border: "none",
              fontSize: 18,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "20px 28px 10px 28px",
                borderBottom: "1px solid #e0e0e0",
                background: "#fff",
                borderTopLeftRadius: 18,
                borderTopRightRadius: 18,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span
                  style={{
                    color: "#1a237e",
                    fontSize: 28,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <svg
                    width="26"
                    height="26"
                    fill="#1a237e"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 24c1.104 0 2-.896 2-2h-4c0 1.104.896 2 2 2zm6.364-6v-5c0-3.07-1.639-5.64-4.5-6.32V6c0-.828-.672-1.5-1.5-1.5s-1.5.672-1.5 1.5v.68C7.275 7.36 5.636 9.93 5.636 13v5l-1.636 1.5V21h16v-1.5L18.364 18zM18 19H6v-.5l1.636-1.5V13c0-2.757 1.794-5 4-5s4 2.243 4 5v4l1.364 1.5V19z" />
                  </svg>
                </span>
                <h3
                  style={{
                    margin: 0,
                    fontWeight: 700,
                    fontSize: 22,
                    color: "#1a237e",
                    letterSpacing: 0.5,
                  }}
                >
                  Notifications
                </h3>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {unreadAnnouncements.length > 0 && (
                  <button
                    onClick={markAllAsRead}
                    style={{
                      background: "none",
                      color: "#1976d2",
                      border: "none",
                      borderRadius: "50%",
                      padding: 0,
                      width: 36,
                      height: 36,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      marginRight: 8,
                    }}
                    title="Mark all as read"
                  >
                    <CheckCircleIcon
                      style={{ fontSize: 28, color: "#1976d2" }}
                    />
                  </button>
                )}
                <button
                  onClick={() => setShowModal(false)}
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "28px",
                    cursor: "pointer",
                    color: "#888",
                    fontWeight: "bold",
                    lineHeight: 1,
                  }}
                  aria-label="Close notification modal"
                >
                  ×
                </button>
              </div>
            </div>
            <div
              className="modal-body"
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "0",
              }}
            >
              {allAnnouncements.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "40px",
                    color: "#666",
                  }}
                >
                  <NotificationsActiveIcon
                    style={{
                      fontSize: 48,
                      color: "#ddd",
                      marginBottom: "16px",
                    }}
                  />
                  <p>No announcements yet</p>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
                  {allAnnouncements.map((announcement) => (
                    <div
                      key={announcement.announcement_id}
                      className="announcement-card"
                      style={{
                        border: "1px solid #e0e0e0",
                        borderRadius: "12px",
                        padding: "20px",
                        backgroundColor: announcement.read ? "#fafafa" : "#fff",
                        transition: "all 0.2s ease",
                        cursor: "pointer",
                        position: "relative",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = "translateY(-2px)";
                        e.target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = "translateY(0)";
                        e.target.style.boxShadow = "none";
                      }}
                      onClick={() => handleAnnouncementClick(announcement)}
                    >
                      {!announcement.read && (
                        <div
                          style={{
                            position: "absolute",
                            top: "12px",
                            right: "12px",
                            width: "8px",
                            height: "8px",
                            backgroundColor: "#ff0000",
                            borderRadius: "50%",
                          }}
                        />
                      )}

                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "12px",
                        }}
                      >
                        <div
                          style={{
                            width: "40px",
                            height: "40px",
                            backgroundColor: "#007bff",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            fontSize: "16px",
                            fontWeight: "600",
                          }}
                        >
                          {announcement.title.charAt(0).toUpperCase()}
                        </div>

                        <div style={{ flex: 1 }}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                              marginBottom: "8px",
                            }}
                          >
                            <h6
                              style={{
                                margin: 0,
                                fontWeight: "600",
                                color: "#333",
                              }}
                            >
                              {announcement.title}
                            </h6>
                            <span
                              style={{
                                fontSize: "12px",
                                color: "#666",
                                backgroundColor: "#f0f0f0",
                                padding: "2px 8px",
                                borderRadius: "12px",
                              }}
                            >
                              {formatDate(announcement.created_at)}
                            </span>
                          </div>

                          <p
                            style={{
                              margin: 0,
                              color: "#555",
                              lineHeight: "1.5",
                              fontSize: "14px",
                            }}
                          >
                            {truncateText(announcement.message)}
                          </p>

                          {announcement.message.length > 150 && (
                            <button
                              style={{
                                background: "none",
                                border: "none",
                                color: "#007bff",
                                fontSize: "14px",
                                fontWeight: "500",
                                cursor: "pointer",
                                padding: "0",
                                marginTop: "8px",
                              }}
                              onClick={(e) => {
                                e.stopPropagation(); // Prevents the card click event
                                handleAnnouncementClick(announcement);
                              }}
                            >
                              Read more
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
      {showZoomModal && selectedAnnouncement && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.6)",
            zIndex: 11000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "opacity 0.3s",
          }}
          onClick={closeZoomModal}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "12px",
              maxWidth: "90vw",
              maxHeight: "80vh",
              overflowY: "auto",
              boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
              padding: "32px 24px 24px 24px",
              position: "relative",
              minWidth: "320px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeZoomModal}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: "none",
                border: "none",
                fontSize: "24px",
                cursor: "pointer",
                color: "#666",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#f0f0f0",
                transition: "all 0.2s ease",
                zIndex: 1,
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#e0e0e0";
                e.target.style.color = "#333";
                e.target.style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#f0f0f0";
                e.target.style.color = "#666";
                e.target.style.transform = "scale(1)";
              }}
              title="Close"
            >
              <CloseIcon />
            </button>

            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "16px",
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  backgroundColor: "#007bff",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "24px",
                  fontWeight: "600",
                }}
              >
                {selectedAnnouncement.title.charAt(0).toUpperCase()}
              </div>

              <div style={{ flex: 1 }}>
                <h4
                  style={{
                    margin: "0 0 8px 0",
                    fontWeight: "700",
                    color: "#333",
                  }}
                >
                  {selectedAnnouncement.title}
                </h4>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    color: "#666",
                    fontSize: "14px",
                  }}
                >
                  <span>📅 {formatDate(selectedAnnouncement.created_at)}</span>
                  <span>
                    🕒{" "}
                    {new Date(
                      selectedAnnouncement.created_at
                    ).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </div>

            <div
              style={{
                backgroundColor: "#f8f9fa",
                padding: "24px",
                borderRadius: "12px",
                borderLeft: "4px solid #007bff",
              }}
            >
              <p
                style={{
                  margin: 0,
                  color: "#333",
                  lineHeight: "1.7",
                  fontSize: "16px",
                  whiteSpace: "pre-wrap",
                }}
              >
                {selectedAnnouncement.message}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
