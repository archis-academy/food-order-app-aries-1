import "./OrderConfirmation.scss";
import OrderItem from "@/components/OrderItem/OrderItem";
import { useState, useMemo } from "react";
import moment from "moment";

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

  const [expirationDate, setExpirationDate] = useState("");
  const [dateError, setDateError] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("");
  const [orderType, setOrderType] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");

  const isDateValid = (inputDate) => {
    const date = moment(inputDate, "MM/YYYY");
    const today = moment().startOf("month");

    if (!date.isValid()) {
      return false;
    }

    return date.isSameOrAfter(today);
  };

  const handleExpirationDate = (e) => {
    const input = e.target.value.replace(/\D/g, "");
    let formattedInput = input;

    if (input.length >= 2) {
      formattedInput = `${input.substring(0, 2)}/${input.substring(2, 6)}`;
    }

    setExpirationDate(formattedInput);

    if (formattedInput.length === 7) {
      const month = formattedInput.slice(0, 2);
      const year = formattedInput.slice(3, 7);

      if (month < 1 || month > 12) {
        setDateError("Invalid date!");
      } else if (!isDateValid(`${formattedInput}`)) {
        setDateError("Invalid date!");
      } else {
        setDateError("");
      }
    } else {
      setDateError("");
    }
  };

  const handleCardNumber = (e) => {
    const input = e.target.value.replace(/\D/g, "");

    const formattedInput =
      input.substring(0, 4) +
      " " +
      input.substring(4, 8) +
      " " +
      input.substring(8, 12) +
      " " +
      input.substring(12, 16);
    setCardNumber(formattedInput);
  };

  const handlePaymentMethodClick = (method) => {
    setSelectedMethod(method);
  };

  const handleConfirmPayment = () => {
    const ordersSummary = {
      id: 1,
      customer: "userName",
      menu: orders.map((order) => ({
        id: order.id,
        name: order.description,
        price: order.price,
        quantity: order.quantity,
        note: order.note,
        totalPrice: order.price * order.quantity,
      })),
      paymentMethod: selectedMethod,
      cardHolderName,
      cardNumber,
      expirationDate,
      cvv,
      orderType,
      tableNumber,
      subtotal,
    };
    console.log(ordersSummary);
  };

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
              {orders.map((order) => {
                return (
                  <OrderItem
                    key={order.id}
                    order={order}
                    deleteItem={onDeleteItem}
                    updateQuantity={onUpdateQuantity}
                    isArrowActive={false}
                    isNoteActive={false}
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
                <div
                  className={`payment-method-item ${
                    selectedMethod === "Credit Card" ? "selected" : ""
                  }`}
                  onClick={() => handlePaymentMethodClick("Credit Card")}
                >
                  <img src="./payment-method-Card.svg" alt="" />
                  <p className="payment-method-name">Credit Card</p>
                </div>
                <div
                  className={`payment-method-item ${
                    selectedMethod === "Paypal" ? "selected" : ""
                  }`}
                  onClick={() => handlePaymentMethodClick("Paypal")}
                >
                  <img src="./payment-method-Paypal.svg" alt="" />
                  <p className="payment-method-name">Paypal</p>
                </div>
                <div
                  className={`payment-method-item ${
                    selectedMethod === "Cash" ? "selected" : ""
                  }`}
                  onClick={() => handlePaymentMethodClick("Cash")}
                >
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
                  value={cardHolderName}
                  onChange={(e) => setCardHolderName(e.target.value)}
                />
              </div>
              <div className="card-number">
                <p className="card-info-title">Card Number</p>
                <input
                  className="card-input"
                  type="text"
                  placeholder="Card Number"
                  maxLength="19"
                  value={cardNumber}
                  onChange={handleCardNumber}
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
                    value={expirationDate}
                    onChange={handleExpirationDate}
                  />
                  {dateError && <p className="error-message">{dateError}</p>}
                </div>
                <div className="cvv">
                  <p className="card-info-title ">CVV</p>
                  <input
                    className="card-input"
                    type="password"
                    placeholder="CVV"
                    maxLength="3"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="order-summary">
              <div className="order-type-select">
                <p className="order-summary-title">Order Type</p>
                <select
                  className="order-type-select-input"
                  value={orderType}
                  onChange={(e) => setOrderType(e.target.value)}
                >
                  <option value="Dine In">Dine In</option>
                  <option value="To Go">To Go</option>
                  <option value="Delivery">Delivery</option>
                </select>
              </div>
              <div className="table-no">
                <p className="order-summary-title">Table No</p>
                <input
                  type="text"
                  className="table-number"
                  placeholder="Table No"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                />
              </div>
            </div>
            <div className="order-confirmation-btns">
              <button className="cancel-btn">Cancel</button>
              <button className="confirm-btn" onClick={handleConfirmPayment}>
                Confirm Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderConfirmation;
