import React, { useContext, useState } from "react";

import { Form, Input, Button, Alert } from "antd";

import { userLogged, getUserInformation } from "./actions/loginActions";
import { useDispatch } from "react-redux";

import { UrlContext } from "../urlContext";
import axiosInstance from "../api/axiosInstance";

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 15,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 16,
    span: 5,
  },
};

function Login() {
  const loginContext = useContext(UrlContext);
  const dispatch = useDispatch();
  const [allValues, setAllValues] = useState({
    username: "",
    password: "",
  });
  const [alertVisible, setAlertVisible] = useState(false);

  const onFinish = (values) => {
    console.log("Success:", values);
    onSubmit();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onInputChange = (e) => {
    setAllValues({ ...allValues, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    //console.log("Username je: ", allValues.username);
    //console.log("Password je: ", allValues.password);
    let url = loginContext.gateway;
    axiosInstance(url)
      .post("/authenticate", {
        username: allValues.username,
        password: allValues.password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.jwt);
        setAlertVisible(false);
        //props.data(true);
        dispatch(userLogged({ logged: true, user: { username: allValues.username, password: allValues.password, jwt: res.data.jwt } }));
        let url1 = loginContext.user;
        axiosInstance(url1).get(`/users/username/${allValues.username}`).then((res1) => {
          dispatch(getUserInformation({
            id: res1.data.id,
            first_name: res1.data.first_name,
            last_name: res1.data.last_name,
            address: res1.data.address,
            phone: res1.data.phone,
            email: res1.data.email
          }));
        })
      })
      .catch((error) => {
        setAlertVisible(true);
        console.log("Status");
        //console.log(error.response.status);
        console.log("Greska!");
        console.log(error);
      });
  };

  return (
    <>
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
              message: "Please input your username!",
            },
          ]}
        >
          <Input
            name="username"
            onChange={(e) => {
              onInputChange(e);
            }}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="passwordItem"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password
            name="password"
            onChange={(e) => {
              onInputChange(e);
            }}
          />
        </Form.Item>

        {/*<Form.Item {...tailLayout} name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
            </Form.Item>*/}

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Submit
        </Button>
        Or <a href="/register">register now!</a>
        </Form.Item>
      </Form>
      {alertVisible ? <Alert message="Wrong username or password!" type="error" showIcon /> : ""}
    </>
  );
}

export default Login;
