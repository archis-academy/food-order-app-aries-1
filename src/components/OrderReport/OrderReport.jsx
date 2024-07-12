import "./OrderReport.scss";
import { useState, useEffect } from "react";
import { getOrders } from "@/db/orders";

const OrderCard = () => {
  const orderClassNames = {
    completed: "completed",
    preparing: "preparing",
    pending: "pending",
  };

  const [orders, setOrders] = useState([]);

  const handleStatusChange = (e, id) => {
    const newStatus = e.target.value;
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  useEffect(() => {
    const getOrderList = async () => {
      const orderList = await getOrders();
      setOrders(orderList);
    };
    getOrderList();
  }, []);

  const orderRows = orders.map((order) => (
    <tr key={order.id}>
      <td className="order-name-cell">
        <img className="order-image" src={order.customer.image} />
        {order.customer.displayName}
      </td>
      <td>{order.menu[0].name}</td>
      <td>${order.subtotal}</td>
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
