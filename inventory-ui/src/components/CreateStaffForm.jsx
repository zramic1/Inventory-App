import { Input, Form, Select } from "antd";
const { Option } = Select;

const CreateStaffForm = ({ rowData }) => (
  <Form layout={"vertical"}>
    <Form.Item style={{ display: "none" }} name="id" initialValue={rowData?.id}>
      <Input />
    </Form.Item>
    <Form.Item
      label="Username"
      name="username"
      initialValue={rowData?.username}
      rules={[
        {
          required: true,
          message: "Required field!",
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Password"
      name="password"
      initialValue={rowData?.password}
      rules={[
        {
          required: true,
          message: "Required field!",
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Repeat password"
      name="repeatPassword"
      initialValue={rowData?.repeatPassword}
      rules={[
        {
          required: true,
          message: "Required field!",
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="First Name"
      name="firstName"
      initialValue={rowData?.firstName}
      rules={[
        {
          required: true,
          message: "Required field!",
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Last name"
      name="lastName"
      initialValue={rowData?.lastName}
      rules={[
        {
          required: true,
          message: "Required field!",
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Adress"
      name="adress"
      initialValue={rowData?.adress}
      rules={[
        {
          required: true,
          message: "Required field!",
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Phone Number"
      name="phoneNumber"
      initialValue={rowData?.phoneNumber}
      rules={[
        {
          required: true,
          message: "Required field!",
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Email"
      name="email"
      initialValue={rowData?.email}
      rules={[
        {
          required: true,
          message: "Required field!",
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Warehouse"
      name="warehouse"
      initialValue={rowData?.warehouse}
      rules={[
        {
          required: true,
          message: "Required field!",
        },
      ]}
    >
      <Select>
        <Option value="Warehouse 1">Warehouse 1</Option>
        <Option value="Warehouse 2">Warehouse 2</Option>
      </Select>
    </Form.Item>
    <Form.Item
      label="Role"
      name="role"
      initialValue={rowData?.supplier}
      rules={[
        {
          required: true,
          message: "Required field!",
        },
      ]}
    >
      <Select>
        <Option value="Role 1">Role 1</Option>
        <Option value="Role 2">Role 2</Option>
      </Select>
    </Form.Item>
  </Form>
);

export default CreateStaffForm;
