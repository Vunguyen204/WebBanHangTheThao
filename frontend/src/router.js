import React from "react";
import { Routes, Route } from "react-router-dom";
import { ROUTES } from "./utils/router";
import MasterLayout from "./pages/layout/masterLayout";
import AuthLayout from "./pages/layout/authLayout";
import HomePage from "./pages/homePage";
import ProfilePage from "./pages/profilePage";
import Product from "./pages/product";
import Cart from "./pages/cart";
import Login from "./pages/loginPage";
import Register from "./pages/register";

const renderUserRouter = () => {
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
  ];

  return (
    <Routes>
      {userRouters.map(
        ({ path, component, layout: Layout = React.Fragment }, key) => (
          <Route key={key} path={path} element={<Layout>{component}</Layout>} />
        )
      )}
    </Routes>
  );
};

const RouterCustom = () => {
  return renderUserRouter();
};

export default RouterCustom;
