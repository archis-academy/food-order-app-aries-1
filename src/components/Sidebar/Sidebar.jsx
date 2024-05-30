import { useState } from "react";
import "./Sidebar.scss";
import leftArrow from "/left-arrow.svg";
import { Outlet, Link } from "react-router-dom";

function Sidebar() {
  const [isSidebarToggled, setIsSidebarToggled] = useState(false);

  function toggleSidebar() {
    setIsSidebarToggled(!isSidebarToggled);
  }

  return (
    <aside className={`sidebar ${!isSidebarToggled && "sidebar-collapsed"}`}>
      {/* these examples should be deleted */}
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
          <li className="nav-item">
            <Link to="/">
              <img src="../../../public/home-icon.svg"></img>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/dashboard">
              <img src="../../../public/dashboard-icon.svg"></img>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/settings/:tabName">
              <img src="../../../public/settings-icon.svg"></img>
            </Link>
          </li>
        </ul>
      </nav>
      <Outlet />
      {/* these examples should be deleted */}
    </aside>
  );
}

export default Sidebar;
