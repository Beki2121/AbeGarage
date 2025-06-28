import React from "react";
import { Link } from "react-router-dom";
import "./Unauthorized.css";
import AdminMenu from "../../../components/Admin/AdminMenu/AdminMenu";

function UnauthorizedContent() {
  return (
    <section className="unauthorized-section">
      <div className="auto-container">
        <div className="content">
          <h1>403</h1>
          <h2>Unauthorized Access</h2>
          <div className="text">
            Sorry, you don't have the authorization to access this page.
          </div>
          <Link className="theme-btn btn-style-one" to="/">
            Go to home page
          </Link>
        </div>
      </div>
    </section>
  );
}

export default UnauthorizedContent;
