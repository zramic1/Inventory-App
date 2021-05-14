import { Input, Form, Select } from "antd";
const { Option } = Select;

const CreateOrderForm = ({ rowData }) => (
  <Form layout={"vertical"}>
    <Form.Item style={{ display: "none" }} name="id" initialValue={rowData?.id}>
      <Input />
    </Form.Item>
    <Form.Item
      label="Date of Order"
      name="dateOfOrder"
      initialValue={rowData?.dateOfOrder}
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
      label="Status"
      name="status"
      initialValue={rowData?.status}
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
      label="Customer"
      name="customer"
      initialValue={rowData?.customer}
      rules={[
        {
          required: true,
          message: "Required field!",
        },
      ]}
    >
      <Select>
        <Option value="Customer 1">Customer 1</Option>
        <Option value="Customer 2">Customer 2</Option>
      </Select>
    </Form.Item>
    <Form.Item
      label="Supplier"
      name="supplier"
      initialValue={rowData?.supplier}
      rules={[
        {
          required: true,
          message: "Required field!",
        },
      ]}
    >
      <Select>
        <Option value="Supplier 1">Supplier 1</Option>
        <Option value="Supplier 2">Supplier 2</Option>
      </Select>
    </Form.Item>
  </Form>
);

export default CreateOrderForm;
