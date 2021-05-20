import React from "react";
import { List, Card } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const { Meta } = Card;

function Product() {
  const produkti = useSelector(state => state.logovani.allProducts);
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
    </div>
  );
}

export default Product;
