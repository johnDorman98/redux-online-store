import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import LandingPage from './components/LandingPage/LandingPage';
import ProductPage from './components/ProductPage/ProductPage';
import Cart from './components/Cart/Cart';
import UserAuth from './components/UserAuth/UserAuth';
import "./App.css";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/auth" element={<UserAuth />} />
      </Routes>
    </Router>
  );
};

export default App;
