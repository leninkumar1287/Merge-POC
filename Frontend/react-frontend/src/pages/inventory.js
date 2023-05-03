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
import inventoryArtifact from "../ABI/Inventory.json";

function Inventory({ backdrop, setBackdrop, tx, setTx, receipt, setReceipt }) {
  const inventoryAddress = inventoryArtifact.InventoryAddress;
  const inventoryABI = inventoryArtifact.ABI;

  const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

  const InventoryContract = new web3.eth.Contract(
    inventoryABI,
    inventoryAddress
  );
  const { account } = useMeta();
  const [inventory, setInventory] = useState("");
  const [eGOLDRatio, seteGOLDRatio] = useState("");

  const [_inventory, set_Inventory] = useState("");
  const [_eGOLDRatio, set_eGOLDRatio] = useState("");

  useEffect(() => {
    if (account) {
      setTimeout(async () => {
        getDataHandler();
      });
    } else {
      setInventory(null);
      seteGOLDRatio(null);
    }
  }, [account]);

  const getDataHandler = async () => {
    await InventoryContract.methods
      .inventory()
      .call({ from: account })
      .then((e) => {
        //console.log(e);
        setInventory(e);
      })
      .catch((err) => console.log(err));

    await InventoryContract.methods
      .eGOLDratio()
      .call({ from: account })
      .then((e) => {
        //console.log(e);
        seteGOLDRatio(Web3.utils.fromWei(e, "ether"));
      })
      .catch((err) => console.log(err));
  };

  const setInventoryHandler = (e) => {
    const regex = /^[0-9]*$/; // regular expression to allow only whole numbers
    if (regex.test(e.target.value)) {
      set_Inventory(e.target.value);
    }
  };

  const addInventory = async () => {
    if (!account) {
      alert("Please Connect Wallet.");
      return;
    }
    if (_inventory === "") {
      alert("Quantity should not be zero.");
      return;
    }
    setBackdrop(true);
    await InventoryContract.methods
      .addInventory(_inventory)
      .send({
        from: account,
      })
      .then((e) => {
        // console.log(e);
        setReceipt(e);
        setTx(true);
      })
      .catch((err) => {
        setBackdrop(false);
        console.log(err);
      });
    getDataHandler();
    set_Inventory("");
  };

  const removeInventory = async () => {
    if (!account) {
      alert("Please Connect Wallet.");
      return;
    }
    if (_inventory === "") {
      alert("Quantity should not be zero.");
      return;
    }
    setBackdrop(true);
    await InventoryContract.methods
      .removeInventory(_inventory)
      .send({
        from: account,
      })
      .then((e) => {
        //console.log(e);
        setReceipt(e);
        setTx(true);
      })
      .catch((err) => {
        setBackdrop(false);
        console.log(err);
      });
    getDataHandler();
    set_Inventory("");
  };

  return (
    <MDBContainer className="my-5 gradient-form">
      <div align="center">
        {" "}
        <img src={img} style={{ width: "185px" }} alt="logo" />
        <br /> <br />
      </div>
      <MDBRow>
        <MDBCol col="6" className="mb-5">
          <div className="d-flex flex-column ms-5">
            <div className="text-center">
              <h4 className="mt-1 mb-5 pb-1"> INVENTORY </h4>
            </div>
            <MDBInput
              wrapperClass="mb-4"
              onChange={setInventoryHandler}
              value={_inventory}
              type="number"
              min={1}
              placeholder="GOLD qty. (grams)"
            />
            <br />
            <div className="text-center pt-1 mb-5 pb-1">
              <MDBBtn
                className="mb-4 w-50 gradient-custom-2"
                onClick={addInventory}
              >
                Add
              </MDBBtn>
              <MDBBtn
                className="mb-4 w-50 gradient-custom-2"
                onClick={removeInventory}
              >
                Remove
              </MDBBtn>
            </div>
          </div>
        </MDBCol>

        <MDBCol col="6" className="mb-5">
          <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-80 mb-4">
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

              <h4 className="mb-4"> Inventory </h4>
              <h4 className="mt-1 mb-5 pb-1">
                <Table striped bordered hover>
                  <tbody>
                    <tr>
                      <th>1</th>
                      <th>Inventory </th>
                      <td>{inventory ? `${inventory} grams` : "--"}</td>
                    </tr>
                  </tbody>
                  <tbody>
                    <tr>
                      <th>2</th>
                      <th>EGOLD Per grams </th>
                      <td>{eGOLDRatio ? `${eGOLDRatio} EGOLD` : "--"}</td>
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

export default Inventory;
