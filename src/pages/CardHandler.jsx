import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase"; // Pastikan lokasi file firebase.js Anda benar

export default function CardHandler() {
  const { cardId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const checkCardStatus = async () => {
      if (!cardId) return;

      try {
        const docRef = doc(db, "cards", cardId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          // Cek apakah statusnya aktif DAN link review-nya ada
          if (data.isActivated && data.googleReviewUrl) {
            // Langsung arahkan (redirect) ke Google Review
            window.location.href = data.googleReviewUrl;
          } else {
            // Ada di database tapi belum aktif
            navigate(`/activate/${cardId}`);
          }
        } else {
          // Belum ada di database sama sekali
          navigate(`/activate/${cardId}`);
        }
      } catch (error) {
        console.error("Error mengecek database:", error);
      }
    };

    checkCardStatus();
  }, [cardId, navigate]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-slate-50">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-accent"></div>
      <p className="mt-4 text-sm font-medium text-slate-600 animate-pulse">
        Memproses BimaReview...
      </p>
    </div>
  );
}