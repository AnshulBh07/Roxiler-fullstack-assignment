import React from "react";
import { Link } from "react-router-dom";
import { navItems } from "../services/NavbarItems";
import Logo from "../assets/images/logo.jpeg";
import "../sass/navbarStyles.scss";

function Navbar() {
  return (
    <div className="container-main__navbar">
      <div className="container-nav__logo">
        <img src={`${Logo}`} alt="app-logo" className="logo" />
        <p className="brand-title">RoxiMart</p>
      </div>

      <ul className="container-nav__links">
        {/* returns a list of navbar links */}
        {navItems.map((item, index) => {
          return (
            <li className="navbar-item" key={index}>
              {item.icon}
              <Link to={"#"} className="navitem-link">
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Navbar;
