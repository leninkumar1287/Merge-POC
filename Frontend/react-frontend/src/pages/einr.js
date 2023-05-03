import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";
import Web3 from "web3";
import Table from "react-bootstrap/Table";
import img from "../../src/img/2.png";
import Tx from "./Tx";
import useMeta from "../../src/hooks/metamask";
import RazorPay from "./RazorPay";
import einrArtifact from "../ABI/EINR.json";

function EINR({ backdrop, setBackdrop, tx, setTx, receipt, setReceipt }) {
  const einrAddress = einrArtifact.EINRADDRESS;
  const einrABI = einrArtifact.ABI;

  const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

  const EINRContract = new web3.eth.Contract(einrABI, einrAddress);
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
      }, 4000);
    }
  }, [success]);

  const getDataHandler = async () => {
    await EINRContract.methods
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

  const mintEINR = async () => {
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
      {_Tx && (
        <RazorPay
          _Tx={_Tx}
          set_Tx={set_Tx}
          setReceipt={setReceipt}
          success={success}
          setSuccess={setSuccess}
          setRID={setRID}
          totalPrice={mint}
          account={account}
          from="INR"
          to="EINR"
        />
      )}
      <br />
      <br />

      <MDBRow>
        <MDBCol col="6" className="mb-5">
          <div className="d-flex flex-column ms-5">
            <div className="text-center">
              <h4 className="mt-1 mb-5 pb-1"> EINR</h4>
            </div>
            <MDBInput
              wrapperClass="mb-4"
              onChange={setMintHandler}
              value={mint}
              min={1}
              step={1}
              placeholder="ENTER EINR AMOUNT"
              id="form1"
              type="number"
            />

            <div className="text-center pt-1 mb-5 pb-1">
              <MDBBtn
                className="mb-4 w-100 gradient-custom-2"
                onClick={mintEINR}
              >
                MINT EINR
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

              <h4 className="mb-4"> Total EINR Balance</h4>
              <h4 className="mt-1 mb-5 pb-1">
                {" "}
                {/* {myBalance ? `${myBalance} EINR` : "--"} */}
                <Table striped bordered hover>
                  <tbody>
                    <tr>
                      <th>1</th>
                      <th>My Balance</th>
                      <td>{myBalance ? `${myBalance} EINR` : "--"}</td>
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

export default EINR;
