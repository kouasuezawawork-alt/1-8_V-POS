import { BrowserRouter, Routes, Route } from "react-router-dom";

import RegisterSelect from "./pages/RegisterSelect";
import RegisterHome from "./pages/RegisterHome";
import ScanPage from "./pages/ScanPage";
import CheckoutPage from "./pages/CheckoutPage";
import SendingPage from "./pages/SendingPage";
import ProductManager from "./pages/ProductManager";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegisterSelect />} />
        <Route path="/register-home" element={<RegisterHome />} />
        <Route path="/scan" element={<ScanPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/sending" element={<SendingPage />} />
        <Route path="/products" element={<ProductManager />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}