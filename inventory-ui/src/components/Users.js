import React from "react";
import CreateStaffForm from "./CreateStaffForm";
import DataGrid from "./TableGrid/DataGrid";

function Users() {
  return (
    <div style={{ height: "100vh" }}>
      <DataGrid
        data={{
          title: "Staff",
          addButtonText: "Add new staff member",
          columns: [
            {
              title: "Username",
              dataIndex: "username",
              key: "username",
            },
            {
              title: "Name",
              dataIndex: "name",
              key: "name",
            },
            {
              title: "Address",
              dataIndex: "address",
              key: "address",
            },
            {
              title: "Phone number",
              dataIndex: "phoneNumber",
              key: "phoneNumber",
            },
            {
              title: "Email",
              dataIndex: "email",
              key: "email",
            },
            {
              title: "Role",
              dataIndex: "role",
              key: "role",
            },
            {
              title: "Warehouse",
              dataIndex: "warehouse",
              key: "warehouse",
            },
          ],
          Form: <CreateStaffForm />,
          visible: false,
        }}
      ></DataGrid>
    </div>
  );
}

export default Users;
