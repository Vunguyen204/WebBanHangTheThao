import { memo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style.scss";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = {
      username: e.target.username.value,
      password: e.target.password.value,
    };

    if (!formData.username || !formData.password) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/login", formData);
      alert(response.data.message);
      console.log("Response data:", response.data); // Kiểm tra dữ liệu trả về
      // Lưu thông tin người dùng vào localStorage
      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        alert("Đăng nhập thành công!");
        navigate("/"); // Chuyển hướng sau khi đăng nhập thành công
      } else {
        alert("Đăng nhập thất bại: Không có thông tin người dùng.");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Đã xảy ra lỗi!");
    }
  };

  return (
    <>
      <div className="auth-container">
        <h1>Đăng Nhập</h1>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Tên đăng nhập</label>
            <input type="text" id="username" placeholder="Nhập tên đăng nhập" required/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Mật khẩu</label>
            <input type="password" id="password" placeholder="Nhập mật khẩu" required/>
          </div>
          <div className="form-options">
            <label>
              <input type="checkbox" /> Ghi nhớ mật khẩu
            </label>
            <Link to={"#"}>Quên mật khẩu?</Link>
          </div>
          <button type="submit" className="btn-auth">
            ĐĂNG NHẬP
          </button>
        </form>
        <p>
          Bạn chưa có tài khoản? <Link to={"/register"}>Đăng ký</Link>
        </p>
      </div>
    </>
  );
};

export default memo(Login);
