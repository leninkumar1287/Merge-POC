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
import { Button } from "react-bootstrap";
import useMetaMask from "../../hooks/metamask";
import background from "../../img/bg2.jpg";

const Navbar = () => {
  const { connect, disconnect, isActive, account, shouldDisable } =
    useMetaMask();

  return (
    <>
      <Nav
        style={{
          backgroundImage: `url(${background})`,
          backgroundRepeat: "no-repeat",
        }}
      >
        <NavLogo to="/">NEO DAPP</NavLogo>
        <Bars />

        <NavMenu>
          <NavLink to="/EINR" activeStyle={{ color: "black" }}>
            EINR
          </NavLink>
          <NavLink to="/EUSD" activeStyle={{ color: "black" }}>
            EUSD
          </NavLink>
          <NavLink to="/EGOLD" activeStyle={{ color: "black" }}>
            EGOLD
          </NavLink>

          <NavLink to="/INVENTORY" activeStyle={{ color: "black" }}>
            INVENTORY
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
            {account === undefined && (
              <Button
                variant="light"
                onClick={connect}
                disabled={shouldDisable}
              >
                <img
                  src="images/metamask.svg"
                  alt="MetaMask"
                  width="50"
                  height="40"
                />{" "}
                Connect Wallet
              </Button>
            )}
            {/* Connected Account: {isActive ? account : ""} */}
            {account != null && (
              <Button variant="btn btn-success" onClick={disconnect}>
                <img
                  src="images/metamask.svg"
                  alt="MetaMask"
                  width="50"
                  height="40"
                />
                Disconnect Wallet
              </Button>
            )}
          </NavBtn>
        </NavMenu>
      </Nav>
    </>
  );
};
export default Navbar;
