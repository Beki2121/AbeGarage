import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

// Import Pages
import Header from "./markup/components/Header/Header";
import Footer from "./markup/components/Footer/Footer";
import Home from "./markup/pages/Home/Home";
import About from "./markup/pages/Main/About/About";
import AdminDashBoard from "./markup/pages/Admin/AdminDashBoard/AdminDashBoard";
import AllOrdersPage from "./markup/pages/Admin/Orders/AllOrdersPage";
import CreateOrderPage from "./markup/pages/Admin/Orders/CreateOrderPage";
import Login from "./markup/pages/Main/Login/Login";
import Contact from "./markup/pages/Admin/ContactUs/Contact";
import Services from "./markup/pages/Main/Services/Services";
import NewOrder from "./markup/pages/Admin/Orders/NewOrder";
import Vehicle from "./markup/pages/Admin/Vehicle/Vehicle";
import EditEmployee from "./markup/pages/Admin/Employee/EditEmployee";
import Employees from "./markup/pages/Admin/Employee/Employees";
import AddEmployee from "./markup/pages/Admin/Employee/AddEmployee";
import EmployeeProfile from "./markup/pages/Admin/Employee/EmployeeProfile";
import CustomerForm from "./markup/pages/Admin/Customers/CustomerForm";
import EditCustomer from "./markup/pages/Admin/Customers/EditCustomer";
import Unauthorized from "./markup/pages/Main/Unauthorized/Unauthorized";
import ErrorComponent from "./markup/pages/Main/404/404";
import Customers from "./markup/pages/Admin/Customers/Customers";
import EditVehicle from "./markup/pages/Admin/Vehicle/EditVehicle";
import SingleOrderPage from "./markup/pages/Admin/Orders/SingleOrderPage";
import ServicePage from "./markup/pages/Admin/Service/ServicePage";
import OrderStatus from "./markup/pages/Main/OrderStatus/OrderStatus";
import UpdateOrderPage from "./markup/pages/Admin/Orders/UpdateOrderPage";
import OrderDetail from "./markup/pages/Admin/Orders/OrderDetailPage";
import WorkHoursReport from './markup/pages/Admin/WorkHoursReport';
import EmployeeWorkHoursReport from './markup/pages/Admin/EmployeeWorkHoursReport';

// Import the PrivateAuthRoute component
import PrivateAuthRoute from "./markup/components/Auth/PrivateAuthRoute";

import ScrollToTop from './markup/components/Scroll/ScrollToTop'


// Import css from the template
import "./assets/template/css/bootstrap.css";
import "./assets/template/css/style.css";
import "./assets/template/css/responsive.css";
import "./assets/template/css/color.css";
import "./assets/template/css/flaticon.css";

// Import custom css
import "./assets/styles/custom.css";

const App = () => {
  const location = useLocation();
  const showHeader = !location.pathname.startsWith("/order-status");

  return (
    <>
      {showHeader && <Header />}
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<ErrorComponent />} />
        <Route path="/services" element={<Services />} />
        <Route
          path="/admin"
          element={
            <PrivateAuthRoute roles={[1, 2, 3]}>
              <AdminDashBoard />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <PrivateAuthRoute roles={[1, 2, 3]}>
              <AllOrdersPage />
            </PrivateAuthRoute>
          }
        />
        <Route path="/admin/order/:ID/:vID" element={<NewOrder />} />
        <Route
          path="/admin/order-single/:customer_id"
          element={<SingleOrderPage />}
        />
        <Route path="/admin/create-order" element={<CreateOrderPage />} />
        <Route path="admin/order/:orderId" element={<UpdateOrderPage />} />
        <Route
          path="/admin/add-customer"
          element={
            <PrivateAuthRoute roles={[1, 2, 3]}>
              <CustomerForm />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/customers"
          element={
            <PrivateAuthRoute roles={[1, 2, 3]}>
              <Customers />
            </PrivateAuthRoute>
          }
        />
        <Route path="/admin/customers/:id" element={<Vehicle />} />
        <Route
          path="/admin/edit-customer/:customerId"
          element={<EditCustomer />}
        />
        <Route path="/admin/edit-vehicle/:id" element={<EditVehicle />} />
        <Route
          path="/admin/add-employee"
          element={
            <PrivateAuthRoute roles={[3]}>
              <AddEmployee />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="admin/employees"
          element={
            <PrivateAuthRoute roles={[3]}>
              <Employees />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="admin/employee/edit/:id"
          element={
            <PrivateAuthRoute roles={[3]}>
              <EditEmployee />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/employee-profile/:id"
          element={<EmployeeProfile />}
        />
        <Route
          path="/admin/services"
          element={
            <PrivateAuthRoute roles={[3]}>
              <ServicePage />
            </PrivateAuthRoute>
          }
        />
       <Route path="/admin/order-detail/:id" element={
          <PrivateAuthRoute roles={[3]}>
            <OrderDetail />
          </PrivateAuthRoute>
        } />
        <Route path="/order-status/:order_hash" element={<OrderStatus />} />
        <Route
          path="/admin/work-hours-report"
          element={
            <PrivateAuthRoute roles={[3]}>
              <WorkHoursReport />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/employee-work-hours-report"
          element={
            <PrivateAuthRoute roles={[3]}>
              <EmployeeWorkHoursReport />
            </PrivateAuthRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
