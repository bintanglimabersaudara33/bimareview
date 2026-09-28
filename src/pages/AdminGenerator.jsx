import { useState } from "react";
import { QrCode, Download, RefreshCw, ShieldCheck, Sparkles, Copy } from "lucide-react";
import html2canvas from "html2canvas";
import cardTemplate from "../assets/template.png"; // Import gambar desain Anda

export default function AdminGenerator() {
  const [generatedCards, setGeneratedCards] = useState([]);
  const [isDownloading, setIsDownloading] = useState(false);

  // Membuat ID unik acak (Contoh: BM-K7X9P2)
  const generateUniqueId = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; 
    let randomString = "";
    for (let i = 0; i < 6; i++) {
      randomString += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `BM-${randomString}`;
  };

  const handleGenerateNewCard = () => {
    const newId = generateUniqueId();
    const baseUrl = window.location.origin; 
    const cardLink = `${baseUrl}/card/${newId}`;

    const newCard = { id: newId, link: cardLink };
    setGeneratedCards([newCard, ...generatedCards]);
  };

  // Fungsi untuk mengunduh desain akrilik beserta QR code menjadi satu gambar siap cetak
  const handleDownloadAcrylicDesign = async (cardId) => {
    setIsDownloading(true);
    const element = document.getElementById(`acrylic-template-${cardId}`);
    
    if (element) {
      try {
        const canvas = await html2canvas(element, {
          scale: 4, // Resolusi tinggi (High-Res) agar tajam saat dicetak
          useCORS: true,
          backgroundColor: null,
        });
        
        const image = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.href = image;
        downloadLink.download = `SiapCetak-Akrilik-${cardId}.png`;
        downloadLink.click();
      } catch (error) {
        console.error("Gagal mendownload:", error);
        alert("Gagal mengunduh gambar desain.");
      }
    }
    setIsDownloading(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Panel Admin */}
        <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck className="w-5 h-5 text-blue-500" />
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Panel Administrator</span>
            </div>
            <h1 className="text-2xl font-bold">Generator Desain Akrilik BimaReview</h1>
            <p className="text-slate-300 text-sm mt-1">Buat ID unik dan unduh template akrilik asli siap cetak.</p>
          </div>
          <button 
            onClick={handleGenerateNewCard} 
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-2xl shadow-lg transition-all"
          >
            <RefreshCw className="w-5 h-5" /> Generate Desain Baru
          </button>
        </div>

        {/* List Kartu yang di-generate */}
        <div className="space-y-6">
          {generatedCards.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm">
              <QrCode className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-700">Belum ada desain akrilik dibuat</h3>
              <p className="text-slate-400 text-sm mt-1 mb-6">Klik tombol di atas untuk mulai membuat template akrilik dengan desain asli Anda.</p>
            </div>
          ) : (
            generatedCards.map((card) => (
              <div key={card.id} className="bg-white rounded-3xl p-6 md:p-8 shadow-md border border-slate-200 flex flex-col lg:flex-row items-center justify-between gap-8">
               
                {/* PREVIEW TEMPLATE MENGGUNAKAN GAMBAR ASLI ANDA */}
<div 
  id={`acrylic-template-${card.id}`}
  className="w-[320px] h-[420px] relative rounded-2xl overflow-hidden shadow-2xl shrink-0"
>
  {/* 1. LATAR BELAKANG: Pakai tag <img> murni agar hasil download SANGAT TAJAM (Tidak Pecah) */}
  <img 
    src={cardTemplate} 
    alt="Template Akrilik" 
    crossOrigin="anonymous"
    className="absolute inset-0 w-full h-full object-fill z-0"
  />

 {/* AREA QR CODE: Dikecilkan agar masuk persis ke dalam border hitam bawaan desain */}
  <div 
    className="absolute z-10 bg-white flex items-center justify-center"
    style={{
      top: "33.5%", // Posisi sedikit diturunkan agar pas di tengah border hitam
      left: "50%",
      transform: "translateX(-50%)", 
      width: "140px",  // <--- Ukuran dikecilkan agar muat di dalam border
      height: "140px", // <--- Pastikan angkanya sama dengan width
    }}
  >
    <img 
      src={`https://api.qrserver.com/v1/create-qr-code/?size=400x400&margin=0&data=${encodeURIComponent(card.link)}`} 
      alt="QR Code"
      crossOrigin="anonymous"
      // Ukuran gambar QR mengisi 95% dari kotak putih agar tidak terlalu mepet
      className="w-[95%] h-[95%] object-contain" 
    />
  </div>
  </div>

                {/* Informasi & Tombol Aksi Admin */}
                <div className="flex-1 space-y-4 w-full text-center lg:text-left">
                  <div>
                    <span className="bg-blue-50 text-blue-600 font-semibold text-xs px-3 py-1 rounded-full inline-flex items-center gap-1 mb-2">
                      <Sparkles className="w-3 h-3" /> Siap Cetak (HD)
                    </span>
                    <h3 className="text-xl font-bold text-slate-800">Akrilik ID: {card.id}</h3>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                    <p className="text-xs font-semibold text-slate-600 mb-1">Link URL NFC Bawaan:</p>
                    <code className="text-xs text-blue-600 font-mono block bg-white p-2.5 rounded-xl border border-slate-200 truncate select-all">
                      {card.link}
                    </code>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button 
                      onClick={() => { navigator.clipboard.writeText(card.link); alert('Link berhasil disalin!'); }} 
                      className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-5 rounded-xl text-sm transition-all shadow"
                    >
                      <Copy className="w-4 h-4" /> Salin Link
                    </button>
                    
                    <button 
                      onClick={() => handleDownloadAcrylicDesign(card.id)} 
                      disabled={isDownloading}
                      className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-5 rounded-xl text-sm transition-colors shadow"
                    >
                      <Download className="w-4 h-4" /> {isDownloading ? 'Memproses HD...' : 'Unduh Gambar Siap Cetak'}
                    </button>
                  </div>
                </div>

              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}