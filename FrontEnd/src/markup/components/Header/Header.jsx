import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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

function Header(props) {
  const { isLogged, setIsLogged, employee } = useAuth();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1200);
  const [showMenu, setShowMenu] = useState(false);
  const { t, i18n } = useTranslation();
  const [unreadCount, setUnreadCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [allAnnouncements, setAllAnnouncements] = useState([]);
  const [unreadAnnouncements, setUnreadAnnouncements] = useState([]);

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
      // Get all announcements
      const allRes = await axios.get(
        `/announcements/all?employee_id=${employee.employee_id}`
      );
      // Get unread announcements
      const unreadRes = await axios.get(
        `/announcements/unread?employee_id=${employee.employee_id}`
      );
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
      setAllAnnouncements(all);
      setUnreadAnnouncements(unread);
      setUnreadCount(unread.length);
    } catch (error) {
      setAllAnnouncements([]);
      setUnreadAnnouncements([]);
      setUnreadCount(0);
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
    await Promise.all(
      unreadAnnouncements.map((a) =>
        axios.post("/announcements/read", {
          announcement_id: a.announcement_id,
          employee_id: employee.employee_id,
        })
      )
    );
    await fetchAnnouncements();
  };

  // Debug logs
  console.log("Employee:", employee);
  console.log("All announcements:", allAnnouncements);
  console.log("Unread announcements:", unreadAnnouncements);
  console.log("Unread count:", unreadCount);
  console.log("Show modal:", showModal);

  return (
    <div>
      <header className="main-header header-style-one">
        <div className="header-top">
          <div className="auto-container">
            <div className="inner-container">
              <div className="left-column">
                <div className="text">
                  {t("Relax while we get you back on the road")}
                </div>
                <div className="office-hour">
                  Monday - Saturday 7:00AM - 6:00PM
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
                          style={{ fontSize: 32, color: "#ffd600" }}
                        />
                        {unreadCount > 0 && (
                          <span
                            style={{
                              position: "absolute",
                              top: 0,
                              right: 0,
                              background: "#d32f2f",
                              color: "#fff",
                              borderRadius: "50%",
                              width: 18,
                              height: 18,
                              fontSize: 12,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontWeight: "bold",
                              boxShadow: "0 0 4px #fff",
                            }}
                          >
                            {unreadCount}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="phone-number">
                    Schedule Appointment: <strong>1800 456 7890</strong>
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
                            <Link to="/">Home</Link>
                          </li>
                          <li className="dropdown">
                            <Link to="/about">About Us</Link>
                          </li>
                          <li className="dropdown">
                            <Link to="/services">Services</Link>
                          </li>
                          <li>
                            <Link to="/contact">Contact</Link>
                          </li>
                          <li>
                            <Link to="/admin">Dashboard</Link>
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
              style={{
                width: "100%",
                padding: "0 0 10px 0",
                background: "#fff",
                borderBottomLeftRadius: 18,
                borderBottomRightRadius: 18,
              }}
            >
              {!allAnnouncements || allAnnouncements.length === 0 ? (
                <p
                  style={{
                    textAlign: "center",
                    color: "#666",
                    fontStyle: "italic",
                    margin: "32px 0",
                  }}
                >
                  No notifications.
                </p>
              ) : (
                [...allAnnouncements]
                  .sort(
                    (a, b) => new Date(b.created_at) - new Date(a.created_at)
                  )
                  .map((a, idx, arr) => {
                    const isUnread = unreadAnnouncements.some(
                      (u) => u.announcement_id === a.announcement_id
                    );
                    return (
                      <div
                        key={a.announcement_id || idx}
                        style={{
                          margin: 0,
                          padding: "18px 28px 12px 28px",
                          background: isUnread ? "#e3f2fd" : "#fff",
                          fontWeight: isUnread ? 700 : 400,
                          cursor: isUnread ? "pointer" : "default",
                          position: "relative",
                          borderBottom:
                            idx !== arr.length - 1
                              ? "1px solid #f0f0f0"
                              : "none",
                          transition: "background 0.2s, font-weight 0.2s",
                          display: "flex",
                          flexDirection: "column",
                          gap: 2,
                          minWidth: 250,
                        }}
                        onClick={() =>
                          isUnread && markAsRead(a.announcement_id)
                        }
                        title={isUnread ? "Click to mark as read" : ""}
                        onMouseEnter={(e) =>
                          isUnread &&
                          (e.currentTarget.style.background = "#bbdefb")
                        }
                        onMouseLeave={(e) =>
                          isUnread &&
                          (e.currentTarget.style.background = "#e3f2fd")
                        }
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                          }}
                        >
                          {isUnread && (
                            <span
                              style={{
                                width: 10,
                                height: 10,
                                borderRadius: "50%",
                                background: "#1976d2",
                                display: "inline-block",
                                marginRight: 4,
                                boxShadow: "0 0 4px #1976d2",
                              }}
                            ></span>
                          )}
                          <span
                            style={{
                              color: "#1a237e",
                              fontWeight: isUnread ? 700 : 500,
                              fontSize: 16,
                              letterSpacing: 0.2,
                            }}
                          >
                            {a.title || (
                              <span style={{ color: "#d32f2f" }}>No Title</span>
                            )}
                          </span>
                        </div>
                        <span
                          style={{
                            margin: "4px 0 0 18px",
                            color: "#333",
                            fontSize: 15,
                            fontWeight: isUnread ? 600 : 400,
                            wordBreak: "break-word",
                          }}
                        >
                          {a.message || (
                            <span style={{ color: "#d32f2f" }}>No Message</span>
                          )}
                        </span>
                        <span
                          style={{
                            color: "#888",
                            fontSize: 12,
                            textAlign: "right",
                            marginLeft: 18,
                            marginTop: 2,
                          }}
                        >
                          {a.created_at
                            ? new Date(a.created_at).toLocaleString()
                            : ""}
                        </span>
                      </div>
                    );
                  })
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Header;
