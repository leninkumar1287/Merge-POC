import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";
import Web3 from "web3";
import img from "../../src/img/2.png";
import Tx from "./Tx";
import useMeta from "../../src/hooks/metamask";

import Table from "react-bootstrap/Table";
import eusdArtifact from "../ABI/EUSD.json";
import StripePayment from "./StripePayment";

function EUSD({ backdrop, setBackdrop, tx, setTx, receipt, setReceipt }) {
  const eusdAddress = eusdArtifact.EUSDADDRESS;
  const eusdABI = eusdArtifact.EUSDABI;

  const web3 = new Web3(Web3.givenProvider);

  const EUSDContract = new web3.eth.Contract(eusdABI, eusdAddress);
  const { account } = useMeta();

  const [myBalance, setMyBalance] = useState("");

  const [mint, setMint] = useState("null");

  const [_Tx, set_Tx] = useState(false);
  const [success, setSuccess] = useState(false);
  const [RID, setRID] = useState("");

  useEffect(() => {
    if (account) {
      setTimeout(async () => {
        getDataHandler();
      }, 100);
    } else {
      setMyBalance(null);
    }
  }, [account]);

  useEffect(() => {
    if (success) {
      setBackdrop(true);
      setTx(true);
      setMint("0");
      setTimeout(async () => {
        getDataHandler();
        setSuccess(false);
      }, 6000);
    }
  }, [success]);
  const getDataHandler = async () => {
    await EUSDContract.methods
      .balanceOf(account)
      .call({ from: account })
      .then((e) => {
        //console.log(e);
        setMyBalance(Web3.utils.fromWei(e, "ether"));
        // setMyBalance(e);
      })
      .catch((err) => console.log(err));
  };

  const setMintHandler = (e) => {
    const regex = /^[0-9]*$/; // regular expression to allow only whole numbers
    if (regex.test(e.target.value)) {
      setMint(e.target.value);
    }
  };

  const mintEUSD = async () => {
    if (!account) {
      alert("Please Connect Wallet.");
      return;
    }
    if (mint === "0") {
      alert("Mint amount should be greater than 0");
      return;
    }
    set_Tx(true);
  };

  return (
    <MDBContainer className="my-5 gradient-form">
      <div align="center">
        <img src={img} style={{ width: "185px" }} alt="logo" />
      </div>
      <br />
      <br />
      {_Tx && (
        <StripePayment
          _Tx={_Tx}
          set_Tx={set_Tx}
          setReceipt={setReceipt}
          success={success}
          setSuccess={setSuccess}
          setRID={setRID}
          totalPrice={mint}
          account={account}
          from="USD"
          to="EUSD"
        />
      )}
      <MDBRow>
        <MDBCol col="6" className="mb-5">
          <div className="d-flex flex-column ms-5">
            <div className="text-center">
              <h4 className="mt-1 mb-5 pb-1"> EUSD</h4>
            </div>
            <MDBInput
              wrapperClass="mb-4"
              id="form1"
              type="number"
              onChange={setMintHandler}
              value={mint}
              min={1}
              placeholder="Enter EUSD Amount"
            />
            <div className="text-center pt-1 mb-5 pb-1">
              <MDBBtn
                className="mb-4 w-100 gradient-custom-2"
                onClick={mintEUSD}
              >
                MINT EUSD
              </MDBBtn>
            </div>
          </div>
        </MDBCol>

        <MDBCol col="6" className="mb-5">
          <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-90 mb-4">
            <div className="text-white px-3 py-4 p-md-5 mx-md-4">
              {backdrop && (
                <Tx
                  backdrop={backdrop}
                  setBackdrop={setBackdrop}
                  tx={tx}
                  setTx={setTx}
                  receipt={receipt}
                  setReceipt={setReceipt}
                />
              )}

              <h4 className="mb-4"> Total EUSD Balance</h4>
              <h4 className="mt-1 mb-5 pb-1">
                <Table striped bordered hover>
                  <tbody>
                    <tr>
                      <th>1</th>
                      <th>My Balance</th>
                      <td>{myBalance ? `${myBalance} EUSD` : "--"}</td>
                    </tr>
                  </tbody>
                </Table>
              </h4>
            </div>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default EUSD;
