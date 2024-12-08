const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const app = express();
const PORT = 5000;
// Chạy server
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || origin.startsWith("http://localhost")) {
        // Cho phép nếu là localhost hoặc các yêu cầu không có origin (vd: từ Postman)
        callback(null, true);
      } else {
        // Từ chối các địa chỉ không hợp lệ
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET,POST",
  })
);

app.use(bodyParser.json());

// API đăng ký người dùng
app.post("/api/register", async (req, res) => {
  const { username, email, password } = req.body;

  // Kiểm tra thông tin đầu vào
  if (!username || !email || !password) {
    return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin!" });
  }

  try {
    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Câu lệnh SQL chèn dữ liệu vào bảng `users`
    const query =
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    db.query(query, [username, email, hashedPassword], (err, result) => {
      if (err) {
        // Xử lý lỗi trùng lặp email
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(400).json({ message: "Email đã được sử dụng!" });
        }
        return res.status(500).json({ message: "Lỗi server!" });
      }

      // Trả về phản hồi thành công
      res.status(200).json({ message: "Đăng ký thành công!" });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server khi mã hóa mật khẩu!" });
  }
});

// API đăng nhập người dùng
app.post("/api/login", async (req, res) => {
  const { username, password: inputPassword } = req.body;

  // Kiểm tra thông tin đầu vào
  if (!username || !inputPassword) {
    return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin!" });
  }

  try {
    // Truy vấn cơ sở dữ liệu để kiểm tra username
    const query = "SELECT * FROM users WHERE username = ?";
    db.query(query, [username ], async (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Lỗi server!" });
      }

      // Nếu không tìm thấy người dùng với username đó
      if (result.length === 0) {
        return res.status(400).json({ message: "Người dùng không tồn tại!" });
      }

      
      //Kiểm tra và So sánh mật khẩu đã mã hóa
      const user = result[0];
      try {
        const match = await bcrypt.compare(inputPassword, user.password);
        if (!match) {
          return res.status(400).json({ message: "Mật khẩu không đúng!" });
        }

        const { password, ...userWithoutPassword } = user;
        const token = jwt.sign(userWithoutPassword, SECRET_KEY, { expiresIn: "1h" });

        res.status(200).json({
          message: "Đăng nhập thành công!",
          user: userWithoutPassword,
          token,
        });
      } catch (err) {
        res.status(500).json({ message: "Lỗi xử lý mật khẩu!" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server!" });
  }
});

//API lấy menu danh mục
app.get("/api/categories", (req, res) => {
  const query = "SELECT * FROM categories WHERE parent_id IS NULL";

  db.query(query, (err, result) => {
    if (err) {
      console.error("Lỗi khi truy vấn cơ sở dữ liệu:", err);
      return res.status(500).json({ message: "Lỗi server!" });
    }
    // Mảng để lưu danh mục cha và các danh mục con
    const categories = result.map((category) => {
      return new Promise((resolve, reject) => {
        // Truy vấn lấy danh mục con của mỗi danh mục cha
        const subQuery = "SELECT * FROM categories WHERE parent_id = ?";
        db.query(subQuery, [category.id], (err, subResult) => {
          if (err) {
            reject(err);
          }
          category.child = subResult; // Gán danh mục con vào mỗi danh mục cha
          resolve(category);
        });
      });
    });
    // Khi tất cả danh mục cha và con đã được lấy xong
    Promise.all(categories)
      .then((categoriesWithChildren) => {
        res.json(categoriesWithChildren); // Trả về danh mục cha cùng danh mục con
      })
      .catch((err) => {
        console.error("Lỗi khi lấy danh mục con:", err);
        res.status(500).json({ message: "Lỗi khi lấy danh mục con!" });
      });
  });
});

// API lấy danh sách tất cả sản phẩm
app.get('/products', (req, res) => {
  const query = 'SELECT * FROM products'; // Thay `products` bằng tên bảng của bạn
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(results);
  });
});

// API lấy danh sách sản phẩm theo danh mục
app.get('/api/products/category/:categoryName', (req, res) => {
  const categoryName = req.params.categoryName;

  // Tạo ánh xạ giữa categoryName và categoryId
  const categoryMap = {
    'nam': 2,
    'nu': 3,
    'kid': 4,
    'sport': 5,
  };

  const categoryId = categoryMap[categoryName];

  if (!categoryId) {
    return res.status(404).send({ message: 'Danh mục không tồn tại!' });
  }

  // Truy vấn sản phẩm thuộc danh mục
  const query = 'SELECT * FROM products WHERE category_id = ?';
  db.query(query, [categoryId], (err, results) => {
    if (err) {
      return res.status(500).send({ message: 'Lỗi khi truy vấn cơ sở dữ liệu!' });
    }
    res.json(results);
  });
});


// API lấy chi tiết sản phẩm theo ID
app.get('/products/:id', (req, res) => {
  const { id } = req.params; // Lấy id từ URL
  const query = 'SELECT * FROM products WHERE id = ?'; // Truy vấn sản phẩm với ID
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Lỗi truy vấn:", err);
      return res.status(500).json({ message: "Lỗi server khi truy vấn!" });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại!" }); // Xử lý khi không có sản phẩm
    }

    res.json(result[0]); // Trả về chi tiết sản phẩm
  });
});
