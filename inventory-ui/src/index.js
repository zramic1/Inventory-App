import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';
import Meni from "./components/Meni.js"
import Zaglavlje from "./components/Zaglavlje.js"

import "antd/dist/antd.css";
import { Layout } from "antd";


const { Header, Sider, Content } = Layout;

ReactDOM.render(
  <React.StrictMode>

    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ minHeight: "80px" }}>
        <Zaglavlje />
      </Header>
      <Layout>
        <Sider><Meni /></Sider>
        <Content>Content</Content>
      </Layout>
    </Layout>



  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
