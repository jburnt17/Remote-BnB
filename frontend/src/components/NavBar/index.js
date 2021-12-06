import React from "react";
import { useState, useEffect } from "react";
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

  useEffect(() => {
    const menu = document.querySelector('#modal-id');
    if (!menuVis) {
      menu.style.display = 'flex'
    } else {
      menu.style.display = 'none'
    }
    console.log('hello')
  }, [menuVis]);

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
          <div className="user-modal-con" id="modal-id">
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
