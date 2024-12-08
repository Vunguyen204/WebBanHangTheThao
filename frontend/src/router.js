import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ROUTES } from "./utils/router";
import MasterLayout from "./pages/layout/masterLayout";
import AuthLayout from "./pages/layout/authLayout";
import HomePage from "./pages/homePage";
import ProfilePage from "./pages/profilePage";
import Product from "./pages/product";
import Cart from "./pages/cart";
import Checkout from "./pages/checkOut";
import CheckoutInfo from "./pages/checkOutInfo";
import Login from "./pages/login";
import Register from "./pages/register";
import CategoryPage from "./pages/category";
import ProductDetail from "./pages/productDetail";
import Dashboard from "./pages/admin/dashboard";
import ManageUsers from "./pages/admin/manageUsers";
import ProtectedRoute from "./components/protectedRoute";
import NotFoundPage from "./components/notFound";

const FallbackLayout = ({ children }) => <div>{children}</div>;

const renderRoutes = (routes, role, allowedRoles) => {
  return routes.map(({ path, component, layout: Layout = FallbackLayout }, key) => (
    <Route
      key={key}
      path={path}
      element={
        <ProtectedRoute role={role} allowedRoles={allowedRoles}>
          <Layout>{component}</Layout>
        </ProtectedRoute>
      }
    />
  ));
};

const RouterCustom = () => {
  const user = JSON.parse(localStorage.getItem("user")) || null;
  const role = user?.role || "guest";

  const userRouters = [
    { path: ROUTES.USER.HOME, component: <HomePage />, layout: MasterLayout },
    { path: ROUTES.USER.PROFILE, component: <ProfilePage />, layout: MasterLayout },
    { path: ROUTES.USER.PRODUCT, component: <Product />, layout: MasterLayout },
    { path: ROUTES.USER.CART, component: <Cart />, layout: MasterLayout },
    { path: ROUTES.USER.CHECKOUT, component: <Checkout />, layout: MasterLayout },
    { path: ROUTES.USER.CHECKOUTINFO, component: <CheckoutInfo />, layout: MasterLayout },
    { path: ROUTES.USER.LOGIN, component: <Login />, layout: AuthLayout },
    { path: ROUTES.USER.REGISTER, component: <Register />, layout: AuthLayout },
    { path: ROUTES.USER.CATEGORY, component: <CategoryPage />, layout: MasterLayout },
    { path: ROUTES.USER.PRODUCT_DETAIL, component: <ProductDetail />, layout: MasterLayout },
  ];

  const adminRouters = [
    { path: ROUTES.ADMIN.DASHBOARD, component: <Dashboard />, layout: MasterLayout },
    { path: ROUTES.ADMIN.MANAGE_USERS, component: <ManageUsers />, layout: MasterLayout },
  ];

  return (
    <Routes>
      {renderRoutes(userRouters, role, ["user", "admin"])}
      {renderRoutes(adminRouters, role, ["admin"])}
      <Route path="*" element={<NotFoundPage />} />
      </Routes>
  );
};

export default RouterCustom;
