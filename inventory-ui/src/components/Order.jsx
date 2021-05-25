import React, { useContext, useEffect } from "react";
import DataGrid from "./TableGrid/DataGrid";
import CreateOrderForm from "./CreateOrderForm";

import { useDispatch, useSelector } from "react-redux";

import { UrlContext } from "../urlContext";
import { Form } from "antd";
import {
  getAllOrders,
  getAllCustomers,
  getAllSuppliers,
  addNewOrder,
} from "./actions/loginActions";
import axiosInstance from "../api/axiosInstance";

function Order() {
  const [CreateForm] = Form.useForm();
  const orderContext = useContext(UrlContext);
  const dispatch = useDispatch();
  const orderi = useSelector((state) => state.logovani.allOrders);
  const customeri = useSelector((state) => state.logovani.allCustomers);
  const supplieri = useSelector((state) => state.logovani.allSuppliers);

  const getOrders = () => {
    let url = orderContext.order;
    axiosInstance(url)
      .get("/orders")
      .then((res) => {
        let sviOrderi = [];
        for (let i = 0; i < res.data.length; i++) {
          let or = res.data[i];
          sviOrderi.push({
            dateOfOrder: or.dateOfOrder,
            status: or.status,
            customer: `${or.customerId.first_name} ${or.customerId.last_name}`,
            supplier: or.userId.name,
          });
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
  };

  const getCustomers = () => {
    let url = orderContext.user;
    axiosInstance(url)
      .get("/customers")
      .then((res) => {
        let sviCustomeri = [];
        for (let i = 0; i < res.data.length; i++) {
          let or = res.data[i];
          sviCustomeri.push({
            id: or.id,
            address: or.address,
            email: or.email,
            first_name: or.first_name,
            last_name: or.last_name,
            phone: or.phone,
          });
        }
        dispatch(getAllCustomers(sviCustomeri));
      })
      .catch((error) => {
        console.log("Status");
        console.log("Greska!");
        console.log(error);
      });
  };

  const getSuppliers = () => {
    let url = orderContext.product;
    axiosInstance(url)
      .get("/suppliers")
      .then((res) => {
        let sviSupplieri = [];
        for (let i = 0; i < res.data.length; i++) {
          let or = res.data[i];
          sviSupplieri.push({
            id: or.id,
            name: or.name,
            phone: or.phone,
            email: or.email,
          });
        }
        dispatch(getAllSuppliers(sviSupplieri));
      })
      .catch((error) => {
        console.log("Status");
        console.log("Greska!");
        console.log(error);
      });
  };

  const addOrder = (val) => {
    const { dateOfOrder, status, customer, supplier } = val;
    console.log("Vrijednosti", dateOfOrder, status, customer, supplier);
    let url = orderContext.order;
    axiosInstance(url)
      .post("/orders", {
        dateOfOrder: dateOfOrder,
        status: status,
        customerId: customeri[customer],
        userId: supplieri[supplier],
      })
      .then((res) => {
        let sviOrderi = [];
        dispatch(addNewOrder());
        console.log("Order je: ", res.data);
      })
      .catch((error) => {
        console.log("Status");
        console.log("Greska!");
        console.log(error);
      });
  };

  useEffect(() => {
    console.log("Orderi su: ", orderi);
    console.log("Customeri su: ", customeri);
    console.log("Supplieri su: ", supplieri);
    getOrders();
    getSuppliers();
    getCustomers();
  }, []);

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
          formInstance: CreateForm,
          Form: (
            <CreateOrderForm
              form={CreateForm}
              data={{
                customers: customeri,
                suppliers: supplieri,
                dateOfOrder: "",
                id: "",
                status: "",
                customer: "",
                supplier: "",
              }}
            />
          ),
          visible: false,
          onSubmit: addOrder,
        }}
      ></DataGrid>
    </div>
  );
}

export default Order;
