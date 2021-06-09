import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
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
  addNewProduct,
} from "./actions/loginActions";
const { Option } = Select;
const { Title } = Typography;

const ProductDetails = (props) => {
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
  const history = useHistory();

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

  const addProduct = (val) => {
    const {
      category,
      description,
      image_url,
      name,
      price,
      quantity,
      status,
      supplier,
      unit,
      warehouse,
    } = val;
    console.log("Vrijednosti", val);
    console.log("Vrijednosti", categorije[category]);
    let url = productContext.product;

    const kat = categorije.filter((item) => item.category_name === category);
    const supp = supplieri.filter((item) => item.name === supplier);
    const war = warehousi.filter((item) => item.company_name === warehouse);
    axiosInstance(url)
      .post("/products", {
        name: name,
        description: description,
        unit: unit,
        price: price,
        quantity: quantity,
        status: status,
        imageUrl: image_url,
        categoryId: kat[0],
        supplierId: supp[0],
        warehouseId: war[0],
      })
      .then((res) => {
        history.push("/products");
        dispatch(addNewProduct());
        console.log("product je: ", res.data);
      })
      .catch((error) => {
        console.log("Status");
        console.log("Greska!");
        console.log(error);
      });
  };

  const updateProduct = (val) => {
    const {
      id,
      category,
      description,
      image_url,
      name,
      price,
      quantity,
      status,
      supplier,
      unit,
      warehouse,
    } = val;
    console.log("Update", val);
    console.log("Vrijednosti", supplier, warehouse, category);
    const kat = categorije.filter((item) => item.category_name === category);
    const supp = supplieri.filter((item) => item.name === supplier);
    const war = warehousi.filter((item) => item.company_name === warehouse);
    console.log("Warehouse", kat, supp, war);
    let url = productContext.product;

    axiosInstance(url)
      .put(`/products/${id}`, {
        name: name,
        description: description,
        unit: unit,
        price: price,
        quantity: quantity,
        status: status,
        imageUrl: image_url,
        categoryId: kat[0],
        supplierId: supp[0],
        warehouseId: war[0],
      })
      .then((res) => {
        history.push("/products");
        dispatch(addNewProduct());
        console.log("product je: ", res.data);
      })
      .catch((error) => {
        console.log("Status");
        console.log("Greska!");
        console.log(error);
      });
  };

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
          name: props?.data?.title,
          description: props?.data?.description,
          image_url: props?.data?.src,
          unit: props?.data?.unit,
          quantity: props?.data?.quantity,
          status: props?.data?.status,
          warehouse: props?.data?.warehouse,
          category: props?.data?.category,
          supplier: props?.data?.supplier,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
        onFinish={props?.data ? updateProduct : addProduct}
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
        <Form.Item label="Price" name="price" initialValue={props?.data?.price}>
          <InputNumber style={{ width: "-webkit-fill-available" }} />
        </Form.Item>
        <Form.Item label="Quantity" name="quantity">
          <InputNumber style={{ width: "-webkit-fill-available" }} />
        </Form.Item>
        <Form.Item label="Status" name="status">
          <Input />
        </Form.Item>
        <Form.Item label="Warehouse" name="warehouse">
          <Select>
            {warehousi?.map((w, i) => (
              <Option value={w?.company_name}>{w?.company_name}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Category" name="category">
          <Select>
            {categorije?.map((categorie, i) => (
              <Option value={categorie?.category_name}>
                {categorie?.category_name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Supplier" name="supplier">
          <Select>
            {supplieri?.map((supplier, i) => (
              <Option value={supplier?.name}>{supplier?.name}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
        <Form.Item name="id" initialValue={props?.data?.id}></Form.Item>
      </Form>
    </div>
  );
};

export default ProductDetails;
