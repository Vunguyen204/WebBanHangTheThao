import React, { memo, useEffect, useState } from "react";
import axios from "axios";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./style.scss";
import CurrencyFormat from "../../components/currencyFormat";

const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch dữ liệu từ API
    axios
      .get("http://localhost:5000/products")
      .then((response) => {
        setProducts(response.data); // Cập nhật state với dữ liệu sản phẩm
      })
      .catch((error) => {
        console.error("Lỗi khi fetch dữ liệu:", error);
      });
  }, []);

  return (
    <div className="Product">
      <div className="product-banner">
        <img src={require("../../assets/svg/Adidas.png")} alt="Banner" />
      </div>
      <div className="products-list col-xl-10">
        {products.map((product) => (
          <Link key={product.id} to={`/product/${product.id}`}> {/* Sử dụng đường dẫn động */}
            <Card key={product.id} style={{ width: "18rem" }}>
              <Card.Img variant="top" src={product.image_url} alt={product.name} />
              <Card.Body>
                <Card.Text className="price"><CurrencyFormat value={product.price} /></Card.Text>
                <Card.Title>{product.name}</Card.Title>
                {/* <Button variant="primary">${product.price}</Button> */}
              </Card.Body>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default memo(Product);
