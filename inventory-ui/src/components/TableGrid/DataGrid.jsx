import Table from "./Table";
import * as React from "react";
import Header from "./Header";
import NewRecordDialog from "./NewRecordDialog";
import DeleteRecordDialog from "./DeleteRecordDialog";
import UpdateRecordDialog from "./UpdateRecordDialog";

export default class DataGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      createModalVisible: false,
      updateModalvisible: false,
      deleteModalVisible: false,
      rowData: {},
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const createModalVisible = this.props.data.visible;
    const updateModalVisible = this.props.data.visible;

    let prevStateCreateModalVisible = prevState?.createModalVisible;
    let prevStateUpdateModalVisible = prevState?.updateModalVisible;

    if (
      createModalVisible !== undefined &&
      createModalVisible !== prevStateCreateModalVisible
    ) {
      this.setState({
        createModalVisible,
      });
    }

    if (
      updateModalVisible !== undefined &&
      updateModalVisible !== prevStateUpdateModalVisible
    ) {
      this.setState({
        updateModalVisible,
      });
    }
    //console.log(createModalVisible);
  }

  render() {
    const {
      createModalVisible,
      updateModalVisible,
      deleteModalVisible,
      rowData,
    } = this.state;

    const {
      onCancelCreateModal,
      onCancelUpdateModal,
      title,
      addButtonText,
      columns,
      onSubmit,
      Form,
      formInstance,
      formActions,
      dataSource,
      updateOnSubmit,
      UpdateForm,
      updateFormInstance,
      updateFormActions,
      onDelete,
    } = this.props.data;

    const showCreateModal = (e) => {
      let newRowData = {};
      if (this.props.data.onStartCreate) {
        newRowData = this.props.data.onStartCreate(rowData);
      }
      this.props.data.formInstance?.setFieldsValue(newRowData);
      this.setState({
        ...updateModalVisible,
        ...deleteModalVisible,
        createModalVisible: true,
        rowData: newRowData,
      });
    };

    const showUpdateModal = (e, rowData) => {
      console.log("Row data", rowData);
      if (this.props.data.onStartUpdate) {
        this.props.data.onStartUpdate(rowData);
      }
      this.setState({
        updateModalVisible: true,
        rowData,
      });
    };

    const cancelCreateModal = (e) => {
      let cancelResult = false;

      this.setState({
        createModalVisible: cancelResult,
      });
      onCancelCreateModal && onCancelCreateModal(e);
    };

    const cancelUpdateModal = (e) => {
      this.setState({
        updateModalVisible: false,
      });
      if (this.props.data.onEndUpdate) {
        this.props.data.onEndUpdate();
      }
      onCancelUpdateModal && onCancelUpdateModal(e);
    };

    const endCreateModal = (e) => {
      if (this.props.data.onEndCreate) {
        this.props.data.onEndCreate(e);
      }
      this.setState({
        createModalVisible: false,
      });
    };

    const endUpdateModal = (e) => {
      if (this.props.onEndUpdate) {
        this.props.onEndUpdate(e);
      }
      this.setState({
        updateModalVisible: false,
      });
    };

    const showDeleteModal = (e, data) => {
      this.setState({
        deleteModalVisible: true,
        rowData: data,
      });
    };

    const cancelDeleteModal = (e) => {
      this.setState({
        deleteModalVisible: false,
      });
    };
    return (
      <div className="datagrid">
        <Header
          title={title}
          allowCreate={true}
          addButtonText={addButtonText}
          showCreateModal={showCreateModal}
        ></Header>
        <Table
          columns={columns}
          dataSource={dataSource}
          showUpdateModal={showUpdateModal}
          showDeleteModal={showDeleteModal}
        ></Table>
        {createModalVisible && (
          <NewRecordDialog
            visible={createModalVisible}
            onCancel={cancelCreateModal}
            onSubmit={onSubmit}
            Form={Form}
            formInstance={formInstance}
            onFinishEditing={endCreateModal}
            rowData={rowData}
            formActions={formActions}
          />
        )}
        {updateModalVisible && (
          <UpdateRecordDialog
            visible={updateModalVisible}
            onCancel={cancelUpdateModal}
            onSubmit={updateOnSubmit}
            Form={UpdateForm}
            rowData={rowData}
            formInstance={updateFormInstance}
            onFinishEditing={endUpdateModal}
            formActions={updateFormActions}
          />
        )}
        {deleteModalVisible && (
          <DeleteRecordDialog
            visible={deleteModalVisible}
            onCancel={cancelDeleteModal}
            onDelete={onDelete}
            rowData={rowData}
          />
        )}
      </div>
    );
  }
}
