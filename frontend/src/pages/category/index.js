import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/productCard"; 

const CategoryPage = () => {
  const { categoryName } = useParams();  // Lấy categoryName từ URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Gọi API để lấy sản phẩm theo danh mục
    axios
      .get(`http://localhost:5000/api/products/category/${categoryName}`)
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.response?.data?.message || 'Lỗi không xác định!');
        setLoading(false);
      });
  }, [categoryName]);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Sản phẩm trong danh mục {categoryName}</h2>
      <div className="product-list">
        {products.length === 0 ? (
          <div>Không có sản phẩm trong danh mục này.</div>
        ) : (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
