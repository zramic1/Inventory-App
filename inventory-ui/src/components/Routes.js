import React, { Fragment, useState } from "react";
import Warehouse from "./Warehouse";
import Order from "./Order";
import Users from "./Users";
import Product from "./Product";
import Dashboard from "./Dashboard";
import Login from "./Login";

import { Route, Redirect } from "react-router-dom";
import ProductDetails from "./ProductDetails";

function Routes(props) {
  return (
    <Fragment>
      <Route exact path="/">
        {props.log ? <Dashboard /> : <Redirect to="/login"></Redirect>}
      </Route>
      {props.log && (
        <Route exact path="/staff">
          <Users />
        </Route>
      )}
      {props.log && (
        <Route exact path="/products">
          <Product />
        </Route>
      )}
      {props.log && (
        <Route exact path="/warehouses">
          <Warehouse />
        </Route>
      )}
      {props.log && (
        <Route exact path="/orders">
          <Order />
        </Route>
      )}
      {props.log && (
        <Route exact path="/product-details">
          <ProductDetails />
        </Route>
      )}
      {props.log && (
        <Route exact path="/add-product">
          <ProductDetails />
        </Route>
      )}
      {!props.log && (
        <Route exact path="/login">
          <Login data={props.userLog} />
        </Route>
      )}
    </Fragment>
  );
}

export default Routes;
