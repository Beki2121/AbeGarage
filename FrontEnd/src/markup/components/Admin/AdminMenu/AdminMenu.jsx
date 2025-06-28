import React from "react";
import { Link } from "react-router-dom";
import {
  Dashboard as DashboardIcon,
  ListAlt as OrdersIcon,
  AddBox as NewOrderIcon,
  PersonAdd as AddEmployeeIcon,
  Group as EmployeesIcon,
  PersonAddAlt as AddCustomerIcon,
  People as CustomersIcon,
  Build as ServicesIcon,
  Campaign as CampaignIcon,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../../Context/AuthContext";

const AdminMenu = () => {
  const { t } = useTranslation();
  const { employee } = useAuth();
  const role = employee?.employee_role;
  // role: 1 = employee, 2 = manager, 3 = admin
  const sidebarTitle = role === 1 ? t("Employee Menu") : t("Admin Menu");
  return (
    <div>
      <div className="admin-menu">
        <h2>{sidebarTitle}</h2>
      </div>
      <div className="list-group">
        <Link to="/admin/orders" className="list-group-item py-3">
          <OrdersIcon style={{ marginRight: 12, verticalAlign: "middle" }} />{" "}
          {t("Orders")}
        </Link>
        <Link to="/admin/employees" className="list-group-item py-3">
          <EmployeesIcon style={{ marginRight: 12, verticalAlign: "middle" }} />{" "}
          {t("Employees")}
        </Link>
        <Link to="/admin/services" className="list-group-item py-3">
          <ServicesIcon style={{ marginRight: 12, verticalAlign: "middle" }} />{" "}
          {t("Services")}
        </Link>
        {/* Only show the following for managers and admins */}
        {(role === 2 || role === 3) && (
          <>
            <Link to="/admin" className="list-group-item py-3">
              <DashboardIcon
                style={{ marginRight: 12, verticalAlign: "middle" }}
              />{" "}
              {t("Dashboard")}
            </Link>
            <Link to="/admin/create-order" className="list-group-item py-3">
              <NewOrderIcon
                style={{ marginRight: 12, verticalAlign: "middle" }}
              />{" "}
              {t("New order")}
            </Link>
            <Link to="/admin/add-employee" className="list-group-item py-3">
              <AddEmployeeIcon
                style={{ marginRight: 12, verticalAlign: "middle" }}
              />{" "}
              {t("Add employee")}
            </Link>
            <Link to="/admin/add-customer" className="list-group-item py-3">
              <AddCustomerIcon
                style={{ marginRight: 12, verticalAlign: "middle" }}
              />{" "}
              {t("Add customer")}
            </Link>
            <Link to="/admin/customers" className="list-group-item py-3">
              <CustomersIcon
                style={{ marginRight: 12, verticalAlign: "middle" }}
              />{" "}
              {t("Customers")}
            </Link>
            <Link to="/admin/announcement" className="list-group-item py-3">
              <CampaignIcon
                style={{ marginRight: 12, verticalAlign: "middle" }}
              />{" "}
              {t("Admin Announcement")}
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminMenu;
