import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
    const [address, setAddress] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);
    const navigate = useNavigate();

    const handlePlaceOrder = () => {
        if (!address || !paymentMethod) {
            alert("Vui lòng nhập đầy đủ thông tin.");
            return;
        }

        alert("Đặt hàng thành công!");

        // Xóa giỏ hàng sau khi đặt
        localStorage.removeItem("cart");

        // Điều hướng đến trang cảm ơn hoặc trang khác
        navigate("/checkoutinfo");
    };

    return (
        <div className="Checkout">
            <h2>Đặt Hàng</h2>

            <Form>
                <Form.Group controlId="formAddress">
                    <Form.Label>Địa chỉ giao hàng</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Nhập địa chỉ giao hàng"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formPaymentMethod">
                    <Form.Label>Phương thức thanh toán</Form.Label>
                    <Form.Control
                        as="select"
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                        <option value="">Chọn phương thức thanh toán</option>
                        <option value="cod">Thanh toán khi nhận hàng (COD)</option>
                        <option value="online">Thanh toán online</option>
                    </Form.Control>
                </Form.Group>

                <Button variant="primary" onClick={handlePlaceOrder}>
                    Xác nhận đặt hàng
                </Button>
            </Form>
        </div>
    );
};

export default Checkout;
