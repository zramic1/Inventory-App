import React, { useContext, useEffect } from "react";
import DataGrid from "./TableGrid/DataGrid";
import CreateWarehouseForm from "./CreateWarehouseForm";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "antd";
import { UrlContext } from "../urlContext";

import { getAllWarehouses, addNewWarehouse } from "./actions/loginActions";
import axiosInstance from "../api/axiosInstance";

function Warehouse() {
  const [CreateForm] = Form.useForm();
  const warehouseContext = useContext(UrlContext);
  const dispatch = useDispatch();
  const trenutniKorisnikId = useSelector(
    (state) => state.logovani.otherUserInformation.id
  );
  const warehousi = useSelector((state) => state.logovani.warehouses);

  const addWarehouse = (companyName, inventoryStartDate, location) => {
    let url = warehouseContext.user;
    axiosInstance(url)
      .post("/warehouse", { companyName, inventoryStartDate, location })
      .then((res) => {
        let sviOrderi = [];
        dispatch(addNewWarehouse());
        console.log("Warehouse je: ", res.data);
      })
      .catch((error) => {
        console.log("Status");
        console.log("Greska!");
        console.log(error);
      });
  };
  // treba promijeniti da vraca warehouse po korisnickom ID!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  const getWarehouses = () => {
    let url = warehouseContext.user;
    //console.log("Trenutno je u warehouse logovan: ", trenutniKorisnikId);
    axiosInstance(url)
      .get(`/warehouses/user/${trenutniKorisnikId}`)
      .then((res) => {
        console.log(
          "Vrati warehouse od korisnika ",
          trenutniKorisnikId,
          res.data
        );
        let noviWarehouseNiz = [];
        for (let i = 0; i < res.data.length; i++) {
          let wh = res.data[i];
          //console.log("Wh je: ", wh);
          noviWarehouseNiz.push({
            company_name: wh.company_name,
            location: wh.location,
            inventory_start_date: wh.inventory_start_date,
          });
        }
        dispatch(getAllWarehouses(noviWarehouseNiz));
        //console.log("Warehousi su: ", res.data);
      })
      .catch((error) => {
        console.log("Status");
        //console.log(error.response.status);
        console.log("Greska!");
        console.log(error);
      });
  };

  useEffect(() => {
    console.log("Poziva se mount");
    //console.log("Warehousi su: ", warehousi);
    getWarehouses();
  }, []);

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
          Form: <CreateWarehouseForm form={CreateForm} />,
          rowData: {
            companyName: "",
            inventoryStartDate: "",
            location: "",
          },
          visible: false,
          onSubmit: addNewWarehouse,
          formInstance: CreateForm,
        }}
      ></DataGrid>
    </div>
  );
}

export default Warehouse;
