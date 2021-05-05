import React, { useState } from 'react';
import { Menu } from 'antd';
import {
    DashboardOutlined,
    UserOutlined,
    InboxOutlined,
    UserAddOutlined,
    ContainerOutlined,
    FileTextOutlined,
    TeamOutlined
} from "@ant-design/icons"

const { SubMenu } = Menu;

function Meni() {
    /*const [collapsed, setCollapsed] = useState(false);

    function toggleCollapsed() {
        setCollapsed(!collapsed);
    }*/

    return <div style={{ height: "100vh" }}>
        <Menu
            defaultSelectedKeys={['1']}
            mode="inline"
            theme="dark"
            style={{ height: "100vh" }}
        >
            <Menu.Item key="1" icon={<DashboardOutlined />} style={{ marginTop: "0px" }}>
                Dashboard
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="Staff">
                <Menu.Item key="2" icon={<UserAddOutlined />}>Add staff</Menu.Item>
                <Menu.Item key="3" icon={<TeamOutlined />}>Staff details</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<InboxOutlined />} title="Products">
                <Menu.Item key="4">Add product</Menu.Item>
                <Menu.Item key="5">Product details</Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" icon={<ContainerOutlined />} title="Warehouses">
                <Menu.Item key="6">Add warehouse</Menu.Item>
                <Menu.Item key="7">Warehouse details</Menu.Item>
            </SubMenu>
            <SubMenu key="sub4" icon={<FileTextOutlined />} title="Orders">
                <Menu.Item key="8">Add order</Menu.Item>
                <Menu.Item key="9">Order details</Menu.Item>
            </SubMenu>



            {/*<SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
                <Menu.Item key="5">Option 5</Menu.Item>
                <Menu.Item key="6">Option 6</Menu.Item>
                <Menu.Item key="7">Option 7</Menu.Item>
                <Menu.Item key="8">Option 8</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
                <Menu.Item key="9">Option 9</Menu.Item>
                <Menu.Item key="10">Option 10</Menu.Item>
                <SubMenu key="sub3" title="Submenu">
                    <Menu.Item key="11">Option 11</Menu.Item>
                    <Menu.Item key="12">Option 12</Menu.Item>
                </SubMenu>
</SubMenu>*/}
        </Menu>
    </div>
}

export default Meni;