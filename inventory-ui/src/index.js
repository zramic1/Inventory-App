import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import GridLayout from "./components/GridLayout.js";
import Zaglavlje from "./components/Zaglavlje.js";

import "antd/dist/antd.css";
import { Layout } from "antd";

const { Header, Sider, Content } = Layout;

ReactDOM.render(
  <React.StrictMode>
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
        <Zaglavlje />
      </Header>{" "}
      <GridLayout></GridLayout>{" "}
    </Layout>{" "}
  </React.StrictMode>,
  document.getElementById("root")
);
