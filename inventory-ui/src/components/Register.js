import React, { useContext, useState } from 'react';
import {
    Form,
    Input,
    Select,
    Button,
    Alert
} from 'antd';

import { UrlContext } from "../urlContext";
import axiosInstance from "../api/axiosInstance";

const { Option } = Select;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 20,
            offset: 0,
        },
        sm: {
            span: 12,
            offset: 8,
        },
    },
};

const prefixSelector = (
    <Select style={{ width: 100 }}>
        <Option value="387">+387</Option>
        <Option value="385">+385</Option>
    </Select>
);

function Register() {
    const registerContext = useContext(UrlContext);
    const [allRegisterValues, setAllRegisterValues] = useState({
        username: "",
        password: "",
        confirm_password: "",
        first_name: "",
        last_name: "",
        address: "",
        phone: "",
        email: ""
    });

    const [alertVisibleError, setAlertVisibleError] = useState(false);
    const [alertPorukaError, setAlertPorukaError] = useState("");

    const [alertVisibleSuccess, setAlertVisibleSuccess] = useState(false);
    const [alertPorukaSuccess, setAlertPorukaSuccess] = useState("");

    const handleSubmit = (e) => {
        let url = registerContext.user;
        axiosInstance(url)
            .post("/user", {
                roleID: {
                    id: 2,
                    role_name: "USER"
                },
                username: allRegisterValues.username,
                password: allRegisterValues.password,
                first_name: allRegisterValues.first_name,
                last_name: allRegisterValues.last_name,
                address: allRegisterValues.address,
                phone: allRegisterValues.phone,
                email: allRegisterValues.email
            })
            .then((res) => {
                setAlertVisibleError(false);
                setAlertVisibleSuccess(true);
                setAlertPorukaSuccess("You are registered successfully");
            })
            .catch((error) => {
                setAlertVisibleError(true);
                setAlertVisibleSuccess(false);
                setAlertPorukaError(error.toString());
                console.log("Status");
                //console.log(error.response.status);
                console.log("Greska!");
                console.log(error);
            });
    }

    const validateToNextPassword = (rule, value, callback) => {
        let regexExpress = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])[0-9a-zA-Z@#$%^&+=!]{8,}$/;
        if (value && !regexExpress.test(value)) {
            callback("Password should contain at least 8 characters with at least 1 lower case letter, 1 upper case letter, 1 digit, 1 special character (allowed special characters are @,#,$,%,^,&,+,=,!)");
        }
        callback();
    };

    const compareToFirstPassword = (rule, value, callback) => {
        if (value && value !== allRegisterValues.password) {
            callback('Two passwords that you entered are inconsistent!');
        } else {
            callback();
        }
    };

    const onInputChange = (e) => {
        setAllRegisterValues({ ...allRegisterValues, [e.target.name]: e.target.value });
    };

    const onFinish = (values) => {
        console.log("Success:", values);
        handleSubmit();
    };

    return (
        <>
            <Form {...formItemLayout} name="registerForm" onFinish={onFinish}>

                <Form.Item label="First name" name="first_nameItem" rules={[
                    {
                        required: true,
                        message: 'Please input your first name!',
                    }
                ]}
                ><Input name="first_name" onChange={(e) => {
                    onInputChange(e);
                }} />
                </Form.Item>


                <Form.Item label="Last name" name="last_nameItem" rules={[
                    {
                        required: true,
                        message: 'Please input your last name!',
                    }
                ]}
                ><Input name="last_name" onChange={(e) => {
                    onInputChange(e);
                }} />
                </Form.Item>

                <Form.Item label="E-mail" name="emailItem" rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                ]}
                ><Input name="email" onChange={(e) => {
                    onInputChange(e);
                }} />
                </Form.Item>

                <Form.Item label="Username" name="usernameItem"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                ><Input name="username" onChange={(e) => {
                    onInputChange(e);
                }} />
                </Form.Item>

                <Form.Item label="Password" name="passwordItem" hasFeedback
                    rules={[{
                        required: true,
                        message: 'Please input your password!',
                    },
                    {
                        validator: validateToNextPassword
                    }
                    ]}>
                    <Input.Password name="password" onChange={(e) => {
                        onInputChange(e);
                    }} />
                </Form.Item>


                <Form.Item label="Confirm Password" name="confirm_passwordItem" hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        {
                            validator: compareToFirstPassword
                        }
                    ]}
                ><Input.Password name="confirm_password" onChange={(e) => {
                    onInputChange(e);
                }} />
                </Form.Item>

                <Form.Item label="Address" name="addressItem" rules={[
                    {
                        required: true,
                        message: 'Please input your address!',
                    }
                ]}
                ><Input name="address" onChange={(e) => {
                    onInputChange(e);
                }} />
                </Form.Item>


                <Form.Item label="Phone Number" name="phoneItem" rules={[{ required: true, message: 'Please input your phone number!' }]}
                >
                    <Input addonBefore={prefixSelector} style={{ width: '100%' }} name="phone" onChange={(e) => {
                        onInputChange(e);
                    }} />
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" style={{ float: "right" }}>
                        Register
            </Button>
                </Form.Item>
            </Form >
            {alertVisibleError ? <Alert message={alertPorukaError} type="error" showIcon /> : ""}
            {alertVisibleSuccess ? <Alert message={alertPorukaSuccess} type="success" showIcon /> : ""}
        </>
    );
}

export default Register;