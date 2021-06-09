import React, { useContext, useEffect, useState } from "react";
import { List, Card, notification, Dropdown, Button, Menu } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProductsForUser,
  setShowNotificationForLowQuantity,
  getUniqueProductsForUser,
  getAllWarehouses,
} from "./actions/loginActions";
import { UrlContext } from "../urlContext";
import axiosInstance from "../api/axiosInstance";
import { FaWarehouse } from "react-icons/fa";
import { InboxOutlined } from "@ant-design/icons";

const { Meta } = Card;

function Product() {
  const productContext = useContext(UrlContext);
  const dispatch = useDispatch();
  const trenutniKorisnikId = useSelector(
    (state) => state.logovani.otherUserInformation.id
  );
  const produkti = useSelector((state) => state.logovani.uniqueProductsForUser);
  const showNotification = useSelector(
    (state) => state.logovani.showNotificationForLowQuantity
  );
  const warehousi = useSelector((state) => state.logovani.warehouses);
  const [kategorije, setKategorije] = useState("All categories");
  const [filterDropdownText, setFilterDropdownText] = useState("All categories");

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

  /*const getProducts = () => {
    let url = productContext.product;
    let parsirajIdWarehousa = parseInt(
      filterDropdownText.replace(/[^0-9]/g, "")
    );
    let putanja =
      filterDropdownText === "All warehouses"
        ? `/products/user/${trenutniKorisnikId}`
        : `/products/warehouse/${parsirajIdWarehousa}`;
    axiosInstance(url)
      .get(putanja)
      .then(async (res) => {
        let noviProductsNiz = [];
        for (let i = 0; i < res.data.length; i++) {
          let pr = res.data[i];
          const ware = await getWarehouse(pr.id);
          //console.log("Wh je: ", pr);
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
        dispatch(
          setShowNotificationForLowQuantity(
            produkti.some((el) => el.quantity < 5)
          )
        );
      })
      .catch((error) => {
        console.log("Status");
        //console.log(error.response.status);
        console.log("Greska!");
        console.log(error);
      });
  };*/

  const getProducts = (kat = "All categories") => {
    let url = productContext.product;
    let putanja = `/products/user/${trenutniKorisnikId}`;
    //let nazivKategorije = filterDropdownText;
    let nazivKategorije = kat;
    console.log("Naziv kategorije je: ", nazivKategorije);
    axiosInstance(url)
      .get(putanja)
      .then(async (res) => {
        let noviProductsNiz = [];
        let jedinstveneKategorije = ["All categories"];
        for (let i = 0; i < res.data.length; i++) {
          let pr = res.data[i];
          const ware = await getWarehouse(pr.id);
          //console.log("Wh je: ", pr);
          if (nazivKategorije === "All categories" || nazivKategorije === pr.categoryId.categoryName) {
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
          if (!jedinstveneKategorije.includes(pr.categoryId.categoryName)) {
            jedinstveneKategorije.push(pr.categoryId.categoryName);
          }
        }
        console.log("Novi", noviProductsNiz);
        setKategorije(jedinstveneKategorije);
        dispatch(getAllProductsForUser(noviProductsNiz));
        dispatch(getUniqueProductsForUser(noviProductsNiz));
        dispatch(
          setShowNotificationForLowQuantity(
            produkti.some((el) => el.quantity < 5)
          )
        );
        if (noviProductsNiz.some(el => el.quantity < 5)) {
          openNotification();
        }
      })
      .catch((error) => {
        console.log("Status");
        //console.log(error.response.status);
        console.log("Greska!");
        console.log(error);
      });
  };

  const getWarehouses = () => {
    let url = productContext.user;
    let putanja = `/warehouses/user/${trenutniKorisnikId}`;
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

  // kao ComponentDidMount
  useEffect(() => {
    console.log("Poziva se mount");
    getProducts();
    getWarehouses();
  }, []);

  useEffect(() => {
    return () => {
      dispatch(setShowNotificationForLowQuantity(false));
    };
  }, []);

  const openNotification = () => {
    notification.open({
      message: "Low Quantity",
      description: "There are products that are low on quantity",
      placement: "topRight",
      top: 80,
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };

  function handleMenuClick(e) {
    setFilterDropdownText(`${e.key}`);
    getProducts(e.key);
    console.log('click', e);
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      {kategorije !== "All categories" ? kategorije.map((element, indeks) => {
        return (<Menu.Item key={element} icon={<InboxOutlined style={{ marginRight: "10px" }} />}>
          {`${element}`}
        </Menu.Item>);
      }) : ""}
    </Menu>
  );

  return (
    <>
      <div style={{ padding: "4%" }}>
        <span style={{ marginRight: "10px" }}>Filter by:</span>
        <Dropdown overlay={menu} placement="topLeft">
          <Button>{filterDropdownText}</Button>
        </Dropdown>
      </div>
      <div className="datagrid">
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 6,
            xxl: 3,
          }}
          dataSource={produkti}
          renderItem={(item) => (
            <Link
              to={{
                pathname: "/product-details",
                state: {
                  data: item,
                },
              }}
              params={item}
            >
              <List.Item>
                <Card
                  hoverable
                  style={{ width: 200 }}
                  cover={<img alt={item.title} src={item.src} />}
                >
                  <Meta title={item.title} description={item.description} />
                  <p
                    style={{
                      float: "right",
                      marginBottom: "0px",
                      marginTop: "5px",
                      color: item.quantity < 5 ? "red" : "black",
                    }}
                  >
                    {item.quantity}
                  </p>
                </Card>
              </List.Item>
            </Link>
          )}
        />
        {/*showNotification ? openNotification() : ""*/}
        {/*produkti.some(el => el.quantity < 5) ? openNotification() : ""*/}
        {/*<ProductsNotification />*/}
      </div>
    </>
  );
}

export default Product;
