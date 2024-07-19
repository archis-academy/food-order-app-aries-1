import ApexChart from "@/components/MostTypeOfOrder/ApexChart";
import "./MostTypeOfOrder.scss";
import { getOrders } from "@/db/orders";
import { useState, useEffect } from "react";

function MostTypeOfOrder() {
  const [orders, setOrders] = useState([]);

  const [orderTypes, setOrderTypes] = useState({
    dineIn: 0,
    toGo: 0,
    delivery: 0,
  });
  useEffect(() => {
    const getOrderList = async () => {
      const orderList = await getOrders();

      setOrders(orderList);
    };
    getOrderList();
  }, []);

  useEffect(() => {
    orderTypeCount();
  }, [orders]);

  function orderTypeCount() {
    const dineInTypes = orders.filter(
      (order) => order.orderType === "Dine In"
    ).length;
    const toGoTypes = orders.filter(
      (order) => order.orderType === "To Go"
    ).length;
    const deliveryTypes = orders.filter(
      (order) => order.orderType === "Delivery"
    ).length;

    setOrderTypes({
      dineIn: dineInTypes,
      toGo: toGoTypes,
      delivery: deliveryTypes,
    });
  }

  return (
    <div className="most-type-of-order">
      <div className="most-type-of-order-heading">
        <h3 className="most-type-of-order-heading-title">Most Type of Order</h3>
        <select className="most-type-of-order-select">
          <option value="today">Today</option>
          <option value="week">Week</option>
          <option value="months">Months</option>
        </select>
      </div>

      <div className="most-type-of-order-chart">
        <ApexChart orderTypes={orderTypes} />
      </div>
    </div>
  );
}
export default MostTypeOfOrder;
