import "./OrderConfirmation.scss";
import OrderItem from "@/components/OrderItem/OrderItem";
import { useState, useMemo } from "react";
import moment from "moment";
import { useAuth } from "@/components/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrderConfirmation = ({
  orders,
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

  const [cardDetails, setCardDetails] = useState({
    expirationDate: "",
    dateError: "",
    cardNumber: "",
    selectedMethod: "Credit Card",
    orderType: "Dine In",
    tableNumber: "",
    cvv: "",
    cardHolderName: "",
    address: "",
  });
  const initialCardDetails = {
    expirationDate: "",
    dateError: "",
    cardNumber: "",
    selectedMethod: "Credit Card",
    orderType: "Dine In",
    tableNumber: "",
    cvv: "",
    cardHolderName: "",
    address: "",
  };
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

    setCardDetails((prevInfo) => ({
      ...prevInfo,
      expirationDate: formattedInput,
      dateError: "",
    }));

    if (formattedInput.length === 7) {
      const month = formattedInput.slice(0, 2);
      const year = formattedInput.slice(3, 7);

      if (month < 1 || month > 12) {
        setCardDetails((prevInfo) => ({
          ...prevInfo,
          dateError: "Invalid date!",
        }));
      } else if (!isDateValid(`${formattedInput}`)) {
        setCardDetails((prevInfo) => ({
          ...prevInfo,
          dateError: "Invalid date!",
        }));
      } else {
        setCardDetails((prevInfo) => ({
          ...prevInfo,
          dateError: "",
        }));
      }
    } else {
      setCardDetails((prevInfo) => ({
        ...prevInfo,
        dateError: "",
      }));
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
    setCardDetails((prevInfo) => ({
      ...prevInfo,
      cardNumber: formattedInput,
    }));
  };

  const handlePaymentMethodClick = (method) => {
    setCardDetails((prevInfo) => ({
      ...prevInfo,
      selectedMethod: method,
    }));
  };

  const { fireStoreUser } = useAuth();

  const handleConfirmPayment = () => {
    const requiredFields =
      cardDetails.selectedMethod &&
      cardDetails.cardHolderName &&
      cardDetails.cardNumber &&
      cardDetails.expirationDate &&
      cardDetails.cvv &&
      cardDetails.orderType;

    const validForDineIn =
      cardDetails.orderType === "Dine In" && cardDetails.tableNumber;
    const validForDelivery =
      cardDetails.orderType === "Delivery" && cardDetails.address;
    const validForToGo = cardDetails.orderType === "To Go";

    if (
      requiredFields &&
      (validForDineIn || validForDelivery || validForToGo)
    ) {
      const ordersSummary = {
        customer: {
          uid: fireStoreUser.uid,
          displayName: fireStoreUser.displayName,
        },
        menu: orders.map((order) => ({
          id: order.id,
          name: order.description,
          price: order.price,
          quantity: order.quantity,
          note: order.note,
          totalPrice: order.price * order.quantity,
          category: order.category,
        })),
        paymentMethod: cardDetails.selectedMethod,
        cardHolderName: cardDetails.cardHolderName,
        cardNumber: cardDetails.cardNumber,
        expirationDate: cardDetails.expirationDate,
        cvv: cardDetails.cvv,
        orderType: cardDetails.orderType,
        tableNumber: cardDetails.tableNumber,
        address: cardDetails.address,
        subtotal,
        status: "Pending",
      };
      console.log(ordersSummary);
      toast.success("Payment confirmed successfully!");
      setCardDetails(initialCardDetails);
    } else {
      toast.warn("Please fill in all fields");
    }
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
                    cardDetails.selectedMethod === "Credit Card"
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => handlePaymentMethodClick("Credit Card")}
                >
                  <img src="./payment-method-Card.svg" alt="" />
                  <p className="payment-method-name">Credit Card</p>
                </div>
                <div
                  className={`payment-method-item ${
                    cardDetails.selectedMethod === "Paypal" ? "selected" : ""
                  }`}
                  onClick={() => handlePaymentMethodClick("Paypal")}
                >
                  <img src="./payment-method-Paypal.svg" alt="" />
                  <p className="payment-method-name">Paypal</p>
                </div>
                <div
                  className={`payment-method-item ${
                    cardDetails.selectedMethod === "Cash" ? "selected" : ""
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
                  value={cardDetails.cardHolderName}
                  onChange={(e) =>
                    setCardDetails((prevInfo) => ({
                      ...prevInfo,
                      cardHolderName: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="card-number">
                <p className="card-info-title">Card Number</p>
                <input
                  className="card-input"
                  type="text"
                  placeholder="Card Number"
                  maxLength="19"
                  value={cardDetails.cardNumber}
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
                    value={cardDetails.expirationDate}
                    onChange={handleExpirationDate}
                  />
                  {cardDetails.dateError && (
                    <p className="error-message">{cardDetails.dateError}</p>
                  )}
                </div>
                <div className="cvv">
                  <p className="card-info-title ">CVV</p>
                  <input
                    className="card-input"
                    type="password"
                    placeholder="CVV"
                    maxLength="3"
                    value={cardDetails.cvv}
                    onChange={(e) =>
                      setCardDetails((prevInfo) => ({
                        ...prevInfo,
                        cvv: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            </div>
            <div className="order-summary">
              <div className="order-type-select">
                <p className="order-summary-title">Order Type</p>
                <select
                  className="order-type-select-input"
                  value={cardDetails.orderType}
                  onChange={(e) =>
                    setCardDetails((prevInfo) => ({
                      ...prevInfo,
                      orderType: e.target.value,
                    }))
                  }
                >
                  <option value="Dine In">Dine In</option>
                  <option value="To Go">To Go</option>
                  <option value="Delivery">Delivery</option>
                </select>
              </div>
              {cardDetails.orderType === "Dine In" && (
                <div className="table-no">
                  <p className="order-summary-title">Table No</p>
                  <input
                    type="number"
                    className="table-number"
                    placeholder="Table No"
                    value={cardDetails.tableNumber}
                    onChange={(e) =>
                      setCardDetails((prevInfo) => ({
                        ...prevInfo,
                        tableNumber: e.target.value,
                      }))
                    }
                  />
                </div>
              )}
              {cardDetails.orderType === "Delivery" && (
                <div className="address">
                  <p className="order-summary-title">Address</p>
                  <input
                    type="text"
                    className="address-input"
                    placeholder="Please Enter Delivery Address"
                    value={cardDetails.address}
                    onChange={(e) =>
                      setCardDetails((prevInfo) => ({
                        ...prevInfo,
                        address: e.target.value,
                      }))
                    }
                  />
                </div>
              )}
            </div>
          </div>
          <div className="order-confirmation-btns">
            <button className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button className="confirm-btn" onClick={handleConfirmPayment}>
              Confirm Payment
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
export default OrderConfirmation;
