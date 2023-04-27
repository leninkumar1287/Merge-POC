import React from "react";
import {
  Nav,
  NavLogo,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./NavbarElements";

const Navbar = () => {
  return (
    <>
      <Nav>
        <NavLogo to="/">NEO DAPP</NavLogo>
        <Bars />

        <NavMenu>
          <NavLink to="/EINR" activeStyle={{ color: "black" }}>
            EINR
          </NavLink>
          <NavLink to="/EGOLD" activeStyle={{ color: "black" }}>
            EGOLD
          </NavLink>
          <NavLink to="/EUSD" activeStyle={{ color: "black" }}>
            EUSD
          </NavLink>
          <NavLink to="/STAKING" activeStyle={{ color: "black" }}>
            STAKING
          </NavLink>
          <NavLink to="/LENDING" activeStyle={{ color: "black" }}>
            LENDING
          </NavLink>
          <NavLink to="/ICO-LAUNCHPAD" activeStyle={{ color: "black" }}>
            ICO-LAUNCHPAD
          </NavLink>
          <NavBtn>
            <NavBtnLink to="/connect-wallet">Connect Wallet</NavBtnLink>
          </NavBtn>
        </NavMenu>
      </Nav>
    </>
  );
};
export default Navbar;
