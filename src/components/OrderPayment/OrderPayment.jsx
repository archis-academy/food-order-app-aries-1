import React from "react";
import "./OrderPayment.scss";

const OrderPayment = ({ orders, setOrders, isOrderOpen, setIsOrderOpen }) => {
  return (
    <div className={`orders-panel ${isOrderOpen ? "open" : ""}`}>
      <h3>Orders</h3>

      <ul>
        {orders.map((order, index) => (
          <li key={index}>
            <img src={order.image} alt={order.description} />
            <p>{order.description}</p>
            <p>{order.price}</p>
            <p>{order.bowl}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default OrderPayment;
