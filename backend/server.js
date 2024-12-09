const express = require("express");
const mysql2 = require('mysql2');
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;
const ordersRouter = require('./routes/orders');

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

// Hàm truy vấn cơ sở dữ liệu trả về Promise
const query = (sql, params) => {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

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

// API tạo đơn hàng
app.post("/api/createOrder", (req, res) => {
  const { fullName, address, paymentMethod, cart } = req.body;

  // Bắt đầu giao dịch để đảm bảo tính toàn vẹn của dữ liệu
  db.beginTransaction((err) => {
    if (err) {
      return res.status(500).json({ message: "Lỗi khi bắt đầu giao dịch", error: err });
    }

    // Tạo đơn hàng
    const orderQuery = "INSERT INTO orders (name, address, payment_method) VALUES (?, ?, ?)";
    db.query(orderQuery, [fullName, address, paymentMethod], (err, result) => {
      if (err) {
        return db.rollback(() => {
          res.status(500).json({ message: "Lỗi khi tạo đơn hàng", error: err });
        });
      }
      const orderId = result.insertId;

      // Tạo chi tiết đơn hàng
      const orderDetailsQuery = "INSERT INTO order_details (order_id, product_name, quantity, price) VALUES ?";
      const orderDetailsValues = cart.map(item => [orderId, item.name, item.quantity, item.price]);

      db.query(orderDetailsQuery, [orderDetailsValues], (err) => {
        if (err) {
          return db.rollback(() => {
            res.status(500).json({ message: "Lỗi khi thêm chi tiết đơn hàng", error: err });
          });
        }

        // Cập nhật số lượng sản phẩm trong kho
        let updateStockPromises = cart.map((item) => {
          return new Promise((resolve, reject) => {
            const checkStockQuery = "SELECT stock FROM products WHERE name = ?";
            db.query(checkStockQuery, [item.name], (err, result) => {
              if (err) {
                console.error("Error checking stock:", err); // Log lỗi khi kiểm tra kho
                return reject(err);
              }
              if (result.length === 0) {
                return reject("Sản phẩm không tồn tại trong kho");
              }

              const currentStock = result[0].stock;
              if (currentStock < item.quantity) {
                return reject(`Số lượng sản phẩm "${item.name}" không đủ trong kho`);
              }

              // Cập nhật số lượng sản phẩm trong kho
              const updateStockQuery = "UPDATE products SET stock = stock - ? WHERE name = ?";
              db.query(updateStockQuery, [item.quantity, item.name], (err) => {
                if (err) {
                  console.error("Error updating product stock:", err); // Log lỗi khi cập nhật kho
                  reject(err);
                } else {
                  resolve();
                }
              });
            });
          });
        });

        // Chờ tất cả các cập nhật kho hoàn thành
        Promise.all(updateStockPromises)
          .then(() => {
            // Nếu tất cả thành công, commit giao dịch
            db.commit((err) => {
              if (err) {
                return db.rollback(() => {
                  res.status(500).json({ message: "Lỗi khi commit giao dịch", error: err });
                });
              }

              res.status(200).json({ message: "Đặt hàng thành công!", orderDetails: { orderId, cart } });
            });
          })
          .catch((err) => {
            // Nếu có lỗi, rollback giao dịch
            db.rollback(() => {
              res.status(500).json({ message: "Lỗi khi cập nhật số lượng sản phẩm", error: err });
            });
          });
      });
    });
  });
});

// API lấy chi tiết đơn hàng
app.get("/api/orders/:orderId", (req, res) => {
  const orderId = req.params.orderId;

  const orderQuery = "SELECT * FROM orders WHERE id = ?";
  db.query(orderQuery, [orderId], (err, orderResult) => {
    if (err || !orderResult.length) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
    }

    const orderDetailsQuery = "SELECT * FROM order_details WHERE order_id = ?";
    db.query(orderDetailsQuery, [orderId], (err, orderDetails) => {
      if (err) {
        return res.status(500).json({ message: "Lỗi khi lấy chi tiết đơn hàng" });
      }

      res.status(200).json({
        order: orderResult[0],
        orderDetails: orderDetails,
      });
    });
  });
});

// API Lấy tất cả đơn hàng
app.use(ordersRouter);