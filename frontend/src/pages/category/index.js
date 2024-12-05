import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CategoryPage = () => {
  const { categoryId } = useParams(); // Lấy categoryId từ URL
  const [products, setProducts] = useState([]);

  // Lấy sản phẩm của danh mục theo categoryId
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`/api/products/category/${categoryId}`);
        setProducts(response.data); // Lưu các sản phẩm vào state
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [categoryId]); // Khi categoryId thay đổi, gọi lại API

  return (
    <div>
      <h1>Danh mục {categoryId}</h1>
      <div className="products-list">
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Giá: {product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
