import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import AdminMenu from "../../../components/Admin/AdminMenu/AdminMenu";
import { Link } from "react-router-dom";
import spaceService from "../../../../services/space.service";
import { useAuth } from "../../../../Context/AuthContext";
import "./dashBoard.css";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import BarChartIcon from "@mui/icons-material/BarChart";
import BuildIcon from "@mui/icons-material/Build";
import CampaignIcon from "@mui/icons-material/Campaign";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import GroupIcon from "@mui/icons-material/Group";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EngineeringIcon from "@mui/icons-material/Engineering";
import BrushIcon from "@mui/icons-material/Brush";
import AirIcon from "@mui/icons-material/Air";
import StopIcon from "@mui/icons-material/Stop";
import TimelineIcon from "@mui/icons-material/Timeline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const AdminDashBoard = () => {
  const { t } = useTranslation();
  const { employee } = useAuth();
  const token = employee?.employee_token;
  const [spaces, setSpaces] = useState([]);
  const [newSpace, setNewSpace] = useState({
    space_name: "",
    space_status: "available",
    space_notes: "",
  });
  const [editSpace, setEditSpace] = useState(null);
  const [editValues, setEditValues] = useState({
    space_name: "",
    space_status: "available",
    space_notes: "",
  });
  const [notification, setNotification] = useState({ message: "", type: "" });

  useEffect(() => {
    fetchSpaces();
  }, [token]);

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: "", type: "" }), 4000);
  };

  const fetchSpaces = async () => {
    if (!token) return;
    try {
      const data = await spaceService.getAllSpaces(token);
      setSpaces(data);
    } catch (error) {
      showNotification(t("Failed to fetch spaces"), "danger");
    }
  };

  const handleInputChange = (e) => {
    setNewSpace({ ...newSpace, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newSpace.space_name) return;
    try {
      await spaceService.createSpace(newSpace, token);
      setNewSpace({
        space_name: "",
        space_status: "available",
        space_notes: "",
      });
      fetchSpaces();
      showNotification(t("Space created successfully!"), "success");
    } catch (error) {
      showNotification(t("Failed to create space"), "danger");
    }
  };

  const handleEditClick = (space) => {
    setEditSpace(space.space_id);
    setEditValues({
      space_name: space.space_name,
      space_status: space.space_status,
      space_notes: space.space_notes || "",
    });
  };

  const handleEditChange = (e) => {
    setEditValues({ ...editValues, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (space_id) => {
    try {
      await spaceService.updateSpace(space_id, editValues, token);
      setEditSpace(null);
      fetchSpaces();
      showNotification(t("Space updated successfully!"), "success");
    } catch (error) {
      showNotification(t("Failed to update space"), "danger");
    }
  };

  const handleDelete = async (space_id) => {
    if (!window.confirm(t("Are you sure you want to delete this space?")))
      return;
    try {
      await spaceService.deleteSpace(space_id, token);
      fetchSpaces();
      showNotification(t("Space deleted successfully!"), "success");
    } catch (error) {
      showNotification(t("Failed to delete space"), "danger");
    }
  };

  // Determine dashboard title
  const dashboardTitle =
    employee?.employee_role === 1
      ? t("Employee Dashboard")
      : t("Admin Dashboard");

  return (
    <>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <section className="services-section col-md-9 admin-right-side">
            <div className="auto-container">
              <div className="sec-title style-two">
                <h2>{dashboardTitle}</h2>
                <div className="text">{t("dashboard_intro")}</div>
              </div>

              <div className="row">
                {/* ALL ORDERS */}
                <div className="col-lg-4 service-block-one">
                  <Link to="/admin/orders" style={{ textDecoration: "none" }}>
                    <div
                      className="inner-box hvr-float-shadow dashboard-card"
                      style={{
                        cursor: "pointer",
                        transition: "box-shadow 0.2s",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                      }}
                    >
                      <h5>{t("OPEN FOR ALL")}</h5>
                      <h2>{t("All Orders")}</h2>
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
                {/* New orders - Only show for admins */}
                {employee?.employee_role === 3 && (
                  <div className="col-lg-4 service-block-one">
                    <Link to="/admin/orders" style={{ textDecoration: "none" }}>
                      <div
                        className="inner-box hvr-float-shadow dashboard-card"
                        style={{
                          cursor: "pointer",
                          transition: "box-shadow 0.2s",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                        }}
                      >
                        <h5>{t("OPEN FOR LEADS")}</h5>
                        <h2>{t("New Orders")}</h2>
                        <div
                          className="icon"
                          style={{
                            fontSize: 48,
                            color: "#fff",
                            margin: "16px 0",
                          }}
                        >
                          <AddCircleIcon fontSize="inherit" />
                        </div>
                      </div>
                    </Link>
                  </div>
                )}
                {/* Employees - Only show for admins */}
                {employee?.employee_role === 3 && (
                  <div className="col-lg-4 service-block-one">
                    <Link
                      to="/admin/employees"
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
                        <h5>{t("OPEN FOR ADMINS")}</h5>
                        <h2>{t("Employees")}</h2>
                        <div
                          className="icon"
                          style={{
                            fontSize: 48,
                            color: "#fff",
                            margin: "16px 0",
                          }}
                        >
                          <GroupIcon fontSize="inherit" />
                        </div>
                      </div>
                    </Link>
                  </div>
                )}
                {/* Add employee - Only show for admins */}
                {employee?.employee_role === 3 && (
                  <div className="col-lg-4 service-block-one">
                    <Link
                      to="/admin/add-employee"
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
                        <h5>{t("OPEN FOR ADMINS")}</h5>
                        <h2>{t("Add Employee")}</h2>
                        <div
                          className="icon"
                          style={{
                            fontSize: 48,
                            color: "#fff",
                            margin: "16px 0",
                          }}
                        >
                          <PersonAddIcon fontSize="inherit" />
                        </div>
                      </div>
                    </Link>
                  </div>
                )}
                {/* Engine service  and repair */}
                <div className="col-lg-4 service-block-one">
                  <Link to="/admin/services" style={{ textDecoration: "none" }}>
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
                {/* Tyre & wheels */}
                <div className="col-lg-4 service-block-one">
                  <Link to="/admin/services" style={{ textDecoration: "none" }}>
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
                {/* Denting & painting */}
                <div className="col-lg-4 service-block-one">
                  <Link to="/admin/services" style={{ textDecoration: "none" }}>
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
                {/* Engine service  and repair */}
                <div className="col-lg-4 service-block-one">
                  <Link to="/admin/services" style={{ textDecoration: "none" }}>
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
                {/* Tyre & wheels */}
                <div className="col-lg-4 service-block-one">
                  <Link to="/admin/services" style={{ textDecoration: "none" }}>
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
                {/* Work Hours Report */}
                <div className="col-lg-4 service-block-one">
                  <Link
                    to="/admin/work-hours-report"
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
                      <h5>{t("REPORTS")}</h5>
                      <h2>{t("Work Hours Report")}</h2>
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
                {/* Individual Employee Work Hours Report */}
                <div className="col-lg-4 service-block-one">
                  <Link
                    to="/admin/employee-work-hours-report"
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
                      <h5>{t("REPORTS")}</h5>
                      <h2>{t("Individual Employee Work Hours")}</h2>
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
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default AdminDashBoard;
