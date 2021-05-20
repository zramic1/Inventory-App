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
        //console.log("Warehousi su: ", res.data);
      })
      .catch((error) => {
        console.log("Status");
        //console.log(error.response.status);
        console.log("Greska!");
        console.log(error);
      });
  }

  useEffect(() => {
    console.log("Warehousi su: ", warehousi);
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
              dataIndex: "company_name",
              key: "company_name",
            },
            {
              title: "Location",
              dataIndex: "location",
              key: "location",
            },
            {
              title: "Inventory Start Date",
              dataIndex: "inventory_start_date",
              key: "inventory_start_date",
            },
          ],
          dataSource: warehousi,
          Form: <CreateWarehouseForm />,
          visible: false,
        }}
      ></DataGrid>
    </div>
  );
}

export default Warehouse;
