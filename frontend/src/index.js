import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from'react-router-dom';
import RouterCustom from './router';
import './style/styles.scss';
import 'bootstrap/dist/css/bootstrap.min.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <RouterCustom />
  </BrowserRouter>
);
