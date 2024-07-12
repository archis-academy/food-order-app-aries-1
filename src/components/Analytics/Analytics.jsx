import "./Analytics.scss";

function Analytics({ analyticInfo }) {
  return (
    <div className="analytic-container">
      <div className="ratio-container">
        <img
          className="analytic-icon"
          src={analyticInfo.analyticIcon}
          alt="icon"
        />
        <div className="ratio">
          <span>{analyticInfo.ratio}%</span>
          <img src={analyticInfo.ratioIcon} alt="ratio-icon" />
        </div>
      </div>
      <span className="total-number">{analyticInfo.total}</span>
      <p className="total-title">{analyticInfo.totalTitle}</p>
    </div>
  );
}
export default Analytics;
