import "./SettingsSidebar.scss";
import { NavLink } from "react-router-dom";
import tabs from "./Tabs";

function SettingsSidebar() {
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
