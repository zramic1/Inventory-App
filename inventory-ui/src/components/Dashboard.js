import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Row, Col, Card, Avatar } from 'antd';
import { FaWarehouse, FaBoxOpen, FaReceipt, FaUsers } from "react-icons/fa";

import 'ant-design-pro/dist/ant-design-pro.css';
import { Bar } from 'ant-design-pro/lib/Charts';

import { getAllUsers, getMonthlyStats, getWeeklyStats } from "./actions/loginActions";
import { useDispatch, useSelector } from 'react-redux';
import { UrlContext } from '../urlContext';
import axiosInstance from "../api/axiosInstance";

const { Meta } = Card;

/*const salesData = [];
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
}*/

function Dashboard() {
    const [loading, setLoading] = useState([false, false, false, false]);
    const totalStaffMembers = useSelector((state) => state.logovani.allUsers.length);
    const totalOrders = useSelector((state) => state.logovani.allOrders.length);
    const totalWarehouses = useSelector((state) => state.logovani.allUsers.length);
    const totalProducts = useSelector((state) => state.logovani.allProductsForUser.length);
    const weeklyStats = useSelector((state) => state.logovani.weeklyStats);
    const monthlyStats = useSelector((state) => state.logovani.monthlyStats);
    const dashboardContext = useContext(UrlContext);
    const dispatch = useDispatch();
    const [salesData, setSalesData] = useState([]);
    const [salesData1, setSalesData1] = useState([]);
    const userIsSupplier = useSelector((state) => state.logovani.userIsSupplier);
    const allCustomers = useSelector((state) => state.logovani.allCustomers);

    function onChangeLoading(pozicija) {
        let load = loading;
        load[pozicija] = !load[pozicija];
        setLoading(load);
    }

    const getWeeklyStatistics = () => {
        let url = dashboardContext.order;
        let isCustomer = userIsSupplier ? 0 : 1;
        let niz = [];
        for (let i = 0; i < allCustomers.length; i++) {
            niz.push(allCustomers[i].id);
        }
        let body = userIsSupplier ? [userIsSupplier.id] : niz;
        console.log("Salje se: ", { listElements: body });
        let objekat = {
            listElements: body
        };
        console.log("Salje se: ", objekat);
        axiosInstance(url)
            .post(`/orders/weekly/${isCustomer}`, objekat)
            .then((res) => {
                dispatch(getWeeklyStats(res.data));
            })
    }

    const getMonthlyStatistics = () => {
        let url = dashboardContext.order;
        let isCustomer = userIsSupplier ? 0 : 1;
        let niz = [];
        for (let i = 0; i < allCustomers.length; i++) {
            niz.push(parseInt(allCustomers[i].id));
        }
        let body = userIsSupplier ? [parseInt(userIsSupplier.id)] : niz;
        let objekat = {
            listElements: body
        };
        axiosInstance(url).post(`/orders/monthly/${isCustomer}`, objekat).then((res) => {
            dispatch(getMonthlyStats(res.data));
        })
    }

    const getAllStatistics = () => {
        var weekdays = new Array(7);
        weekdays[0] = "Monday";
        weekdays[1] = "Tuesday";
        weekdays[2] = "Wednesday";
        weekdays[3] = "Thursday";
        weekdays[4] = "Friday";
        weekdays[5] = "Saturday";
        weekdays[6] = "Sunday";
        let niz = [];
        for (let el in weeklyStats) {
            niz.push({
                x: `${weekdays[parseInt(el)]}`,
                y: weeklyStats[el],
            });
        }
        setSalesData(niz);
        let niz1 = [];
        for (let el in monthlyStats) {
            niz1.push({
                x: `${parseInt(el) + 1}`,
                y: monthlyStats[el],
            });
        }
        setSalesData1(niz1);
    }

    useEffect(() => {
        getWeeklyStatistics();
        getMonthlyStatistics();
    }, [])

    useEffect(() => {
        getAllStatistics();
    }, [weeklyStats, monthlyStats])

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
            <Col span="10" style={{ display: "flex", justifyContent: "center" }}>
                <Card title="Weekly summary" style={{ width: "95%" }}>
                    <Bar height={200} data={salesData} color="sandybrown" />
                </Card>
            </Col>

            <Col span="14" style={{ display: "flex", justifyContent: "center" }}>
                <Card title="Monthly summary" style={{ width: "95%" }}>
                    <Bar height={200} data={salesData1} color="dodgerblue" />
                </Card>
            </Col>

        </Row>
    </div>

}

export default Dashboard;