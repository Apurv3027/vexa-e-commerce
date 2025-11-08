import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "./i18n";
import React from "react";

import ProductProvider from "./contexts/ProductContext";
import SidebarProvider from "./contexts/SidebarContext";
import CartProvider from "./contexts/CartContext";
import CategoryProvider from './contexts/CategoryContext';
import AuthProvider from './contexts/AuthContext';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <ProductProvider>
        <CategoryProvider>
          <CartProvider>
            <SidebarProvider>
              <React.StrictMode>
                <App />
              </React.StrictMode>
            </SidebarProvider>
          </CartProvider>
        </CategoryProvider>
      </ProductProvider>
    </GoogleOAuthProvider>
  </AuthProvider>
);
