import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import CardHandler from "./pages/CardHandler";
import Activation from "./pages/Activation";
import AdminGenerator from "./pages/AdminGenerator";
import Login from "./pages/Login";

// Komponen Pelindung (Gembok) Halaman Admin
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAdminLoggedIn") === "true";
  
  // Jika belum login, tendang kembali ke halaman /login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // Jika sudah login, izinkan masuk ke halaman admin
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/card/:cardId" element={<CardHandler />} />
        <Route path="/activate/:cardId" element={<Activation />} />
        
        {/* Rute Halaman Login */}
        <Route path="/login" element={<Login />} />

        {/* Rute Halaman Admin (Digembok) */}
        <Route 
          path="/admin/generator" 
          element={
            <ProtectedRoute>
              <AdminGenerator />
            </ProtectedRoute>
          } 
        />

        {/* Redirect dari halaman utama (/) ke halaman login admin */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;