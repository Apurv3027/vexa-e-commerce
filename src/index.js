import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "./i18n";
import React from "react";

import ProductProvider from "./contexts/ProductContext";
import SidebarProvider from "./contexts/SidebarContext";
import CartProvider from "./contexts/CartContext";
import CategoryProvider from './contexts/CategoryContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <SidebarProvider>
    <CartProvider>
      <ProductProvider>
        <CategoryProvider>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </CategoryProvider>
      </ProductProvider>
    </CartProvider>
  </SidebarProvider>
);
