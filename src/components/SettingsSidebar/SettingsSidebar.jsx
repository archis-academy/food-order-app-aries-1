import SettingsList from "../SettingsList/SettingsList";
import "./SettingsSidebar.scss";
import {
  aboutUs,
  appereance,
  discount,
  restaurant,
  notification,
  security,
} from "./SettingsIcons";

function SettingsSidebar() {
  return (
    <>
      <div className="sidebar-container">
        <div className="list-group first-list-item active-list-item">
          <SettingsList
            icon={appereance}
            title="Appereance"
            detail="Dark and light mode, font size"
          />
        </div>
        <div className="list-group">
          <SettingsList
            icon={restaurant}
            title="Your Restaurant"
            detail="Dark and light mode, font size"
          />
        </div>
        <div className="list-group">
          <SettingsList
            icon={discount}
            title="Products Management"
            detail="Manage your product, pricing, etc"
          />
        </div>
        <div className="list-group">
          <SettingsList
            icon={notification}
            title="Notifications"
            detail="Customize your notifications"
          />
        </div>
        <div className="list-group">
          <SettingsList
            icon={security}
            title="Security"
            detail="Configure your password, PIN, etc"
          />
        </div>
        <div className="list-group">
          <SettingsList
            icon={aboutUs}
            title="About Us"
            detail="Find out more about posly"
          />
        </div>
      </div>
    </>
  );
}

export default SettingsSidebar;
