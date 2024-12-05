import { memo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style.scss";

const Register = () => {
  const navigate = useNavigate();
  
  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = {
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };

    console.log("Form data:", formData); // Kiểm tra dữ liệu form

    // Kiểm tra mật khẩu và xác nhận mật khẩu
    const confirmPassword = e.target["confirm-password"].value;
    if (formData.password !== confirmPassword) {
      alert("Mật khẩu và xác nhận mật khẩu không khớp!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/register", formData);
      alert(response.data.message); // Đảm bảo nhận thông báo từ server
      navigate("/login");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Đã xảy ra lỗi!";
      alert(errorMessage);
    }    
  };

  return (
    <div className="auth-container">
      <h1>Đăng Ký</h1>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label htmlFor="username">Tên đăng nhập</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Nhập tên đăng nhập"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="Nhập email" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mật khẩu</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Nhập mật khẩu"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password">Xác nhận mật khẩu</label>
          <input
            type="password"
            id="confirm-password"
            name="confirm-password"
            placeholder="Xác nhận mật khẩu"
            required
          />
        </div>
        <button type="submit" className="btn-auth">
          ĐĂNG KÝ
        </button>
      </form>
      <p>
        Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
      </p>
    </div>
  );
};

export default memo(Register);
