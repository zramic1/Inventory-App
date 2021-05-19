import React, { useContext, useEffect } from "react";
import DataGrid from "./TableGrid/DataGrid";
import CreateWarehouseForm from "./CreateWarehouseForm";
import { useDispatch, useSelector } from "react-redux";

import { UrlContext } from "../urlContext";

import { getAllWarehouses } from "./actions/loginActions";
import axiosInstance from "../api/axiosInstance";

function Warehouse() {
  const warehouseContext = useContext(UrlContext);
  const dispatch = useDispatch();
  const warehousi = useSelector(state => state.logovani.warehouses)

  const getWarehouses = () => {
    let url = warehouseContext.user;
    axiosInstance(url)
      .get("/warehouses")
      .then((res) => {
        dispatch(getAllWarehouses(res.data));
      })
      .catch((error) => {
        console.log("Status");
        //console.log(error.response.status);
        console.log("Greska!");
        console.log(error);
      });
  }

  useEffect(() => {
    getWarehouses();
  });

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
