import React, { useEffect, useState } from "react";
// import "./Connect_Wallet.css";
import { useCookies } from "react-cookie";

const Connect_Wallet = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["address"]);
  const [account, setDefaultAccount] = useState(null);
  //const [userBalance, setUserBalance] = useState(null);

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = window.ethereum;
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = window.web3.currentProvider;
    } else {
      window.alert("MetaMask is not installed");
    }
  };

  const LoadBlockchaindata = async () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          setDefaultAccount(result[0]);
          setCookie("address", result[0]);
        });
    } else {
      console.log("Need to install MetaMask");
    }
  };

  const conn = async () => {
    await loadWeb3();
    await LoadBlockchaindata();
  };

  const disconnect = () => {
    removeCookie("address");
    window.location.reload(false);
  };

  useEffect(() => {
    if (cookies.address) {
      loadWeb3();
      LoadBlockchaindata();
    }
  }, []);

  return (
    <>
      <div>
        {account === null && (
          <button className="btn connect-btn" onClick={conn}>
            Connect
          </button>
        )}
        {/* //  {account === undefined && <button className="btn connect-btn" onClick={conn}>Connect</button>} */}
        {/* // {console.log(account)} */}
        {account != null && (
          <button className="btn connect-btn" onClick={disconnect}>
            Logout
          </button>
        )}
      </div>
    </>
  );
};

export default Connect_Wallet;
