import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
import spaceService from "../../../services/space.service";
import { useAuth } from "../../../Context/AuthContext";
import "./MaintenanceSpaces.css";

const MaintenanceSpaces = () => {
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

  return (
    <div className="maintenance-spaces-page">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="maintenance-spaces-content">
              <h2>{t("Maintenance Spaces Management")}</h2>

              {notification.message && (
                <div
                  className={`alert alert-${notification.type} alert-dismissible fade show`}
                  role="alert"
                >
                  {notification.message}
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={() => setNotification({ message: "", type: "" })}
                  ></button>
                </div>
              )}

              <div className="card">
                <div className="card-header">
                  <h4>{t("Add New Space")}</h4>
                </div>
                <div className="card-body">
                  <form onSubmit={handleCreate} className="row g-3">
                    <div className="col-md-4">
                      <label className="form-label">{t("Space Name")}</label>
                      <input
                        type="text"
                        name="space_name"
                        value={newSpace.space_name}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">{t("Status")}</label>
                      <select
                        name="space_status"
                        value={newSpace.space_status}
                        onChange={handleInputChange}
                        className="form-control"
                      >
                        <option value="available">{t("Available")}</option>
                        <option value="occupied">{t("Occupied")}</option>
                      </select>
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">{t("Notes")}</label>
                      <input
                        type="text"
                        name="space_notes"
                        value={newSpace.space_notes}
                        onChange={handleInputChange}
                        className="form-control"
                      />
                    </div>
                    <div className="col-md-2">
                      <label className="form-label">&nbsp;</label>
                      <button type="submit" className="btn btn-success w-100">
                        {t("Add Space")}
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              <div className="card mt-4">
                <div className="card-header">
                  <h4>{t("Existing Spaces")}</h4>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-striped table-hover">
                      <thead className="table-dark">
                        <tr>
                          <th>{t("Name")}</th>
                          <th>{t("Status")}</th>
                          <th>{t("Notes")}</th>
                          <th>{t("Actions")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {spaces.map((space) => (
                          <tr key={space.space_id}>
                            <td>
                              {editSpace === space.space_id ? (
                                <input
                                  type="text"
                                  name="space_name"
                                  value={editValues.space_name}
                                  onChange={handleEditChange}
                                  className="form-control"
                                />
                              ) : (
                                <strong>{space.space_name}</strong>
                              )}
                            </td>
                            <td>
                              {editSpace === space.space_id ? (
                                <select
                                  name="space_status"
                                  value={editValues.space_status}
                                  onChange={handleEditChange}
                                  className="form-control"
                                >
                                  <option value="available">
                                    {t("Available")}
                                  </option>
                                  <option value="occupied">
                                    {t("Occupied")}
                                  </option>
                                </select>
                              ) : (
                                <span
                                  className={`badge ${
                                    space.space_status === "available"
                                      ? "bg-success"
                                      : "bg-danger"
                                  }`}
                                >
                                  {space.space_status}
                                </span>
                              )}
                            </td>
                            <td>
                              {editSpace === space.space_id ? (
                                <input
                                  type="text"
                                  name="space_notes"
                                  value={editValues.space_notes}
                                  onChange={handleEditChange}
                                  className="form-control"
                                />
                              ) : (
                                <span className="text-muted">
                                  {space.space_notes || "-"}
                                </span>
                              )}
                            </td>
                            <td>
                              {editSpace === space.space_id ? (
                                <div className="btn-group" role="group">
                                  <button
                                    className="btn btn-primary btn-sm"
                                    onClick={() => handleUpdate(space.space_id)}
                                  >
                                    {t("Save")}
                                  </button>
                                  <button
                                    className="btn btn-secondary btn-sm"
                                    onClick={() => setEditSpace(null)}
                                  >
                                    {t("Cancel")}
                                  </button>
                                </div>
                              ) : (
                                <div className="btn-group" role="group">
                                  <button
                                    className="btn btn-warning btn-sm"
                                    onClick={() => handleEditClick(space)}
                                  >
                                    {t("Edit")}
                                  </button>
                                  <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(space.space_id)}
                                  >
                                    {t("Delete")}
                                  </button>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceSpaces;
