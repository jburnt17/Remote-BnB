import React from "react";
import "./styles.css";
import logo from "../../images/logo.svg";
import {
  GlobeAltIcon,
  MenuIcon,
  SearchIcon,
  UserCircleIcon,
} from "@heroicons/react/solid";

function NavBar() {
  return (
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
        <div className='right-menu-con'>
          <MenuIcon className="icon menu-icon" />
          <UserCircleIcon className="icon user-icon" />
        </div>
      </div>
    </header>
  );
}

export default NavBar;
