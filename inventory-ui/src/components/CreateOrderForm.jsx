import { Input, Form, Select, DatePicker } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
const { Option } = Select;

function CreateOrderForm(props) {
  let [customerId, setCustomerId] = useState("");
  useEffect(() => {
    console.log(props);
    props?.data?.customers?.map((customer) => {
      if (
        `${customer.first_name} ${customer.last_name}` ===
        props?.rowData?.customer
      )
        setCustomerId(customer.id);
    });
    console.log(
      "Vrijednost: ",
      props.rowData?.customer,
      props?.data?.customers,
      customerId
    );
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
        initialValue={moment(props.rowData?.date_of_order)}
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
        initialValue={customerId}
        rules={[
          {
            required: true,
            message: "Required field!",
          },
        ]}
      >
        <Select value={customerId}>
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
