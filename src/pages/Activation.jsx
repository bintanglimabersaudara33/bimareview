import { useState } from "react";
import { useParams } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase"; // Pastikan lokasi file firebase.js Anda benar
import { ArrowRight, Store, Link as LinkIcon } from "lucide-react";

export default function Activation() {
  const { cardId } = useParams(); // Mengambil ID langsung dari URL
  const [businessName, setBusinessName] = useState("");
  const [reviewLink, setReviewLink] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleActivate = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mencegah error jika cardId kosong dari URL
    const finalCardId = cardId || "ID-TIDAK-VALID";

    try {
      // Menyimpan ke Firebase menggunakan nama field yang benar
      await setDoc(doc(db, "cards", finalCardId), {
        businessName: businessName,
        googleReviewUrl: reviewLink, 
        isActivated: true,
        activatedAt: new Date().toLocaleString("id-ID")
      }, { merge: true });

      alert("Kartu berhasil diaktifkan!");
      
      // Langsung tes lempar ke link ulasan setelah berhasil save
      window.location.href = reviewLink;
      
    } catch (error) {
      console.error("Gagal menyimpan:", error);
      alert("Gagal mengaktifkan kartu. Coba lagi.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">BimaReview</h2>
        <p className="mt-2 text-center text-sm text-slate-600">Aktivasi Kartu Cerdas Anda (ID: {cardId})</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10 border border-slate-100">
          <form className="space-y-6" onSubmit={handleActivate}>
            <div>
              <label className="block text-sm font-medium text-slate-700">Nama Bisnis / Toko</label>
              <div className="mt-2 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Store className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-xl focus:ring-accent focus:border-accent sm:text-sm bg-slate-50"
                  placeholder="Contoh: Kedai Kopi Bima"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Link Google Review</label>
              <div className="mt-2 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LinkIcon className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="url"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-xl focus:ring-accent focus:border-accent sm:text-sm bg-slate-50"
                  placeholder="https://g.page/r/..."
                  value={reviewLink}
                  onChange={(e) => setReviewLink(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 transition-all"
            >
              {isSubmitting ? "Menyimpan Data..." : "Aktifkan Kartu Sekarang"} <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}