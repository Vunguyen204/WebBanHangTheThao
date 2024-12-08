import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const CheckoutInfo = () => {
    return (
        <div className="ThankYou">
            <h2>Cảm ơn bạn đã đặt hàng!</h2>
            <p>Đơn hàng của bạn đang được xử lý. Chúng tôi sẽ liên hệ với bạn sớm nhất có thể.</p>
            <Link to="/product">
                <Button variant="primary">Tiếp tục mua sắm</Button>
            </Link>
        </div>
    );
};

export default CheckoutInfo;
