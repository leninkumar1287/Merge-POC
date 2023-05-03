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
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import RazorPay from "./RazorPay";
import GoldPriceChart from "./GoldPriceChart";
import egoldArtifact from "../ABI/EGOLD.json";

function EGOLD({ backdrop, setBackdrop, tx, setTx, receipt, setReceipt }) {
  const egoldAddress = egoldArtifact.EGOLDADDRESS;
  const egoldABI = egoldArtifact.EGOLDABI;

  const web3 = new Web3(Web3.givenProvider);

  const EGOLDContract = new web3.eth.Contract(egoldABI, egoldAddress);
  const { account } = useMeta();

  const [totalSupply, setTotalSupply] = useState("");
  const [availableSupply, setAvailableSupply] = useState("");
  const [INRperEGOLD, setINRperEGOLD] = useState("");
  const [USDperEGOLD, setUSDperEGOLD] = useState("");
  const [myBalance, setMyBalance] = useState("");

  const [buy, setBuy] = useState("0");
  const [_Tx, set_Tx] = useState(false);
  const [success, setSuccess] = useState(false);
  const [RID, setRID] = useState("");

  const [funcName, setFuncName] = useState(null);

  useEffect(() => {
    if (account) {
      setTimeout(async () => {
        await EGOLDContract.methods
          .totalSupply()
          .call({ from: account })
          .then((e) => {
            //console.log(e);
            setTotalSupply(Web3.utils.fromWei(e, "ether"));
          })
          .catch((err) => console.log(err));

        getDataHandler();
      });
    } else {
      setTotalSupply(null);
      setAvailableSupply(null);
      setUSDperEGOLD(null);
      setINRperEGOLD(null);
      setMyBalance(null);
    }
  }, [account]);

  const getDataHandler = async () => {
    await EGOLDContract.methods
      .availableSupply()
      .call({ from: account })
      .then((e) => {
        //console.log(e);
        setAvailableSupply(Web3.utils.fromWei(e, "ether"));
      })
      .catch((err) => console.log(err));

    await EGOLDContract.methods
      .EGoldPriceINR()
      .call({ from: account })
      .then((e) => {
        //console.log(e);
        setINRperEGOLD(Web3.utils.fromWei(e, "ether"));
      })
      .catch((err) => console.log(err));

    await EGOLDContract.methods
      .EGoldPriceUSD()
      .call({ from: account })
      .then((e) => {
        //console.log(e);
        setUSDperEGOLD(Web3.utils.fromWei(e, "ether"));
      })
      .catch((err) => console.log(err));

    await EGOLDContract.methods
      .balanceOf(account)
      .call({ from: account })
      .then((e) => {
        //console.log(e);
        setMyBalance(Web3.utils.fromWei(e, "ether"));
      })
      .catch((err) => console.log(err));
  };

  const setBuyHandler = (e) => {
    const regex = /^[0-9]*$/; // regular expression to allow only whole numbers
    if (regex.test(e.target.value)) {
      setBuy(e.target.value);
    }
  };

  const __EINR = async () => {
    setBackdrop(true);
    await EGOLDContract.methods
      .buyEGoldEINR(Web3.utils.toWei(buy, "ether"))
      .send({
        from: account,
      })
      .then((e) => {
        //console.log(e);
        setReceipt(e);
        setTx(true);
      })
      .catch(async (err) => {
        setBackdrop(false);
        console.log(err);
      });
    getDataHandler();
    setBuy("0");
    setFuncName("");
  };

  const __EUSD = async () => {
    setBackdrop(true);
    await EGOLDContract.methods
      .buyEGoldEUSD(Web3.utils.toWei(buy, "ether"))
      .send({
        from: account,
      })
      .then((e) => {
        //console.log(e);
        setReceipt(e);
        setTx(true);
      })
      .catch(async (err) => {
        setBackdrop(false);
        console.log(err);
      });
    getDataHandler();
    setBuy("0");
    setFuncName("");
  };

  useEffect(() => {
    if (success) {
      setBackdrop(true);
      setTx(true);
      setBuy("0");
      setTimeout(async () => {
        getDataHandler();
        setSuccess(false);
      }, 6000);
    }
  }, [success]);

  const __cash = () => {
    set_Tx(true);
  };
  const buyGOLD = (e) => {
    if (!account) {
      alert("Please Connect Wallet.");
      return;
    }
    if (availableSupply < buy) {
      alert("Insufficient EGOLD supply.");
      return;
    }
    if (buy === "0") {
      alert("Enter valid quantity of EGOLD.");
      return;
    }

    switch (e) {
      case "EINR":
        __EINR();
        break;

      case "INR":
        __cash();
        break;

      case "EUSD":
        __EUSD();
        break;

      case "USD":
        __cash();
        break;

      default:
        alert("Please select Payment Method.");
    }
  };

  return (
    <MDBContainer className="my-5 gradient-form">
      <div align="center">
        <img src={img} style={{ width: "185px" }} alt="logo" />
      </div>
      <br />
      <br />
      <MDBRow>
        <MDBCol col="6" className="mb-5">
          <div className="d-flex flex-column ms-5">
            <div className="text-center">
              <h4 className="mt-1 mb-5 pb-1"> BUY EGOLD</h4>
            </div>
            <div
              style={{
                padding: "0.5rem",
                display: "flex",
                justifyContent: "center",
                gap: "75px",
              }}
            >
              {funcName && (
                <label>
                  <h5>
                    {`Total Cost : ${
                      funcName.includes("INR")
                        ? INRperEGOLD * buy
                        : USDperEGOLD * buy
                    } ${funcName}`}{" "}
                  </h5>
                </label>
              )}
            </div>
            <MDBInput
              label="Enter EGold Qty."
              wrapperClass="mb-4"
              onChange={setBuyHandler}
              value={buy}
              type="number"
              min={1}
              placeholder="EGOLD Qty."
            />
            <div label>Payment Method : </div>
            <Form>
              <div key="inline-radio" className="mb-3">
                <Form.Check
                  inline
                  label={<strong>EINR</strong>}
                  name="BuyEGOLD"
                  type="radio"
                  id="1"
                  onChange={() => {
                    setFuncName("EINR");
                  }}
                />
                <Form.Check
                  inline
                  label={<strong>INR</strong>}
                  name="BuyEGOLD"
                  type="radio"
                  id="2"
                  onChange={() => {
                    setFuncName("INR");
                  }}
                />
                <Form.Check
                  inline
                  label={<strong>EUSD</strong>}
                  name="BuyEGOLD"
                  type="radio"
                  id="3"
                  onChange={() => {
                    setFuncName("EUSD");
                  }}
                />
                <Form.Check
                  inline
                  label={<strong>USD</strong>}
                  name="BuyEGOLD"
                  type="radio"
                  id="4"
                  onChange={() => {
                    setFuncName("USD");
                  }}
                />
              </div>
            </Form>

            <div className="text-center pt-1 mb-5 pb-1">
              <MDBBtn
                className="mb-4 w-100 gradient-custom-2"
                onClick={() => {
                  buyGOLD(funcName);
                }}
              >
                Buy Gold
              </MDBBtn>
            </div>
            <div style={{ width: "60%" }}>
              <GoldPriceChart />
            </div>
          </div>
        </MDBCol>
        <MDBCol col="6" className="mb-5">
          <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-80 mb-4">
            <div className="text-white px-3 py-4 p-md-5 mx-md-4">
              <div>
                <h1>Data</h1>
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
                <Table striped bordered hover>
                  <tbody>
                    <tr>
                      <th>1</th>
                      <th>Total Supply</th>
                      <td>{totalSupply ? `${totalSupply} EGOLD` : "--"}</td>
                    </tr>
                  </tbody>
                  <tbody>
                    <tr>
                      <th>2</th>
                      <th>Available Supply</th>
                      <td>
                        {availableSupply ? `${availableSupply} EGOLD` : "--"}
                      </td>
                    </tr>
                  </tbody>
                  <tbody>
                    <tr>
                      <th>3</th>
                      <th>INR or EINR Per EGOLD </th>
                      <td>
                        {INRperEGOLD ? `${INRperEGOLD} INR or EINR` : "--"}
                      </td>
                    </tr>
                  </tbody>
                  <tbody>
                    <tr>
                      <th>4</th>
                      <th>USD or EUSD Per EGOLD </th>
                      <td>
                        {USDperEGOLD ? `${USDperEGOLD} USD or EUSD` : "--"}
                      </td>
                    </tr>
                  </tbody>
                  <tbody>
                    <tr>
                      <th>5</th>
                      <th>My Balance</th>
                      <td>{myBalance ? `${myBalance} EGOLD` : "--"}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default EGOLD;
