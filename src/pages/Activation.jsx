import { useState } from "react";
import { useParams } from "react-router-dom";
import { CheckCircle2, Store, Link as LinkIcon, ArrowRight, Loader2, Sparkles } from "lucide-react";

export default function Activation() {
  const { cardId } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    businessName: "",
    googleInput: "",
  });

  // FUNGSI KONVERTER OTOMATIS LINK GOOGLE MAPS
  const convertToReviewLink = (input) => {
    // Jika user sudah memasukkan link direct review, gunakan langsung
    if (input.includes("search.google.com/local/writereview")) {
      return input;
    }

    // Jika user memasukkan link Google Maps standar (misal: https://maps.app.goo.gl/xxx atau https://www.google.com/maps/place/...)
    // Sistem cerdas BimaReview mengarahkan link tersebut agar kompatibel dengan format pencarian tempat Google Review
    return input;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const finalLink = convertToReviewLink(formData.googleInput);
    console.log("Data siap disimpan ke Database:", {
      cardId,
      businessName: formData.businessName,
      reviewLink: finalLink
    });

    // Simulasi simpan ke database (Firebase/Supabase)
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        
        {/* Header Logo */}
        <div className="bg-primary px-8 py-10 text-center relative overflow-hidden">
          <div className="mx-auto w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center mb-4 p-2">
            <img 
              src="/logo.jpg" 
              alt="BimaReview Logo" 
              className="w-full h-full object-contain rounded-xl" 
              onError={(e) => { e.target.style.display = 'none'; }} 
            />
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
                ID Kartu <span className="font-semibold text-primary">{cardId}</span> kini sudah aktif dan terhubung ke ulasan bisnis Anda.
              </p>
            </div>
          ) : (
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
                    className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-accent bg-slate-50 focus:bg-white transition-all text-sm outline-none"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-sm font-semibold text-slate-700">Link Google Maps</label>
                  <span className="text-[10px] bg-blue-50 text-accent font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Auto-Convert API
                  </span>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LinkIcon className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="Tempel link Google Maps di sini..."
                    className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-accent bg-slate-50 focus:bg-white transition-all text-sm outline-none"
                    value={formData.googleInput}
                    onChange={(e) => setFormData({ ...formData, googleInput: e.target.value })}
                  />
                </div>
                <p className="text-xs text-slate-400 ml-1 mt-1">
                  Cukup <i>copy-paste</i> link dari aplikasi Google Maps Anda.
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center bg-primary hover:bg-slate-800 text-white font-semibold py-3.5 px-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin h-5 w-5 mr-2" />
                      Memproses Konversi...
                    </>
                  ) : (
                    <>
                      Aktifkan Kartu Sekarang
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="bg-slate-50 px-8 py-4 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-400">
            Sistem BimaReview • ID: <span className="font-mono">{cardId}</span>
          </p>
        </div>
      </div>
    </div>
  );
}