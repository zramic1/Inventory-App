import React, { useContext, useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Divider,
  Typography,
  InputNumber,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { UrlContext } from "../urlContext";
import axiosInstance from "../api/axiosInstance";

import {
  getAllSuppliers,
  getAllCategories,
  getAllWarehouses,
} from "./actions/loginActions";
const { Option } = Select;
const { Title } = Typography;
const ProductDetails = () => {
  const supplieri = useSelector((state) => state.logovani.allSuppliers);
  const categorije = useSelector((state) => state.logovani.allCategories);
  const orderContext = useContext(UrlContext);
  const productContext = useContext(UrlContext);
  const warehouseContext = useContext(UrlContext);
  const warehousi = useSelector((state) => state.logovani.warehouses);
  const trenutniKorisnikId = useSelector(
    (state) => state.logovani.otherUserInformation.id
  );
  const userIsSupplier = useSelector((state) => state.logovani.userIsSupplier);
  const [componentSize, setComponentSize] = useState("default");
  const dispatch = useDispatch();

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

  const getCategories = () => {
    let url = productContext.product;
    axiosInstance(url)
      .get("/categories")
      .then((res) => {
        let sveCategories = [];
        for (let i = 0; i < res.data.length; i++) {
          let or = res.data[i];
          sveCategories.push({
            id: or.id,
            category_name: or.categoryName,
          });
        }
        dispatch(getAllCategories(sveCategories));
      })
      .catch((error) => {
        console.log("Status");
        console.log("Greska!");
        console.log(error);
      });
  };

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

  const onFinish = (data) => {
    console.log("data", data);
  };

  /*const addProduct = (val) => {
    const {
      category,
      description,
      image_url,
      name,
      order_details,
      price,
      quantity,
      status,
      supplier,
      unit,
      warehouse,
    } = val;
    console.log("Vrijednosti", val);
    let url = productContext.product;
    axiosInstance(url)
      .post("/products", {
        dateOfOrder: date_of_order,
        status: status,
        customerId: customeri[customer],
        userId: supplieri[supplier],
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
  };*/

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 4,
      },
    },
  };

  useEffect(() => {
    getSuppliers();
    console.log("suplajeris", warehousi);
    getCategories();
    getWarehouses();
  }, []);

  return (
    <div className="datagrid">
      <Title level={1} className={"datagrid-title"}>
        {"Product Details"}
      </Title>
      <Divider type={"horizontal"} className={"divider-horizontal"} />
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
        onFinish={onFinish}
      >
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Image URL" name="image_url">
          <Input />
        </Form.Item>
        <Form.Item label="Unit" name="unit">
          <Input />
        </Form.Item>
        <Form.Item label="Price" name="price">
          <InputNumber style={{ width: "-webkit-fill-available" }} />
        </Form.Item>
        <Form.Item label="Quantity" name="quantity">
          <InputNumber style={{ width: "-webkit-fill-available" }} />
        </Form.Item>
        <Form.Item label="Status" name="status">
          <Input />
        </Form.Item>
        <Form.Item label="Order Details" name="order_details">
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Warehouse" name="warehouse">
          <Select>
            {warehousi?.map((w, i) => (
              <Option value={i}>{"Warehouse " + i}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Category" name="category">
          <Select>
            {categorije?.map((categorie, i) => (
              <Option value={i}>{categorie?.category_name}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Supplier" name="supplier">
          <Select>
            {supplieri?.map((supplier, i) => (
              <Option value={i}>{supplier?.name}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProductDetails;
