import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { PiArrowSquareOutBold } from "react-icons/pi";
import ordersService from '../../../../services/order.service';
import { useAuth } from '../../../../Context/AuthContext'; 


function AllOrders() {
  const { t } = useTranslation();

  // States
  const [orders, setOrders] = useState([]);
  const { employee } = useAuth();
  const token = employee?.employee_token;
  const location = useLocation(); 

  // useEffect
  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) {
        console.error("Token is not available");
        return;
      }
      try {
        const fetchedOrders = await ordersService.getAllOrders(token);
        console.log(fetchedOrders)
        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [token, location.state]);

  // Log the API response for debugging
  useEffect(() => {
    if (orders && orders.length) {
      console.log('Order list API response:', orders);
    }
  }, [orders]);

   // Filter to remove duplicate orders based on order_id
   const uniqueOrders = orders.reduce((acc, current) => {
    const x = acc.find(item => item.order_id === current.order_id);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);

   // Functions
   const formatCustomerAddedDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const handleClick = (order) => {
    console.log("Order clicked:", order);
  };
  
  return (
    <section className="contact-section">
      <div className="mx-4">
        <div className="contact-title mb-1">
          <h2>{t('Orders')}</h2>
        </div>
        <div className="table-responsive">
          <table className="table table-striped table-hover border">
          <thead>
            <tr>
              <th scope="col" className="border">
                {t('Order Id')}
              </th>
              <th scope="col" className="border">
                {t('Customer')}
              </th>
              <th scope="col" className="border">
                {t('Vehicle')}
              </th>
              <th scope="col" className="border">
                {t('Order Date')}
              </th>
              <th scope="col" className="border">
                {t('Received By')}
              </th>
              <th scope="col" className="border">
                {t('Assigned Employee')}
              </th>
              <th scope="col" className="border">
                {t('Order Status')}
              </th>
              <th scope="col" className="border">
                {t('Space')}
              </th>
              <th scope="col" className="border">
                {t('Edit/View')}
              </th>
            </tr>
          </thead>
          <tbody>
            {uniqueOrders.map((order) => (
              <tr key={order.order_id}>
                <td className="border">
                  <h6 className="py-0 my-0 mx-3 font-weight-bold">
                    {order.order_id}
                  </h6>
                </td>
                <td className="border p-3">
                  <h5 className="py-0 my-0 font-weight-bold">
                    {order.customer_first_name} {order.customer_last_name}
                  </h5>
                  <h6 className="py-1 my-0 text-muted">
                  {order.customer_email ? order.customer_email.split("@")[0] + "@..." : t('N/A')}
                  </h6>
                  <h6 className="py-0 my-0 text-muted">
                  {order.customer_phone_number || t('N/A')}
                  </h6>
                </td>
                <td className="border">
                  <h5 className="py-0 my-0 font-weight-bold">
                    {order.vehicle_make} {order.vehicle_model}
                  </h5>
                  <h6 className="py-1 my-0 text-muted">{order.vehicle_year}</h6>
                  <h6 className="py-0 my-0 text-muted">{order.vehicle_tag}</h6>
                </td>
                <td className="border">
                {order.order_date ? formatCustomerAddedDate(order.order_date) : t('N/A')}
                </td>
                <td className="border">
                  {order.employee_first_name} {order.employee_last_name ? order.employee_last_name.charAt(0) : ""}
                </td>
                <td className="border">
                  {order.assigned_employee_first_name && order.assigned_employee_last_name
                    ? `${order.assigned_employee_first_name} ${order.assigned_employee_last_name}`
                    : <span className="text-muted">{t('Unassigned')}</span>}
                </td>
                <td className="border py-4">
                  {order.order_status === 0 ? (
                    <h6 className="text-center rounded-pill bg-warning font-weight-bold">
                      {t('In Progress')}
                    </h6>
                  ) : order.order_status === 1 ? (
                    <h6 className="text-white rounded-pill text-center bg-success font-weight-bold">
                      {t('Completed')}
                    </h6>
                  ) : (
                    <h6 className="rounded-pill text-white m-auto text-center bg-secondary font-weight-bold">
                      {t('Received')}
                    </h6>
                  )}
                </td>
                <td className="border">
                  {order.space_name ? (
                    <>
                      <span className="font-weight-bold">{order.space_name}</span>
                      <span className={`badge mx-2 ${order.space_status === 'available' ? 'bg-success' : 'bg-danger'}`}>{order.space_status}</span>
                    </>
                  ) : (
                    <span className="text-muted">{t('Unassigned')}</span>
                  )}
                </td>
                <td className="border">
                  <Link to={`/admin/order/${order.order_hash}`}  state={{ order }}>
                    <FaEdit
                      className="mx-2 scale-on-hover cursor-pointer"
                      onClick={() => handleClick(order)}
                    />
                  </Link>
                  
                  <Link to={`/admin/order-detail/${order.order_hash}`}>
                    <PiArrowSquareOutBold
                      className="mx-1 fw-bold scale-on-hover cursor-pointer"
                      onClick={() => handleClick(order)}
                    />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        
      </div>
    </section>
  );
}

export default AllOrders;
