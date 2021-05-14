import React, { Fragment, useState } from "react";
import Warehouse from "./Warehouse";
import Order from "./Order";
import Users from "./Users";
import Dashboard from "./Dashboard";
import Login from "./Login";

import { Route, Redirect } from "react-router-dom";

function Routes(props) {
  return (
    <Fragment>
      <Route exact path="/">
        {props.log ? <Dashboard /> : <Redirect to="/login"></Redirect>}
      </Route>
      {/*logged &&
          <Route exact path="/">
            <Dashboard />
          </Route>
        */}
      {props.log && (
        <Route exact path="/staff">
          <Users />
          <div>stafovi</div>
        </Route>
      )}
      {props.log && (
        <Route exact path="/products">
          {/*<Products />*/}
          <div>produkti</div>
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
      {!props.log && (
        <Route exact path="/login">
          <Login data={props.userLog} />
        </Route>
      )}
    </Fragment>
  );
}

export default Routes;
