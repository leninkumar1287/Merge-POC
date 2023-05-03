const Web3 = require("web3");

const EINRArtifact = require("../../Frontend/react-frontend/src/ABI/EINR.json");
const EUSDArtifact = require("../../Frontend/react-frontend/src/ABI/EUSD.json");
const EGOLDArtifact = require("../../Frontend/react-frontend/src/ABI/EGOLD.json");
const InventoryArtifact = require("../../Frontend/react-frontend/src/ABI/Inventory.json");

const web3Func = async () => {
  let web3,
    networkID,
    EINRContract,
    einrADDRESS,
    einrABI,
    eusdABI,
    egoldABI,
    inventoryABI,
    EUSDContract,
    eusdAddress,
    egoldAddress,
    EGOLDContract,
    inventoryAddress,
    InventoryContract;

  try {
    // web3 = new Web3(
    //   `${
    //     process.env.MONGODB == "EGOLD"
    //       ? process.env.GIVEN_PROVIDER_SERVER
    //       : process.env.GIVEN_PROVIDER_LOCALHOST
    //   }`
    // );

    // web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
    web3 = new Web3("https://rpc-mumbai.maticvigil.com");

    networkID = await web3.eth.net.getId();
    if (EINRArtifact && EUSDArtifact && EGOLDArtifact && InventoryArtifact) {
      einrADDRESS = EINRArtifact.EINRADDRESS;
      einrABI = EINRArtifact.ABI;

      try {
        EINRContract = new web3.eth.Contract(einrABI, einrADDRESS);
      } catch (error) {
        console.log(error);
      }

      eusdAddress = EUSDArtifact.EUSDADDRESS;
      eusdABI = EUSDArtifact.EUSDABI;

      try {
        EUSDContract = new web3.eth.Contract(eusdABI, eusdAddress);
      } catch (error) {
        console.log(error);
      }

      egoldAddress = EGOLDArtifact.EGOLDADDRESS;
      egoldABI = EGOLDArtifact.EGOLDABI;

      try {
        EGOLDContract = new web3.eth.Contract(egoldABI, egoldAddress);
      } catch (error) {
        console.log(error);
      }

      inventoryAddress = InventoryArtifact.InventoryAddress;
      inventoryABI = InventoryArtifact.ABI;

      try {
        InventoryContract = new web3.eth.Contract(
          inventoryABI,
          inventoryAddress
        );
      } catch (error) {
        console.log(error);
      }

      return {
        web3,
        networkID,
        einrADDRESS,
        EINRContract,
        eusdAddress,
        EUSDContract,
        egoldAddress,
        EGOLDContract,
        inventoryAddress,
        InventoryContract,
        einrABI,
        eusdABI,
        egoldABI,
        inventoryABI,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { web3Func };
