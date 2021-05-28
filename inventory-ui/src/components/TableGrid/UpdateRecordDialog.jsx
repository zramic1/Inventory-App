import React from "react";
import EditorModal from "./EditorModal";

export default class UpdateRecordDialog extends React.Component {
  static defaultProps = {
    onFinishEditing: () => {},
    visible: false,
    title: " ",
  };

  constructor(props) {
    super(props);
  }
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

    formInstance?.setFieldsValue(rowData);

    return (
      <EditorModal
        cancelButtonLabel="Cancel"
        saveButtonLabel="Save changes"
        title="Editing item"
        visible={visible}
        onCancel={onCancel}
        onSubmit={onSubmit}
        Form={Form}
        rowData={rowData}
        formInstance={formInstance}
        onFinishEditing={onFinishEditing}
        formActions={formActions}
      />
    );
  }
}
