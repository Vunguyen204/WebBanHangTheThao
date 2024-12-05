const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();
const PORT = 5000;
// Chạy server
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);

const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

app.use(
  cors({
    origin: "http://localhost:3000", // URL của frontend React
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