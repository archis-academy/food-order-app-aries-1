import { useState } from "react";
import "./Sidebar.scss";
import leftArrow from "/left-arrow.svg";
import { NavLink } from "react-router-dom";
import sidebarLinks from "./SidebarLinks";

function Sidebar() {
  const [isSidebarToggled, setIsSidebarToggled] = useState(false);

  function toggleSidebar() {
    setIsSidebarToggled(!isSidebarToggled);
  }

  return (
    <aside className={`sidebar ${!isSidebarToggled && "sidebar-collapsed"}`}>
      <nav>
        <ul>
          <li className="left-arrow" onClick={toggleSidebar}>
            <img
              src={leftArrow}
              style={{
                transform: !isSidebarToggled
                  ? "rotateY(180deg)"
                  : "rotateY(0deg)",
              }}
            />
          </li>
          {sidebarLinks.map((link, index) => {
            return (
              <div key={index} className="navbar-items">
                <li className="nav-item">
                  <NavLink
                    to={link.path}
                    className={({ isActive }) => isActive && "active-link"}
                  >
                    {link.icon}
                  </NavLink>
                </li>
              </div>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
