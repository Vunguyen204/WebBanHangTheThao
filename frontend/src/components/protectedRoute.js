import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, role, allowedRoles, restrictedRoutes = [] }) => {
  const location = useLocation();

  // Nếu đường dẫn hiện tại nằm trong danh sách bị giới hạn và role không hợp lệ
  if (role === "guest" && restrictedRoutes.includes(location.pathname)) {
    console.log("Access denied for guests. Redirecting to /login");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
