import React, { useContext, useEffect, useState } from "react";
import { List, Card, notification } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsForUser, setShowNotificationForLowQuantity, getUniqueProductsForUser } from "./actions/loginActions";
import { UrlContext } from "../urlContext";
import axiosInstance from "../api/axiosInstance";
const { Meta } = Card;

function Product() {
  const productContext = useContext(UrlContext);
  const dispatch = useDispatch();
  const trenutniKorisnikId = useSelector(
    (state) => state.logovani.otherUserInformation.id
  );
  const produkti = useSelector(state => state.logovani.uniqueProductsForUser);
  const showNotification = useSelector(state => state.logovani.showNotificationForLowQuantity);

  const getProducts = () => {
    let url = productContext.product;
    axiosInstance(url)
      .get(`/products/user/${trenutniKorisnikId}`)
      .then((res) => {
        console.log(
          "Vrati products od korisnika ",
          trenutniKorisnikId,
          res.data
        );
        let noviProductsNiz = [];
        for (let i = 0; i < res.data.length; i++) {
          let pr = res.data[i];
          //console.log("Wh je: ", wh);
          noviProductsNiz.push({
            id: pr.id,
            title: pr.name,
            description: pr.description,
            src: pr.imageUrl,
            quantity: pr.quantity
          });
        }
        dispatch(getAllProductsForUser(noviProductsNiz));
        dispatch(getUniqueProductsForUser(noviProductsNiz));
        dispatch(setShowNotificationForLowQuantity(produkti.some(el => el.quantity < 5)));
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
  }, []);

  useEffect(() => {
    return () => { dispatch(setShowNotificationForLowQuantity(false)) };
  }, [])

  const openNotification = () => {
    notification.open({
      message: 'Low Quantity',
      description:
        'There are products that are low on quantity',
      placement: "topRight",
      top: 80,
      onClick: () => {
        console.log('Notification Clicked!');
      }
    });
  };

  return (
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
          <Link to="/product-details">
            <List.Item>
              <Card
                hoverable
                style={{ width: 200 }}
                cover={<img alt={item.title} src={item.src} />}
              >
                <Meta title={item.title} description={item.description} />
                <p style={{ float: "right", marginBottom: "0px", marginTop: "5px", color: item.quantity < 5 ? "red" : "black" }}>{item.quantity}</p>
              </Card>
            </List.Item>
          </Link>
        )}
      />
      {showNotification ? openNotification() : ""}
      {/*produkti.some(el => el.quantity < 5) ? openNotification() : ""*/}
      {/*<ProductsNotification />*/}
    </div>
  );
}

export default Product;
