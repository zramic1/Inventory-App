import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useDispatch } from "react-redux";

import { UrlContext } from "../urlContext";
import axiosInstance from "../api/axiosInstance";

import 'ant-design-pro/dist/ant-design-pro.css';
import NoticeIcon from 'ant-design-pro/lib/NoticeIcon';
import { Tag } from 'antd';
import { BellOutlined } from '@ant-design/icons';

function onItemClick(item, tabProps) {
    console.log(item, tabProps);
}

function onClear(tabTitle) {
    console.log(tabTitle);
}

function getNoticeData(notices) {
    if (notices.length === 0) {
        return {};
    }
    const newNotices = notices.map(notice => {
        const newNotice = { ...notice };
        // transform id to item key
        if (newNotice.id) {
            newNotice.key = newNotice.id;
        }
        if (newNotice.extra && newNotice.status) {
            const color = {
                todo: '',
                processing: 'blue',
                urgent: 'red',
                doing: 'gold',
            }[newNotice.status];
            newNotice.extra = (
                <Tag color={color} style={{ marginRight: 0 }}>
                    {newNotice.extra}
                </Tag>
            );
        }
        return newNotice;
    });
    return newNotices.reduce((pre, data) => {
        console.log("Pre je: ", pre);
        console.log("Data je: ", data);
        if (!pre[data.type]) {
            pre[data.type] = [];
        }
        pre[data.type].push(data);
        console.log("Pre postaje: ", pre);
        return pre;
    }, {});
}

function ProductsNotification() {
    const allProductsLowOnQuantity = useSelector(state => state.logovani.allProducts).filter(el => el.quantity < 5);
    const numberOfNotifications = allProductsLowOnQuantity.length;
    const getCurrentDate = (separator = '-') => {
        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();

        return `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date}`
    }
    const data = allProductsLowOnQuantity.map((product, index) => ({
        id: index,
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
        title: `Product ${product.title} is low on quantity`,
        datetime: getCurrentDate().toString(),
        type: 'notification',
        status: 'urgent',
        extra: 'low on quantity'
    }))
    const noticeData = getNoticeData(data);

    useEffect(() => {
        let element = document.getElementsByClassName("ant-tabs-nav-list");
        console.log("Element je: ", element);
        if (element.length > 0) {
            element = element[0];
            element.style.width = "100%";
            let dijete = document.getElementsByClassName("ant-tabs-tab ant-tabs-tab-active");
            if (dijete.length > 0) {
                dijete = dijete[0];
                dijete.style.width = "100%";
                dijete.style.justifyContent = "center";
            }
            let drugoDijete = document.getElementsByClassName("ant-tabs-ink-bar ant-tabs-ink-bar-animated");
            if (drugoDijete.length > 0) {
                drugoDijete = drugoDijete[0];
                drugoDijete.style.width = "100%";
            }
        }
    })

    return (
        <div
            style={{
                textAlign: 'right',
                height: '80px',
                lineHeight: '80px',
                boxShadow: '0 1px 4px rgba(0,21,41,.12)',
                padding: '0 32px',
                width: '100px',
            }}
        >
            <NoticeIcon className="notice-icon" count={numberOfNotifications} onItemClick={onItemClick} onClear={onClear} bell={<BellOutlined style={{ color: "white" }} />}>
                <NoticeIcon.Tab
                    list={noticeData.notification}
                    title="notification"
                    emptyText="No notifications"
                    emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
                    style={{ color: "black" }}
                />
            </NoticeIcon>
        </div>)

}

export default ProductsNotification;