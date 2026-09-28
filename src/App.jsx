import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import CardHandler from "./pages/CardHandler";
import Activation from "./pages/Activation";

function App() {
  return (
    <Router>
      <Routes>
        {/* Jika user buka domain utama (tanpa /card/...), langsung lempar ke form aktivasi */}
        <Route path="/" element={<Navigate to="/activate/BIMA-DEFAULT" replace />} />

        {/* Rute saat kartu di-tap/scan */}
        <Route path="/card/:cardId" element={<CardHandler />} />
        
        {/* Rute form aktivasi */}
        <Route path="/activate/:cardId" element={<Activation />} />
      </Routes>
    </Router>
  );
}

export default App;