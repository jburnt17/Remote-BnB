import { useState, useEffect, useRef, React } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import logo from "../../images/remote-logo.svg";
import {
  GlobeAltIcon,
  MenuIcon,
  SearchIcon,
} from "@heroicons/react/solid";

import "./navbar.css";
import { Avatar } from "@mui/material";
import { fetchUsers } from "../../store/users";

function NavBar() {
  const [menuVis, setMenuVis] = useState(true);
  const [search, setSearch] = useState();
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const usersObj = useSelector((state) => state.users);

  const users = Object.values(usersObj);

  const handleChange = (e) => {
    setSearch(e.target.value);
  }

  const logout = (e) => {
    e.preventDefault();
    history.push("/login");
    dispatch(sessionActions.logout());
  };
  useEffect(() => {
    dispatch(fetchUsers());
  }, [])

  useEffect(() => {
    const menuCon = document.querySelector(".user-modal-con");
    const menu = document.querySelector(".user-modal");
    if (!menuVis && sessionUser) {
      menuCon.style.display = "flex";
      menu.style.display = "inline";
    } else if (!menuVis && !sessionUser) {
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
        <NavLink to="/" className="logo-con">
          <img className="logo" src={logo} alt="logo" />
        </NavLink>
        {/* middle */}
        <form className="search-con" onSubmit={() => history.push(`/spots?location=${search}`)}>
          <input className="input" placeholder="Start your search" onChange={(e) => handleChange(e)}/>
          <SearchIcon className="icon search-icon" />
        </form>
        {/* right */}
        <div className="right-con">
          <NavLink className="right-con" to="/host">
            <p className="host">Become a host</p>
            <GlobeAltIcon className="icon globe" />
          </NavLink>
          <div onClick={() => setMenuVis(!menuVis)} className="right-menu-con">
            <MenuIcon className="icon menu-icon" />
            {/* <UserCircleIcon className="icon user-icon" /> */}
            <Avatar srcSet={users.find((user) => user?.id === sessionUser?.id)?.image} className="icon user-icon" sx={{ width: 32, height: 32 }}/>
          </div>
          <div className="user-modal-con">
            <ul className="user-modal">
              {!sessionUser && (
                <li>
                  <NavLink to="/login" className="login">
                    Login
                  </NavLink>
                </li>
              )}
              {!sessionUser && (
                <li>
                  <NavLink to="/signup">Sign Up</NavLink>
                </li>
              )}
              {sessionUser && <li ><NavLink to="/bookings">Bookings</NavLink></li>}
              {sessionUser && <li onClick={logout}>Logout</li>}
            </ul>
          </div>
        </div>
      </header>
    </>
  );
}

export default NavBar;
