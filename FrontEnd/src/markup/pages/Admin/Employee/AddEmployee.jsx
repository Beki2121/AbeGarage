import React from "react";
import AddEmployeeForm from "../../../components/Admin/AddEmployeeForm/AddEmployeeForm";
import AdminMenu from "../../../components/Admin/AdminMenu/AdminMenu";
import { useAuth } from "../../../../Context/AuthContext";
import Unauthorized from "../../Main/Unauthorized/Unauthorized";
import LoginForm from "../../../components/LoginForm/LoginForm";


const AddEmployee = () => {
  const { isLogged, isAdmin_manager, isAdmin } = useAuth();

  if (!isLogged) {
    // User is not logged in
    return <LoginForm />;
  }

  if (!isAdmin_manager && !isAdmin) {
    // User is logged in but does not have admin permissions
    return <Unauthorized />;
  }

  // User is logged in and has admin permissions
  return (
    <div className="container-fluid admin-pages">
      <div className="row">
        <div className="col-md-3 admin-left-side">
          <AdminMenu />
        </div>
        <div className="col-md-9 admin-right-side">
          <AddEmployeeForm />
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
