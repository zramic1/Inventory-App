import React from "react";
import { List, Card, notification } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const { Meta } = Card;

function Product() {
  const produkti = useSelector(state => state.logovani.allProducts);

  const openNotification = () => {
    notification.open({
      message: 'Low Quantity',
      description:
        'There are products that are low on quantity',
      placement: "topRight",
      top: 80,
      style: { marginTop: "80px" },
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
              </Card>
            </List.Item>
          </Link>
        )}
      />
      {produkti.some(el => el.quantity < 5) ? openNotification() : ""}
      {/*<ProductsNotification />*/}
    </div>
  );
}

export default Product;
