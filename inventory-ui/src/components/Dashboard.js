import React, { useState } from 'react';
import { Row, Col, Card, Avatar } from 'antd';
import { FaWarehouse, FaBoxOpen, FaReceipt, FaUsers } from "react-icons/fa";

import 'ant-design-pro/dist/ant-design-pro.css';
import { Bar } from 'ant-design-pro/lib/Charts';

import { getAllUsers } from "./actions/loginActions";
import { useSelector } from 'react-redux';

const { Meta } = Card;

const salesData = [];
for (let i = 0; i < 7; i += 1) {
    salesData.push({
        x: `${i + 1}`,
        y: Math.floor(Math.random() * 1000) + 200,
    });
}

const salesData1 = [];
for (let i = 0; i < 12; i += 1) {
    salesData1.push({
        x: `${i + 1}`,
        y: Math.floor(Math.random() * 1000) + 200,
    });
}

function Dashboard() {
    const [loading, setLoading] = useState([false, false, false, false]);
    const totalStaffMembers = useSelector(state => state.logovani.allUsers.length);
    const totalOrders = useSelector(state => state.logovani.allOrders.length);
    const totalWarehouses = useSelector(state => state.logovani.allUsers.length);
    const totalProducts = useSelector(state => state.logovani.allProductsForUser.length);

    function onChangeLoading(pozicija) {
        let load = loading;
        load[pozicija] = !load[pozicija];
        setLoading(load);
    }

    return <div>
        <Row>
            <Col span="6" style={{ display: "flex", justifyContent: "center" }}>
                <Card style={{ width: "90%", marginTop: 16 }} loading={loading[0]}>
                    <Meta
                        avatar={
                            <Avatar icon={<FaUsers size={40} />} style={{ color: "red", backgroundColor: "transparent", width: "50px", height: "50px" }} />
                        }
                        title={totalStaffMembers}
                        description="Total staff members"
                    />
                </Card>
            </Col>

            <Col span="6" style={{ display: "flex", justifyContent: "center" }}>
                <Card style={{ width: "90%", marginTop: 16 }} loading={loading[1]}>
                    <Meta
                        avatar={
                            <Avatar icon={<FaReceipt size={40} />} style={{ color: "blue", backgroundColor: "transparent", width: "50px", height: "50px" }} />
                        }
                        title={totalOrders}
                        description="Total orders"
                    />
                </Card>
            </Col>

            <Col span="6" style={{ display: "flex", justifyContent: "center" }}>
                <Card style={{ width: "90%", marginTop: 16 }} loading={loading[2]}>
                    <Meta
                        avatar={
                            <Avatar icon={<FaWarehouse size={40} />} style={{ color: "orange", backgroundColor: "transparent", width: "50px", height: "50px" }} />
                        }
                        title={totalWarehouses}
                        description="Total warehouses"
                    />
                </Card>
            </Col>



            <Col span="6" style={{ display: "flex", justifyContent: "center" }}>
                <Card style={{ width: "90%", marginTop: 16 }} loading={loading[3]}>
                    <Meta
                        avatar={
                            <Avatar icon={<FaBoxOpen size={40} />} style={{ color: "green", backgroundColor: "transparent", width: "50px", height: "50px" }} />
                        }
                        title={totalProducts}
                        description="Total products"
                    />
                </Card>
            </Col>
        </Row>


        <Row style={{ marginTop: "20px" }}>
            <Col span="12" style={{ display: "flex", justifyContent: "center" }}>
                <Card title="Weekly summary" style={{ width: "95%" }}>
                    <Bar height={200} data={salesData} color="sandybrown" />
                </Card>
            </Col>

            <Col span="12" style={{ display: "flex", justifyContent: "center" }}>
                <Card title="Monthly summary" style={{ width: "95%" }}>
                    <Bar height={200} data={salesData1} color="dodgerblue" />
                </Card>
            </Col>

        </Row>
    </div>

}

export default Dashboard;