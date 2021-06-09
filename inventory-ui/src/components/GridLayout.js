import React, { useState } from "react";
import { Menu } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  InboxOutlined,
  UserAddOutlined,
  TeamOutlined,
} from "@ant-design/icons";

import { BsPlusSquare } from "react-icons/bs";
import { FaWarehouse, FaBoxOpen } from "react-icons/fa";
import { CgDetailsMore } from "react-icons/cg";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { Layout } from "antd";

import Routes from "./Routes";

import { useSelector } from "react-redux";

const { Sider, Content } = Layout;

const { SubMenu } = Menu;

function GridLayout() {
  const logged = useSelector((state) => state.logovani.logged);
  const userIsSupplier = false;
  const userIsAdmin = true;
  const userIsUser = false;

  return (
    <div style={{ height: !logged ? "100vh" : "" }}>
      <Router>
        {userIsSupplier && <SupplierMeni logged={logged} />}
        {userIsAdmin && <AdminMeni logged={logged} />}
        {userIsUser && <UserMeni logged={logged} />}
      </Router>
    </div>
  );
}

function UserMeni({ logged }) {
  return (
    <Layout style={{ height: !logged ? "100vh" : "" }}>
      {logged && (
        <Sider>
          <Menu
            defaultSelectedKeys={["1"]}
            mode="inline"
            theme="dark"
            style={{ height: "100vh" }}
          >
            <SubMenu key="sub2" icon={<InboxOutlined />} title="Products">
              <Menu.Item key="4" icon={<BsPlusSquare />}>
                <Link to="/add-product">Add product</Link>
              </Menu.Item>
              <Menu.Item key="5" icon={<CgDetailsMore />}>
                <Link to="/products">Product details</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub4"
              icon={<FaBoxOpen size={14} style={{ marginRight: "10px" }} />}
              title="Orders"
            >
              <Menu.Item key="9" icon={<CgDetailsMore />}>
                <Link to="/orders">Orders</Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
      )}
      <Content className="content">
        <Switch>
          <Routes />
        </Switch>
      </Content>
    </Layout>
  );
}

function SupplierMeni({ logged }) {
  return (
    <Layout style={{ height: !logged ? "100vh" : "" }}>
      {logged && (
        <Sider>
          <Menu
            defaultSelectedKeys={["1"]}
            mode="inline"
            theme="dark"
            style={{ height: "100vh" }}
          >
            <SubMenu
              key="sub4"
              icon={<FaBoxOpen size={14} style={{ marginRight: "10px" }} />}
              title="Orders"
            >
              <Menu.Item key="9" icon={<CgDetailsMore />}>
                <Link to="/orders">Orders</Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
      )}
      <Content className="content">
        <Switch>
          <Routes />
        </Switch>
      </Content>
    </Layout>
  );
}

function AdminMeni({ logged }) {
  return (
    <Layout style={{ height: !logged ? "100vh" : "" }}>
      {logged && (
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
              <Menu.Item key="3" icon={<TeamOutlined />}>
                <Link to="/staff">Staff details</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<InboxOutlined />} title="Products">
              <Menu.Item key="4" icon={<BsPlusSquare />}>
                <Link to="/add-product">Add product</Link>
              </Menu.Item>
              <Menu.Item key="5" icon={<CgDetailsMore />}>
                <Link to="/products">Product details</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub3"
              icon={<FaWarehouse size={14} style={{ marginRight: "10px" }} />}
              title="Warehouses"
            >
              <Menu.Item key="7" icon={<CgDetailsMore />}>
                <Link to="/warehouses">Warehouse details</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub4"
              icon={<FaBoxOpen size={14} style={{ marginRight: "10px" }} />}
              title="Orders"
            >
              <Menu.Item key="9" icon={<CgDetailsMore />}>
                <Link to="/orders">Orders</Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
      )}
      <Content className="content">
        <Switch>
          <Routes />
        </Switch>
      </Content>
    </Layout>
  );
}

export default GridLayout;
