import { memo, useState } from "react";
import "./style.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../utils/router";

const Header = () => {
  const [menus, setMenus] = useState([
    {
      name: "SẢN PHẨM",
      path: ROUTES.USER.PRODUCT,
    },
    {
      name: "NAM",
      path: "",
      isShowSubmnu: false,
      child: [
        {
          name: "GIÀY",
          path: "",
        },
        {
          name: "QUẦN ÁO",
          path: "",
        },
        {
          name: "PHỤ KIỆN",
          path: "",
        },
        {
          name: "THỂ THAO",
          path: "",
        },
      ],
    },
    {
      name: "NỮ",
      path: "",
      isShowSubmnu: false,
      child: [
        {
          name: "GIÀY",
          path: "",
        },
        {
          name: "QUẦN ÁO",
          path: "",
        },
        {
          name: "PHỤ KIỆN",
          path: "",
        },
        {
          name: "THỂ THAO",
          path: "",
        },
      ],
    },
    {
      name: "TRẺ EM",
      path: "",
      isShowSubmnu: false,
      child: [
        {
          name: "TRẺ NHỎ (1-4)",
          path: "",
        },
        {
          name: "TRẺ EM (4-8)",
          path: "",
        },
        {
          name: "THANH THIẾU NIÊN (8-16)",
          path: "",
        },
      ],
    },
    {
      name: "THỂ THAO",
      path: "",
      isShowSubmnu: false,
      child: [
        {
          name: "BÓNG ĐÁ",
          path: "",
        },
        {
          name: "BÓNG RỔ",
          path: "",
        },
        {
          name: "CHẠY",
          path: "",
        },
        {
          name: "GOLF",
          path: "",
        },
      ],
    },
  ]);

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
    return null; // Trả về null nếu không có giá trị trong localStorage
  })();

  return (
    <div className="Header">
      <div className="header-top">
        <Link to="#">Trợ giúp</Link>
        <Link to="#">Danh sách sản phẩm yêu thích</Link>
        <Link to="#">Trình theo dõi đơn hàng</Link>
        <img src="vn.png" alt="VN" className="flag" />
      </div>
      <div className="header-menu">
        <div className="col-xl-2">
          <div className="logo">
            <Link to="/">
              <img src="logo.png" alt="Logo" />
            </Link>
          </div>
        </div>
        <div className="col-xl-5">
          <nav className="categories">
            <ul>
              {menus?.map((menu, menuKey) => (
                <li key={menuKey} className={menuKey === 0 ? "product" : ""}>
                  <Link to={menu?.path}>{menu?.name}</Link>
                  {menu.child && (
                    <ul className="subMenu">
                      {menu.child.map((child, childKey) => (
                        <li key={`${menuKey}-${childKey}`}>
                          <Link to={child.path}>{child.name}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
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
              <Link to={user ? "/profile" : "/login"}>
                <i className="fa fa-user"></i>
              </Link>
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
