// import { useState } from "react";
import "./Sidebar.scss";
import { NavLink } from "react-router-dom";
import sidebarLinks from "./SidebarLinks";

function Sidebar() {
  return (
    <aside className="sidebar">
      <nav>
        <ul>
          {sidebarLinks.map((link, index) => {
            return (
              <div key={index} className="navbar-items">
                <div className="nav-items">
                  <li className="nav-item">
                    <NavLink
                      to={link.path}
                      className={({ isActive }) => isActive && "active-link"}
                    >
                      {link.icon}
                    </NavLink>
                  </li>
                </div>
              </div>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
