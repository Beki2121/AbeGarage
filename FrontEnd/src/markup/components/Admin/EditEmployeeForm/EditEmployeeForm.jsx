import React, { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../../../Context/AuthContext";
import employeeService from "../../../../services/employee.service";
import FormInput from "../../../../components/common/FormInput";
import SubmitButton from "../../../../components/common/SubmitButton";
import ValidationError from "../../../../components/common/ValidationError";
import {
  validateEmail,
  validatePassword,
  validateRequired,
} from "../../../../components/common/validation";

function EditEmployeeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { employee } = useAuth();
  const token = employee?.employee_token;

  const [employee_email, setEmail] = useState("");
  const [employee_first_name, setFirstName] = useState("");
  const [employee_last_name, setLastName] = useState("");
  const [employee_phone, setPhoneNumber] = useState("");
  const [employee_password, setPassword] = useState("");
  const [company_role_id, setCompany_role_id] = useState("");
  const [active_employee, setActive_employee] = useState("");
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [serverSuccess, setServerSuccess] = useState("");

  // Validation states
  const [emailError, setEmailError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const data = await employeeService.getEmployeeById(id, token);
        setEmail(data.employee_email);
        setFirstName(data.employee_first_name);
        setLastName(data.employee_last_name);
        setPhoneNumber(data.employee_phone);
        setCompany_role_id(data.company_role_id);
        setActive_employee(data.active_employee);
      } catch (error) {
        console.error("Error fetching employee:", error);
        setServerError("Failed to fetch employee data");
      }
    };

    if (id && token) {
      fetchEmployee();
    }
  }, [id, token]);

  const validateForm = () => {
    let valid = true;
    const emailErr = validateEmail(employee_email);
    setEmailError(emailErr);
    if (emailErr) valid = false;

    const firstNameErr = validateRequired(employee_first_name, "First name");
    setFirstNameError(firstNameErr);
    if (firstNameErr) valid = false;

    // Only validate password if it's being changed
    if (employee_password) {
      const passwordErr = validatePassword(employee_password);
      setPasswordError(passwordErr);
      if (passwordErr) valid = false;
    }

    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = {
      employee_email,
      employee_first_name,
      employee_last_name,
      employee_phone,
      company_role_id,
      active_employee,
    };

    // Only include password if it's being changed
    if (employee_password) {
      formData.employee_password = employee_password;
    }

    setLoading(true);
    try {
      const data = await employeeService.updateEmployee(id, formData, token);
      setServerError("");
      setServerSuccess("Employee updated successfully!");
      setTimeout(() => {
        navigate("/admin/employees");
      }, 2000);
    } catch (error) {
      const resMessage =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      setServerError(resMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>Edit Employee</h2>
        </div>
        <div className="row clearfix">
          <div className="form-column col-lg-7">
            <div className="inner-column">
              <div className="contact-form">
                <form onSubmit={handleSubmit}>
                  <div className="row clearfix">
                    <ValidationError error={serverError} />
                    <FormInput
                      type="email"
                      name="employee_email"
                      value={employee_email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Employee email"
                      error={emailError}
                    />
                    <FormInput
                      type="text"
                      name="employee_first_name"
                      value={employee_first_name}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Employee first name"
                      error={firstNameError}
                    />
                    <FormInput
                      type="text"
                      name="employee_last_name"
                      value={employee_last_name}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Employee last name"
                    />
                    <FormInput
                      type="text"
                      name="employee_phone"
                      value={employee_phone}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="Employee phone"
                    />
                    <div className="form-group col-md-12">
                      <select
                        name="employee_role"
                        value={company_role_id}
                        onChange={(e) => setCompany_role_id(e.target.value)}
                        className="custom-select-box"
                      >
                        <option value="1">Employee</option>
                        <option value="2">Manager</option>
                        <option value="3">Admin</option>
                      </select>
                    </div>
                    <FormInput
                      type="password"
                      name="employee_password"
                      value={employee_password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="New password (leave blank to keep current)"
                      error={passwordError}
                    />
                    <div className="form-group col-md-12">
                      <select
                        name="active_employee"
                        value={active_employee}
                        onChange={(e) => setActive_employee(e.target.value)}
                        className="custom-select-box"
                      >
                        <option value="1">Active</option>
                        <option value="0">Inactive</option>
                      </select>
                    </div>
                    <div className="form-group col-md-12">
                      <SubmitButton loading={loading}>
                        Update Employee
                      </SubmitButton>
                    </div>
                    {serverSuccess && (
                      <div className="success-message" role="alert">
                        {serverSuccess}
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EditEmployeeForm;
