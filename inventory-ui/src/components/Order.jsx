import React, { useContext, useEffect, useState } from "react";
import DataGrid from "./TableGrid/DataGrid";
import CreateOrderForm from "./CreateOrderForm";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { UrlContext } from "../urlContext";
import { Form } from "antd";
import {
  getAllOrders,
  getAllCustomers,
  getAllSuppliers,
  addNewOrder,
  getAllWarehouses,
  getCustomerByOrder,
  getSupplierByOrder,
} from "./actions/loginActions";
import axiosInstance from "../api/axiosInstance";
import { Button, Menu, Dropdown } from "antd";

import { FaWarehouse } from "react-icons/fa";

import { DownOutlined } from "@ant-design/icons";

function Order() {
  const [CreateForm] = Form.useForm();
  const [UpdateForm] = Form.useForm();
  const orderContext = useContext(UrlContext);
  const dispatch = useDispatch();
  const orderi = useSelector((state) => state.logovani.allOrders);
  //promijeniti na sve moguce warehouse
  const warehousiUsera = useSelector((state) => state.logovani.warehouses);
  const trenutniKorisnikId = useSelector(
    (state) => state.logovani.otherUserInformation.id
  );
  let [dropdownText, setDropdownText] = useState(
    warehousiUsera[0].id !== undefined ? `Warehouse ${warehousiUsera[0].id}` : "None"
  );
  const userIsSupplier = useSelector((state) => state.logovani.userIsSupplier);
  const otherUserInformation = useSelector(
    (state) => state.logovani.otherUserInformation
  );

  // menu za izbor warehouse za approve ordera
  const menu = (
    <Menu onClick={handleMenuClick}>
      {warehousiUsera.map((element, indeks) => {
        return (
          <Menu.Item
            key={element.id}
            icon={<FaWarehouse style={{ marginRight: "10px" }} />}
          >
            {`Warehouse ${element.id}`}
          </Menu.Item>
        );
      })}
    </Menu>
  );

  function handleMenuClick(e) {
    dropdownText = (`Warehouse ${e.key}`);
    console.log("click", e);
  }
  const customeri = useSelector((state) => state.logovani.allCustomers);
  const supplieri = useSelector((state) => state.logovani.allSuppliers);

  const getOrders = () => {
    let url = orderContext.order;
    if (userIsSupplier.id !== undefined && userIsSupplier.id !== null) {
      axiosInstance(url)
        .get(`/orders/supplier/${userIsSupplier.id}`)
        .then((res) => {
          let sviOrderi = [];
          for (let i = 0; i < res.data.length; i++) {
            let or = res.data[i];
            console.log("Svi orderiii", or);
            sviOrderi.push({
              id: or.id,
              date_of_order: or.dateOfOrder,
              status: or.status,
              order_details: or.orderDetail,
              /*customer: `${or.customerId.first_name} ${or.customerId.last_name}`,
              supplier: or.userId.name,
              userId: or.userId,
              customerId: or.customerId*/
            });
          }

          let url1 = orderContext.user;
          axiosInstance(url1)
            .get(`/warehouses`)
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
              dispatch(getAllOrders(sviOrderi));
              const promises1 = sviOrderi.map((el) => {
                return axiosInstance(url)
                  .get(`/customer/order/${el.id}`)
                  .then((res) => res.data);
              });

              const promises2 = sviOrderi.map((el) => {
                return axiosInstance(url)
                  .get(`/supplier/order/${el.id}`)
                  .then((res) => res.data);
              });

              Promise.all(promises1).then((data) => {
                for (let i = 0; i < data.length; i++) {
                  dispatch(
                    getCustomerByOrder({
                      orderId: i,
                      first_name: data[i].first_name,
                      last_name: data[i].last_name,
                    })
                  );
                }
              });

              Promise.all(promises2).then((data) => {
                for (let i = 0; i < data.length; i++) {
                  dispatch(
                    getSupplierByOrder({
                      orderId: i,
                      name: data[i].name,
                    })
                  );
                }
              });
            })
            .catch((error) => {
              console.log("Status");
              //console.log(error.response.status);
              console.log("Greska!");
              console.log(error);
            });

          //console.log("Warehousi su: ", res.data);
        })
        .catch((error) => {
          console.log("Status");
          //console.log(error.response.status);
          console.log("Greska!");
          console.log(error);
        });
    } else {
      console.log("Customeri su: ", otherUserInformation.customers);
      const promises = otherUserInformation.customers.map((el) => {
        return axiosInstance(url)
          .get(`/orders/customer/${el.id}`)
          .then((res) => res.data);
      });

      Promise.all(promises).then((data) => {
        console.log("Vratio ugnijezdjeni axios: ", data);
        let sviOrderi = [];
        for (let i = 0; i < data.length; i++) {
          for (let j = 0; j < data[i].length; j++) {
            let or = data[i][j];
            sviOrderi.push({
              id: or.id,
              date_of_order: or.dateOfOrder,
              status: or.status,
              order_details: or.orderDetail,
              /*customer: `${or.customerId.first_name} ${or.customerId.last_name}`,
              supplier: or.userId.name,
              userId: or.userId,
              customerId: or.customerId*/
            });
          }
        }
        dispatch(getAllOrders(sviOrderi));
      });
    }
  };

  const deleteOrder = (rowData) => {
    const { id } = rowData;
    let url = orderContext.order;
    axiosInstance(url)
      .delete(`/orders/${id}`)
      .then((res) => {
        getOrders();
        dispatch(deleteOrder());
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
    console.log(supplieri);
    let url = orderContext.order;
    axiosInstance(url)
      .post("/orders", {
        dateOfOrder: dateOfOrder,
        status: status,
        customerId: customeri[customer],
        supplierId: supplieri[supplier],
      })
      .then((res) => {
        getOrders();
        dispatch(addNewOrder());
        console.log("Order je: ", res.data);
      })
      .catch((error) => {
        console.log("Status");
        console.log("Greska!");
        console.log(error);
      });
  };

  const updateOrder = (val) => {
    const { id, dateOfOrder, status, customer, supplier } = val;
    console.log(
      "update rijednosti",
      id,
      dateOfOrder,
      status,
      customeri[customer],
      supplieri[supplier]
    );
    let url = orderContext.order;
    axiosInstance(url)
      .put(`/orders/${id}`, {
        dateOfOrder: dateOfOrder,
        status: status,
        customerId: customeri[customer],
        supplierId: supplieri[supplier],
      })
      .then((res) => {
        getOrders();
        dispatch(addNewOrder());
        console.log("Order je: ", res.data);
      })
      .catch((error) => {
        console.log("Status");
        console.log("Greska!");
        console.log(error);
      });
  };

  const approveOrder = (order) => {
    console.log("OrderId je: ", order);
    let url = orderContext.order;
    order.status = "approved";
    axiosInstance(url)
      .put(`/orders/${order.id}`, order)
      .then((res) => {
        console.log("Odgovor je: ", res);
        getOrders();
        let url1 = orderContext.order;
        axiosInstance(url1)
          .get(`/orders/${order.id}`)
          .then((res1) => {
            if (warehousiUsera.length > 0) {
              let parsirajId = parseInt(dropdownText.replace(/[^0-9]/g, ""));
              let wh = warehousiUsera.find((x) => x.id === parsirajId);
              let orderDetailOvogOrdera = res1.data.orderDetail;
              orderDetailOvogOrdera.forEach((orDetail) => {
                let productJe = orDetail.productId;
                let url2 = orderContext.product;
                axiosInstance(url2)
                  .get(`/products/${productJe.id}`)
                  .then((res2) => {
                    let praviProdukt = res2.data;
                    praviProdukt.warehouseId = { id: wh.id };
                    let url3 = orderContext.product;
                    //let produktiIzWarehousa=wh.products;
                    //produktiIzWarehousa.push(produktJe);
                    console.log("Product je: ", praviProdukt);
                    console.log("Warehouse je: ", wh);
                    axiosInstance(url3)
                      .put(`/products/${praviProdukt.id}`, praviProdukt)
                      .then((res3) => {
                        console.log("Poslano je uspjesno: ", productJe);
                        console.log("Res3 je: ", res3);
                      });
                  });
              });
            }
          });
      })
      .catch((error) => {
        console.log("Greska");
        console.log(error);
      });
  };

  const [kolone, setKolone] = useState([
    {
      title: "Date Of Order",
      dataIndex: "date_of_order",
      key: "date_of_order",
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
    {
      title: "Details",
      dataIndex: "details",
      key: "details",
      render: (text, render) => (
        <Link
          to={{
            pathname: "/order-details",
            state: {
              data: { render },
            },
          }}
          params={{ render }}
        >
          ORDER DETAILS
        </Link>
      ),
    },
  ]);

  useEffect(() => {
    console.log("POZVANO OKURRRRR!");
    console.log("Orderi su: ", orderi);
    getOrders();
    getSuppliers();
    getCustomers();
  }, []);

  useEffect(() => {
    console.log("POZVAN DRUGIIIIIIIIIII");
    let kol = kolone;
    if (
      userIsSupplier.id !== undefined &&
      userIsSupplier.id !== null &&
      kol[kol.length - 1].key !== "changeStatus"
    ) {
      kol.push({
        title: "Change status",
        dataIndex: "changeStatus",
        key: "changeStatus",
        render: (text, render) =>
          render.status !== "approved" ? (
            <>
              <Dropdown overlay={menu}>
                <Button>
                  {dropdownText} <DownOutlined />
                </Button>
              </Dropdown>
              <Button
                type="primary"
                onClick={() => {
                  approveOrder(render);
                }}
              >
                Approve
              </Button>
            </>
          ) : (
            <Button type="primary" style={{ marginLeft: "17%" }} disabled>
              Approved
            </Button>
          ),
      });
    } else if (userIsSupplier.id !== undefined && userIsSupplier.id !== null) {
      kol[kol.length - 1].render = (text, render) =>
        render.status !== "approved" ? (
          <>
            <Dropdown overlay={menu}>
              <Button>
                {dropdownText} <DownOutlined />
              </Button>
            </Dropdown>
            <Button
              type="primary"
              onClick={() => {
                approveOrder(render);
              }}
            >
              Approve
            </Button>
          </>
        ) : (
          <Button type="primary" style={{ marginLeft: "17%" }} disabled>
            Approved
          </Button>
        );
      setKolone(kol);
      console.log("KOLONE SU: ", kolone);
    }
  }, [warehousiUsera]);

  return (
    <div style={{ height: "100vh" }}>
      <DataGrid
        data={{
          title: "Orders",
          addButtonText: "Add new order",
          columns: kolone,
          dataSource: orderi,
          formInstance: CreateForm,
          Form: (
            <CreateOrderForm
              form={CreateForm}
              data={{
                customers: customeri,
                suppliers: supplieri,
                date_of_order: "",
                id: "",
                status: "",
                customer: "",
                supplier: "",
              }}
            />
          ),
          visible: false,
          onSubmit: addOrder,
          onDelete: deleteOrder,
          updateOnSubmit: updateOrder,
          updateFormInstance: UpdateForm,
          UpdateForm: (
            <CreateOrderForm
              form={UpdateForm}
              data={{
                customers: customeri,
                suppliers: supplieri,
                date_of_order: "",
                id: "",
                status: "",
                customer: "",
                supplier: "",
              }}
            />
          ),
        }}
      ></DataGrid>
    </div>
  );
}

export default Order;
