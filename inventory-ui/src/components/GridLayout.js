import React, { useState } from "react";
import { Menu } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  InboxOutlined,
  UserAddOutlined,
  TeamOutlined,
} from "@ant-design/icons";

import { BsPlusSquare, BsPersonLinesFill, BsPerson } from "react-icons/bs";
import { FaWarehouse, FaBoxOpen, FaTruck } from "react-icons/fa";
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
  const userIsSupplier = useSelector(state => state.logovani.userIsSupplier.id) === undefined;
  const userIsAdmin = useSelector(state => state.logovani.role.role_name) === "ADMIN";
  const userIsUser = useSelector(state => state.logovani.role.role_name) === "USER";

  return (
    <div style={{ height: !logged ? "100vh" : "" }}>
      <Router>
        {!userIsSupplier && !userIsAdmin && !userIsUser ? <Layout style={{ height: !logged ? "100vh" : "" }}>
          <Content className="content">
            <Switch>
              <Routes />
            </Switch>
          </Content>
        </Layout > : ""}
        {userIsSupplier && <SupplierMeni logged={logged} />}
        {userIsAdmin && !userIsSupplier && <AdminMeni logged={logged} />}
        {userIsUser && !userIsSupplier && <UserMeni logged={logged} />}
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
            <SubMenu key="sub5" icon={<BsPerson style={{ marginRight: "10px" }} />} title="Customers">
              <Menu.Item key="6" icon={< BsPersonLinesFill />}>
                < Link to="/customers">Customer details</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub4"
              icon={<FaBoxOpen size={14} style={{ marginRight: "10px" }} />}
              title="Orders"
            >
              <Menu.Item key="9" icon={<CgDetailsMore />}>
                <Link to="/orders">Order details</Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
      )
      }
      <Content className="content">
        <Switch>
          <Routes />
        </Switch>
      </Content>
    </Layout >
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
                <Link to="/orders">Order details</Link>
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
            <SubMenu key="sub5" icon={<BsPerson style={{ marginRight: "10px" }} />} title="Customers">
              <Menu.Item key="6" icon={< BsPersonLinesFill />}>
                < Link to="/customers">Customer details</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub6" icon={<FaTruck style={{ marginRight: "10px" }} />} title="Suppliers">
              <Menu.Item key="8" icon={< CgDetailsMore />}>
                < Link to="/suppliers">Supplier details</Link>
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
                <Link to="/orders">Order details</Link>
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
