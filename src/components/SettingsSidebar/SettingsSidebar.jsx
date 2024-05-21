import "./SettingsSidebar.scss";
import { NavLink } from "react-router-dom";
import {
  aboutUs,
  appereance,
  discount,
  restaurant,
  notification,
  security,
} from "./SettingsIcons";

function SettingsSidebar() {
  const tabs = [
    {
      id: 1,
      icon: appereance,
      title: "Appereance",
      detail: "Dark and light mode, font size",
      path: "/settings/appereance",
    },
    {
      id: 2,
      icon: restaurant,
      title: "Your Restaurant",
      detail: "Dark and light mode, font size",
      path: "/settings/your-restaurant",
    },
    {
      id: 3,
      icon: discount,
      title: "Products Management",
      detail: "Manage your product, pricing, etc",
      path: "/settings/product-management",
    },
    {
      id: 4,
      icon: notification,
      title: "Notifications",
      detail: "Customize your notifications",
      path: "/settings/notifications",
    },
    {
      id: 5,
      icon: security,
      title: "Security",
      detail: "Configure your password, PIN, etc",
      path: "/settings/security",
    },
    {
      id: 6,
      icon: aboutUs,
      title: "About Us",
      detail: "Find out more about posly",
      path: "/settings/about-us",
    },
  ];

  return (
    <div className="sidebar-container">
      {tabs.map((tab) => (
        <NavLink
          key={tab.id}
          to={tab.path}
          className={({ isActive }) => {
            return isActive && "active";
          }}
        >
          <div className="list-group">
            {tab.icon}
            <div className="list-title-box">
              <h4>{tab.title}</h4>
              <p>{tab.detail}</p>
            </div>
          </div>
        </NavLink>
      ))}
    </div>
  );
}

export default SettingsSidebar;
