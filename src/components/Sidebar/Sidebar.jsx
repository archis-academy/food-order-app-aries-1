import "./Sidebar.scss";
import { NavLink } from "react-router-dom";
import sidebarLinks from "./SidebarLinks";
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebase";
import { useAuth } from "@/components/AuthProvider";
import Loading from "../Loading/Loading";

function Sidebar() {
  const { fireStoreUser } = useAuth();

  if (!fireStoreUser) return <Loading />;
  const filteredSidebarLinks = sidebarLinks.filter((link) =>
    link.role.includes(fireStoreUser.role)
  );
  return (
    <aside className="sidebar">
      <nav>
        <ul>
          {filteredSidebarLinks.map((link, index) => {
            return (
              <div key={index} className="navbar-items">
                <div className="nav-items">
                  <li className="nav-item">
                    {link.path === "/login" ? (
                      <NavLink
                        replace={true}
                        to={link.path}
                        onClick={() => {
                          signOut(auth);
                        }}
                      >
                        {link.icon}
                      </NavLink>
                    ) : (
                      <NavLink
                        to={link.path}
                        className={({ isActive }) => isActive && "active-link"}
                      >
                        {link.icon}
                      </NavLink>
                    )}
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
