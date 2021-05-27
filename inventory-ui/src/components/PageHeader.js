import React, { useState } from "react";
import { Avatar, Row, Col } from "antd";

import { useSelector } from "react-redux";

import ProductsNotification from "./ProductsNotification";

function PageHeader() {
  //const [ikonicaAvatara, setIkonicaAvatara] = useState("U");
  const logged = useSelector(state => state.logovani.logged);
  const ikonicaAvatara = useSelector(state => state.logovani.currentlyLoggedUser.username !== undefined &&
    state.logovani.currentlyLoggedUser.username !== null ? state.logovani.currentlyLoggedUser.username.charAt(0).toUpperCase() : "");

  return (
    <Row style={{ display: "flex", alignItems: "center", lineHeight: "80px" }}>
      <Col span="22" style={{ height: "80px" }}>
        <h1 style={{ color: "white", margin: "0px" }}>Inventory App</h1>
      </Col>
      {/*<Col span="2">
        {logged ? <ProductsNotification /> : ""}
      </Col>*/}
      <Col span="2" type="flex" style={{ alignItems: "center" }}>
        {logged ? <Avatar
          style={{
            color: "#f56a00",
            backgroundColor: "#fde3cf",
            float: "right",
          }}
        >
          {ikonicaAvatara}
        </Avatar> : ""}
      </Col>
    </Row >
  );
}
export default PageHeader;
