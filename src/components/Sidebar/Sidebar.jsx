import { useState } from "react";
import "./Sidebar.scss";
import leftArrow from "/left-arrow.svg";

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
          <li>Link 1</li>
          <li>Link 2</li>
          <li>Link 3</li>
          <li>Link 4</li>
        </ul>
      </nav>
      {/* these examples should be deleted */}
    </aside>
  );
}

export default Sidebar;
