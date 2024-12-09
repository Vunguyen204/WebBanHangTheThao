import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/orders");
        const data = await response.json();
        if (response.ok) {
          setOrders(data);
        } else {
          alert("Không thể lấy danh sách đơn hàng");
        }
      } catch (error) {
        console.error("Lỗi khi lấy đơn hàng:", error);
        alert("Có lỗi xảy ra. Vui lòng thử lại.");
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Quản lý đơn hàng</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Họ tên</th>
            <th>Địa chỉ</th>
            <th>Phương thức thanh toán</th>
            <th>Thời gian đặt hàng</th>
            <th>Chi tiết</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.name}</td>
              <td>{order.address}</td>
              <td>{order.payment_method}</td>
              <td>{new Date(order.created_at).toLocaleString()}</td>
              <td>
                <Link to={`/checkoutdetail/${order.id}`} className="btn btn-info">
                  Xem chi tiết
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ManageOrders;
