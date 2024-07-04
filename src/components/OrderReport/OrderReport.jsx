import "./OrderReport.scss";
import { orders } from "@/db/orders";

const OrderCard = () => {
  const orderClassNames = {
    Completed: "Completed",
    Preparing: "Preparing",
    Pending: "Pending",
  };

  const orderRows = orders.map((order) => (
    <tr key={order}>
      <td className="order-name-cell">
        <img src={order.image} />
        {order.name}
      </td>
      <td>{order.menu[0].description}</td>
      <td>${order.price}</td>
      <td className={orderClassNames[order.status]}>{order.status}</td>
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
