import "./SettingsSidebar.scss";
import { NavLink } from "react-router-dom";
import tabs from "./Tabs";
import { useAuth } from "@/components/AuthProvider";
import Loading from "../Loading/Loading";

function SettingsSidebar() {
  const { fireStoreUser } = useAuth();

  if (!fireStoreUser) return <Loading />;

  const filteredTabs = tabs.map((tab) => {
    if (tab.role.includes(fireStoreUser.role)) {
      return (
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
      );
    }
  });

  return <div className="sidebar-container">{filteredTabs}</div>;
}

export default SettingsSidebar;
