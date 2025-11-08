import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/home/Header";
import HomeScreen from "./pages/User/home/HomeScreen";
import ProductDetails from "./pages/User/product/ProductDetails";
import CategoryProductScreen from "./pages/User/category/CategoryProductScreen";
import CheckoutScreen from "./pages/User/cart/CheckoutScreen";
import LoginPage from "./pages/Authentication/LoginPage";
import NotFoundPage from "./pages/Error/NotFoundPage";
import Sidebar from "./components/home/Sidebar";
import Footer from "./components/home/Footer";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./contexts/AuthContext";

function AppRouter() {
    const location = useLocation();

    // Hide header/footer/sidebar on authentication pages
    const hideLayoutOnLogin = location.pathname === "/login";

    // Hide sidebar on checkout page
    const hideSidebarOnCheckout = location.pathname === "/checkout";

    // Protected Route for authenticated pages
    // const ProtectedRoute = ({ children }) => {
    //     const { isAuthenticated, loading } = useAuth();

    //     if (loading) {
    //         return (
    //             <div className="flex justify-center items-center min-h-screen">
    //                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    //             </div>
    //         );
    //     }

    //     return isAuthenticated() ? children : <Navigate to="/login" />;
    // };

    return (
        <div className="overflow-hidden">
            {!hideLayoutOnLogin && <Header />}
            <Routes>
                {/* <Route path="/" element={<HomeScreen />}></Route> */}
                <Route
                    path="/"
                    element={
                        // <ProtectedRoute>
                        //     <HomeScreen />
                        // </ProtectedRoute>
                        <HomeScreen />
                    }
                />
                <Route path="/product/:productId" element={<ProductDetails />}></Route>
                <Route path="/category/:categoryId" element={<CategoryProductScreen />} />
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