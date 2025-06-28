import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import employeeService from "../../../../services/employee.service";
import { useAuth } from "../../../../Context/AuthContext";
import FormInput from "../../../../components/common/FormInput";
import SubmitButton from "../../../../components/common/SubmitButton";
import ValidationError from "../../../../components/common/ValidationError";
import {
  validateEmail,
  validatePassword,
  validateRequired,
} from "../../../../components/common/validation";

function AddEmployeeForm() {
  const { employee: loggedInEmployee } = useAuth();
  const loggedInEmployeeToken = loggedInEmployee?.employee_token;
  const navigate = useNavigate();

  const [employee_email, setEmail] = useState("");
  const [employee_first_name, setFirstName] = useState("");
  const [employee_last_name, setLastName] = useState("");
  const [employee_phone, setPhoneNumber] = useState("");
  const [employee_password, setPassword] = useState("");
  const [company_role_id, setCompany_role_id] = useState("1");
  const [active_employee] = useState(1);
  const [serverError, setServerError] = useState("");
  const [serverSuccess, setServerSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Validation states
  const [emailError, setEmailError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateForm = () => {
    let valid = true;
    const emailErr = validateEmail(employee_email);
    setEmailError(emailErr);
    if (emailErr) valid = false;

    const firstNameErr = validateRequired(employee_first_name, "First name");
    setFirstNameError(firstNameErr);
    if (firstNameErr) valid = false;

    const passwordErr = validatePassword(employee_password);
    setPasswordError(passwordErr);
    if (passwordErr) valid = false;

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
      employee_password,
      active_employee,
      company_role_id,
    };

    setLoading(true);
    try {
      const response = await employeeService.createEmployee(
        formData,
        loggedInEmployeeToken
      );

      // Check if the request was successful (status 200-299)
      if (response.status >= 200 && response.status < 300) {
        setServerError("");
        setServerSuccess("Employee added successfully! Redirecting to employees list...");
        setTimeout(() => {
          navigate("/admin/employees");
        }, 2000);
      } else {
        setServerError("Failed to add the employee!");
      }
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
          <h2>Add a new employee</h2>
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
                      placeholder="Employee phone (555-555-5555)"
                    />
                    <div className="form-group col-md-12">
                      <select
                        name="employee_role"
                        value={company_role_id}
                        onChange={(event) =>
                          setCompany_role_id(event.target.value)
                        }
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
                      placeholder="Employee password"
                      error={passwordError}
                    />
                    <div className="form-group col-md-12">
                      <SubmitButton loading={loading}>
                        Add employee
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

export default AddEmployeeForm;
