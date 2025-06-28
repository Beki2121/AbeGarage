import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import loginService from "../../../services/login.service";
import { useAuth } from "../../../Context/AuthContext";
import FormInput from "../../../components/common/FormInput";
import SubmitButton from "../../../components/common/SubmitButton";
import ValidationError from "../../../components/common/ValidationError";
import {
  validateEmail,
  validatePassword,
} from "../../../components/common/validation";

function LoginForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [employee_email, setEmail] = useState("");
  const [employee_password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [serverError, setServerError] = useState("");

  const { isAdmin, employee } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form
    let valid = true;
    const emailErr = validateEmail(employee_email);
    setEmailError(emailErr);
    if (emailErr) valid = false;

    const passwordErr = validatePassword(employee_password);
    setPasswordError(passwordErr);
    if (passwordErr) valid = false;

    if (!valid) return;

    // Handle form submission
    const formData = {
      employee_email,
      employee_password,
    };

    try {
      const response = await loginService.logIn(formData);
      console.log(response);

      // Axios response has data property directly
      const responseData = response.data;
      console.log(responseData);

      if (responseData.status === "success") {
        // Save the user in the local storage
        if (responseData.data.employee_token) {
          localStorage.setItem("employee", JSON.stringify(responseData.data));
        }

        console.log(location);
        if (location.pathname === "/login") {
          isAdmin
            ? window.location.replace("/admin")
            : window.location.replace("/");
        } else {
          window.location.reload();
        }
      } else {
        // Show an error message
        setServerError(responseData.message);
        console.log(responseData);
      }
    } catch (err) {
      console.log(err);
      setServerError(
        t('An error has occurred. Please try again later.') + err.message
      );
    }
  };

  return (
    <section className="contact-section">
      <div className="auto-container">
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <img src="/eurodiesel-logo.png" alt="EURODIESEL PARMA S.p.A." style={{ height: 70 }} />
        </div>
        <div className="contact-title">
          <h2 style={{ color: '#1a237e' }}>{t('Login to your account')}</h2>
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
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder={t('Email')}
                      error={emailError}
                    />
                    <FormInput
                      type="password"
                      name="employee_password"
                      value={employee_password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder={t('Password')}
                      error={passwordError}
                    />
                    <div className="form-group col-md-12">
                      <SubmitButton>{t('Login')}</SubmitButton>
                    </div>
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

export default LoginForm;
