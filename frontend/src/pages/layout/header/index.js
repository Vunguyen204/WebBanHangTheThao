import { memo, useState, useEffect } from "react";
import axios from "axios";
import "./style.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link } from "react-router-dom";
import Logout from '../../logout';

const Header = () => {
  const [menus, setMenus] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Trạng thái menu con

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/categories");
        setMenus(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh mục:", error);
      }
    };

    fetchCategories();
  }, []);

  // Kiểm tra trạng thái đăng nhập
  const user = (() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
        localStorage.removeItem("user"); // Xóa dữ liệu lỗi
        return null;
      }
    }
    return null;
  })();

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState); // Thay đổi trạng thái mở/đóng menu
  };

  return (
    <div className="Header">
      <div className="header-top">
        <Link to="#">Trợ giúp</Link>
        <Link to="#">Danh sách sản phẩm yêu thích</Link>
        <Link to="#">Trình theo dõi đơn hàng</Link>
        <img src="/images/vn.png" alt="VN" className="flag" />
      </div>
      <div className="header-menu">
        <div className="col-xl-2">
          <div className="logo">
            <Link to="/">
              <img src="/images/logo.png" alt="Logo" />
            </Link>
          </div>
        </div>
        <div className="col-xl-5">
          <nav className="categories">
            <ul>
              {menus.length > 0 ? (
                menus.map((menu, menuKey) => (
                  <li key={menuKey} className={menuKey === 0 ? "product" : ""}>
                    <Link to={menu.path}>{menu.name}</Link>
                    {menu.child && menu.child.length > 0 && (
                      <ul className="subMenu">
                        {menu.child.map((child, childKey) => (
                          <li key={`${menuKey}-${childKey}`}>
                            <Link to={child.path}>{child.name}</Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))
              ) : (
                <p>Không có danh mục nào.</p> // Hiển thị nếu menus rỗng
              )}
            </ul>
          </nav>
        </div>
        <div className="col-xl-3">
          <div className="container-menu-search">
            <div className="search">
              <input type="text" placeholder="Tìm kiếm" />
              <button>
                <i className="fa fa-search"></i>
              </button>
            </div>
            <div className="icons">
              {/* Nếu người dùng đã đăng nhập, hiển thị menu Profile và Logout */}
              {user ? (
                <div className="user-menu">
                  {/* Khi click vào icon, toggle menu */}
                  <i className="fa fa-user" onClick={toggleMenu}></i>
                  {isMenuOpen && (
                    <ul className="subMenu">
                      <li>
                        <Link to="/profile">Profile</Link>
                      </li>
                      {user.role === "admin" && ( // Kiểm tra vai trò admin
                        <>
                          <li>
                            <Link to="/admin/dashboard">Dashboard</Link>
                          </li>
                          <li>
                            <Link to="/admin/manage-users">Quản lý người dùng</Link>
                          </li>
                        </>
                      )}
                      <li>
                        <Logout /> {/* Component logout để đăng xuất */}
                      </li>
                    </ul>
                  )}
                </div>
              ) : (
                // Nếu chưa đăng nhập, hiển thị icon user dẫn đến trang login
                <Link to="/login">
                  <i className="fa fa-user"></i>
                </Link>
              )}
              <i className="fa fa-heart"></i>
              <Link to="/cart">
                <i className="fa fa-shopping-cart"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Header);
