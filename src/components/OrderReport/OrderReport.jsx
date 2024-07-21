import "./OrderReport.scss";
import { useState, useEffect } from "react";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import Loading from "../Loading/Loading";

const OrderCard = () => {
  const orderClassNames = {
    completed: "completed",
    preparing: "preparing",
    pending: "pending",
  };

  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleStatusChange = async (e, id) => {
    const newStatus = e.target.value;
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
    const docRef = doc(db, "orders", id);

    await updateDoc(docRef, { status: newStatus });
  };

  useEffect(() => {
    const fetchOrders = async () => {
      const ordersData = await getSortedOrders();
      setOrders(ordersData);
    };

    fetchOrders();
    setIsLoading(false);
  }, []);

  const getSortedOrders = async () => {
    const ordersCollection = collection(db, "orders");
    const ordersQuery = query(ordersCollection, orderBy("timestamp", "desc"));
    const ordersSnapshot = await getDocs(ordersQuery);
    const ordersList = ordersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return ordersList;
  };

  if (isLoading) return <Loading />;

  const orderRows = orders.map((order) => (
    <tr key={order.id}>
      <td className="order-name-cell">
        <img className="order-image" src={order.customer.image} />
        {order.customer.displayName}
      </td>
      <td>
        {order.menu.map((item, index) => (
          <div key={index}>- {item.name}</div>
        ))}
      </td>
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
    <div className="order-report-main-div">
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
    </div>
  );
};

export default OrderCard;
