import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
    const [fullName, setFullName] = useState("");
    const [address, setAddress] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);
    const navigate = useNavigate();

    // Cập nhật giỏ hàng khi có thay đổi
    useEffect(() => {
        const cartItems = JSON.parse(localStorage.getItem("cart"));
        if (cartItems) {
            setCart(cartItems);
        }
    }, []);

    const handlePlaceOrder = async (event) => {
        event.preventDefault(); // Ngăn form tự gửi khi nhấn button
        
        if (!fullName || !address || !paymentMethod) {
            alert("Vui lòng nhập đầy đủ thông tin.");
            return;
        }

        if (!cart || cart.length === 0) { // Kiểm tra giỏ hàng có hợp lệ không
            alert("Giỏ hàng trống! Vui lòng thêm sản phẩm vào giỏ hàng.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/createOrder", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({fullName, address, paymentMethod, cart }),
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                localStorage.setItem("orderDetails", JSON.stringify(data.orderDetails));
                localStorage.removeItem("cart");
                navigate(`/checkoutdetail/${data.orderDetails.orderId}`);
              } else {
                alert(data.message || "Đặt hàng không thành công.");
              }
        } catch (error) {
            console.error("Lỗi khi đặt hàng: ", error);
            alert("Có lỗi xảy ra. Vui lòng thử lại!");
        }
    };

    return (
        <div className="Checkout">
            <h2>Đặt Hàng</h2>

            <Form>
                <Form.Group controlId="formFullName">
                    <Form.Label>Họ tên</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Nhập họ tên"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                </Form.Group>

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
