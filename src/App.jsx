import { useContext } from "react";
import { FaBars } from "react-icons/fa";
import AuthContext from "./Context/AuthContext";
import { NavLink, Outlet } from "react-router";

function App() {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);

  const links = (
    <>
      <li>
        <NavLink to="/" >
          Overview
        </NavLink>
      </li>
      
      <li>
        <NavLink to="/todays-task">Today</NavLink>
      </li>
      <li>
        <NavLink to="/future-task">Upcoming</NavLink>
      </li>
      <li>
        <NavLink to="/older-task">Older</NavLink>
      </li>
    </>
  );
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Page content here */}
        <label
          htmlFor="my-drawer-2"
          className="btn w-fit z-50 my-2 mr-20 btn-primary drawer-button lg:hidden"
          style={{
            position: "sticky",
            top: 0,
            right: 0,
            marginLeft: "auto",
          }}
        >
          <FaBars />
        </label>

        <div className="w-full pt-12 h-full">

        <Outlet />
        </div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <li className="flex items-center justify-center hover:cursor-default hover:bg-transparent">
            <div className="avatar">
              <div className="w-24 rounded-full">
                <img
                  loading="lazy"
                  src={currentUser.photoURL}
                  alt={`Image of ${currentUser.displayName}`}
                />
              </div>
            </div>
          </li>
          <li className="menu-title">
            <span>Menu</span>
          </li>
          {links}
        </ul>
      </div>
    </div>
  );
}

export default App;
