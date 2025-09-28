import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFoundPage from './pages/Error/NotFoundPage';
import HomeScreen from './pages/User/home/HomeScreen';
import ProductDetails from './pages/User/home/ProductDetails';
import Header from './components/home/Header';
import Footer from './components/home/Footer';
import Sidebar from './components/home/Sidebar';

function App() {

  return (
    <div className="overflow-hidden">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomeScreen />}></Route>
          <Route path="/product/:id" element={<ProductDetails />}></Route>

          {/* Error Routes */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Sidebar />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;