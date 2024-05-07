import ManageIcon from "../../assets/ManageIcon.svg";
import "./SettingsHeader.scss";

function SettingsHeader() {
  return (
    <>
      <div className="title-container">
        <h1>Products Management</h1>
        <div className="manage-categories">
          <img src={ManageIcon} alt="Manage-Icon" />
          <p>Manage Categories</p>
        </div>
      </div>
    </>
  );
}
export default SettingsHeader;
