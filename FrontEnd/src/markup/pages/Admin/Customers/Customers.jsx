import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import AdminMenu from "../../../components/Admin/AdminMenu/AdminMenu";
import CustomerList from "../../../components/Admin/CustomerList/CustomerList";

function Customers() {
  const { t } = useTranslation();
  return (
    <div>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side px-5">
            <CustomerList />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Customers;
