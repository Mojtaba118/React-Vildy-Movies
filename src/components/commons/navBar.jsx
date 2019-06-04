import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand navbar-light bg-light">
      <Link className="navbar-brand" to="#">
        Vidly
      </Link>

      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink to="/movies" className="nav-link">
            Movies
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/customers" className="nav-link">
            Customers
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/rentals" className="nav-link">
            Rentals
          </NavLink>
        </li>
        {!user && (
          <React.Fragment>
            <li className="nav-item">
              <NavLink to="/login" className="nav-link">
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/register" className="nav-link">
                Register
              </NavLink>
            </li>
          </React.Fragment>
        )}

        {user && (
          <React.Fragment>
            <li className="nav-item">
              <NavLink to="/profile" className="nav-link">
                {user.name}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/logout" className="nav-link">
                Logout
              </NavLink>
            </li>
          </React.Fragment>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
