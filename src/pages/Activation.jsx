import { useState } from "react";
import { useParams } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { CheckCircle2, Store, ArrowRight, Loader2, Link as LinkIcon } from "lucide-react";

export default function Activation() {
  const { cardId } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [businessName, setBusinessName] = useState("");
  const [googleLink, setGoogleLink] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Menyimpan data aktivasi ke Firebase
      await setDoc(doc(db, "cards", cardId), {
        businessName: businessName,
        googleReviewUrl: googleLink, // Menyimpan link yang di-paste manual
        isActivated: true,
        activatedAt: new Date().toISOString()
      }, { merge: true });

      setIsSuccess(true);
    } catch (error) {
      console.error("Gagal menyimpan:", error);
      alert("Koneksi gagal. Pastikan internet Anda stabil.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        
        {/* HEADER & LOGO AREA */}
        <div className="bg-slate-900 px-8 py-10 text-center relative overflow-hidden">
          <div className="mx-auto w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center mb-4 p-2 transform rotate-3">
            <span className="text-slate-900 font-bold text-2xl tracking-tighter">BR</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-wide">BimaReview</h1>
          <p className="text-slate-300 text-sm mt-2">Aktivasi Kartu Ulasan Pintar</p>
        </div>

        {/* FORM AREA */}
        <div className="p-8">
          {isSuccess ? (
            <div className="text-center py-6 animate-fade-in">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-slate-800 mb-2">Aktivasi Berhasil!</h2>
              <p className="text-slate-500 text-sm mb-6">
                Kartu <span className="font-semibold text-slate-900">{cardId}</span> kini terhubung dengan <span className="font-semibold text-slate-900">{businessName}</span>.
              </p>
              <button 
                onClick={() => window.location.href = `/card/${cardId}`}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-3 px-4 rounded-xl transition-colors"
              >
                Coba Tap Kartu Sekarang
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* INPUT NAMA BISNIS */}
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
                    className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 bg-slate-50 focus:bg-white outline-none text-sm transition-all"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                  />
                </div>
              </div>

              {/* INPUT LINK MANUAL */}
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700 ml-1">Link Ulasan Google Maps</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LinkIcon className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="url"
                    required
                    placeholder="Paste link https://g.page/r/... di sini"
                    className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 bg-slate-50 focus:bg-white outline-none text-sm transition-all"
                    value={googleLink}
                    onChange={(e) => setGoogleLink(e.target.value)}
                  />
                </div>
                <div className="bg-blue-50 p-3 rounded-lg mt-2 border border-blue-100">
                  <p className="text-[11px] text-blue-800 leading-relaxed">
                    <span className="font-semibold">Cara mendapatkan link:</span> Buka aplikasi Google Maps &gt; Cari toko Anda &gt; Bagikan Profil &gt; Salin Tautan (Copy Link), lalu paste di kotak atas.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting || !businessName || !googleLink}
                  className="w-full flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3.5 px-4 rounded-xl transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin h-5 w-5 mr-2" /> Menghubungkan...
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