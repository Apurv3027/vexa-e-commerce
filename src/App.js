import { Route, Routes, useLocation } from 'react-router-dom';
import LoginPage from './pages/Authentication/LoginPage';
import NotFoundPage from './pages/Error/NotFoundPage';
import HomeScreen from './pages/User/home/HomeScreen';
import ProductDetails from './pages/User/home/ProductDetails';
import { useState } from 'react';
import HeaderComponents from './components/home/HeaderComponents';
import CategoryDetail from './pages/User/category/CategoryDetail';

function App() {
  const [cart, setCart] = useState([]);
  const location = useLocation();

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  // Hide header on login page
  const hideHeaderRoutes = ["/login"];
  const shouldHideHeader = hideHeaderRoutes.includes(location.pathname);

  return (
    <>
      {/* Navigation */}
      {/* <nav className="bg-white shadow-lg p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-primary-600">MyApp</h1>
          <div className="space-x-4">
            <a href="/" className="text-gray-700 hover:text-primary-600 transition-colors">Home</a>
            <a href="/about" className="text-gray-700 hover:text-primary-600 transition-colors">About</a>
            <a href="/contact" className="text-gray-700 hover:text-primary-600 transition-colors">Contact</a>
            <a href="/login" className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700 transition-colors">Login</a>
          </div>
        </div>
      </nav> */}

      {/* Header Component */}
      {!shouldHideHeader && <HeaderComponents cartItemCount={cart.length} />}

      {/* Main Content */}
      <main className="min-h-screen bg-gray-50">
        <Routes>

          {/* Authentication Routes */}
          <Route path="/login" element={<LoginPage />} />

          {/* User Routes */}
          <Route
            path="/"
            element={
              <HomeScreen
                cart={cart}
                addToCart={addToCart}
                removeFromCart={removeFromCart} />
            } />
          <Route
            path="/products/:productId"
            element={
              <ProductDetails
                cart={cart}
                addToCart={addToCart}
                removeFromCart={removeFromCart} />
            } />
          <Route path="/category/:categoryId" element={<CategoryDetail />} />

          {/* Admin Routes */}

          {/* Error Routes */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;