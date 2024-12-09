import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CurrencyFormat from "../../components/currencyFormat";


const CheckoutDetail = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}`);
      const data = await response.json();
      if (response.ok) {
        setOrder(data);
      } else {
        alert("Không tìm thấy đơn hàng.");
      }
    };
    fetchOrderDetails();
  }, [orderId]);

  if (!order) return <div>Đang tải...</div>;

  // Tính tổng tiền
  const totalAmount = order.orderDetails.reduce((total, item) => {
    return total + item.quantity * item.price;
  }, 0);

  return (
    <div>
      <h2>Chi tiết đơn hàng</h2>
      <ul>
        <li>Họ tên: {order.order.name}</li>
        <li>Địa chỉ: {order.order.address}</li>
        <li>Phương thức thanh toán: {order.order.payment_method}</li>
        <li>Ngày giờ đặt hàng: {new Date(order.order.created_at).toLocaleString()}</li>
      </ul>
      <h3>Sản phẩm:</h3>
      <ul>
        {order.orderDetails.map((item, index) => (
          <li key={index}>
            {item.product_name} (x{item.quantity}) : <CurrencyFormat value={item.price} />
          </li>
        ))}
      </ul>
      <h3>Tổng tiền: <CurrencyFormat value={totalAmount} /></h3>
    </div>
  );
};

export default CheckoutDetail;
