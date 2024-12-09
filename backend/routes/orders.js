const express = require('express');
const router = express.Router();
const db = require('../db');

// Hàm truy vấn cơ sở dữ liệu trả về Promise
const query = (sql, params) => {
    return new Promise((resolve, reject) => {
      db.query(sql, params, (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  };
  
  // Lấy tất cả đơn hàng
  router.get('/api/orders', async (req, res) => {
    try {
      const orders = await query('SELECT * FROM orders ORDER BY created_at DESC');
      res.json(orders);  // Trả về danh sách đơn hàng
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ message: "Lỗi khi lấy đơn hàng." });
    }
  });
  
  module.exports = router;