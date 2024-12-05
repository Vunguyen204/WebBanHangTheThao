// components/CurrencyFormat.js
import React from "react";

const CurrencyFormat = ({ value }) => {
  const formatPrice = (price) => {
    return price.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  return <span>{formatPrice(value)}</span>;
};

export default CurrencyFormat;
