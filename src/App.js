import './App.css';

function App() {
  return (
    <div className="App">
      <div className="top-bar">
        <p>TRẢ HÀNG DỄ DÀNG</p>
      </div>
      <div className="menu">
        <div className="logo">
          <img src="logo.png" alt="Logo" />
        </div>
        <div className="categories">
          <a href="#">NAM</a>
          <a href="#">NỮ</a>
          <a href="#">TRẺ EM</a>
          <a href="#">THỂ THAO</a>
          <a href="#">CÁC NHÃN HIỆU</a>
          <a href="#">HÀNG MỚI VỀ</a>
          <a href="#" className="outlet">OUTLET</a>
        </div>
        <div className="menu-options">
          <a href="#">trợ giúp</a>
          <a href="#">danh sách sản phẩm yêu thích</a>
          <a href="#">trình theo dõi đơn hàng</a>
          <img src="flag.png" alt="VN" className="flag" />
        </div>
        <div className="search">
          <input type="text" placeholder="tìm kiếm" />
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

export default App;
