import { memo } from "react";
import './style.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from "react-router-dom";

const Header = () => {
    return (
      <div className="Header">
        <div className="top-bar">
            <Link to="#">Trợ giúp</Link>
            <Link to="#">Danh sách sản phẩm yêu thích</Link>
            <Link to="#">Trình theo dõi đơn hàng</Link>
            <img src="vn.png" alt="VN" className="flag"/>
        </div>
        <div className="menu">
          <div className="logo">
            <Link to ="/">
              <img src="logo.png" alt="Logo" />
            </Link>
          </div>
          <div className="categories">
            <Link to="#" style={{fontWeight: 'bold'}}>NAM</Link>
            <Link to="#" style={{fontWeight: 'bold'}}>NỮ</Link>
            <Link to="#" style={{fontWeight: 'bold'}}>TRẺ EM</Link>
            <Link to="#">THỂ THAO</Link>
            <Link to="#">CÁC NHÃN HIỆU</Link>
            <Link to="#">HÀNG MỚI VỀ</Link>
            <Link to="#" className="outlet">OUTLET</Link>
          </div>
          <div className="search">
            <input type="text" placeholder="Tìm kiếm" />
            <button><i className="fa fa-search"></i></button>
          </div>
          <div className="icons">
            <i className="fa fa-user"></i>
            <i className="fa fa-heart"></i>
            <i className="fa fa-shopping-cart"></i>
          </div>
        </div>
      </div>
    );
  }
  
  export default memo(Header);
  