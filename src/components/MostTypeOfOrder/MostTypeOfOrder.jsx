import ApexChart from "@/components/MostTypeOfOrder/MostTypeOfOrderApexChart";
import "./MostTypeOfOrder.scss";
function MostTypeOfOrder() {
  return (
    <div className="Most-type-of-order">
      <div className="Most-type-of-order-heading">
        <h3 className="Most-type-of-order-heading-title">Most Type of Order</h3>
        <select className="Most-type-of-order-select">
          <option value="today">Today</option>
          <option value="week">Week</option>
          <option value="months">Months</option>
        </select>
      </div>

      <div className="Most-type-of-order-chart">
        <ApexChart />
      </div>
    </div>
  );
}
export default MostTypeOfOrder;
