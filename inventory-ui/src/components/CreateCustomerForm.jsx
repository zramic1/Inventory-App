import { Input, Form } from "antd";

function CreateCustomerForm(props) {
    return (
        <Form layout={"vertical"} form={props.form} initialValues={props.rowData}>
            <Form.Item style={{ display: "none" }} name="id">
                <Input />
            </Form.Item>
            <Form.Item
                label="First Name"
                name="first_name"
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
                name="last_name"
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
                name="phone"
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
        </Form>
    );
}

export default CreateCustomerForm;
