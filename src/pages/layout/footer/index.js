import { memo } from "react";
import "./style.scss";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h3>SẢN PHẨM</h3>
          <ul>
            <li>
              <Link to="#">Giày</Link>
            </li>
            <li>
              <Link to="#">Quần áo</Link>
            </li>
            <li>
              <Link to="#">Phụ kiện</Link>
            </li>
            <li>
              <Link to="#">Hàng Mới Về</Link>
            </li>
            <li>
              <Link to="#">Release Dates</Link>
            </li>
            <li>
              <Link to="#">Top Sellers</Link>
            </li>
            <li>
              <Link to="#">Member exclusives</Link>
            </li>
            <li>
              <Link to="#">Outlet</Link>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>THỂ THAO</h3>
          <ul>
            <li>Chạy</li>
            <li>Đánh gôn</li>
            <li>Gym & Training</li>
            <li>Bóng đá</li>
            <li>Bóng Rổ</li>
            <li>Quần vợt</li>
            <li>Ngoài trời</li>
            <li>Bơi lội</li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>BỘ SƯU TẬP</h3>
          <ul>
            <li>Pharrell Williams</li>
            <li>Ultra Boost</li>
            <li>Pureboost</li>
            <li>Predator</li>
            <li>Superstar</li>
            <li>Stan Smith</li>
            <li>NMD</li>
            <li>Adicolor</li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>THÔNG TIN VỀ CÔNG TY</h3>
          <ul>
            <li>Giới Thiệu Về Chúng Tôi</li>
            <li>Cơ Hội Nghề Nghiệp</li>
            <li>Tin tức</li>
            <li>adidas stories</li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>HỖ TRỢ</h3>
          <ul>
            <li>Trợ Giúp</li>
            <li>Công cụ tìm kiếm cửa hàng</li>
            <li>Biểu Đồ Kích Cỡ</li>
            <li>Thanh toán</li>
            <li>Giao hàng</li>
            <li>Trả Hàng & Hoàn Tiền</li>
            <li>Khuyến mãi</li>
            <li>Sơ đồ trang web</li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>THEO DÕI CHÚNG TÔI</h3>
          <ul className="social-icons">
            <li>
              <i className="fab fa-facebook"></i>
            </li>
            <li>
              <i className="fab fa-instagram"></i>
            </li>
            <li>
              <i className="fab fa-twitter"></i>
            </li>
            <li>
              <i className="fab fa-pinterest"></i>
            </li>
            <li>
              <i className="fab fa-tiktok"></i>
            </li>
            <li>
              <i className="fab fa-youtube"></i>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="legal-links">
          <Link to="#">Cài Đặt Cookie</Link>
          <Link to="#">Chính sách Bảo mật</Link>
          <Link to="#">Điều Khoản và Điều Kiện</Link>
        </div>
        <p>© 2020 Công ty TNHH adidas Việt Nam</p>
      </div>
    </footer>
  );
};

export default memo(Footer);
