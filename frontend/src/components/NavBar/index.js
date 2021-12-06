import React from "react";
import { useState, useEffect, useRef } from "react";
import "./styles.css";
import logo from "../../images/remote-logo.svg";
import {
  GlobeAltIcon,
  MenuIcon,
  SearchIcon,
  UserCircleIcon,
} from "@heroicons/react/solid";

function NavBar() {
  const [menuVis, setMenuVis] = useState(false);
  const initial = useRef(true);
  useEffect(() => {
    const menuCon = document.querySelector(".user-modal-con");
    const menu = document.querySelector(".user-modal");
    if (!menuVis && !initial.current) {
      menuCon.style.display = "flex";
      menu.style.display = "inline";
    } else {
      menuCon.style.display = "none";
      menu.style.display = "none";
    }
  }, [menuVis]);

  useEffect(() => {
    initial.current = false;
  }, []);

  return (
    <>
      <header className="nav-con">
        {/* left */}
        <div className="logo-con">
          <img className="logo" src={logo} />
        </div>
        {/* middle */}
        <div className="search-con">
          <input className="input" placeholder="Start your search" />
          <SearchIcon className="icon search-icon" />
        </div>
        {/* right */}
        <div className="right-con">
          <p className="host">Become a host</p>
          <GlobeAltIcon className="icon globe" />
          <div onClick={() => setMenuVis(!menuVis)} className="right-menu-con">
            <MenuIcon className="icon menu-icon" />
            <UserCircleIcon className="icon user-icon" />
          </div>
          <div className="user-modal-con">
            <ul className="user-modal">
              <li className="login">Login</li>
              <li>Sign Up</li>
              <li>Host your home</li>
            </ul>
          </div>
        </div>
      </header>
    </>
  );
}

export default NavBar;
