import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CardHandler from "./pages/CardHandler";
import Activation from "./pages/Activation";
import AdminGenerator from "./pages/AdminGenerator";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/card/:cardId" element={<CardHandler />} />
        <Route path="/activate/:cardId" element={<Activation />} />
        <Route path="/admin/generator" element={<AdminGenerator />} />
      </Routes>
    </Router>
  );
}

export default App;