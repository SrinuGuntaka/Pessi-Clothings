import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProfilePage from './pages/ProfilePage';
import WishlistPage from './pages/WishlistPage';
import CartPage from './pages/CartPage';
import TrendingPage from './pages/TrendingPage';
import OffersPage from './pages/OffersPage';
import ProductDetails from './pages/ProductDetails';
import Payments from './pages/Payments';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import Orders from './pages/Orders';
import Register from './components/Register';
import Login from './components/Login';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content" style={{ minHeight: '80vh' }}>
          <Routes>
            <Route path="/" element={<HomePage />} /> 
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/trending" element={<TrendingPage />} />
            <Route path="/offers" element={<OffersPage />} />
            <Route path="/women" element={<ProductsPage category="women" />} />
            <Route path="/men" element={<ProductsPage category="men" />} />
            <Route path="/kids" element={<ProductsPage category="kids" />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/payments" element={<Payments />} />
          </Routes>
        </main>
        <Footer />

        {/* ✅ Modals for Login & Register */}
        {showLogin && <Login show={showLogin} handleClose={() => setShowLogin(false)} setShowRegister={setShowRegister} />}
        {showRegister && <Register show={showRegister} handleClose={() => setShowRegister(false)} setShowLogin={setShowLogin} />}

      </div>
    </Router>
  );
}

export default App;
