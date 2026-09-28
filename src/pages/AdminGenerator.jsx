import { useState } from "react";
import { QrCode, Download, RefreshCw, ShieldCheck, Sparkles } from "lucide-react";
import html2canvas from "html2canvas";

export default function AdminGenerator() {
  const [generatedCards, setGeneratedCards] = useState([]);
  const [isDownloading, setIsDownloading] = useState(false);

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

    const newCard = { id: newId, link: cardLink, createdAt: new Date().toLocaleTimeString() };
    setGeneratedCards([newCard, ...generatedCards]);
  };

  // FUNGSI UNTUK MENGUNDUH DESAIN MENJADI FILE PNG
  const handleDownloadAcrylicDesign = async (cardId) => {
    setIsDownloading(true);
    const element = document.getElementById(`print-area-${cardId}`);
    
    if (element) {
      try {
        const canvas = await html2canvas(element, {
          scale: 3, // Skala 3x lipat agar resolusi gambar sangat jernih (HD) saat dicetak
          useCORS: true, // Wajib agar gambar QR Code dari luar bisa ikut ter-render
          backgroundColor: "#0f172a", // Warna background dasar (Slate 900)
        });
        
        const image = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.href = image;
        downloadLink.download = `BimaReview-Design-${cardId}.png`;
        downloadLink.click();
      } catch (error) {
        console.error("Gagal mendownload desain:", error);
        alert("Gagal mengunduh gambar. Pastikan koneksi internet stabil.");
      }
    }
    setIsDownloading(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        
        <div className="bg-primary rounded-3xl p-8 text-white shadow-xl mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck className="w-5 h-5 text-accent" />
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Panel Administrator</span>
            </div>
            <h1 className="text-2xl font-bold">BimaReview Acrylic & NFC Generator</h1>
            <p className="text-slate-300 text-sm mt-1">Generate ID unik lengkap dengan unduhan gambar siap cetak.</p>
          </div>
          <button onClick={handleGenerateNewCard} className="flex items-center gap-2 bg-accent hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-2xl shadow-lg transition-all">
            <RefreshCw className="w-5 h-5" /> Buat Desain Akrilik Baru
          </button>
        </div>

        <div className="space-y-6">
          {generatedCards.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm">
              <QrCode className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-700">Belum ada desain akrilik</h3>
              <p className="text-slate-400 text-sm mt-1 mb-6">Klik tombol di atas untuk membuat template pertama Anda.</p>
            </div>
          ) : (
            generatedCards.map((card) => (
              <div key={card.id} className="bg-white rounded-3xl p-6 md:p-8 shadow-md border border-slate-200 flex flex-col lg:flex-row items-center justify-between gap-8">
                
                {/* AREA YANG AKAN DIDOWNLOAD (DIBERI ID KHUSUS) */}
                <div 
                  id={`print-area-${card.id}`}
                  className="w-[280px] h-[400px] bg-slate-900 rounded-3xl p-6 flex flex-col items-center justify-center text-white shadow-2xl relative overflow-hidden shrink-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 -mt-12 w-32 h-32 rounded-full bg-white opacity-10 blur-xl"></div>
                  
                  <div className="w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center mb-3 p-1.5 z-10">
                    <span className="text-primary font-bold text-xl">BR</span>
                  </div>
                  <h4 className="font-bold text-lg tracking-tight text-white z-10">BimaReview</h4>
                  <p className="text-[11px] text-slate-400 mb-6 z-10">Scan / Tap untuk Ulasan</p>

                  <div className="bg-white p-3 rounded-2xl shadow-inner mb-6 z-10">
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(card.link)}`} 
                      alt="QR"
                      crossOrigin="anonymous" // Wajib ada agar gambar eksternal bisa diunduh
                      className="w-32 h-32"
                    />
                  </div>

                  <div className="bg-slate-800 py-1.5 px-3 rounded-xl border border-slate-700 z-10">
                    <p className="text-[10px] text-slate-300 font-mono tracking-wider">ID: {card.id}</p>
                  </div>
                </div>

                <div className="flex-1 space-y-4 w-full text-center lg:text-left">
                  <div>
                    <span className="bg-blue-50 text-accent font-semibold text-xs px-3 py-1 rounded-full inline-flex items-center gap-1 mb-2">
                      <Sparkles className="w-3 h-3" /> Template Siap Unduh
                    </span>
                    <h3 className="text-xl font-bold text-slate-800">Akrilik ID: {card.id}</h3>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                    <p className="text-xs font-semibold text-slate-600 mb-1">Link untuk NFC Tools:</p>
                    <code className="text-xs text-accent font-mono block bg-white p-2.5 rounded-xl border border-slate-200 truncate select-all">{card.link}</code>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button onClick={() => { navigator.clipboard.writeText(card.link); alert('Tersalin!'); }} className="flex-1 bg-primary hover:bg-slate-800 text-white font-semibold py-3 px-5 rounded-xl text-sm transition-all shadow">
                      Salin Link NFC
                    </button>
                    <button 
                      onClick={() => handleDownloadAcrylicDesign(card.id)} 
                      disabled={isDownloading}
                      className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-5 rounded-xl text-sm transition-colors shadow"
                    >
                      <Download className="w-4 h-4" /> {isDownloading ? 'Memproses...' : 'Unduh Gambar (PNG)'}
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