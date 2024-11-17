// src/pages/Login/index.js
import React, { memo } from "react";

const login = () => {
  return (
    <div>
      <h2>Login Page</h2>
      <form>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default memo(login);
