import { Input, Form, Select } from "antd";
const { Option } = Select;

const CreateStaffForm = ({ form, rowData }) => (
  <Form layout={"vertical"} form={form}>
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
      name="firstPassword"
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
      initialValue={rowData?.first_name}
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
      initialValue={rowData?.last_name}
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
      label="Address"
      name="address"
      initialValue={rowData?.address}
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
      initialValue={rowData?.phone}
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
        { type: "email" },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Warehouse"
      name="warehouse"
      initialValue={rowData?.warehouse_id}
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
      initialValue={rowData?.supplier_id}
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
