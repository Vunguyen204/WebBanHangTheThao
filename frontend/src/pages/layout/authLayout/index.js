import React from "react";
import "./style.scss";
import logoLogin from "../../../assets/svg/dau.png"


const AuthLayout = ({ children }) => {
  return (
    <div className="auth-layout">
      <div><img src={logoLogin} alt="logo" />{children}</div>
    </div>
  );
};

export default AuthLayout;
