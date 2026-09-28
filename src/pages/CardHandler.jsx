import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase"; // Pastikan path ini benar sesuai file firebase.js Anda

export default function CardHandler() {
  const { cardId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const checkDatabase = async () => {
      try {
        const docRef = doc(db, "cards", cardId);
        const docSnap = await getDoc(docRef);

        // Jika dokumen ditemukan di Firebase dan status isActivated-nya true
        if (docSnap.exists() && docSnap.data().isActivated) {
          window.location.href = docSnap.data().googleReviewUrl;
        } else {
          // Jika tidak ada di database (artinya kartu masih kosong)
          navigate(`/activate/${cardId}`);
        }
      } catch (error) {
        console.error("Gagal mengecek kartu:", error);
        navigate(`/activate/${cardId}`); // Lempar ke form jika error
      }
    };

    checkDatabase();
  }, [cardId, navigate]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50">
      <Loader2 className="h-10 w-10 animate-spin text-accent" />
      <p className="mt-4 text-sm font-medium text-slate-500 animate-pulse">Menghubungkan ke BimaReview...</p>
    </div>
  );
}