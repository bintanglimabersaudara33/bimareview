import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CheckCircle2, Store, Link as LinkIcon, ArrowRight, Loader2, Sparkles } from "lucide-react";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase"; // Import database

export default function Activation() {
  const { cardId } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    businessName: "",
    googleInput: "",
  });

  const convertToReviewLink = (input) => {
    if (input.includes("search.google.com/local/writereview")) return input;
    return input; // Logic convert bisa disempurnakan nanti
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const finalLink = convertToReviewLink(formData.googleInput);

    try {
      // PROSES SIMPAN ASLI KE FIREBASE
      await setDoc(doc(db, "cards", cardId), {
        businessName: formData.businessName,
        googleReviewUrl: finalLink,
        isActivated: true,
        activatedAt: serverTimestamp()
      });
      
      setIsSuccess(true);
    } catch (error) {
      console.error("Error saving to Firebase:", error);
      alert("Gagal menyimpan data! Pastikan aturan (Rules) Firestore Anda sudah diatur ke public sementara.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        <div className="bg-primary px-8 py-10 text-center relative overflow-hidden">
          <div className="mx-auto w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center mb-4 p-2">
            <span className="text-primary font-bold text-xl">BR</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-wide">BimaReview</h1>
          <p className="text-slate-300 text-sm mt-2">Aktivasi Kartu Ulasan Pintar</p>
        </div>

        <div className="p-8">
          {isSuccess ? (
            <div className="text-center py-6">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-slate-800 mb-2">Aktivasi Berhasil!</h2>
              <p className="text-slate-500 text-sm mb-6">
                Kartu Anda kini sudah aktif.
              </p>
              <button onClick={() => navigate(`/card/${cardId}`)} className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-3 px-4 rounded-xl transition-colors">
                Coba Scan Kartu Sekarang
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700 ml-1">Nama Bisnis / Toko</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Store className="h-5 w-5 text-slate-400" /></div>
                  <input type="text" required placeholder="Contoh: Kedai Kopi" className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent bg-slate-50 outline-none" value={formData.businessName} onChange={(e) => setFormData({ ...formData, businessName: e.target.value })} />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700 ml-1">Link Google Maps</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><LinkIcon className="h-5 w-5 text-slate-400" /></div>
                  <input type="text" required placeholder="Tempel link di sini..." className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent bg-slate-50 outline-none" value={formData.googleInput} onChange={(e) => setFormData({ ...formData, googleInput: e.target.value })} />
                </div>
              </div>

              <button type="submit" disabled={isSubmitting} className="w-full flex items-center justify-center bg-primary hover:bg-slate-800 text-white font-semibold py-3.5 px-4 rounded-xl shadow-md disabled:opacity-70">
                {isSubmitting ? <><Loader2 className="animate-spin h-5 w-5 mr-2" /> Memproses...</> : "Aktifkan Kartu"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}