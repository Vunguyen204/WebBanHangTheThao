import React, { memo, useEffect, useState } from "react";
import axios from "axios";
import "./style.scss";
import ProductCard from "../../components/productCard";

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
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default memo(Product);
