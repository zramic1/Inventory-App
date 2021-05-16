import React, { useState } from "react";

import { Form, Input, Button } from "antd";

import axios from "axios";

import { userLogged } from "./actions/loginActions";
import { useDispatch } from "react-redux";

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
    offset: 17,
    span: 4,
  },
};

function Login() {
  const dispatch = useDispatch();
  const [allValues, setAllValues] = useState({
    username: "",
    password: "",
  });

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
    //dispatch(userLogged({ logged: true, user: { username: allValues.username, password: allValues.password } }));
    console.log("Username je: ", allValues.username);
    console.log("Password je: ", allValues.password);
    let url = "http://localhost:8060";
    axios
      .post(url + "/authenticate", {
        username: allValues.username,
        password: allValues.password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.jwt);
        //props.data(true);
        dispatch(userLogged({ logged: true, user: { username: allValues.username, password: allValues.password } }));
      })
      .catch((error) => {
        console.log("Status");
        //console.log(error.response.status);
        console.log("Greska!");
        console.log(error);
      });
  };

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
        style={{ color: "red" }}
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
      </Form.Item>
    </Form>
  );
}

export default Login;
