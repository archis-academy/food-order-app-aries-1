import ApexChart from "@/components/MostTypeOfOrder/ApexChart";
import "./MostTypeOfOrder.scss";
function MostTypeOfOrder() {
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
        <ApexChart />
      </div>
    </div>
  );
}
export default MostTypeOfOrder;
