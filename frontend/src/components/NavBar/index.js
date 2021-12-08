import { useState, useEffect, useRef, React } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import logo from "../../images/remote-logo.svg";
import {
  GlobeAltIcon,
  MenuIcon,
  SearchIcon,
  UserCircleIcon,
} from "@heroicons/react/solid";

import './navbar.css';

function NavBar() {
  const [menuVis, setMenuVis] = useState(true);
  const dispatch = useDispatch();

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  useEffect(() => {
    const menuCon = document.querySelector(".user-modal-con");
    const menu = document.querySelector(".user-modal");
    if (!menuVis) {
      menuCon.style.display = "flex";
      menu.style.display = "inline";
    } else {
      menuCon.style.display = "none";
      menu.style.display = "none";
    }
  }, [menuVis]);


  return (
    <>
      <header className="nav-con">
        {/* left */}
        <NavLink to='/' className="logo-con">
          <img className="logo" src={logo} alt="logo" />
        </NavLink>
        {/* middle */}
        <div className="search-con">
          <input className="input" placeholder="Start your search" />
          <SearchIcon className="icon search-icon" />
        </div>
        {/* right */}
        <div className="right-con">
          <NavLink className="right-con" to="/api/host">
            <p className="host">Become a host</p>
            <GlobeAltIcon className="icon globe" />
          </NavLink>
          <div onClick={() => setMenuVis(!menuVis)} className="right-menu-con">
            <MenuIcon className="icon menu-icon" />
            <UserCircleIcon className="icon user-icon" />
          </div>
          <div className="user-modal-con">
            <ul className="user-modal">
              <li>
                <NavLink to="/login" className="login">
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to="/signup">Sign Up</NavLink>
              </li>
              <li onClick={logout}>Logout</li>
            </ul>
          </div>
        </div>
      </header>
    </>
  );
}

export default NavBar;
