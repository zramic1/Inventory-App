import { Input, Form, Select, DatePicker } from "antd";
import { useEffect } from "react";
const { Option } = Select;

function CreateOrderForm(props) {
  useEffect(() => {
    console.log(props);
  }, []);

  return (
    <Form layout={"vertical"} form={props.form}>
      <Form.Item
        style={{ display: "none" }}
        name="id"
        initialValue={props.rowData?.id}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Date of Order"
        name="dateOfOrder"
        initialValue={props.rowData?.dateOfOrder}
        rules={[
          {
            required: true,
            message: "Required field!",
          },
        ]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
        label="Status"
        name="status"
        initialValue={props.rowData?.status}
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
        initialValue={props.rowData?.customer}
        rules={[
          {
            required: true,
            message: "Required field!",
          },
        ]}
      >
        <Select>
          {props.data?.customers?.map((customer, i) => (
            <Option value={i}>
              {customer?.first_name} {customer?.last_name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Supplier"
        name="supplier"
        initialValue={props.rowData?.supplier}
        rules={[
          {
            required: true,
            message: "Required field!",
          },
        ]}
      >
        <Select>
          {props.data?.suppliers?.map((supplier, i) => (
            <Option value={i}>{supplier.name}</Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
}

export default CreateOrderForm;
