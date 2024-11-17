import { Routes, Route } from "react-router-dom";
import { ROUTES } from "./utils/router";
import MasterLayout from "./pages/layout/masterLayout";
import HomePage from "./pages/homePage";
import ProfilePage from "./pages/profilePage";

const renderUserRouter = () => {
  const userRouters = [
    {
      path: ROUTES.USER.HOME,
      component: <HomePage />,
    },
    {
      path: ROUTES.USER.PROFILE,
      component: <ProfilePage />,
    },
  ];

  return (
    <MasterLayout>
      <Routes>
          {userRouters.map((item, key) => (
              <Route key={key} path={item.path} element={item.component} />
          ))}
      </Routes>
    </MasterLayout>
  );
};

const RouterCustom = () => {
  return renderUserRouter();
};

export default RouterCustom;
