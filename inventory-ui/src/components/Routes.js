import React, { Fragment, useState } from "react";
import Warehouse from "./Warehouse";
import Order from "./Order";
import Users from "./Users";
import Product from "./Product";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Register from "./Register";
import Customers from "./Customers";
import Suppliers from "./Suppliers";
import OrderDetails from "./OrderDetails";

import { Route, Redirect, useLocation } from "react-router-dom";
import ProductDetails from "./ProductDetails";

import { useSelector } from "react-redux";

import { Row, Col, Card, Typography } from "antd";

const { Title } = Typography;

function Routes() {
  const logged = useSelector((state) => state.logovani.logged);
  const userIsSupplier = useSelector(state => state.logovani.userIsSupplier.id) !== undefined;
  const userIsAdmin = useSelector(state => state.logovani.role.role_name) === "ADMIN";
  const userIsUser = useSelector(state => state.logovani.role.role_name) === "USER";
  return (
    <Fragment>
      <Route exact path="/">
        {logged ? <Dashboard /> : <Redirect to="/login"></Redirect>}
      </Route>
      {!logged && (
        <Route exact path="/login">
          <Row
            style={{ height: "100vh" }}
            justify="space-around"
            align="middle"
          >
            <Col span={12}>
              <Card
                title={<Title level={2}>Login</Title>}
                style={{ textAlign: "center", fontSize: "20px" }}
              >
                <Login />
              </Card>
            </Col>
          </Row>
        </Route>
      )}
      {!logged && (
        <Route exact path="/register">
          <Row
            style={{ height: "100vh" }}
            justify="space-around"
            align="middle"
          >
            <Col span={24}>
              <Register />
            </Col>
          </Row>
        </Route>
      )}
      {userIsSupplier && <SupplierRoutes logged={logged} />}
      {userIsAdmin && <AdminRoutes logged={logged} />}
      {userIsUser && <UserRoutes logged={logged} />}
    </Fragment>
  );
}

function UserRoutes({ logged }) {
  const location = useLocation();
  const data = location?.state?.data;
  return (
    <Fragment>
      {/*<Route exact path="/">
        {logged ? <Dashboard /> : <Redirect to="/login"></Redirect>}
  </Route>*/}
      {logged && (
        <Route exact path="/customers">
          <Customers />
        </Route>
      )}
      {logged && (
        <Route exact path="/products">
          <Product />
        </Route>
      )}
      {logged && (
        <Route exact path="/orders">
          <Order />
        </Route>
      )}
      {logged && (
        <Route exact path="/product-details">
          <ProductDetails data={data} />
        </Route>
      )}
      {logged && (
        <Route exact path="/add-product">
          <ProductDetails />
        </Route>
      )}
      {logged && (
        <Route exact path="/order-details">
          <OrderDetails props={data} />
        </Route>
      )}
      {!logged && (
        <Route exact path="/login">
          <Row
            style={{ height: "100vh" }}
            justify="space-around"
            align="middle"
          >
            <Col span={12}>
              <Card
                title={<Title level={2}>Login</Title>}
                style={{ textAlign: "center", fontSize: "20px" }}
              >
                <Login />
              </Card>
            </Col>
          </Row>
        </Route>
      )}
      {!logged && (
        <Route exact path="/register">
          <Row
            style={{ height: "100vh" }}
            justify="space-around"
            align="middle"
          >
            <Col span={24}>
              <Register />
            </Col>
          </Row>
        </Route>
      )}
    </Fragment>
  );
}

function AdminRoutes({ logged }) {
  const location = useLocation();
  const data = location.state?.data;
  return (
    <Fragment>
      {/*<Route exact path="/">
        {logged ? <Dashboard /> : <Redirect to="/login"></Redirect>}
  </Route>*/}
      {logged && (
        <Route exact path="/staff">
          <Users />
        </Route>
      )}
      {logged && (
        <Route exact path="/customers">
          <Customers />
        </Route>
      )}
      {logged && (
        <Route exact path="/suppliers">
          <Suppliers />
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
          <ProductDetails data={data} />
        </Route>
      )}
      {logged && (
        <Route exact path="/add-product">
          <ProductDetails props={data} />
        </Route>
      )}
      {logged && (
        <Route exact path="/order-details">
          <OrderDetails props={data} />
        </Route>
      )}
      {!logged && (
        <Route exact path="/login">
          <Row
            style={{ height: "100vh" }}
            justify="space-around"
            align="middle"
          >
            <Col span={12}>
              <Card
                title={<Title level={2}>Login</Title>}
                style={{ textAlign: "center", fontSize: "20px" }}
              >
                <Login />
              </Card>
            </Col>
          </Row>
        </Route>
      )}
      {!logged && (
        <Route exact path="/register">
          <Row
            style={{ height: "100vh" }}
            justify="space-around"
            align="middle"
          >
            <Col span={24}>
              <Register />
            </Col>
          </Row>
        </Route>
      )}
    </Fragment>
  );
}

function SupplierRoutes({ logged }) {
  const location = useLocation();
  const data = location.state?.data;
  return (
    <Fragment>
      {/*<Route exact path="/">
        {logged ? <Dashboard /> : <Redirect to="/login"></Redirect>}
  </Route>*/}
      {logged && (
        <Route exact path="/orders">
          <Order />
        </Route>
      )}
      {logged && (
        <Route exact path="/order-details">
          <OrderDetails props={data} />
        </Route>
      )}
      {!logged && (
        <Route exact path="/login">
          <Row
            style={{ height: "100vh" }}
            justify="space-around"
            align="middle"
          >
            <Col span={12}>
              <Card
                title={<Title level={2}>Login</Title>}
                style={{ textAlign: "center", fontSize: "20px" }}
              >
                <Login />
              </Card>
            </Col>
          </Row>
        </Route>
      )}
      {!logged && (
        <Route exact path="/register">
          <Row
            style={{ height: "100vh" }}
            justify="space-around"
            align="middle"
          >
            <Col span={24}>
              <Register />
            </Col>
          </Row>
        </Route>
      )}
    </Fragment>
  );
}

export default Routes;
