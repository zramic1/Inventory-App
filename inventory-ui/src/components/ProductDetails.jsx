import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  Divider,
  Typography,
} from "antd";
const { Title } = Typography;

const ProductDetails = () => {
  const [componentSize, setComponentSize] = useState("default");

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 4,
      },
    },
  };

  return (
    <div className="datagrid">
      <Title level={1} className={"datagrid-title"}>
        {"Product Details"}
      </Title>
      <Divider type={"horizontal"} className={"divider-horizontal"} />
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
      >
        <Form.Item label="Name">
          <Input />
        </Form.Item>
        <Form.Item label="Description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Unit">
          <Input />
        </Form.Item>
        <Form.Item label="Price">
          <Input />
        </Form.Item>
        <Form.Item label="Quantity">
          <Input />
        </Form.Item>
        <Form.Item label="Status">
          <Input />
        </Form.Item>
        <Form.Item label="Order Details">
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Warehouse">
          <Select>
            <Select.Option value="Warehouse 1">Warehouse 1</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Category">
          <Select>
            <Select.Option value="Category 1">Category 1</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Supplier">
          <Select>
            <Select.Option value="Supplier 1">Supplier 1</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProductDetails;
