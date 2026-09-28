import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function CardHandler() {
  const { cardId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const checkCardStatus = async () => {
      try {
        const docRef = doc(db, "cards", cardId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists() && docSnap.data().isActivated) {
          // JIKA SUDAH AKTIF, LANGSUNG BUKA LINK GOOGLE REVIEW
          window.location.href = docSnap.data().googleReviewUrl;
        } else {
          // JIKA KOSONG / BELUM AKTIF, MASUK KE FORM AKTIVASI
          navigate(`/activate/${cardId}`);
        }
      } catch (error) {
        console.error("Gagal mengecek database:", error);
        navigate(`/activate/${cardId}`);
      }
    };

    checkCardStatus();
  }, [cardId, navigate]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50">
      <Loader2 className="h-10 w-10 animate-spin text-accent" />
      <p className="mt-4 text-sm font-medium text-slate-500 animate-pulse">Menghubungkan ke Ulasan...</p>
    </div>
  );
}