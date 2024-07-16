import React from "react";
import Analytics from "../Analytics/Analytics";
import "./AnalyticsHeader.scss";
import useAnalyticInfo from "./AnalyticInfo";

function AnalyticsHeader() {
  const analyticInfo = useAnalyticInfo();

  return (
    <div className="analytics-container">
      <Analytics analyticInfo={analyticInfo.revenue} />
      <Analytics analyticInfo={analyticInfo.dishOrdered} />
      <Analytics analyticInfo={analyticInfo.customer} />
    </div>
  );
}

export default AnalyticsHeader;
