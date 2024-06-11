import "./OrderConfirmation.scss";
import OrderItem from "@/components/OrderItem/OrderItem";
import { useState, useMemo } from "react";

const OrderConfirmation = ({
  orders,
  isOpen,
  onClose,
  onDeleteItem,
  onUpdateQuantity,
}) => {
  const discount = 0;
  const subtotal = useMemo(() => {
    let totalPrice = 0;
    orders.forEach((order) => {
      totalPrice += order.price * order.quantity - discount;
    });
    return totalPrice;
  }, [orders]);

  return (
    <div className="order-confirmation-overlay">
      <div className="order-confirmation">
        <div className="order-confirmation-left">
          <div className="confirmation-left-top">
            <button className="back-button" onClick={onClose}>
              <img src="./back-arrow.svg" alt="back-arrow" />
            </button>
            <h3 className="confirmation-title">Confirmation</h3>
          </div>

          <div className="confirmation-content">
            <ul>
              {orders.map((order, index) => {
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
          </div>
        </div>
        <div className="order-confirmation-right">
          <div className="confirmation-right-top">
            <h3 className="confirmation-title">Payment</h3>
            <p className="confirmation-info">3 payment method available </p>
          </div>
          <div className="payment-content">
            <div className="payment-methods">
              <p className="payment-method-title">Payment Method</p>
              <div className="payment-method-container">
                <div className="payment-method-item">
                  <img src="./payment-method-Card.svg" alt="" />
                  <p className="payment-method-name">Credit Card</p>
                </div>
                <div className="payment-method-item">
                  <img src="./payment-method-Paypal.svg" alt="" />
                  <p className="payment-method-name">Paypal</p>
                </div>
                <div className="payment-method-item">
                  <img src="./payment-method-Cash.svg" alt="" />
                  <p className="payment-method-name">Cash</p>
                </div>
              </div>
            </div>
            <div className="card-info">
              <div className="cardholder-name">
                <p className="card-info-title">Cardholder Name</p>
                <input
                  className="card-input"
                  type="text"
                  placeholder="Cardholder Name"
                />
              </div>
              <div className="card-number">
                <p className="card-info-title">Card Number</p>
                <input
                  className="card-input"
                  type="text"
                  placeholder="Card Number"
                />
              </div>
              <div className="expiration-date-cvv">
                <div className="expiration-date">
                  <p className="card-info-title">Expiration Date</p>
                  <input
                    className="card-input"
                    type="text"
                    placeholder="MM/YYYY"
                    maxLength="7"
                  />
                </div>
                <div className="cvv">
                  <p className="card-info-title ">CVV</p>
                  <input
                    className="card-input"
                    type="password"
                    placeholder="CVV"
                    maxLength="3"
                  />
                </div>
              </div>
            </div>
            <div className="order-summary">
              <div className="order-type-select">
                <p className="order-summary-title">Order Type</p>
                <select className="order-type-select-input">
                  <option value="Dine In">Dine In</option>
                  <option value="To Go">To Go</option>
                  <option value="Delivery">Delivery</option>
                </select>
              </div>
              <div className="table-no">
                <p className="order-summary-title">Table No</p>
                <p className="table-number">140</p>
              </div>
            </div>
            <div className="order-confirmation-btns">
              <button className="cancel-btn">Cancel</button>
              <button className="confirm-btn">Confirm Payment</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderConfirmation;
