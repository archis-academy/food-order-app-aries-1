import "./OrderReport.scss";
import { orders as initialOrders } from "@/db/orders";
import { useState } from "react";

const OrderCard = () => {
  const orderClassNames = {
    completed: "completed",
    preparing: "preparing",
    pending: "pending",
  };

  const [orders, setOrders] = useState(initialOrders);

  const handleStatusChange = (e, id) => {
    const newStatus = e.target.value;
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  const orderRows = orders.map((order) => (
    <tr key={order.id}>
      <td className="order-name-cell">
        <img src={order.image} />
        {order.name}
      </td>
      <td>{order.menu[0].description}</td>
      <td>${order.price}</td>
      <td>
        <select
          onChange={(e) => handleStatusChange(e, order.id)}
          value={order.status}
          className={`status-button ${orderClassNames[order.status]}`}
        >
          <option value={"completed"} className="completed">
            Completed
          </option>
          <option value={"preparing"} className="preparing">
            Preparing
          </option>
          <option value={"pending"} className="pending">
            Pending
          </option>
          {/* {order.status} */}
        </select>
      </td>
    </tr>
  ));

  return (
    <table className="order-report-container">
      <thead className="order-headers">
        <tr>
          <th className="order-report-heading">Order Report</th>
        </tr>
        <tr>
          <th>Customer</th>
          <th>Menu</th>
          <th>Total Payment</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody className="order-cell">{orderRows}</tbody>
    </table>
  );
};

export default OrderCard;
