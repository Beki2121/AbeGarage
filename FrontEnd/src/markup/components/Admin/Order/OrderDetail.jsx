import React, { useState, useEffect } from "react";
import "./orderDetail.css";
import { useParams } from "react-router-dom";
import ordersService from "../../../../services/order.service";
import { useAuth } from "../../../../Context/AuthContext";
import spaceService from '../../../../services/space.service';


const OrderDetail = () => {
  const { id } = useParams(); // Get the order ID from the URL
  const [orderData, setOrderData] = useState(null);
   const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const { employee } = useAuth();
  const token = employee?.employee_token;
  const [spaces, setSpaces] = useState([]);
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [spaceNotification, setSpaceNotification] = useState("");
  const [spaceError, setSpaceError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      if (!token) {
        console.error("Token is not available");
        return;
      }
      try {
        const fetchedOrder = await ordersService.getOrderDetailById(token, id);
        setOrderData(fetchedOrder);
        setOrder(fetchedOrder[0]);
        
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    fetchOrder();
  }, [token, id]);

  // console.log(order);

  
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await ordersService.getOrderAllDetail(token, id);
        setOrderDetails(data);
        console.log(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  useEffect(() => {
    const fetchSpaces = async () => {
      if (!token) return;
      try {
        const fetchedSpaces = await spaceService.getAllSpaces(token);
        setSpaces(fetchedSpaces);
      } catch (error) {
        console.error('Error fetching spaces:', error);
      }
    };
    fetchSpaces();
  }, [token]);

  const formatMileage = (mileage) => {
    return mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  if (!orderData) {
    return <div>Loading...</div>;
  }

  // Determine overall progress status
  const overallStatus = orderData.every((order) => order.order_status === 1)
    ? "Completed"
    : orderData.some((order) => order.order_status === 0)
    ? "In Progress"
    : "Received";

  const handleSpaceChange = (e) => {
    setSelectedSpace(e.target.value);
  };

  // Helper to convert ISO string to MySQL DATETIME format
  function toMySQLDateTime(dateString) {
    if (!dateString) return null;
    const d = typeof dateString === 'string' ? new Date(dateString) : dateString;
    if (isNaN(d)) return null;
    return d.toISOString().slice(0, 19).replace('T', ' ');
  }

  const handleUpdateSpace = async () => {
    setSpaceError("");
    setSpaceNotification("");
    if (!order) return;
    if (!selectedSpace) {
      setSpaceError("Please select a space.");
      return;
    }
    const selectedSpaceObj = spaces.find(s => s.space_id == selectedSpace);
    if (!selectedSpaceObj || selectedSpaceObj.space_status !== 'available') {
      setSpaceError("Selected space is not available.");
      return;
    }

    // Reconstruct order_services array from orderData or order
    let order_services = [];
    if (order.order_services && Array.isArray(order.order_services) && order.order_services.length > 0) {
      order_services = order.order_services;
    } else if (orderData && Array.isArray(orderData)) {
      order_services = orderData
        .filter(row => row.service_id)
        .map(row => ({
          service_id: row.service_id,
          service_completed: row.service_completed || 0,
        }));
    }

    // Try to get order_description from all possible sources
    let order_description =
      order.order_description ||
      order.orderDescription ||
      (orderData && Array.isArray(orderData) && orderData[0]?.order_description) ||
      (orderData && Array.isArray(orderData) && orderData[0]?.orderDescription) ||
      "";

    if (!order_description) {
      setSpaceError("Order description is required but missing.");
      return;
    }

    let estimated_completion_date =
      order.estimated_completion_date ||
      order.estimatedCompletionDate ||
      (orderData && Array.isArray(orderData) && orderData[0]?.estimated_completion_date) ||
      "";

    let completion_date =
      order.completion_date ||
      order.completionDate ||
      (orderData && Array.isArray(orderData) && orderData[0]?.completion_date) ||
      null;

    if (!order_services.length) {
      setSpaceError("No services found for this order.");
      return;
    }

    estimated_completion_date = toMySQLDateTime(estimated_completion_date);
    completion_date = toMySQLDateTime(completion_date);

    try {
      await ordersService.updateOrder(
        {
          order_id: order.order_id,
          order_description,
          estimated_completion_date,
          completion_date,
          order_services,
          order_status: order.order_status,
          space_id: selectedSpace,
        },
        token
      );
      setSpaceNotification("Space assignment updated successfully.");
      setTimeout(() => window.location.reload(), 1500);
    } catch (error) {
      setSpaceError(error.response?.data?.error || 'Failed to update space');
    }
  };

  const handleMarkCompleted = async () => {
    if (!order) return;
    try {
      // Reconstruct order_services array from orderData or orderDetails
      let order_services = [];
      if (order.order_services && Array.isArray(order.order_services) && order.order_services.length > 0) {
        order_services = order.order_services;
      } else if (orderData && Array.isArray(orderData)) {
        order_services = orderData
          .filter(row => row.service_id)
          .map(row => ({
            service_id: row.service_id,
            service_completed: row.service_completed || 0,
          }));
      }

      // Try to get order_description from all possible sources
      let order_description =
        order.order_description ||
        order.orderDescription ||
        (orderData && Array.isArray(orderData) && orderData[0]?.order_description) ||
        (orderData && Array.isArray(orderData) && orderData[0]?.orderDescription) ||
        "";

      if (!order_description) {
        setSpaceError("Order description is required but missing.");
        return;
      }

      let estimated_completion_date =
        order.estimated_completion_date ||
        order.estimatedCompletionDate ||
        (orderData && Array.isArray(orderData) && orderData[0]?.estimated_completion_date) ||
        "";

      let completion_date =
        order.completion_date ||
        order.completionDate ||
        (orderData && Array.isArray(orderData) && orderData[0]?.completion_date) ||
        null;

      if (!order_services.length) {
        setSpaceError("No services found for this order.");
        return;
      }

      estimated_completion_date = toMySQLDateTime(estimated_completion_date);
      completion_date = toMySQLDateTime(completion_date);

      await ordersService.updateOrder(
        {
          order_id: order.order_id,
          order_description,
          estimated_completion_date,
          completion_date,
          order_services,
          order_status: 1,
          space_id: order.space_id,
        },
        token
      );
      setSpaceNotification("Order marked as completed and space unassigned.");
      setTimeout(() => window.location.reload(), 1500);
    } catch (error) {
      setSpaceError(error.response?.data?.error || "Failed to mark as completed");
    }
  };

  return (
    <div className="order-detail-container">
      <div className="order-detail-card">
        <div
          className={`status-box-inline highlight overall-status-${overallStatus
            .toLowerCase()
            .replace(" ", "-")}`}
        >
          <h6 className="overallstatus">{overallStatus}</h6>
        </div>
        <div className="sec-title style-two order_customer_name red-bottom-border">
          <h2>
            {order.customer_first_name} {order.customer_last_name}
          </h2>
          <div className="text">
            This page provides the current status of the order. It will be
            updated regularly to reflect the progress of the work. Once the
            order is completed, the status will turn green, indicating that the
            car is ready for the next step in processing.
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 service-block-one">
            <div className="inner-boxx hvr-float-shadow">
              <h5>CUSTOMER</h5>
              <h2>
                {order.customer_first_name} {order.customer_last_name}
              </h2>
              <div>Email: {order.customer_email}</div>
              <div>Phone Number: {order.customer_phone_number}</div>
              <div>
                Active Customer:{" "}
                {orderDetails?.customerActiveStatus ? "Yes" : "No"}
              </div>
            </div>
          </div>

          <div className="col-lg-6 service-block-one">
            <div className="inner-boxx hvr-float-shadow">
              <h5>CAR IN SERVICE</h5>
              <h2>
                {order.vehicle_model} <span>({order.vehicle_color})</span>
              </h2>
              <div>Vehicle tag: {order.vehicle_tag}</div>
              <div>Vehicle year: {order.vehicle_year}</div>
              <div>Vehicle mileage: {formatMileage(order.vehicle_mileage)}</div>
            </div>
          </div>
        </div>

        <div className="order_details">
          <h5>{order.vehicle_model}</h5>
          <h2>Requested Service</h2>
          {orderData?.map((order, index) => (
            <div key={index} className="order_detail_items">
              <div className="requested_service">
                <h2>{order.service_name}</h2>
                <p>{order.service_description}</p>
                <div
                  className={`status-box ${
                    order.order_status === 0
                      ? "status-in-progress"
                      : order.order_status === 1
                      ? "status-completed"
                      : "status-received"
                  }`}
                >
                  <h6>
                    {order.order_status === 0
                      ? "In Progress"
                      : order.order_status === 1
                      ? "Completed"
                      : "Received"}
                  </h6>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Maintenance Space Assignment Section */}
        <div className="row mt-4">
          <div className="col-12">
            <div className="inner-boxx hvr-float-shadow">
              <h5>MAINTENANCE SPACE</h5>
              <div>
                <strong>Current Space:</strong>{' '}
                {order.space_name ? (
                  <>
                    {order.space_name} <span className={`badge mx-2 ${order.space_status === 'available' ? 'bg-success' : 'bg-danger'}`}>{order.space_status}</span>
                    {order.space_notes && <span className="text-muted mx-2">({order.space_notes})</span>}
                  </>
                ) : (
                  <span className="text-muted">Unassigned</span>
                )}
              </div>
              <div className="mt-2">
                <label htmlFor="space-select">Assign/Change Space: </label>
                <select id="space-select" value={selectedSpace || order.space_id || ''} onChange={handleSpaceChange} className="mx-2">
                  <option value="">-- Select Space --</option>
                  {spaces.map(space => (
                    <option key={space.space_id} value={space.space_id}>
                      {space.space_name} ({space.space_status})
                    </option>
                  ))}
                </select>
                <button className="btn btn-primary btn-sm mx-2" onClick={handleUpdateSpace} disabled={!selectedSpace || selectedSpace == order.space_id || (selectedSpace && spaces.find(s => s.space_id == selectedSpace)?.space_status !== 'available')}>Update</button>
                {spaceError && <div style={{color:'red'}}>{spaceError}</div>}
                {spaceNotification && <div style={{color:'green'}}>{spaceNotification}</div>}
                {/* Mark as Completed Button */}
                {order.order_status !== 1 && (
                  <button className="btn btn-success mt-3" onClick={handleMarkCompleted}>
                    Mark as Completed
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
