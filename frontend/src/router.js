import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ROUTES } from "./utils/router";
import MasterLayout from "./pages/layout/masterLayout";
import AuthLayout from "./pages/layout/authLayout";
// import AdminLayout from "./pages/layout/adminLayout";
import HomePage from "./pages/homePage";
import ProfilePage from "./pages/profilePage";
import Product from "./pages/product";
import Cart from "./pages/cart";
import Login from "./pages/login";
import Register from "./pages/register";
import CategoryPage from "./pages/category";
import ProductDetail from "./pages/productDetail";
// import ProtectedRoute from "./components/protectedRoute";

const renderRouter = () => {
  // Lấy vai trò người dùng từ localStorage (hoặc từ API nếu cần)
  // const user = JSON.parse(localStorage.getItem("user"));
  // const role = user?.role || "guest";

  const userRouters = [
    {
      path: ROUTES.USER.HOME,
      component: <HomePage />,
      layout: MasterLayout,
    },
    {
      path: ROUTES.USER.PROFILE,
      component: <ProfilePage />,
      layout: MasterLayout,
    },
    {
      path: ROUTES.USER.PRODUCT,
      component: <Product />,
      layout: MasterLayout,
    },
    {
      path: ROUTES.USER.CART,
      component: <Cart />,
      layout: MasterLayout,
    },
    {
      path: ROUTES.USER.LOGIN,
      component: <Login />,
      layout: AuthLayout,
    },
    {
      path: ROUTES.USER.REGISTER,
      component: <Register />,
      layout: AuthLayout,
    },
    {
      path: ROUTES.USER.CATEGORY,
      component: <CategoryPage />,
      layout: MasterLayout,
    },
    {
      path: ROUTES.USER.PRODUCT_DETAIL,
      component: <ProductDetail />,
      layout: MasterLayout,
    },
  ];

  // Định nghĩa các route cho admin
  // const adminRouters = [
  //   {
  //     path: ROUTES.ADMIN.DASHBOARD,
  //     // component: <AdminDashboard />,
  //     component: <HomePage />,
  //     layout: MasterLayout,
  //     // layout: AdminLayout,
  //   },
  //   {
  //     path: ROUTES.ADMIN.MANAGE_USERS,
  //     // component: <ManageUsers />,
  //     component: <HomePage />,
  //     layout: MasterLayout,
  //     // layout: AdminLayout,
  //   },
  // ];

  return (
    <Routes>
        {userRouters.map(
          ({ path, component, layout: Layout = React.Fragment }, key) => (
            <Route
              key={key}
              path={path}
              element={<Layout>{component}</Layout>}
            />
          )
        )}
      {/* Routes cho người dùng */}
      {/* {userRouters.map(
        ({ path, component, layout: Layout = React.Fragment }, key) => (
          <Route
            key={key}
            path={path}
            element={
              <ProtectedRoute role={role} allowedRoles={["user", "admin"]}>
                <Layout>{component}</Layout>
              </ProtectedRoute>
            }
          />
        )
      )} */}

      {/* Routes cho admin */}
      {/* {adminRouters.map(
        ({ path, component, layout: Layout = React.Fragment }, key) => (
          <Route
            key={key}
            path={path}
            element={
              <ProtectedRoute role={role} allowedRoles={["admin"]}>
                <Layout>{component}</Layout>
              </ProtectedRoute>
            }
          />
        )
      )} */}

      {/* Redirect đến trang login nếu không khớp */}
      {/* <Route path="*" element={<Navigate to={ROUTES.USER.LOGIN} replace />} /> */}
    </Routes>
  );
};

const RouterCustom = () => {
  return renderRouter();
};

export default RouterCustom;
