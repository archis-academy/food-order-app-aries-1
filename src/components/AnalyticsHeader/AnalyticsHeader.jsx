import Analytics from "../Analytics/Analytics";
import "./AnalyticsHeader.scss";
import { revenue, dishOrdered, customer } from "./AnalyticInfo";

function AnalyticsHeader() {
  return (
    <div className="analytics-container">
      <Analytics analyticInfo={revenue} />
      <Analytics analyticInfo={dishOrdered} />
      <Analytics analyticInfo={customer} />
    </div>
  );
}

export default AnalyticsHeader;
