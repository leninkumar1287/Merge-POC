import { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages";
import EINR from "./pages/einr";
import EGOLD from "./pages/egold";
import EUSD from "./pages/eusd";
import STAKING from "./pages/staking";
import LENDING from "./pages/lending";
import launchpad from "./pages/launchpad";
import ConnectWallet from "./pages/connectWallet";
import { Button } from "react-bootstrap";
import useMetaMask from "./hooks/metamask";

function App() {
  const { connect, disconnect, isActive, account, shouldDisable } =
    useMetaMask();

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/EINR" element={<EINR />} />
        <Route path="/EGOLD" element={<EGOLD />} />
        <Route path="/EUSD" element={<EUSD />} />
        <Route path="/STAKING" element={<STAKING />} />
        <Route path="/LENDING" element={<LENDING />} />
        <Route path="/ICO-LAUNCHPADD" element={<launchpad />} />
        <Button variant="secondary" onClick={connect} disabled={shouldDisable}>
          <img
            src="images/metamask.svg"
            alt="MetaMask"
            width="50"
            height="50"
          />{" "}
          Connect to MetaMask
        </Button>
        Connected Account: {isActive ? account : ""}
        <Button variant="danger" onClick={disconnect}>
          Disconnect MetaMask
        </Button>
        {/* <Route path="/connect-wallet" element={<ConnectWallet />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
