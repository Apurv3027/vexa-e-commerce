import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/home/Header";
import HomeScreen from "./pages/User/home/HomeScreen";
import ProductDetails from "./pages/User/home/ProductDetails";
import CategoryProductScreen from "./pages/User/category/CategoryProductScreen";
import CheckoutScreen from "./pages/User/cart/CheckoutScreen";
import LoginPage from "./pages/Authentication/LoginPage";
import NotFoundPage from "./pages/Error/NotFoundPage";
import Sidebar from "./components/home/Sidebar";
import Footer from "./components/home/Footer";
import { Toaster } from "react-hot-toast";

function AppRouter() {
    const location = useLocation();

    // Hide header/footer/sidebar on authentication pages
    const hideLayoutOnLogin = location.pathname === "/login";

    // Hide sidebar on checkout page
    const hideSidebarOnCheckout = location.pathname === "/checkout";

    return (
        <div className="overflow-hidden">
            {!hideLayoutOnLogin && <Header />}
            <Routes>
                <Route path="/" element={<HomeScreen />}></Route>
                <Route path="/product/:id" element={<ProductDetails />}></Route>
                <Route path="/category/:categoryName" element={<CategoryProductScreen />} />
                <Route path="/checkout" element={<CheckoutScreen />} />

                {/* Authentication */}
                <Route path="/login" element={<LoginPage />}></Route>

                {/* Error Routes */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            {!hideLayoutOnLogin && !hideSidebarOnCheckout && <Sidebar />}
            {!hideLayoutOnLogin && <Footer />}

            {/* Global Toaster */}
            <Toaster position="top-right" reverseOrder={false} />
        </div>
    );
}

export default AppRouter;