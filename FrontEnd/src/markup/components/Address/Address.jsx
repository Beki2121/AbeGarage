import React from "react";
import "./Address.css"
import ContactForm from '../Email/ContactForm'


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
            Visit us at our convenient location listed below for all your automotive needs.
            </div>
            <ul>
              <li>
                <div className="d-flex">
                    <div>
                <i className="flaticon-pin"></i>
                </div>
                <div>
                <h5>Address:</h5> 123 Main St, Evangadi City, MD 20601
                </div>
                </div>
              </li>

              <li>
                <div className="d-flex">
                  <div>
                    <i className="flaticon-email"></i>
                  </div>
                  <div>
                  <h5>email:</h5> contact@abegarage.com
                  </div>
                </div>
              </li>
              <li>
                <div className="d-flex">
                    <div>
                <i className="flaticon-phone"></i>
                </div>
                <div>
                <h5>phone:</h5> 1800 456 7890 / 1254 897 3654
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
