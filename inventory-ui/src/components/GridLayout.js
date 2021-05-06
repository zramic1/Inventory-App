import React, { Fragment } from "react";
import { Menu } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  InboxOutlined,
  UserAddOutlined,
  ContainerOutlined,
  FileTextOutlined,
  TeamOutlined,
} from "@ant-design/icons";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Layout } from "antd";
import Warehouse from "./Warehouse";
import Order from "./Order";
import Users from "./Users";
const { Sider, Content } = Layout;

const { SubMenu } = Menu;

function GridLayout() {
  return (
    <div style={{ height: "100vh" }}>
      <Router>
        <Layout>
          <Sider>
            <Menu
              defaultSelectedKeys={["1"]}
              mode="inline"
              theme="dark"
              style={{ height: "100vh" }}
            >
              <Menu.Item
                key="1"
                icon={<DashboardOutlined />}
                style={{ marginTop: "0px" }}
              >
                <Link to="/">Dashboard</Link>
              </Menu.Item>
              <SubMenu key="sub1" icon={<UserOutlined />} title="Staff">
                <Menu.Item key="2" icon={<UserAddOutlined />}>
                  Add staff
                </Menu.Item>
                <Menu.Item key="3" icon={<TeamOutlined />}>
                  <Link to="/staff">Staff details</Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<InboxOutlined />} title="Products">
                <Menu.Item key="4">Add product</Menu.Item>
                <Menu.Item key="5">
                  <Link to="/products">Product details</Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub3"
                icon={<ContainerOutlined />}
                title="Warehouses"
              >
                <Menu.Item key="6">Add warehouse</Menu.Item>
                <Menu.Item key="7">
                  <Link to="/warehouses">Warehouse details</Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="sub4" icon={<FileTextOutlined />} title="Orders">
                <Menu.Item key="8">Add order</Menu.Item>
                <Menu.Item key="9">
                  <Link to="/orders">Order details</Link>
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Content className="content">
            <Switch>
              <Routes />
            </Switch>
          </Content>
        </Layout>
      </Router>
    </div>
  );
}

function Routes() {
  return (
    <Fragment>
      <Route exact path="/">
        {/*<Dashboard />*/}
        <div>dešbord</div>
      </Route>
      <Route exact path="/staff">
        <Users />
        <div>stafovi</div>
      </Route>
      <Route exact path="/products">
        {/*<Products />*/}
        <div>produkti</div>
      </Route>
      <Route exact path="/warehouses">
        <Warehouse />
      </Route>
      <Route exact path="/orders">
        <Order />
      </Route>
    </Fragment>
  );
}

export default GridLayout;
