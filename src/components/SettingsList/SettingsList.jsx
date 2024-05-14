import "./SettingsList.scss";

function SettingsList({ icon, title, detail }) {
  return (
    <div className="list-container">
      {icon}
      <div className="list-title-container">
        <h4>{title}</h4>
        <p className="list-detail">{detail}</p>
      </div>
    </div>
  );
}
export default SettingsList;
