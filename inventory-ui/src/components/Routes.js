import React, { Fragment, useState } from "react";
import Warehouse from "./Warehouse";
import Order from "./Order";
import Users from "./Users";
import Product from "./Product";
import Dashboard from "./Dashboard";
import Login from "./Login";

import { Route, Redirect } from "react-router-dom";
import ProductDetails from "./ProductDetails";

import { useSelector } from "react-redux";

import { Row, Col, Card, Typography } from "antd";

const { Title } = Typography;

function Routes() {
  const logged = useSelector(state => state.logovani.logged);
  console.log("Logovan je u Routes:", logged);
  return (
    <Fragment>
      <Route exact path="/">
        {logged ? <Dashboard /> : <Redirect to="/login"></Redirect>}
      </Route>
      {logged && (
        <Route exact path="/staff">
          <Users />
        </Route>
      )}
      {logged && (
        <Route exact path="/products">
          <Product />
        </Route>
      )}
      {logged && (
        <Route exact path="/warehouses">
          <Warehouse />
        </Route>
      )}
      {logged && (
        <Route exact path="/orders">
          <Order />
        </Route>
      )}
      {logged && (
        <Route exact path="/product-details">
          <ProductDetails />
        </Route>
      )}
      {logged && (
        <Route exact path="/add-product">
          <ProductDetails />
        </Route>
      )}
      {!logged && (
        <Route exact path="/login">
          {/*<Row style={{ height: "100vh" }} justify="space-around" align="middle">
            <Col span={12}>
              <Login />
            </Col>
      </Row>*/}
          <Row style={{ height: "100vh" }} justify="space-around" align="middle">
            <Col span={12}>
              <Card title={<Title level={2}>Login</Title>} style={{ textAlign: "center", fontSize: "20px" }}>
                <Login />
              </Card>
            </Col>
          </Row>
        </Route>
      )}
    </Fragment>
  );
}

export default Routes;
