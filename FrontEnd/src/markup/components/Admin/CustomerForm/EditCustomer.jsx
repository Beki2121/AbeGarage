import React, { useState, useEffect } from "react";
import { BeatLoader } from "react-spinners";
import { useParams, useNavigate} from "react-router-dom";
import customerService from "../../../../services/customer.service";
import { useAuth } from "../../../../Context/AuthContext";
import classes from "./edit.module.css";

const EditCustomer = () => {
  const navigate = useNavigate();
  const { customerId } = useParams();
  const [customer_first_name, setFirstName] = useState("");
  const [customer_last_name, setLastName] = useState("");
  const [customer_phone_number, setPhoneNumber] = useState("");
  const [customer_email, setEmail] = useState("");
  const [active_customer_status, setActiveCustomerStatus] = useState(false);
  const [serverMsg, setServerMsg] = useState("");
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState("");

  // Spinner handler state
  const [spin, setSpinner] = useState(false);

  // Create a variable to hold the user's token
  const { employee } = useAuth();
  // console.log(employee)
   const loggedInEmployeeToken = employee?.employee_token;

  // Value trackers
  const firstNameTracker = (e) => setFirstName(e.target.value);
  const lastNameTracker = (e) => setLastName(e.target.value);
  const phoneNumberTracker = (e) => setPhoneNumber(e.target.value);
  const emailTracker = (e) => setEmail(e.target.value);
  const activeCustomerStatusTracker = (e) =>setActiveCustomerStatus(e.target.checked);


  //* fetch the customer data
  const fetchData = async () => {
    try {
      const data = await customerService.singleCustomer(
        customerId,
        loggedInEmployeeToken
      );
       
        setFirstName(data.customer.customer_first_name);
        setLastName(data.customer.customer_last_name);
        setPhoneNumber(data.customer.customer_phone_number);
        setEmail(data.customer.customer_email);
        // checkboxDOM.current.checked = customerData.active_customer_status;
        setActiveCustomerStatus(data.customer.active_customer_status);
     
    } catch (error) {
          if (data.status !== 200) {
            setApiError(true);
            if (data.status === 403) {
              setApiErrorMessage("Please login again");
            } else if (data.status === 401) {
              setApiErrorMessage("You are not authorized to view this page");
            } else {
              setApiErrorMessage("Please try again later");
            }
          }
          setApiErrorMessage("An error occurred while fetching data.");
    }
  };

  // Fetch customer data using useEffect
  useEffect(() => {
      fetchData();
  }, [employee]);

  // console.log(customer_first_name, customer_last_name,customer_email)
  // console.log(active_customer_status)

  async function handleSubmit(e) {

    e.preventDefault();
    const formData = {
      customer_id: customerId,customer_first_name,customer_last_name,customer_phone_number,customer_email,
      active_customer_status: active_customer_status ? 1 : 0, // 1 for true, 0 for false
    };

    try {
      setSpinner(true);
      const data = await customerService.updateCustomer(
        formData,
        loggedInEmployeeToken
      );

      if (data.status === 200) {
        setServerMsg("Redirecting To Customers page...");
        setTimeout(() => {
          setSpinner(false);
          setServerMsg("");
          navigate("/admin/customers");
        }, 500);
      }
    } catch (error) {
      setServerMsg("Failed to update customer. Please try again.");
      setSpinner(false);
    }
  }

  return (
    <>
      <section className={`${classes.contactSection} contact-section`}>
        <div className="auto-container">
          <div className={`${classes.contactTitle} contact-title`}>
            <h2>Edit: {customer_email || ""}</h2>
          </div>
          <div className="row clearfix">
            <div className="form-column col-lg-7">
              <div className="inner-column">
                <div className={classes.contactForm}>
                  <form onSubmit={handleSubmit}>
                    <div className="row clearfix">
                      <div className={`${classes.formGroup} col-md-12`}>
                        <input
                          type="text"
                          name="customer_first_name"
                          placeholder="Customer first name"
                          value={customer_first_name}
                          onChange={firstNameTracker}
                          className={classes.formInput}
                          required
                        />
                      </div>
                      <div className={`${classes.formGroup} col-md-12`}>
                        <input
                          type="text"
                          name="customer_last_name"
                          placeholder="Customer last name"
                          required
                          value={customer_last_name}
                          onChange={lastNameTracker}
                          className={classes.formInput}
                        />
                      </div>
                      <div className={`${classes.formGroup} col-md-12`}>
                        <input
                          type="text"
                          name="customer_phone"
                          placeholder="Customer phone (555-555-5555)"
                          required
                          value={customer_phone_number}
                          onChange={phoneNumberTracker}
                          className={classes.formInput}
                        />
                      </div>
                      <div className={`${classes.formGroup} col-md-12`}>
                        <input
                          type="email"
                          name="customer_email"
                          placeholder="Customer email"
                          required
                          value={customer_email}
                          onChange={emailTracker}
                          className={classes.formInput}
                        />
                      </div>
                      <div
                        className={`${classes.formGroup} col-md-12 form-contro`}
                      >
                        <label
                          className={classes.formCheckboxLabel}
                          htmlFor="completed"
                        >
                          Active Customer
                        </label>
                        <input
                          value={active_customer_status}
                          onChange={activeCustomerStatusTracker}
                       
                          type="checkbox"
                          name="completed"
                          className={classes.formCheckbox}
                        />
                      </div>
                      <div className={`${classes.formGroup} col-md-12`}>
                        <button
                          className={classes.themeBtn}
                          type="submit"
                          data-loading-text="Please wait..."
                        >
                          <span>
                            {spin ? (
                              <BeatLoader color="white" size={8} />
                            ) : (
                              "Update Customer"
                            )}
                          </span>
                        </button>
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
                      </div>
                    </div>
                  </form>
                  {apiError && (
                    <div className="validation-error" role="alert">
                      {apiErrorMessage}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EditCustomer;
