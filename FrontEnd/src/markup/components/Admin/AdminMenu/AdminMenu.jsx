import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Dashboard as DashboardIcon,
  ListAlt as OrdersIcon,
  AddBox as NewOrderIcon,
  PersonAdd as AddEmployeeIcon,
  Group as EmployeesIcon,
  PersonAddAlt as AddCustomerIcon,
  People as CustomersIcon,
  Build as ServicesIcon
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../../Context/AuthContext';

const AdminMenu = () => {
  const { t } = useTranslation();
  const { employee } = useAuth();
  const isAdmin = employee?.employee_role === 3;

  return (
    <div>
      <div className="admin-menu">
        <Link to="/admin" style={{ textDecoration: 'none', color: 'inherit' }}>
          <h2 style={{ cursor: 'pointer', margin: 0, padding: '10px 0' }}>
            {isAdmin ? t('Admin Menu') : t('Employee Menu')}
          </h2>
        </Link>
      </div>
      <div className="list-group">

        {/* Orders - Available for both Admin and Employee */}
        <Link to="/admin/orders" className="list-group-item py-3">
          <OrdersIcon style={{ marginRight: 12, verticalAlign: 'middle' }} /> {t('Orders')}
        </Link>

        {/* New Order - Only for Admin */}
        {isAdmin && (
          <Link to="/admin/create-order" className="list-group-item py-3">
            <NewOrderIcon style={{ marginRight: 12, verticalAlign: 'middle' }} /> {t('New order')}
          </Link>
        )}

        {/* Employee Management - Only for Admin */}
        {isAdmin && (
          <>
            <Link to="/admin/add-employee" className="list-group-item py-3">
              <AddEmployeeIcon style={{ marginRight: 12, verticalAlign: 'middle' }} /> {t('Add employee')}
            </Link>
            <Link to="/admin/employees" className="list-group-item py-3">
              <EmployeesIcon style={{ marginRight: 12, verticalAlign: 'middle' }} /> {t('Employees')}
            </Link>
          </>
        )}

        {/* Customer Management - Available for both Admin and Employee */}
        <Link to="/admin/customers" className="list-group-item py-3">
          <CustomersIcon style={{ marginRight: 12, verticalAlign: 'middle' }} /> {t('Customers')}
        </Link>

        {/* Add Customer - Only for Admin */}
        {isAdmin && (
          <Link to="/admin/add-customer" className="list-group-item py-3">
            <AddCustomerIcon style={{ marginRight: 12, verticalAlign: 'middle' }} /> {t('Add customer')}
          </Link>
        )}

        {/* Services - Available for both Admin and Employee */}
        <Link to="/admin/services" className="list-group-item py-3">
          <ServicesIcon style={{ marginRight: 12, verticalAlign: 'middle' }} /> {t('Services')}
        </Link>

      </div>
    </div>
  );
};

export default AdminMenu;
