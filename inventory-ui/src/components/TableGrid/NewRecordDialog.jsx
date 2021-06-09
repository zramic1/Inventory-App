import React from "react";
import EditorModal from "./EditorModal";

export const FormComponent = ({ Form, rowData }) => {
  return React.cloneElement(Form, {
    rowData: { ...rowData },
  });
};

export default class NewRecordDialog extends React.Component {
  static defaultProps = {
    visible: false,
    onCancel: () => {},
    title: " ",
  };
  render() {
    const {
      visible = false,
      onCancel,
      onSubmit,
      Form,
      formInstance,
      onFinishEditing = () => {},
      rowData,
      formActions,
    } = this.props;

    return (
      <EditorModal
        cancelButtonLabel="Cancel"
        saveButtonLabel="Save changes"
        title="Adding new item"
        visible={visible}
        onCancel={onCancel}
        onSubmit={onSubmit}
        Form={Form}
        formInstance={formInstance}
        onFinishEditing={onFinishEditing}
        rowData={rowData}
        formActions={formActions}
      />
    );
  }
}
