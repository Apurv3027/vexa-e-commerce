import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFoundPage from './pages/Error/NotFoundPage';
import HomeScreen from './pages/User/home/HomeScreen';
import ProductDetails from './pages/User/home/ProductDetails';
import Header from './components/home/Header';
import Footer from './components/home/Footer';
import Sidebar from './components/home/Sidebar';
import CategoryProduct from './components/home/CategoryProduct';
import { Toaster } from 'react-hot-toast';
import CheckoutScreen from './pages/User/cart/CheckoutScreen';

function App() {

  return (
    <div className="overflow-hidden">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomeScreen />}></Route>
          <Route path="/product/:id" element={<ProductDetails />}></Route>
          <Route path="/category/:categoryName" element={<CategoryProduct />} />
          <Route path="/checkout" element={<CheckoutScreen />} />

          {/* Error Routes */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Sidebar />
        <Footer />
      </BrowserRouter>

      {/* Global Toaster */}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default App;