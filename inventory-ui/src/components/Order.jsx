import React, { useContext, useEffect } from "react";
import DataGrid from "./TableGrid/DataGrid";
import CreateOrderForm from "./CreateOrderForm";

import { useDispatch, useSelector } from "react-redux";

import { UrlContext } from "../urlContext";

import { getAllOrders } from "./actions/loginActions";
import axiosInstance from "../api/axiosInstance";

function Order() {
  const orderContext = useContext(UrlContext);
  const dispatch = useDispatch();
  const orderi = useSelector(state => state.logovani.allOrders)

  const getOrders = () => {
    let url = orderContext.order;
    axiosInstance(url)
      .get("/orders")
      .then((res) => {
        console.log("Order odgovor je: ", res.data);
        let sviOrderi = [];
        for (let i = 0; i < res.data.length; i++) {
          let or = res.data[i];
          sviOrderi.push({
            dateOfOrder: or.dateOfOrder,
            status: or.status,
            customer: `${or.customerId.first_name} ${or.customerId.last_name}`,
            supplier: or.userId.name
          })
        }
        dispatch(getAllOrders(sviOrderi));
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
    console.log("Orderi su: ", orderi);
    getOrders();
  });

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
          dataSource: orderi,
          //formInstance: Form.useForm(),
          Form: <CreateOrderForm />,
          visible: false,
        }}
      ></DataGrid>
    </div>
  );
}

export default Order;
