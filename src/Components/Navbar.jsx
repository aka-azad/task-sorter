import { useContext } from "react";
import AuthContext from "../Context/AuthContext";
import ThemeToggle from "./ThemeToggle";
import { NavLink } from "react-router";

const Navbar = () => {
    const { currentUser, logout } = useContext(AuthContext);

    const links = (
        <>
          <li>
            <NavLink to="/">Overview</NavLink>
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
    <nav>
      <div className="navbar ">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">Task Sorter</a>
        </div>
        <div className="flex-none gap-2">
          <div className="form-control">
            <ThemeToggle/>
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt={currentUser.displayName}
                  src={currentUser.photoURL}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              
              <li>
                <p>{currentUser.displayName}</p>
              </li>
              {links}
              <li>
                <p onClick={logout}>Sign Out</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
