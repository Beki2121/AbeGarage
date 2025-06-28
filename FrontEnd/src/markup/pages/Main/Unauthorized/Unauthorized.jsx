import React from "react";
import { Link } from "react-router-dom";
import "./Unauthorized.css";
import AdminMenu from "../../../components/Admin/AdminMenu/AdminMenu";
import UnauthorizedContent from "./UnauthorizedContent";

function Unauthorized() {
  return (
    <div className="container-fluid admin-pages">
      <div className="row">
        <div className="col-md-3 admin-left-side">
          <AdminMenu />
        </div>
        <div className="col-md-9 admin-right-side">
          <UnauthorizedContent />
        </div>
      </div>
    </div>


  );
}

export default Unauthorized;
