import react from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages";
import EINR from "./pages/einr";
import EGOLD from "./pages/egold";
import STAKING from "./pages/staking";
import LENDING from "./pages/lending";
import Inventory from "./pages/inventory";
import ABC from "./pages/abc";
import EUSD from "./pages/eusd";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/EINR" element={<EINR />} />
        <Route path="/EUSD" element={<EUSD />} />
        <Route path="/EGOLD" element={<EGOLD />} />
        <Route path="/Inventory" element={<Inventory />} />
        <Route path="/STAKING" element={<STAKING />} />
        <Route path="/LENDING" element={<LENDING />} />
        <Route path="/ABC" element={<abc />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
