import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Table } from "react-bootstrap";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch danh sách người dùng từ API
    axios
      .get("http://localhost:5000/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy danh sách người dùng:", error);
      });
  }, []);

  const handleDelete = (userId) => {
    // Xử lý xóa người dùng
    axios
      .delete(`http://localhost:5000/users/${userId}`)
      .then(() => {
        // Xóa thành công, cập nhật danh sách người dùng
        setUsers(users.filter((user) => user.id !== userId));
      })
      .catch((error) => {
        console.error("Lỗi khi xóa người dùng:", error);
      });
  };

  return (
    <div className="ManageUsers">
      <h1>Manage Users</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ManageUsers;
