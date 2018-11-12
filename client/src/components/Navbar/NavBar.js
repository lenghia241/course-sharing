import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import Signout from "../Auth/Signout";

function NavBar({ session }) {
  return (
    <Fragment>
      <div className="container ">
        {session && session.getCurrentUser ? <NavbarAuth /> : <NavbarUnauth />}
        <br />
      </div>
    </Fragment>
  );
}

const NavbarAuth = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <NavLink className="navbar-brand" to="/">
        Course Sharing
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link" to="/">
              Home <span className="sr-only">(current)</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/search">
              Search
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/addcourse">
              Add Course
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/profile">
              Profile
            </NavLink>
          </li>

          <Signout />
        </ul>
      </div>
    </nav>
  );
};

const NavbarUnauth = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <NavLink className="navbar-brand" to="/">
        Course Sharing
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link" to="/">
              Home <span className="sr-only">(current)</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/search">
              Search
            </NavLink>
          </li>
          <li className="nav-item dropdown">
            <button
              className="nav-link dropdown-toggle btn"
              id="navbarDropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Account
            </button>
            <div
              className="dropdown-menu"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <NavLink className="dropdown-item" to="/signin">
                Sign in
              </NavLink>
              <NavLink className="dropdown-item" to="/signup">
                Sign up
              </NavLink>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
