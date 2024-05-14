import React from "react";
import "./OrderPayment.scss";

const OrderPayment = ({ isOpen, onClose, orders, setOrders }) => {
  return (
    <div className={`order-payment ${isOpen ? "open" : ""}`}>
      {/* OrderPayment içeriği */}

      <div className="orders-tab">
        <h3>Orders</h3>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
        <table className="orders-table">
          <thead className="orders-table-header">
            <tr className="orders-table-header-row">
              <th>Item</th>
              <th>Qty</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody className="orders-table-body">
            {orders.map((order, index) => (
              <tr key={index}>
                <td>
                  <div className="order-item">
                    <img
                      className="order-img"
                      src={order.image}
                      alt={order.description}
                    />
                    <div className="order-details">
                      <p className="order-description">{order.description}</p>
                      <p className="order-price">{order.price}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <input
                    className="order-quantity"
                    type="number"
                    value={order.quantity}
                    onChange={(e) => {
                      const newOrders = [...orders];
                      newOrders[index].quantity = parseInt(e.target.value);
                      setOrders(newOrders);
                    }}
                  />
                </td>

                <td className="order-total-price-container">
                  <div className="order-total-price">
                    {order.price * order.quantity}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderPayment;
