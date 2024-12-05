import { memo } from "react";
import React, { useState, useEffect } from "react";
import { Button, ListGroup, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import CurrencyFormat from "../../components/currencyFormat";

const Cart = () => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        // Lấy giỏ hàng từ localStorage khi component được render
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(savedCart);
    }, []);

    // Xóa sản phẩm khỏi giỏ hàng
    const removeFromCart = (productId) => {
        const updatedCart = cart.filter((product) => product.id !== productId);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    // Cập nhật số lượng sản phẩm trong giỏ hàng
    const updateQuantity = (productId, quantity) => {
        const updatedCart = cart.map((product) => {
            if (product.id === productId) {
                return {
                    ...product,
                    quantity: product.quantity + quantity, // Cập nhật số lượng
                };
            }
            return product;
        });
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    // Tính tổng giá trị giỏ hàng
    const totalPrice = cart.reduce(
        (total, product) => total + product.price * product.quantity,
        0
    );

    return (
      <div className="Cart">
        <h2>Giỏ Hàng</h2>
        <ListGroup>
          {cart.map((product) => (
            <ListGroup.Item key={product.id}>
              <div className="d-flex justify-content-between">
                <div>
                  <img
                    src={product.image_url}
                    alt={product.name}
                    style={{ width: 50, height: 50 }}
                  />
                  <span>{product.name}</span>
                </div>
                <div>
                  <div className="d-flex align-items-center">
                    <span>
                      <CurrencyFormat value={product.price} />
                    </span>
                    <span>x {product.quantity}</span>
                  </div>
                  <div className="d-flex">
                    <Button
                      variant="secondary"
                      onClick={() => updateQuantity(product.id, 1)}
                    >
                      Thêm
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => updateQuantity(product.id, -1)}
                      disabled={product.quantity === 1} // Không giảm xuống dưới 1
                    >
                      Giảm
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => removeFromCart(product.id)}
                    >
                      Xóa
                    </Button>
                  </div>
                </div>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <div className="d-flex justify-content-between mt-3">
          <h3>Tổng tiền:</h3>
          <h3>
            <p>
              <CurrencyFormat value={totalPrice} />
            </p>
          </h3>
        </div>
        <Link to="/product">
          <Button variant="primary">Quay lại mua sắm</Button>
        </Link>
      </div>
    );
};

export default memo(Cart);
