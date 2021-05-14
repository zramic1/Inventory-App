import React from "react";
import DataGrid from "./TableGrid/DataGrid";
import CreateOrderForm from "./CreateOrderForm";

function Order() {
  return (
    <div style={{ height: "100vh" }}>
      <DataGrid
        data={{
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
          //formInstance: Form.useForm(),
          Form: <CreateOrderForm />,
          visible: false,
        }}
      ></DataGrid>
    </div>
  );
}

export default Order;
