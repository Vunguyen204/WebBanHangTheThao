import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { Button } from 'react-bootstrap';
import "./style.scss"
import CurrencyFormat from "../../components/currencyFormat";


const ProductDetail = () => {
  const { id } = useParams();  // Lấy id từ URL
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/products/${id}`)
      .then((response) => {
        setProduct(response.data); // Cập nhật state với thông tin sản phẩm chi tiết
      })
      .catch((error) => {
        console.error("Lỗi khi fetch chi tiết sản phẩm:", error);
        setError(error.response?.data?.message || "Lỗi không xác định!");
      });
  }, [id]);  // Lấy lại dữ liệu khi ID thay đổi

  const addToCart = (product) => {
    const user = JSON.parse(localStorage.getItem("user")) || null;
    if (!user || user.role === "guest") {
      alert("Bạn cần đăng nhập để thêm vào giỏ hàng!");
      return;
    }
    // Lấy giỏ hàng hiện tại từ localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    const existingProduct = cart.find((item) => item.id === product.id);
    // Nếu sản phẩm đã có trong giỏ và không vượt quá số lượng trong kho, tăng số lượng lên 1
    if (existingProduct) {
      if (existingProduct.quantity < product.stock) {
        existingProduct.quantity += 1;
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Sản phẩm đã được thêm vào giỏ hàng!");
      } else {
        alert("Sản phẩm đã hết hàng!");
      }
    } else {
      // Nếu sản phẩm chưa có trong giỏ, thêm sản phẩm vào giỏ
      product.quantity = 1; // Đặt số lượng ban đầu là 1
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Sản phẩm đã được thêm vào giỏ hàng!");
    }
  };
  
  if (error) return <div>{error}</div>;
  if (!product) return <div>Loading...</div>;

  return (
    <div className="ProductDetail">
      {/* <h1>{product.name}</h1>
      <img src={product.image_url} alt={product.name} />
      <p>{product.description}</p>
      <p>Price: ${product.price}</p> */}
      <div className="row">
        <div className="col-xl-9">
          <img src={product.image_url} alt={product.name} />
        </div>
        <div className="col-xl-3">
          <h1>{product.name}</h1>
          <p>
            <CurrencyFormat value={product.price} />
          </p>
          <p>{product.description}</p>
          <Button variant="primary" onClick={() => addToCart(product)}>
            Thêm vào giỏ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
