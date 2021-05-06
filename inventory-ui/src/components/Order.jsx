import React, { Fragment } from "react";
import DataGrid from "./TableGrid/DataGrid";

function Order() {
  return (
    <div style={{ height: "100vh" }}>
      <DataGrid
        props={{
          title: "Orders",
          addButtonText: "Add new order",
          columns: [
            {
              title: "Date Of Order",
              dataIndex: "dateOfOrder",
              key: "dateOfOrder",
            },
            {
              title: "Status",
              dataIndex: "status",
              key: "status",
            },
            {
              title: "Customer",
              dataIndex: "customer",
              key: "customer",
            },
            {
              title: "Supplier",
              dataIndex: "supplier",
              key: "supplier",
            },
          ],
        }}
      ></DataGrid>
    </div>
  );
}

export default Order;
