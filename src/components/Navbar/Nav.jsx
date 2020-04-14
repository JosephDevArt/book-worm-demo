import React from "react";
import { useSelector } from "react-redux";

import { ReactComponent as Logo } from "./Logo.svg";

import LinkComp from "./NavLink/LinkComp";
import HamMenu from "./HamMenu/HamMenu";

function Nav() {
  const navIsOpen = useSelector((state) => state.navbar.navIsOpen);

  return (
    <>
      <HamMenu />
      <nav className={`main-nav ${navIsOpen ? "nav-slide-right" : ""}`}>
        <Logo className="logo" alt="logo" />
        <ul>
          <LinkComp name="Home" iconName="fas fa-home" to="/" />
          <LinkComp name="Books" iconName="fas fa-book" to="/Books" />
          <LinkComp name="Read Later" iconName="far fa-star" to="/readLater" />
          <LinkComp name="Posts" iconName="fas fa-paper-plane" to="/Posts" />
        </ul>
      </nav>
    </>
  );
}

export default Nav;
