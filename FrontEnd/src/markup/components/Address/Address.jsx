import React from "react";
import "./Address.css";
import ContactForm from "../Email/ContactForm";

function Address() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6">
          <ContactForm />
        </div>

        <div className="info-column col-lg-6">
          <div className="inner-column">
            <h4>Our Address</h4>
            <div className="text">
              Visit us at our convenient location listed below for all your
              automotive needs.
            </div>
            <ul>
              <li>
                <div className="d-flex">
                  <div>
                    <i className="flaticon-pin"></i>
                  </div>
                  <div>
                    <h5>Address:</h5>{" "}
                    <b>
                      Via Paradigna, 133
                      <br />
                      43122 Parma
                    </b>
                  </div>
                </div>
              </li>

              <li>
                <div className="d-flex">
                  <div>
                    <i className="flaticon-email"></i>
                  </div>
                  <div>
                    <h5>Email us :</h5> <b>info@eurodieselparma.com</b>
                  </div>
                </div>
              </li>
              <li>
                <div className="d-flex">
                  <div>
                    <i className="flaticon-phone"></i>
                  </div>
                  <div>
                    <h5>Call us on :</h5>{" "}
                    <b>
                      <a href="tel:+390461996222">+39 0461 996222</a>
                    </b>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Address;
