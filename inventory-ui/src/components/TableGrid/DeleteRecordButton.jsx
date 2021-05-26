import React from "react";
import { Button } from "antd";
import DeleteModal from "./DeleteRecordDialog";

export default class DeleteRecordButton extends React.Componen {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }

  render() {
    const { onClick, type, record, children, ...buttonProps } = this.props;

    const { modalVisible } = this.state;

    return (
      <>
        <Button
          onClick={() => {
            this.setState({
              modalVisible: true,
            });
          }}
          type={type}
          {...(buttonProps || {})}
        >
          {children}
        </Button>
        {modalVisible && (
          <DeleteModal
            onDelete={onClick}
            onCancel={() => {
              this.setState({
                modalVisible: false,
              });
            }}
            rowData={record}
            visible={modalVisible}
          />
        )}
      </>
    );
  }
}
