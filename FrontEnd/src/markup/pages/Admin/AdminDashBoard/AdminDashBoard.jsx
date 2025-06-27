import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import AdminMenu from "../../../components/Admin/AdminMenu/AdminMenu";
import { Link } from "react-router-dom";
import spaceService from '../../../../services/space.service';
import { useAuth } from '../../../../Context/AuthContext';
import "./dashBoard.css"

const AdminDashBoard = () => {
  const { t } = useTranslation();
  const { employee } = useAuth();
  const token = employee?.employee_token;
  const [spaces, setSpaces] = useState([]);
  const [newSpace, setNewSpace] = useState({ space_name: '', space_status: 'available', space_notes: '' });
  const [editSpace, setEditSpace] = useState(null);
  const [editValues, setEditValues] = useState({ space_name: '', space_status: 'available', space_notes: '' });
  const [notification, setNotification] = useState({ message: '', type: '' });

  useEffect(() => {
    fetchSpaces();
  }, [token]);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: '', type: '' }), 4000);
  };

  const fetchSpaces = async () => {
    if (!token) return;
    try {
      const data = await spaceService.getAllSpaces(token);
      setSpaces(data);
    } catch (error) {
      showNotification(t('Failed to fetch spaces'), 'danger');
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
      setNewSpace({ space_name: '', space_status: 'available', space_notes: '' });
      fetchSpaces();
      showNotification(t('Space created successfully!'), 'success');
    } catch (error) {
      showNotification(t('Failed to create space'), 'danger');
    }
  };

  const handleEditClick = (space) => {
    setEditSpace(space.space_id);
    setEditValues({
      space_name: space.space_name,
      space_status: space.space_status,
      space_notes: space.space_notes || ''
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
      showNotification(t('Space updated successfully!'), 'success');
    } catch (error) {
      showNotification(t('Failed to update space'), 'danger');
    }
  };

  const handleDelete = async (space_id) => {
    if (!window.confirm(t('Are you sure you want to delete this space?'))) return;
    try {
      await spaceService.deleteSpace(space_id, token);
      fetchSpaces();
      showNotification(t('Space deleted successfully!'), 'success');
    } catch (error) {
      showNotification(t('Failed to delete space'), 'danger');
    }
  };

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
              <h2>{t('Admin Dashboard')}</h2>
              <div className="text">
              {t('dashboard_intro')}
              </div>
            </div>

          
            <div className="row">
              {/* ALL ORDERS */}
              <div className="col-lg-4 service-block-one">
                <div className="inner-box hvr-float-shadow">
                  <h5>{t('OPEN FOR ALL')}</h5>
                  <h2>{t('All Orders')}</h2>
                  <Link to="/admin/orders" className="read-more">
                    {t('LIST OF ORDERS +')}
                  </Link>
                  <div className="icon">
                    <span className="flaticon-power"></span>
                  </div>
                </div>
              </div>
              {/* New orders */}
              <div className="col-lg-4 service-block-one">
                <div className="inner-box hvr-float-shadow">
                  <h5>{t('OPEN FOR LEADS')}</h5>
                  <h2>{t('New Orders')}</h2>
                  <Link to="/admin/create-order" className="read-more">
                    {t('ADD ORDER +')}
                  </Link>
                  <div className="icon">
                    <span className="flaticon-power"></span>
                  </div>
                  
                </div>
              </div>
              {/* Employees */}
              <div className="col-lg-4 service-block-one">
                <div className="inner-box hvr-float-shadow">
                  <h5>{t('OPEN FOR ADMINS')}</h5>
                  <h2>{t('Employees')}</h2>
                  <Link to="/admin/employees" className="read-more">
                    {t('LIST OF EMPLOYEES +')}
                  </Link>
                  <div className="icon">
                    <span className="flaticon-gearbox"></span>
                  </div>
                  
                </div>
              </div>
              {/* Add employee */}
              <div className="col-lg-4 service-block-one">
                <div className="inner-box hvr-float-shadow">
                  <h5>{t('OPEN FOR ADMINS')}</h5>
                  <h2>{t('Add Employee')}</h2>
                  <Link to="/admin/add-employee" className="read-more">
                    {t('read more +')}
                  </Link>
                  <div className="icon">
                    <span className="flaticon-brake-disc"></span>
                  </div>
                  
                </div>
              </div>
              {/* Engine service  and repair */}
              <div className="col-lg-4 service-block-one">
                <div className="inner-box hvr-float-shadow">
                  <h5>{t('SERVICE AND REPAIRS')}</h5>
                  <h2>{t('Engine Service & Repair')}</h2>
                  <Link to="/admin/services" className="read-more">
                    {t('read more +')}
                  </Link>
                  <div className="icon">
                    <span className="flaticon-car-engine"></span>
                  </div>
                  
                </div>
              </div>
              {/* Tyre & wheels */}
              <div className="col-lg-4 service-block-one">
                <div className="inner-box hvr-float-shadow">
                  <h5>{t('SERVICE AND REPAIRS')}</h5>
                  <h2>{t('Tyre & Wheels')}</h2>
                  <Link to="/admin/services" className="read-more">
                    {t('read more +')}
                  </Link>
                  <div className="icon">
                    <span className="flaticon-tire"></span>
                  </div>
                  
                </div>
              </div>
              {/* Denting & painting */}
              <div className="col-lg-4 service-block-one">
                <div className="inner-box hvr-float-shadow">
                  <h5>{t('SERVICE AND REPAIRS')}</h5>
                  <h2>{t('Denting & Painting')}</h2>
                  <Link to="/admin/services" className="read-more">
                    {t('read more +')}
                  </Link>
                  <div className="icon">
                    <span className="flaticon-spray-gun"></span>
                  </div>
                  
                </div>
              </div>
              {/* Engine service  and repair */}
              <div className="col-lg-4 service-block-one">
                <div className="inner-box hvr-float-shadow">
                  <h5>{t('SERVICE AND REPAIRS')}</h5>
                  <h2>{t('Air Conditioning')}</h2>
                  <Link to="/admin/services" className="read-more">
                    {t('read more +')}
                  </Link>
                  <div className="icon">
                    <span className="flaticon-car-engine"></span>
                  </div>
                </div>
              </div>
               {/* Tyre & wheels */}
              <div className="col-lg-4 service-block-one">
                <div className="inner-box hvr-float-shadow">
                  <h5>{t('SERVICE AND REPAIRS')}</h5>
                  <h2>{t('Brake Check')}</h2>
                  <Link to="/admin/services" className="read-more">
                    {t('read more +')}
                  </Link>
                  <div className="icon">
                    <span className="flaticon-tire"></span>
                  </div>
                </div>
              </div>
              {/* Work Hours Report */}
              <div className="col-lg-4 service-block-one">
                <div className="inner-box hvr-float-shadow">
                  <h5>{t('REPORTS')}</h5>
                  <h2>{t('Work Hours Report')}</h2>
                  <Link to="/admin/work-hours-report" className="read-more">
                    {t('VIEW REPORT +')}
                  </Link>
                  <div className="icon">
                    <span className="flaticon-clipboard"></span>
                  </div>
                </div>
              </div>
              {/* Individual Employee Work Hours Report */}
              <div className="col-lg-4 service-block-one">
                <div className="inner-box hvr-float-shadow">
                  <h5>{t('REPORTS')}</h5>
                  <h2>{t('Individual Employee Work Hours')}</h2>
                  <Link to="/admin/employee-work-hours-report" className="read-more">
                    {t('VIEW INDIVIDUAL REPORT +')}
                  </Link>
                  <div className="icon">
                    <span className="flaticon-user"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    <div className="container mt-5">
      {notification.message && (
        <div className={`alert alert-${notification.type} alert-dismissible fade show`} role="alert">
          {notification.message}
          <button type="button" className="btn-close" aria-label="Close" onClick={() => setNotification({ message: '', type: '' })}></button>
        </div>
      )}
      <h3>{t('Maintenance Spaces')}</h3>
      <form className="mb-3 d-flex align-items-end" onSubmit={handleCreate}>
        <div className="me-2">
          <label>{t('Space Name')}</label>
          <input type="text" name="space_name" value={newSpace.space_name} onChange={handleInputChange} className="form-control" required />
        </div>
        <div className="me-2">
          <label>{t('Status')}</label>
          <select name="space_status" value={newSpace.space_status} onChange={handleInputChange} className="form-control">
            <option value="available">{t('Available')}</option>
            <option value="occupied">{t('Occupied')}</option>
          </select>
        </div>
        <div className="me-2">
          <label>{t('Notes')}</label>
          <input type="text" name="space_notes" value={newSpace.space_notes} onChange={handleInputChange} className="form-control" />
        </div>
        <button type="submit" className="btn btn-success">{t('Add Space')}</button>
      </form>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>{t('Name')}</th>
            <th>{t('Status')}</th>
            <th>{t('Notes')}</th>
            <th>{t('Actions')}</th>
          </tr>
        </thead>
        <tbody>
          {spaces.map(space => (
            <tr key={space.space_id}>
              <td>
                {editSpace === space.space_id ? (
                  <input type="text" name="space_name" value={editValues.space_name} onChange={handleEditChange} className="form-control" />
                ) : (
                  space.space_name
                )}
              </td>
              <td>
                {editSpace === space.space_id ? (
                  <select name="space_status" value={editValues.space_status} onChange={handleEditChange} className="form-control">
                    <option value="available">{t('Available')}</option>
                    <option value="occupied">{t('Occupied')}</option>
                  </select>
                ) : (
                  <span className={`badge ${space.space_status === 'available' ? 'bg-success' : 'bg-danger'}`}>{space.space_status}</span>
                )}
              </td>
              <td>
                {editSpace === space.space_id ? (
                  <input type="text" name="space_notes" value={editValues.space_notes} onChange={handleEditChange} className="form-control" />
                ) : (
                  space.space_notes
                )}
              </td>
              <td>
                {editSpace === space.space_id ? (
                  <>
                    <button className="btn btn-primary btn-sm me-2" onClick={() => handleUpdate(space.space_id)}>{t('Save')}</button>
                    <button className="btn btn-secondary btn-sm" onClick={() => setEditSpace(null)}>{t('Cancel')}</button>
                  </>
                ) : (
                  <>
                    <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditClick(space)}>{t('Edit')}</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(space.space_id)}>{t('Delete')}</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  )
}

export default AdminDashBoard