import React, { useContext } from "react";
import { DatePicker } from "antd";
import { Input, Form, Select } from "antd";
import moment from "moment";

const CreateWarehouseForm = (props) => (
  <Form
    layout={"vertical"}
    form={props.form}
    initialValues={{
      id: props.rowData?.id,
      company_name: props.rowData?.company_name,
      location: props.rowData?.location,
      inventoryStartDate: moment(props.rowData?.inventory_start_date),
    }}
  >
    {console.log("Ovjde row data", props.rowData)}
    <Form.Item style={{ display: "none" }} name="id">
      <Input />
    </Form.Item>
    <Form.Item
      label={"Company Name"}
      name="company_name"
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
