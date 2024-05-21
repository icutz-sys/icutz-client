import { Routes, Route, Navigate } from "react-router-dom";
import './App.css'
import Home from './pages/home/home';
// import Footer from './widgets/layout/footer';
import Shops from './pages/shops/shops';
import Shop from './pages/shop/shop';
import MiniFooter from './widgets/layout/mini_footer';
import ShopWizard from './pages/shopWizard/shopWizard';


function App() {
  return (
    <>
    <Routes>
      <Route path="/home/" element={<Home />} />
      <Route path="/shops/" element={<Shops />} />
      <Route path="/shop/:id" element={<Shop />} />
      <Route path="/shop/:id/book" element={<ShopWizard />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
    <MiniFooter />
    </>
  )
}

export default App
