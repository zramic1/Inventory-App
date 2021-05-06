import React, { useState } from 'react';
import { Avatar, Row, Col } from 'antd';

function PageHeader() {
    const [ikonicaAvatara, setIkonicaAvatara] = useState("U");

    return <Row style={{ display: "flex", alignItems: "center", lineHeight: "80px" }}>
        <Col span="3">
            <h1 style={{ color: "white", margin: "0px" }}>Inventory App</h1>
        </Col>
        <Col span="2" offset="19" type="flex" style={{ alignItems: "center" }}>
            <Avatar
                style={{
                    color: '#f56a00',
                    backgroundColor: '#fde3cf',
                    float: "right"
                }}
            >
                {ikonicaAvatara}
            </Avatar>
        </Col>
    </Row>
}
export default PageHeader;