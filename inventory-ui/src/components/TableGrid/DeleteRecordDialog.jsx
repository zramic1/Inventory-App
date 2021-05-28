import * as React from "react";
import { Modal, Button } from "antd";

export default class DeleteRecordDialog extends React.Component {
  static defaultProps = {
    visible: false,
  };

  render() {
    const { onDelete, onCancel, rowData, visible } = this.props;

    return (
      <div>
        {console.log("ON DELETE je: ", onDelete)}
        <Modal
          title="Deleting item"
          visible={visible}
          onCancel={onCancel}
          maskClosable={false}
          footer={[
            <Button key="back" onClick={onCancel}>
              Cancel
            </Button>,
            <Button
              key="submit"
              danger
              onClick={(e) => {
                onDelete(rowData);
                onCancel();
              }}
            >
              Delete
            </Button>,
          ]}
        >
          <span>Are you sure you want to delete this item?</span>
        </Modal>
      </div>
    );
  }
}
