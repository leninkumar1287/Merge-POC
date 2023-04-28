import React from "react";
import { MDBContainer, MDBCol } from "mdb-react-ui-kit";
import "../../src/pages/home.css";
import img from "../../src/img/2.png";

function Home() {
  return (
    <MDBContainer className="my-5 gradient-form">
      <MDBCol col="12" className="mb-5">
        <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-50 mb-4">
          <div className="text-white px-3 py-4 p-md-5 mx-md-4">
            <div className="d-flex flex-column ms-5">
              <div className="text-center">
                <img src={img} style={{ width: "185px" }} alt="logo" />
                <br /> <br /> <br />
                <h4 className="mt-1 mb-5 pb-1">We are The NeoSoft Team</h4>
              </div>
            </div>
            <h4 className="mt-1 mb-5 pb-1">
              <center>Welcome to the Neo Dapp Playground </center>
            </h4>
          </div>
        </div>
      </MDBCol>
    </MDBContainer>
  );
}

export default Home;
