import { Input, Divider, Form, Select } from "antd";
const { Option } = Select;

const CreateWarehouseForm = ({ rowData }) => (
  <Form layout={"vertical"}>
    <Form.Item style={{ display: "none" }} name="id" initialValue={rowData?.id}>
      <Input />
    </Form.Item>
    <Form.Item
      label="Company Name"
      name="companyName"
      initialValue={rowData?.companyName}
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
      label="Location"
      name="location"
      initialValue={rowData?.location}
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
      label="Inventory Start Date"
      name="inventroyStartDate"
      initialValue={rowData?.inventroyStartDate}
      rules={[
        {
          required: true,
          message: "Required field!",
        },
      ]}
    >
      <Input />
    </Form.Item>
  </Form>
);

export default CreateWarehouseForm;
