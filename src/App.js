import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './components/Authentication/LoginPage';
import NotFoundPage from './components/Error/NotFoundPage';
import HomeScreen from './components/User/HomeScreen';

function App() {
  return (
    <BrowserRouter>
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

      {/* Main Content */}
      <main className="min-h-screen bg-gray-50">
        <Routes>

          {/* Authentication Routes */}
          <Route path="/login" element={<LoginPage />} />

          {/* User Routes */}
          <Route path="/" element={<HomeScreen />} />

          {/* Admin Routes */}

          {/* Error Routes */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;