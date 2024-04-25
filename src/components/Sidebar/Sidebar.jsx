import { useState } from "react";
import "./Sidebar.scss";
import leftArrow from "/left-arrow.svg";
import home from "/Home.svg";
import discount from "/Discount.svg";
import dashboard from "/Dashboard.svg";
import message from "/Message.svg";
import settings from "/Setting.svg";
import logOut from "/Log Out.svg";

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
          <li><img src="../../public/Logo.png" alt="logo" className="logo" /></li>
          <li className="icons"><img src = {home}></img></li>
          <li className="icons"><img src = {discount}></img></li>
          <li className="icons"><img src = {dashboard}></img></li>
          <li className="icons"><img src = {message}></img></li>
          <li className="icons"><img src = {settings}></img></li>
          <li className="icons"><img className="logOut" src = {logOut}></img></li>

        </ul>
      </nav>
      {/* these examples should be deleted */}
    </aside>
  );
}

export default Sidebar;
