import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { Table, Pagination, Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./EmployeesList.css";
import { useAuth } from "../../../../Context/AuthContext";
import { format } from "date-fns";
import employeeService from "../../../../services/employee.service";

const EmployeesList = () => {
  const { t } = useTranslation();
  const [employees, setEmployees] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  const [showActiveEmployees, setShowActiveEmployees] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const employeesPerPage = 10;
  const { employee } = useAuth();

  const getAllEmployees = async () => {
    try {
      const res = await employeeService.getAllEmployees(
        employee.employee_token
      );
      if (res.status === 200) {
        setEmployees(res.data.employees);
      } else {
        setApiError(true);
        if (res.status === 401) {
          setApiErrorMessage(t('Please login again'));
        } else if (res.status === 403) {
          setApiErrorMessage(t('You are not authorized to view this page'));
        } else {
          setApiErrorMessage(t('Please try again later'));
        }
      }
    } catch (err) {
      console.error(err);
      setApiError(true);
      setApiErrorMessage(t('An error occurred while fetching the employees'));
    }
  };

  useEffect(() => {
    getAllEmployees();
  }, [employee]);

  const handleDelete = async () => {
    try {
      const res = await employeeService.deleteEmployee(
        employee.employee_token,
        employeeToDelete.employee_id
      );
      if (res.message === "Employee successfully deleted!") {
        getAllEmployees();
        setShowDeleteModal(false);
      } else {
        setApiError(true);
        setApiErrorMessage(t('An error occurred while deleting the employee'));
      }
    } catch (err) {
      console.error(err);
      setApiError(true);
      setApiErrorMessage(t('An error occurred while deleting the employee'));
    }
  };

  const handleToggle = () => {
    setShowActiveEmployees(!showActiveEmployees);
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleShowDeleteModal = (employee) => {
    setEmployeeToDelete(employee);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setEmployeeToDelete(null);
    setShowDeleteModal(false);
  };

  const filteredEmployees = employees.filter((employee) => {
    const isActive = showActiveEmployees
      ? employee.active_employee
      : !employee.active_employee;
    const matchesSearch =
      `${employee.employee_first_name} ${employee.employee_last_name} ${employee.employee_email} ${employee.employee_phone}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    return isActive && matchesSearch;
  });

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {apiError ? (
        <section className="contact-section">
          <div className="auto-container">
            <div className="contact-title">
              <h2>{apiErrorMessage}</h2>
            </div>
          </div>
        </section>
      ) : (
        <section className="contact-section">
          <div className="containerr">
            <div className="row">
              <div className="col-12">
                <div className="contact-title">
                  <h2>{t('Employees')}</h2>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <button onClick={handleToggle} className="btn btn-danger">
                    {showActiveEmployees ? t('Show Inactive') : t('Show Active')}
                  </button>
                  <input
                    type="search"
                    className="form-control w-50 w-md-25"
                    placeholder={t('Search')}
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </div>
                <div className="table-responsive">
                  <Table
                  responsive
                  striped
                  bordered
                  hover
                  className="modern-table border"
                >
                  <thead>
                    <tr>
                      <th>{t('Active')}</th>
                      <th>{t('First Name')}</th>
                      <th>{t('Last Name')}</th>
                      <th>{t('Email')}</th>
                      <th>{t('Phone')}</th>
                      <th>{t('Added Date')}</th>
                      <th>{t('Role')}</th>
                      <th>{t('Edit/Delete/View')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentEmployees.map((employee) => (
                      <tr key={employee.employee_id}>
                        <td
                          className={`border ${
                            employee.active_employee
                              ? "text-success"
                              : "text-danger"
                          }`}
                        >
                          <h6 className="py-0 my-0 mx-3 font-weight-bold">
                            {employee.active_employee ? t('Yes') : t('No')}
                          </h6>
                        </td>
                        <td>{employee.employee_first_name}</td>
                        <td>{employee.employee_last_name}</td>
                        <td>{employee.employee_email}</td>
                        <td>{employee.employee_phone}</td>
                        <td>
                          {format(
                            new Date(employee.added_date),
                            "MM-dd-yyyy | HH:mm"
                          )}
                        </td>
                        <td>{employee.company_role_name}</td>
                        <td>
                          <div className="action-icons">
                            <Link
                              to={`/admin/employee/edit/${employee.employee_id}`}
                              state={{ employee }}
                            >
                              <i className="fas fa-edit" title={t('Edit')}></i>
                            </Link>
                            <Link
                              to={`/admin/employee-profile/${employee.employee_id}`}
                              state={{ employee }}
                            >
                              <i className="fas fa-eye" title={t('View')}></i>
                            </Link>
                            <Link
                              onClick={() => handleShowDeleteModal(employee)}
                            >
                              <i
                                className="fas fa-trash"
                                title={t('Delete')}
                              ></i>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                </div>
                <div className="d-flex justify-content-center">
                  <Pagination>
                    <Pagination.First
                      onClick={() => paginate(1)}
                      disabled={currentPage === 1}
                    />
                    <Pagination.Prev
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                    />
                    {Array.from(
                      { length: Math.ceil(filteredEmployees.length / employeesPerPage) },
                      (_, i) => i + 1
                    ).map((number) => (
                      <Pagination.Item
                        key={number}
                        active={number === currentPage}
                        onClick={() => paginate(number)}
                      >
                        {number}
                      </Pagination.Item>
                    ))}
                    <Pagination.Next
                      onClick={() => paginate(currentPage + 1)}
                      disabled={
                        currentPage ===
                        Math.ceil(filteredEmployees.length / employeesPerPage)
                      }
                    />
                    <Pagination.Last
                      onClick={() =>
                        paginate(Math.ceil(filteredEmployees.length / employeesPerPage))
                      }
                      disabled={
                        currentPage ===
                        Math.ceil(filteredEmployees.length / employeesPerPage)
                      }
                    />
                  </Pagination>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>{t('Confirm Delete')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {t('Are you sure you want to delete')} {employeeToDelete?.employee_first_name} {employeeToDelete?.employee_last_name}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            {t('Cancel')}
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            {t('Delete')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EmployeesList;
