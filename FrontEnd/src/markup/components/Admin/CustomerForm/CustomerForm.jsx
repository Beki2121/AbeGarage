import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import customerService from "../../../../services/customer.service";
import { useAuth } from "../../../../Context/AuthContext";
import FormInput from "../../../../components/common/FormInput";
import SubmitButton from "../../../../components/common/SubmitButton";
import ValidationError from "../../../../components/common/ValidationError";
import {
  validateEmail,
  validateRequired,
} from "../../../../components/common/validation";
import { BeatLoader } from "react-spinners";

function AddCustomerForm() {
  const { employee } = useAuth();
  const token = employee?.employee_token;
  const [customer_email, setCustomerEmail] = useState("");
  const [customer_first_name, setCustomerFirstName] = useState("");
  const [customer_last_name, setCustomerLastName] = useState("");
  const [customer_phone_number, setCustomerPhoneNumber] = useState("");
  const [spin, setSpinner] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [serverError, setServerError] = useState("");
  const [serverMsg, setServerMsg] = useState("");
  const navigate = useNavigate();

  const handleAddCustomer = async (e) => {
    e.preventDefault();

    const customerdata = {
      customer_email,
      customer_first_name,
      customer_last_name,
      customer_phone_number,
      active_customer_status: 1,
    };
    setSpinner(true);

    // Validate form
    let valid = true;
    const emailErr = validateEmail(customer_email);
    setEmailError(emailErr);
    if (emailErr) valid = false;

    const firstNameErr = validateRequired(customer_first_name, "First name");
    setFirstNameError(firstNameErr);
    if (firstNameErr) valid = false;

    const phoneErr = validateRequired(customer_phone_number, "Phone number");
    setPhoneError(phoneErr);
    if (phoneErr) valid = false;

    if (!valid) {
      setSpinner(false);
      return;
    }

    try {
      const response = await customerService.createCustomer(customerdata, token);
      
      // Check if the request was successful (status 200-299)
      if (response.status >= 200 && response.status < 300) {
        setServerMsg("Customer added successfully! Redirecting to customers list...");
        setTimeout(() => {
          navigate("/admin/customers");
          setSpinner(false);
        }, 2000);
      } else {
        setServerError("Failed to add the customer!");
        setSpinner(false);
      }
    } catch (error) {
      console.log(error.response?.data?.msg);
      setServerError(error?.response?.data?.msg || "Failed to add customer");
      setSpinner(false);
    }
  };

  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>Add a new Customer</h2>
        </div>
        <div className="row clearfix">
          <div className="form-column col-lg-7">
            <div className="inner-column">
              <div className="contact-form">
                {serverMsg && (
                  <div
                    className="validation-error"
                    style={{
                      color: "green",
                      fontSize: "100%",
                      fontWeight: "600",
                      padding: "25px",
                    }}
                    role="alert"
                  >
                    {serverMsg}
                  </div>
                )}
                <form onSubmit={handleAddCustomer}>
                  <div className="row clearfix">
                    <ValidationError error={serverError} />
                    <FormInput
                      type="email"
                      name="Customer_email"
                      value={customer_email}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="Customer email"
                      error={emailError}
                    />
                    <FormInput
                      type="text"
                      name="Customer_first_name"
                      value={customer_first_name}
                      onChange={(e) => setCustomerFirstName(e.target.value)}
                      placeholder="Customer first name"
                      error={firstNameError}
                    />
                    <FormInput
                      type="text"
                      name="Customer_last_name"
                      value={customer_last_name}
                      onChange={(e) => setCustomerLastName(e.target.value)}
                      placeholder="Customer last name"
                    />
                    <FormInput
                      type="text"
                      name="Customer_phone"
                      value={customer_phone_number}
                      onChange={(e) => setCustomerPhoneNumber(e.target.value)}
                      placeholder="Customer phone (555-555-5555)"
                      error={phoneError}
                    />
                    <div className="form-group col-md-12">
                      <SubmitButton loading={spin}>
                        {spin ? (
                          <BeatLoader color="white" size={8} />
                        ) : (
                          "ADD CUSTOMER"
                        )}
                      </SubmitButton>
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

export default AddCustomerForm;
