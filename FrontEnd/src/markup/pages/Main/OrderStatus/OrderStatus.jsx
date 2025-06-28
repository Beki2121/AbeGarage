import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./OrderStatus.css";
import orderService from "../../../../services/order.service";
import Loading from "../../../../assets/Loading/Loading";
import img from "../../../../assets/images/side.jpg";

const OrderStatus = () => {
  const { order_hash } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await orderService.getOrderAllDetail(token, order_hash);
        setOrderDetails(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [order_hash]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error fetching order details: {error.message}</div>;
  }

  // Determine progress step and status
  let step = 0;
  let statusText = "";
  let statusIcon = "";
  if (orderDetails) {
    if (orderDetails.orderStatus === 3) {
      step = 0;
      statusText = "Received";
      statusIcon = "📥"; // Inbox
    } else if (orderDetails.orderStatus === 0) {
      step = 1;
      statusText = "In Progress";
      statusIcon = "⏳"; // Hourglass
    } else {
      step = 2;
      statusText = "Completed";
      statusIcon = "✅"; // Checkmark
    }
  }

  return (
    <div className="order-status-page">
      <div className="progress-overlay">
        <div className="progress-card">
          <h1>Order Progress</h1>
          <div className="order-stepper">
            <div className={`step${step === 0 ? ' current' : ''} ${step > 0 ? 'active' : ''}`}>
              <span className="step-icon">📥</span>
              <span className="step-label">Received</span>
            </div>
            <div className={`step${step === 1 ? ' current' : ''} ${step > 1 ? 'active' : ''}`}>
              <span className="step-icon">⏳</span>
              <span className="step-label">In Progress</span>
            </div>
            <div className={`step${step === 2 ? ' current active' : ''}`}>
              <span className="step-icon">✅</span>
              <span className="step-label">Completed</span>
            </div>
          </div>
          <div className="progress-bar-container">
            <div
              className={`progress-bar ${step === 0 ? 'gray' : step === 1 ? 'yellow' : 'green'}`}
              style={{ width: `${(step + 1) * 33.33}%` }}
            >
              {statusIcon} {statusText}
            </div>
          </div>
        </div>
      </div>

      <div className="order-details-card">
        <div className="order-content">
          <div className="details-info">
            <h3>Services</h3>
            {orderDetails && orderDetails.orderDescription && (
              <p>{orderDetails.orderDescription}</p>
            )}
          </div>
        </div>
        <div className="details-list">
          <h3>Order Details</h3>
          {orderDetails && (
            <div className="details-table">
              <div className="details-row">
                <span className="details-label">🆔 Order ID:</span>
                <span className="details-value">{orderDetails.orderId}</span>
              </div>
              <div className="details-row">
                <span className="details-label">👤 Customer:</span>
                <span className="details-value">{orderDetails.customerId}</span>
              </div>
              <div className="details-row">
                <span className="details-label">🧑‍🔧 Employee:</span>
                <span className="details-value">{orderDetails.employeeFirstName} {orderDetails.employeeLastName}</span>
              </div>
              <div className="details-row">
                <span className="details-label">🚗 Vehicle:</span>
                <span className="details-value">{orderDetails.vehicleMake} (Serial: {orderDetails.vehicleSerial})</span>
              </div>
              <div className="details-row">
                <span className="details-label">📅 Order Date:</span>
                <span className="details-value">{new Date(orderDetails.orderDate).toLocaleDateString()}</span>
              </div>
              <div className="details-row">
                <span className="details-label">⏰ Estimated Completion:</span>
                <span className="details-value">{orderDetails.estimatedCompletionDate ? new Date(orderDetails.estimatedCompletionDate).toLocaleDateString() : "N/A"}</span>
              </div>
              <div className="details-row">
                <span className="details-label">🏁 Completion Date:</span>
                <span className="details-value">{orderDetails.completionDate ? new Date(orderDetails.completionDate).toLocaleDateString() : "In Progress"}</span>
              </div>
              <div className="details-row">
                <span className="details-label">📝 Additional Requests:</span>
                <span className="details-value">{orderDetails.additionalRequest}</span>
              </div>
              <div className="details-row">
                <span className="details-label">💬 Notes for Customer:</span>
                <span className="details-value">{orderDetails.notesForCustomer || "N/A"}</span>
              </div>
              <div className="details-row">
                <span className="details-label">💲 Order Total Price:</span>
                <span className="details-value">${orderDetails.orderTotalPrice}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;
