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

const { Sider, Content } = Layout;

const { SubMenu } = Menu;

function GridLayout() {
  const [logged, setLogged] = useState(true);

  const userLogged = (truth) => {
    setLogged(truth);
  };

  return (
    <div style={{ height: "100vh" }}>
      <Router>
        <Layout>
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
                  <Menu.Item key="2" icon={<UserAddOutlined />}>
                    Add staff
                  </Menu.Item>
                  <Menu.Item key="3" icon={<TeamOutlined />}>
                    <Link to="/staff">Staff details</Link>
                  </Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<InboxOutlined />} title="Products">
                  <Menu.Item key="4" icon={<BsPlusSquare />}>
                    Add product
                  </Menu.Item>
                  <Menu.Item key="5" icon={<CgDetailsMore />}>
                    <Link to="/products">Product details</Link>
                  </Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub3"
                  icon={
                    <FaWarehouse size={14} style={{ marginRight: "10px" }} />
                  }
                  title="Warehouses"
                >
                  <Menu.Item key="6" icon={<BsPlusSquare />}>
                    Add warehouse
                  </Menu.Item>
                  <Menu.Item key="7" icon={<CgDetailsMore />}>
                    <Link to="/warehouses">Warehouse details</Link>
                  </Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub4"
                  icon={<FaBoxOpen size={14} style={{ marginRight: "10px" }} />}
                  title="Orders"
                >
                  <Menu.Item key="8" icon={<BsPlusSquare />}>
                    Add order
                  </Menu.Item>
                  <Menu.Item key="9" icon={<CgDetailsMore />}>
                    <Link to="/orders">Order details</Link>
                  </Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
          )}
          <Content className="content">
            <Switch>
              <Routes userLog={userLogged} log={logged} />
            </Switch>
          </Content>
        </Layout>
      </Router>
    </div>
  );
}

export default GridLayout;
