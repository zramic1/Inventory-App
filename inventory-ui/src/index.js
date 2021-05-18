import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import GridLayout from "./components/GridLayout.js";
import PageHeader from "./components/PageHeader.js";

import "antd/dist/antd.css";
import { Layout } from "antd";

import { createStore } from "redux";
import { Provider } from "react-redux";

import allReducers from "./components/reducers/indexReducer";
import axios from "axios";

const { Header } = Layout;

const store = createStore(allReducers);


axios.interceptors.request.use(function (config) {
  console.log("Usao ovdje");
  let token = "";
  if (localStorage.getItem('token') !== "") {
    token = 'Bearer '.concat(localStorage.getItem('token'));
  }
  config.headers.Authorization = token;

  return config;
});

ReactDOM.render(
  /*<React.StrictMode>
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Header
        style={{
          minHeight: "80px",
        }}
      >
        <PageHeader />
      </Header>{" "}
      <GridLayout></GridLayout>{" "}
    </Layout>{" "}
  </React.StrictMode>*/
  <Provider store={store}>
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Header
        style={{
          minHeight: "80px",
        }}
      >
        <PageHeader />
      </Header>{" "}
      <GridLayout></GridLayout>{" "}
    </Layout>{" "}
  </Provider>,
  document.getElementById("root")
);
