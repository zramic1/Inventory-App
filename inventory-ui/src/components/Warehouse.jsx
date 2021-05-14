import React from "react";
import DataGrid from "./TableGrid/DataGrid";
import CreateWarehouseForm from "./CreateWarehouseForm";
function Warehouse() {
  return (
    <div style={{ height: "100vh" }}>
      <DataGrid
        data={{
          title: "Warehouses",
          addButtonText: "Add new warehouse",
          columns: [
            {
              title: "Company Name",
              dataIndex: "companyName",
              key: "companyName",
            },
            {
              title: "Location",
              dataIndex: "location",
              key: "location",
            },
            {
              title: "Inventory Start Date",
              dataIndex: "inventoryStartDate",
              key: "inventoryStartDate",
            },
          ],
          dataSource: [
            {
              title: "Company Name",
              dataIndex: "companyName",
              key: "companyName",
            },
            {
              title: "Location",
              dataIndex: "location",
              key: "location",
            },
            {
              title: "Inventory Start Date",
              dataIndex: "inventoryStartDate",
              key: "inventoryStartDate",
            },
          ],
          Form: <CreateWarehouseForm />,
          visible: false,
        }}
      ></DataGrid>
    </div>
  );
}

export default Warehouse;
