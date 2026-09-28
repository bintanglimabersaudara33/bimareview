import { useState } from "react";
import { useParams } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase"; // Pastikan path ini benar
import { CheckCircle2, Store, Link as LinkIcon, ArrowRight, Loader2 } from "lucide-react";

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

    const finalCardId = cardId || "BIMA-DEFAULT";

    try {
      // PROSES SIMPAN KE FIREBASE YANG ASLI
      await setDoc(doc(db, "cards", finalCardId), {
        businessName: formData.businessName,
        googleReviewUrl: formData.googleLink,
        isActivated: true,
        activatedAt: new Date().toLocaleString("id-ID")
      }, { merge: true });

      // Jika berhasil simpan, munculkan halaman sukses
      setIsSuccess(true);
    } catch (error) {
      console.error("Gagal menyimpan data:", error);
      alert("Koneksi gagal. Pastikan pengaturan Firebase Rules sudah diubah menjadi true.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fungsi saat tombol "Coba Tap Kartu" diklik
  const handleTryCard = () => {
    // Arahkan ke link handler untuk mengetes apakah otomatis redirect ke Google
    window.location.href = `/card/${cardId}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        
        {/* Header */}
        <div className="bg-slate-900 px-8 py-10 text-center relative overflow-hidden">
          <div className="mx-auto w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center mb-4 p-2">
             {/* Jika punya logo, ganti dengan tag img di bawah ini */}
             <span className="text-slate-900 font-bold text-2xl tracking-tighter">BR</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-wide">BimaReview</h1>
          <p className="text-slate-300 text-sm mt-2">Aktivasi Kartu Ulasan Pintar</p>
        </div>

        <div className="p-8">
          {isSuccess ? (
            // Tampilan Berhasil
            <div className="text-center py-6 animate-fade-in">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-slate-800 mb-2">Aktivasi Berhasil!</h2>
              <p className="text-slate-500 text-sm mb-8">
                ID Kartu <span className="font-semibold text-slate-900">{cardId}</span> kini sudah aktif dan terhubung ke ulasan bisnis Anda.
              </p>
              <button 
                onClick={handleTryCard}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
              >
                Coba Tap Kartu Sekarang <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            // Tampilan Form
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700 ml-1">Nama Bisnis / Toko</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Store className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Kedai Kopi Bima"
                    className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-slate-50 focus:bg-white outline-none"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700 ml-1">Link Google Review</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LinkIcon className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="url"
                    required
                    placeholder="https://g.page/r/..."
                    className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-slate-50 focus:bg-white outline-none"
                    value={formData.googleLink}
                    onChange={(e) => setFormData({ ...formData, googleLink: e.target.value })}
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3.5 px-4 rounded-xl transition-all duration-200 shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin h-5 w-5 mr-2" />
                      Menyimpan...
                    </>
                  ) : (
                    <>
                      Aktifkan Kartu <ArrowRight className="h-5 w-5 ml-2" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}