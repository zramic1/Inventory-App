import React, { Fragment } from "react";
import DataGrid from "./TableGrid/DataGrid";
import Header from "./TableGrid/Header";

function Warehouse() {
  return (
    <div style={{ height: "100vh" }}>
      <DataGrid
        props={{
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
        }}
      ></DataGrid>
    </div>
  );
}

export default Warehouse;
