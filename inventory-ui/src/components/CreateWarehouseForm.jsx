import React, { useContext } from "react";
import { DatePicker } from "antd";
import { Input, Form, Select } from "antd";
import moment from "moment";

const CreateWarehouseForm = (props) => (
  <Form layout={"vertical"} form={props.form}>
    <Form.Item
      style={{ display: "none" }}
      name="id"
      initialValue={props.rowData?.id}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label={"Company Name"}
      name="companyName"
      initialValue={props.rowData?.company_name}
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
      initialValue={props.rowData?.location}
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
      name="inventoryStartDate"
      initialValue={moment(props.rowData?.inventory_start_date)}
      rules={[
        {
          required: true,
          message: "Required field!",
        },
      ]}
    >
      <DatePicker />
    </Form.Item>
  </Form>
);

export default CreateWarehouseForm;
