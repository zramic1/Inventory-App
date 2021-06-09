import { Input, Form, Select, DatePicker, InputNumber } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UrlContext } from "../urlContext";
import {
  getAllProductsForUser,
  getUniqueProductsForUser,
  getPaymentTypes,
} from "./actions/loginActions";
import axiosInstance from "../api/axiosInstance";

import React, { useContext } from "react";
const { Option } = Select;

function CreateOrderDetails(props) {
  const productContext = useContext(UrlContext);
  const trenutniKorisnikId = useSelector(
    (state) => state.logovani.otherUserInformation.id
  );
  const paymentTypes = useSelector((state) => state.logovani.paymentTypes);
  const dispatch = useDispatch();
  const produkti = useSelector((state) => state.logovani.uniqueProductsForUser);
  console.log("PRODUKTIII je: ", produkti);

  const getWarehouse = async (id) => {
    let url = productContext.product;
    const warehouse = await axiosInstance(url)
      .get(`/warehouse/product/${id}`)
      .catch((error) => {
        console.log("Status");
        console.log("Greska!");
        console.log(error);
      });
    return warehouse.data;
  };

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

  const getProducts = () => {
    let url = productContext.product;
    let putanja = `/products/user/${trenutniKorisnikId}`;
    axiosInstance(url)
      .get(putanja)
      .then(async (res) => {
        console.log(
          "Vrati products od korisnika ",
          trenutniKorisnikId,
          res.data
        );
        let noviProductsNiz = [];
        for (let i = 0; i < res.data.length; i++) {
          let pr = res.data[i];
          const ware = await getWarehouse(pr.id);
          noviProductsNiz.push({
            id: pr.id,
            title: pr.name,
            description: pr.description,
            src: pr.imageUrl,
            quantity: pr.quantity,
            unit: pr.unit,
            price: pr.price,
            supplier: pr.supplierId?.name,
            category: pr.categoryId?.categoryName,
            status: pr.status,
            warehouse: ware?.company_name,
          });
        }
        console.log("Novi", noviProductsNiz);
        dispatch(getAllProductsForUser(noviProductsNiz));
        dispatch(getUniqueProductsForUser(noviProductsNiz));
      })
      .catch((error) => {
        console.log("Status");
        //console.log(error.response.status);
        console.log("Greska!");
        console.log(error);
      });
  };

  useEffect(async () => {
    getProducts();
    getPTypes();
  }, []);

  return (
    <Form
      layout={"vertical"}
      form={props?.form}
      initialValues={{
        id: props.rowData?.id,
        dateD: moment(props.rowData?.date),
        payment_type: props.rowData?.payment_type,
        product: props.rowData?.product,
        quantity: props.rowData?.quantity,
        size: props.rowData?.size,
        total: props.rowData?.total,
        unit_price: props.rowData?.unitPrice,
      }}
    >
      <Form.Item style={{ display: "none" }} name="id">
        <Input />
      </Form.Item>
      <Form.Item
        label="Date"
        name="dateD"
        rules={[
          {
            required: true,
            message: "Required field!",
          },
        ]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
        label="Payment type"
        name="payment_type"
        rules={[
          {
            required: true,
            message: "Required field!",
          },
        ]}
      >
        <Select>
          {paymentTypes?.map((payment, i) => (
            <Option value={payment.paymentType}>{payment.paymentType}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Product"
        name="product"
        rules={[
          {
            required: true,
            message: "Required field!",
          },
        ]}
      >
        <Select>
          {produkti?.map((product, i) => (
            <Option value={product.title}>{product.title}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Quantity"
        name="quantity"
        rules={[
          {
            required: true,
            message: "Required field!",
          },
        ]}
      >
        <InputNumber style={{ width: "-webkit-fill-available" }} />
      </Form.Item>
      <Form.Item
        label="Size"
        name="size"
        rules={[
          {
            required: true,
            message: "Required field!",
          },
        ]}
      >
        <InputNumber style={{ width: "-webkit-fill-available" }} />
      </Form.Item>
      <Form.Item
        label="Total"
        name="total"
        rules={[
          {
            required: true,
            message: "Required field!",
          },
        ]}
      >
        <InputNumber style={{ width: "-webkit-fill-available" }} />
      </Form.Item>
      <Form.Item
        label="Unit price"
        name="unit_price"
        rules={[
          {
            required: true,
            message: "Required field!",
          },
        ]}
      >
        <InputNumber style={{ width: "-webkit-fill-available" }} />
      </Form.Item>
    </Form>
  );
}

export default CreateOrderDetails;
