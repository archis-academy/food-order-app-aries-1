import React from "react";
import { useState, useEffect } from "react";
import "./OrderPayment.scss";
import OrderItem from "@/components/OrderItem/OrderItem";
import { useMemo } from "react";

const OrderPayment = ({
  orders,
  isOpen,
  onClose,
  onDeleteItem,
  onUpdateQuantity,
  onContinueToPayment,
}) => {
  const [activeOrderType, setActiveOrderType] = useState("");

  const filteredOrders = orders.filter(
    (order) => activeOrderType === "" || order.orderType === activeOrderType
  );
  useEffect(() => {
    orders.forEach((order) => {
      console.log(order.orderType);
    });
  }, [orders]);

  function handleActiveOrderType(orderType) {
    setActiveOrderType((prevOrderType) =>
      orderType === prevOrderType ? "" : orderType
    );
  }
  const discount = 0;
  const subtotal = useMemo(() => {
    let totalPrice = 0;
    orders.forEach((order) => {
      totalPrice += order.price * order.quantity - discount;
    });
    return totalPrice;
  }, [orders]);

  console.log(subtotal);

  return (
    <div className={`orders-panel ${isOpen ? "open" : ""}`}>
      <button className="close-button" onClick={onClose}>
        X
      </button>
      <h3 className="orders-no">Orders</h3>
      <div className="order-type-btns">
        <button
          className={
            activeOrderType === "Dine In" ? "active-btn" : "order-type-btn"
          }
          onClick={() => handleActiveOrderType("Dine In")}
        >
          Dine In
        </button>
        <button
          className={
            activeOrderType === "To Go" ? "active-btn" : "order-type-btn"
          }
          onClick={() => handleActiveOrderType("To Go")}
        >
          To Go
        </button>
        <button
          className={
            activeOrderType === "Delivery" ? "active-btn" : "order-type-btn"
          }
          onClick={() => handleActiveOrderType("Delivery")}
        >
          Delivery
        </button>
      </div>
      <div className="order-details">
        <p className="detail-item">Item</p>
        <p className="detail-qty">Qty</p>
        <p className="detail-price">Price</p>
      </div>

      <div className="orders-content">
        <ul>
          {filteredOrders.map((order, index) => {
            return (
              <OrderItem
                key={index}
                order={order}
                deleteItem={onDeleteItem}
                updateQuantity={onUpdateQuantity}
              />
            );
          })}
        </ul>
      </div>
      <div className="orders-bottom">
        <div className="order-total-container">
          <div className="order-discount">
            <p className="discount-title">Discount</p>
            <p className="discount-amount">$ {discount}</p>
          </div>
          <div className="order-subtotal">
            <p className="subtotal-title">Sub total</p>
            <p className="subtotal-amount">$ {subtotal.toFixed(2)}</p>
          </div>
        </div>
        <button
          className="continue-to-payment-btn"
          onClick={onContinueToPayment}
        >
          Continue to Payment
        </button>
      </div>
    </div>
  );
};
export default OrderPayment;
