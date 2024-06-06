import ManageIcon from "../../assets/ManageIcon.svg";
import "./SettingsHeader.scss";

function SettingsHeader() {
  return (
    <>
      <div className="header-container">
        <div className="title-container">
          <h2>Products Management</h2>
          <div className="manage-categories">
            <img src={ManageIcon} alt="Manage-Icon" />
            <p>Manage Categories</p>
          </div>
        </div>
      </div>
    </>
  );
}
export default SettingsHeader;
