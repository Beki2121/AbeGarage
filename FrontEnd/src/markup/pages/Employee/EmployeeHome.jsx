import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "../../../services/axiosConfig";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { Link } from "react-router-dom";
import "./EmployeeHome.css";
// Import icons for service cards
import AssignmentIcon from "@mui/icons-material/Assignment";
import BuildIcon from "@mui/icons-material/Build";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import EngineeringIcon from "@mui/icons-material/Engineering";
import BrushIcon from "@mui/icons-material/Brush";
import AirIcon from "@mui/icons-material/Air";
import StopIcon from "@mui/icons-material/Stop";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TimelineIcon from "@mui/icons-material/Timeline";
import ListAltIcon from "@mui/icons-material/ListAlt";

export default function EmployeeHome({ employee }) {
  const { t } = useTranslation();
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
    <div className="container-fluid admin-pages">
      <div className="row">
        <div className="col-md-12">
          <section className="services-section">
            <div className="auto-container">
              <div className="sec-title style-two">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    marginBottom: 20,
                  }}
                >
                  <h2>{t("Employee Dashboard")}</h2>
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
                <div className="text">
                  {t("Welcome back")}, {employee.employee_first_name}!
                </div>
              </div>

              <div className="row">
                {/* My Orders */}
                <div className="col-lg-4 service-block-one">
                  <Link
                    to="/employee/orders"
                    style={{ textDecoration: "none" }}
                  >
                    <div
                      className="inner-box hvr-float-shadow dashboard-card"
                      style={{
                        cursor: "pointer",
                        transition: "box-shadow 0.2s",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                      }}
                    >
                      <h5>{t("WORK MANAGEMENT")}</h5>
                      <h2>{t("My Orders")}</h2>
                      <div
                        className="icon"
                        style={{
                          fontSize: 48,
                          color: "#fff",
                          margin: "16px 0",
                        }}
                      >
                        <ListAltIcon fontSize="inherit" />
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Engine Service & Repair */}
                <div className="col-lg-4 service-block-one">
                  <Link
                    to="/employee/services"
                    style={{ textDecoration: "none" }}
                  >
                    <div
                      className="inner-box hvr-float-shadow dashboard-card"
                      style={{
                        cursor: "pointer",
                        transition: "box-shadow 0.2s",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                      }}
                    >
                      <h5>{t("SERVICE AND REPAIRS")}</h5>
                      <h2>{t("Engine Service & Repair")}</h2>
                      <div
                        className="icon"
                        style={{
                          fontSize: 48,
                          color: "#fff",
                          margin: "16px 0",
                        }}
                      >
                        <EngineeringIcon fontSize="inherit" />
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Tyre & Wheels */}
                <div className="col-lg-4 service-block-one">
                  <Link
                    to="/employee/services"
                    style={{ textDecoration: "none" }}
                  >
                    <div
                      className="inner-box hvr-float-shadow dashboard-card"
                      style={{
                        cursor: "pointer",
                        transition: "box-shadow 0.2s",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                      }}
                    >
                      <h5>{t("SERVICE AND REPAIRS")}</h5>
                      <h2>{t("Tyre & Wheels")}</h2>
                      <div
                        className="icon"
                        style={{
                          fontSize: 48,
                          color: "#fff",
                          margin: "16px 0",
                        }}
                      >
                        <DirectionsCarIcon fontSize="inherit" />
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Denting & Painting */}
                <div className="col-lg-4 service-block-one">
                  <Link
                    to="/employee/services"
                    style={{ textDecoration: "none" }}
                  >
                    <div
                      className="inner-box hvr-float-shadow dashboard-card"
                      style={{
                        cursor: "pointer",
                        transition: "box-shadow 0.2s",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                      }}
                    >
                      <h5>{t("SERVICE AND REPAIRS")}</h5>
                      <h2>{t("Denting & Painting")}</h2>
                      <div
                        className="icon"
                        style={{
                          fontSize: 48,
                          color: "#fff",
                          margin: "16px 0",
                        }}
                      >
                        <BrushIcon fontSize="inherit" />
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Air Conditioning */}
                <div className="col-lg-4 service-block-one">
                  <Link
                    to="/employee/services"
                    style={{ textDecoration: "none" }}
                  >
                    <div
                      className="inner-box hvr-float-shadow dashboard-card"
                      style={{
                        cursor: "pointer",
                        transition: "box-shadow 0.2s",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                      }}
                    >
                      <h5>{t("SERVICE AND REPAIRS")}</h5>
                      <h2>{t("Air Conditioning")}</h2>
                      <div
                        className="icon"
                        style={{
                          fontSize: 48,
                          color: "#fff",
                          margin: "16px 0",
                        }}
                      >
                        <AirIcon fontSize="inherit" />
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Brake Check */}
                <div className="col-lg-4 service-block-one">
                  <Link
                    to="/employee/services"
                    style={{ textDecoration: "none" }}
                  >
                    <div
                      className="inner-box hvr-float-shadow dashboard-card"
                      style={{
                        cursor: "pointer",
                        transition: "box-shadow 0.2s",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                      }}
                    >
                      <h5>{t("SERVICE AND REPAIRS")}</h5>
                      <h2>{t("Brake Check")}</h2>
                      <div
                        className="icon"
                        style={{
                          fontSize: 48,
                          color: "#fff",
                          margin: "16px 0",
                        }}
                      >
                        <StopIcon fontSize="inherit" />
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Permission Request */}
                <div className="col-lg-4 service-block-one">
                  <Link
                    to="/employee/permission-request"
                    style={{ textDecoration: "none" }}
                  >
                    <div
                      className="inner-box hvr-float-shadow dashboard-card"
                      style={{
                        cursor: "pointer",
                        transition: "box-shadow 0.2s",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                      }}
                    >
                      <h5>{t("TIME OFF")}</h5>
                      <h2>{t("Request Time Off")}</h2>
                      <div
                        className="icon"
                        style={{
                          fontSize: 48,
                          color: "#fff",
                          margin: "16px 0",
                        }}
                      >
                        <EventAvailableIcon fontSize="inherit" />
                      </div>
                    </div>
                  </Link>
                </div>

                {/* My Profile */}
                <div className="col-lg-4 service-block-one">
                  <Link
                    to="/employee/profile"
                    style={{ textDecoration: "none" }}
                  >
                    <div
                      className="inner-box hvr-float-shadow dashboard-card"
                      style={{
                        cursor: "pointer",
                        transition: "box-shadow 0.2s",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                      }}
                    >
                      <h5>{t("PROFILE")}</h5>
                      <h2>{t("My Profile")}</h2>
                      <div
                        className="icon"
                        style={{
                          fontSize: 48,
                          color: "#fff",
                          margin: "16px 0",
                        }}
                      >
                        <AccountCircleIcon fontSize="inherit" />
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Work Hours */}
                <div className="col-lg-4 service-block-one">
                  <Link
                    to="/employee/work-hours"
                    style={{ textDecoration: "none" }}
                  >
                    <div
                      className="inner-box hvr-float-shadow dashboard-card"
                      style={{
                        cursor: "pointer",
                        transition: "box-shadow 0.2s",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                      }}
                    >
                      <h5>{t("WORK HOURS")}</h5>
                      <h2>{t("My Work Hours")}</h2>
                      <div
                        className="icon"
                        style={{
                          fontSize: 48,
                          color: "#fff",
                          margin: "16px 0",
                        }}
                      >
                        <TimelineIcon fontSize="inherit" />
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
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
    </div>
  );
}
