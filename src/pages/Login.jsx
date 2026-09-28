import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, User, ArrowRight, ShieldAlert } from "lucide-react";

export default function Login() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Mengambil username dan password dari file .env (Anti Inspect Element)
    const validUsername = import.meta.env.VITE_ADMIN_USER;
    const validPassword = import.meta.env.VITE_ADMIN_PASS;

    if (credentials.username === validUsername && credentials.password === validPassword) {
      // Jika benar, simpan "kunci masuk" di memori browser
      localStorage.setItem("isAdminLoggedIn", "true");
      navigate("/admin/generator"); // Arahkan ke halaman admin
    } else {
      // Jika salah, tampilkan pesan error selama 3 detik
      setError(true);
      setTimeout(() => setError(false), 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">
        
        {/* Header Login */}
        <div className="bg-primary px-8 py-10 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-white opacity-5"></div>
          <div className="mx-auto w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center mb-4 transform rotate-3">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-wide">Admin Akses</h1>
          <p className="text-slate-300 text-sm mt-2">BimaReview Generator Panel</p>
        </div>

        {/* Form Login */}
        <div className="p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-600 animate-fade-in">
              <ShieldAlert className="w-5 h-5 shrink-0" />
              <p className="text-sm font-semibold">Username atau Password salah!</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700 ml-1">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  required
                  placeholder="Masukkan username..."
                  className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-accent bg-slate-50 focus:bg-white outline-none transition-all"
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700 ml-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-accent bg-slate-50 focus:bg-white outline-none transition-all"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                />
              </div>
            </div>

            <button
               type="submit"
               className="w-full flex items-center justify-center bg-primary hover:bg-slate-800 text-white font-semibold py-3.5 px-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg mt-4"
            >
              Masuk ke Panel <ArrowRight className="h-5 w-5 ml-2" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}