import { useState } from "react";
import { useParams } from "react-router-dom";
import { CheckCircle2, Store, Link as LinkIcon, ArrowRight, Loader2 } from "lucide-react";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export default function Activation() {
  const { cardId } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    businessName: "",
    googleLink: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simpan isian form dari Klien ke Firebase berdasarkan ID Kartu
      await setDoc(doc(db, "cards", cardId), {
        businessName: formData.businessName,
        googleReviewUrl: formData.googleLink,
        isActivated: true,
        activatedAt: serverTimestamp()
      });
      setIsSuccess(true);
    } catch (error) {
      console.error("Error:", error);
      alert("Gagal mengaktifkan. Pastikan koneksi internet stabil.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        <div className="bg-primary px-8 py-10 text-center relative overflow-hidden">
          
          {/* Bagian Logo */}
          <div className="mx-auto w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center mb-4 p-2">
            <img 
              src="/logo.jpg" 
              alt="BimaReview Logo" 
              className="w-full h-full object-contain" 
            />
          </div>

          <h1 className="text-2xl font-bold text-white tracking-wide">BimaReview</h1>
          <p className="text-slate-300 text-sm mt-2">Aktivasi Kartu Bisnis Anda</p>
        </div>
        <div className="p-8">
          {isSuccess ? (
            <div className="text-center animate-fade-in">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-slate-800 mb-2">Aktivasi Berhasil!</h2>
              <p className="text-slate-500 text-sm mb-6">Kartu Anda kini telah terhubung ke ulasan bisnis.</p>
              <button onClick={() => window.location.href = `/card/${cardId}`} className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-3 px-4 rounded-xl transition-colors">
                Coba Tap Kartu Sekarang
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700 ml-1">Nama Bisnis / Toko</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Store className="h-5 w-5 text-slate-400" /></div>
                  <input type="text" required placeholder="Kedai Kopi Bima" className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent bg-slate-50 text-sm outline-none" value={formData.businessName} onChange={(e) => setFormData({ ...formData, businessName: e.target.value })} />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700 ml-1">Link Google Review</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><LinkIcon className="h-5 w-5 text-slate-400" /></div>
                  <input type="url" required placeholder="https://g.page/r/..." className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent bg-slate-50 text-sm outline-none" value={formData.googleLink} onChange={(e) => setFormData({ ...formData, googleLink: e.target.value })} />
                </div>
              </div>
              <button type="submit" disabled={isSubmitting} className="w-full flex items-center justify-center bg-primary hover:bg-slate-800 text-white font-semibold py-3.5 px-4 rounded-xl transition-all shadow-md disabled:opacity-70">
                {isSubmitting ? <><Loader2 className="animate-spin h-5 w-5 mr-2" /> Memproses...</> : <><ArrowRight className="h-5 w-5 mr-2" /> Aktifkan Kartu Sekarang</>}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}