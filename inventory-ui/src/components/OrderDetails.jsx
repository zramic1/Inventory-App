import React, { useContext, useEffect, useState } from "react";
import DataGrid from "./TableGrid/DataGrid";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "antd";
import { UrlContext } from "../urlContext";
import { useHistory } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import CreateOrderDetails from "./CreateOrderDetails";
import { addNewOrderDetail, getPaymentTypes } from "./actions/loginActions";

function OrderDetails(props) {
  const [CreateForm] = Form.useForm();
  const [UpdateForm] = Form.useForm();
  const history = useHistory();
  console.log("Propovi order details", props);
  const [orderDetails, setOrderDetails] = useState([]);
  const trenutniKorisnikId = useSelector(
    (state) => state.logovani.otherUserInformation.id
  );
  const paymentTypes = useSelector((state) => state.logovani.paymentTypes);
  const orderContext = useContext(UrlContext);
  const productContext = useContext(UrlContext);
  const dispatch = useDispatch();
  const produkti = useSelector((state) => state.logovani.uniqueProductsForUser);

  const getPTypes = () => {
    let url = productContext.order;
    axiosInstance(url)
      .get(`/payments`)
      .then((res) => {
        console.log("payments", res.data);
        dispatch(getPaymentTypes(res.data));
      })
      .catch((error) => {
        console.log("Status");
        console.log("Greska!");
        console.log(error);
      });
  };

  const addOrderDetail = (val) => {
    const {
      id,
      dateD,
      payment_type,
      product,
      quantity,
      size,
      total,
      unit_price,
    } = val;
    console.log("Vrijednosti", val, id);
    let url = orderContext.order;
    const pay = paymentTypes.filter(
      (item) => item.paymentType === payment_type
    );
    const prod = produkti.filter((item) => item.title === product);
    console.log("payy", pay, paymentTypes);
    axiosInstance(url)
      .post("/order-details", {
        date: dateD,
        paymentId: pay[0],
        productId: prod[0],
        quantity: quantity,
        size: size,
        total: total,
        unitPrice: unit_price,
        orderId: props?.props?.render,
      })
      .then((res) => {
        history.push("/orders");
        dispatch(addNewOrderDetail());
        console.log("Warehouse je: ", res.data);
      })
      .catch((error) => {
        console.log("Status");
        console.log("Greska!");
        console.log(error);
      });
  };

  const editOrderDetail = (val) => {
    const {
      id,
      dateD,
      payment_type,
      product,
      quantity,
      size,
      total,
      unit_price,
    } = val;
    console.log("Vrijednosti", val);
    let url = orderContext.order;
    const pay = paymentTypes.filter(
      (item) => item.paymentType === payment_type
    );
    const prod = produkti.filter((item) => item.title === product);
    console.log("payy", pay[0], prod[0]);
    axiosInstance(url)
      .put(`/order-details/${id}`, {
        date: dateD,
        paymentId: pay[0],
        productId: prod[0],
        quantity: quantity,
        size: size,
        total: total,
        unitPrice: unit_price,
        orderId: props?.props?.render,
      })
      .then((res) => {
        history.push("/orders");
        console.log("Warehouse je: ", res.data);
      })
      .catch((error) => {
        console.log("Status");
        console.log("Greska!");
        console.log(error);
      });
  };

  const deleteOrderDetails = (rowData) => {
    const { id } = rowData;
    let url = orderContext.order;
    axiosInstance(url)
      .delete(`/order-details/${id}`)
      .then((res) => {
        //getOrder();
        history.push("/orders");
      })
      .catch((error) => {
        console.log("Status");
        //console.log(error.response.status);
        console.log("Greska!");
        console.log(error);
      });
  };

  useEffect(() => {
    const detalji = props?.props?.render?.order_details;
    const order_details = [];
    detalji?.forEach((element) => {
      order_details.push({
        id: element.id,
        date: element.date,
        payment_type: element.paymentId?.paymentType,
        product: element.productId?.name,
        quantity: element.quantity,
        size: element.size,
        total: element.total,
        unit_price: element.unitPrice,
      });
    });

    setOrderDetails(order_details);
    getPTypes();
  }, []);

  return (
    <div style={{ height: "100vh" }}>
      <DataGrid
        data={{
          title: "Order Details",
          addButtonText: "Add order detail",
          columns: [
            {
              title: "Date",
              dataIndex: "date",
              key: "date",
            },
            {
              title: "Quantity",
              dataIndex: "quantity",
              key: "quantity",
            },
            {
              title: "Size",
              dataIndex: "size",
              key: "size",
            },
            {
              title: "Total",
              dataIndex: "total",
              key: "total",
            },
            {
              title: "Unit Price",
              dataIndex: "unit_price",
              key: "unitPrice",
            },
            {
              title: "Product",
              dataIndex: "product",
              key: "product",
            },
            {
              title: "Payment type",
              dataIndex: "payment_type",
              key: "paymentType",
            },
          ],
          dataSource: orderDetails,
          Form: <CreateOrderDetails form={CreateForm} />,
          formInstance: CreateForm,
          updateFormInstance: UpdateForm,
          UpdateForm: <CreateOrderDetails form={UpdateForm} />,
          rowData: {
            id: "",
            dateD: "",
            payment_type: "",
            product: "",
            quantity: "",
            size: "",
            total: "",
            unit_price: "",
          },
          onSubmit: addOrderDetail,
          updateOnSubmit: editOrderDetail,
          onDelete: deleteOrderDetails,
        }}
      ></DataGrid>
    </div>
  );
}

export default OrderDetails;
