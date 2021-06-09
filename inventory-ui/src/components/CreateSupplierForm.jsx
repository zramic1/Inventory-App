import { Input, Form } from "antd";

function CreateSupplierForm(props) {
    return (
        <Form layout={"vertical"} form={props.form} initialValues={props.rowData}>
            <Form.Item style={{ display: "none" }} name="id">
                <Input />
            </Form.Item>
            <Form.Item
                label="Name"
                name="name"
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
            <Form.Item
                label="Fax"
                name="fax"
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
                label="otherDetails"
                name="otherDetails"
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
                label="Phone"
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
        </Form>
    );
}

export default CreateSupplierForm;
