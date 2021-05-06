import Table from "./Table";
import * as React from "react";
import Header from "./Header";

export default function DataGrid({ props }) {
  return (
    <div className="datagrid">
      <Header
        title={props.title}
        allowCreate={true}
        addButtonText={props.addButtonText}
      ></Header>
      <Table columns={props.columns}></Table>
    </div>
  );
}
