import React from "react";
import { Modal, Row, Col } from "antd";
import Button from "antd/lib/button";

const FormComponent = ({ Form, rowData }) => {
  return React.cloneElement(Form, {
    rowData: rowData,
  });
};

export default class EditorModal extends React.Component {
  constructor(props) {
    super(props);
    this.renderFormAction = this.renderFormAction.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.state = {
      loading: false,
    };
  }
  renderFormAction(action) {
    const onClick = async () => {
      const { onFinishEditing, onCancel, formInstance } = this.props;
      try {
        formInstance?.validateFields().then(async (values) => {
          await action.onClick(values);
          onFinishEditing(values);
        });
        if (action.key === "cancel") {
          formInstance?.resetFields();
          onCancel?.();
        }
      } catch (error) {
        console.log(error);
      }
    };
    let Component = action.Component || Button;
    return (
      <Component
        key={action.key}
        onClick={onClick}
        type={action.type}
        record={this.props.rowData}
        {...(action.buttonProps || {})}
      >
        {action.label}
      </Component>
    );
  }

  renderFooter() {
    const { formActions } = this.props;
    if (formActions == null) {
      return undefined;
    }
    console.log("tutu");
    return (
      <Row gutter={8}>
        <Col span={12}>
          {formActions
            .filter((item) => item.position === "left")
            .map(this.renderFormAction)}
        </Col>
        <Col span={12}>
          {formActions
            .filter((item) => item.position !== "left")
            .map(this.renderFormAction)}
        </Col>
      </Row>
    );
  }

  render() {
    const {
      saveButtonLabel,
      cancelButtonLabel,
      title,
      visible,
      onCancel,
      Form,
      formInstance,
      onSubmit,
      rowData,
      okBtnDisabledRecordProp,
    } = this.props;

    formInstance?.setFieldsValue(rowData);
    return (
      <Modal
        visible={visible}
        title={title}
        okText={saveButtonLabel}
        cancelText={cancelButtonLabel}
        confirmLoading={this.state.loading}
        onCancel={() => {
          formInstance?.resetFields();
          onCancel?.();
        }}
        maskClosable={false}
        onOk={async () => {
          try {
            let val = await formInstance?.validateFields();
            let res = await onSubmit?.(val);
            await formInstance?.resetFields();
            this.props.onFinishEditing(res);
          } catch (err) {
            console.log(err);
          }
        }}
        className={"modal-position "}
        footer={this.renderFooter()}
        okButtonProps={{
          disabled: okBtnDisabledRecordProp && rowData[okBtnDisabledRecordProp],
        }}
      >
        <FormComponent Form={Form} rowData={rowData} />
        {console.log(";LADFHK;SFLAFHASKLFHAKLAHSFKLASHFKLASFKLASHKLFHASKLFHSF", rowData)}
      </Modal>
    );
  }
}
