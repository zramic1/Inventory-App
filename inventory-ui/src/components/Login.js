import React, { useState } from 'react';

import { Form, Input, Button, Checkbox } from 'antd';

import axios from "axios";

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 10,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 10
    },
};

function Login(props) {

    const [allValues, setAllValues] = useState({
        username: "",
        password: ""
    })

    const onFinish = (values) => {
        console.log('Success:', values);
        onSubmit();
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onInputChange = (e) => {
        setAllValues({ ...allValues, [e.target.name]: e.target.value });
    }

    const onSubmit = () => {
        console.log("Username je: ", allValues.username);
        console.log("Password je: ", allValues.password);
        let url = "http://localhost:8060";
        axios.post(url + "/authenticate", {
            username: allValues.username,
            password: allValues.password
        }).then(res => {
            localStorage.setItem('token', res.data.jwt);
            props.data(true);
        })
            .catch((error) => {
                console.log("Status");
                console.log(error.response.status);
                console.log("Greska!");
                console.log(error);
            });
    }

    return (
        <Form
            {...layout}
            name="loginForm"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="Username"
                name="usernameItem"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]}
            >
                <Input name="username" onChange={(e) => { onInputChange(e) }} />
            </Form.Item>

            <Form.Item
                label="Password"
                name="passwordItem"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
            >
                <Input.Password name="password" onChange={(e) => { onInputChange(e) }} />
            </Form.Item>

            {/*<Form.Item {...tailLayout} name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
            </Form.Item>*/}

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit"
                >
                    Submit
            </Button>
            </Form.Item>
        </Form>
    );
}

export default Login;