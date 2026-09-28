import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { CheckCircle2, Store, ArrowRight, Loader2, MapPin } from "lucide-react";

export default function Activation() {
  const { cardId } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [businessName, setBusinessName] = useState("");
  const [reviewUrl, setReviewUrl] = useState("");
  
  const inputRef = useRef(null);

  useEffect(() => {
    if (window.google && inputRef.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ["establishment"],
        componentRestrictions: { country: "id" },
      });

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        
        if (place && place.name) {
          setBusinessName(place.name);
          if (place.place_id) {
            const generatedLink = `https://search.google.com/local/writereview?placeid=${place.place_id}`;
            setReviewUrl(generatedLink);
          } else if (place.url) {
            setReviewUrl(place.url);
          }
        }
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reviewUrl) {
      alert("Silakan pilih nama bisnis dari daftar dropdown Google Maps!");
      return;
    }

    setIsSubmitting(true);
    const finalCardId = cardId || "BIMA-DEFAULT";

    try {
      await setDoc(doc(db, "cards", finalCardId), {
        businessName: businessName,
        googleReviewUrl: reviewUrl,
        isActivated: true,
        activatedAt: new Date().toLocaleString("id-ID")
      }, { merge: true });

      setIsSuccess(true);
    } catch (error) {
      console.error("Gagal menyimpan:", error);
      alert("Gagal menyimpan ke database.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        <div className="bg-slate-900 px-8 py-10 text-center text-white">
          <h1 className="text-2xl font-bold">BimaReview</h1>
          <p className="text-slate-300 text-sm mt-1">Aktivasi Kartu Ulasan Pintar</p>
        </div>

        <div className="p-8">
          {isSuccess ? (
            <div className="text-center py-6">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-slate-800 mb-2">Aktivasi Berhasil!</h2>
              <p className="text-slate-500 text-sm mb-6">Kartu terhubung dengan {businessName}.</p>
              <button 
                onClick={() => window.location.href = `/card/${cardId}`}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-3 px-4 rounded-xl"
              >
                Coba Tap Kartu
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Cari Nama Bisnis / Toko Anda</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-blue-600" />
                  <input
                    ref={inputRef}
                    type="text"
                    required
                    placeholder="Ketik nama kedai / toko..."
                    className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white text-sm outline-none"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">*Wajib klik pilihan yang muncul dari dropdown Google Maps.</p>
              </div>

              {reviewUrl && (
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 flex items-center gap-2">
                  <Store className="w-5 h-5 text-blue-600 shrink-0" />
                  <p className="text-xs text-blue-800 font-medium">Lokasi berhasil disinkronkan!</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting || !reviewUrl}
                className="w-full flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3.5 px-4 rounded-xl transition-all disabled:opacity-50"
              >
                {isSubmitting ? <Loader2 className="animate-spin h-5 w-5" /> : <>Aktifkan Kartu <ArrowRight className="ml-2 h-5 w-5" /></>}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}