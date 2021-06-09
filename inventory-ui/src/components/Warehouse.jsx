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
  const [UpdateForm] = Form.useForm();
  const warehouseContext = useContext(UrlContext);
  const dispatch = useDispatch();
  const trenutniKorisnikId = useSelector(
    (state) => state.logovani.otherUserInformation.id
  );
  const warehousi = useSelector((state) => state.logovani.warehouses);
  const userIsSupplier = useSelector((state) => state.logovani.userIsSupplier);

  const getWarehouses = () => {
    let url = warehouseContext.user;
    let putanja =
      userIsSupplier.id !== undefined && userIsSupplier.id !== null
        ? `/warehouses`
        : `/warehouses/user/${trenutniKorisnikId}`;
    //console.log("Trenutno je u warehouse logovan: ", trenutniKorisnikId);
    axiosInstance(url)
      .get(putanja)
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
            id: wh.id,
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

  const addWarehouse = (val) => {
    const { company_name, inventoryStartDate, location } = val;
    console.log(
      "Vrijednosti",
      company_name,
      inventoryStartDate.format("YYYY-MM-DD"),
      location
    );
    let url = warehouseContext.user;
    axiosInstance(url)
      .post("/warehouse", {
        company_name: company_name,
        inventory_start_date: inventoryStartDate,
        location: location,
      })
      .then((res) => {
        getWarehouses();
        dispatch(addNewWarehouse());
        console.log("Warehouse je: ", res.data);
      })
      .catch((error) => {
        console.log("Status");
        console.log("Greska!");
        console.log(error);
      });
  };

  const updateWarehouse = (val) => {
    const { id, company_name, inventoryStartDate, location } = val;
    console.log("UPDATEEEE", id, company_name, inventoryStartDate, location);
    let url = warehouseContext.user;
    axiosInstance(url)
      .put(`/updateWarehouse/${id}`, {
        company_name: company_name,
        inventory_start_date: inventoryStartDate,
        location: location,
      })
      .then((res) => {
        getWarehouses();
        dispatch(addNewWarehouse());
        console.log("Warehouse je: ", res.data);
      })
      .catch((error) => {
        console.log("Status");
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
              title: "Warehouse id",
              dataIndex: "id",
              key: "id",
            },
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
              key: "isdate",
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
          onSubmit: addWarehouse,
          formInstance: CreateForm,
          updateFormInstance: UpdateForm,
          UpdateForm: <CreateWarehouseForm form={UpdateForm} />,
          updateOnSubmit: updateWarehouse,
          //onDelete: deleteWarehouse,
        }}
      ></DataGrid>
    </div>
  );
}

export default Warehouse;
