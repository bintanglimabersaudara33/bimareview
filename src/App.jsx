import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import CardHandler from "./pages/CardHandler";
import Activation from "./pages/Activation";
import AdminGenerator from "./pages/AdminGenerator"; // Pastikan file ini ada di folder pages

function App() {
  return (
    <Router>
      <Routes>
        {/* Jika user buka domain utama, arahkan ke aktivasi default */}
        <Route path="/" element={<Navigate to="/activate/BIMA-DEFAULT" replace />} />

        {/* Halaman khusus Admin untuk generate ID NFC & QR Code */}
        <Route path="/admin/generator" element={<AdminGenerator />} />

        {/* Rute saat kartu di-tap/scan */}
        <Route path="/card/:cardId" element={<CardHandler />} />
        
        {/* Rute form aktivasi kartu */}
        <Route path="/activate/:cardId" element={<Activation />} />
      </Routes>
    </Router>
  );
}

export default App;