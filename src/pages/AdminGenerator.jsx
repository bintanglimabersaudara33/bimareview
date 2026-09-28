import { useState, useRef } from "react";
import { QrCode, Download, RefreshCw, ShieldCheck, Sparkles, Store } from "lucide-react";

export default function AdminGenerator() {
  const [generatedCards, setGeneratedCards] = useState([]);
  const cardRef = useRef({}); // Untuk merekam elemen desain yang ingin didownload

  // Fungsi membuat ID unik acak (gabungan huruf & angka, misal: BM-K8X9P)
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

    const newCard = {
      id: newId,
      link: cardLink,
      createdAt: new Date().toLocaleTimeString(),
    };

    setGeneratedCards([newCard, ...generatedCards]);
  };

  // Fungsi simulasi unduh desain akrilik
  // (Menggunakan trik canvas/print area atau info unduh gambar QR HD siap cetak)
  const handleDownloadAcrylicDesign = (cardId) => {
    alert(`Desain Akrilik untuk kartu ${cardId} siap dicetak! Anda bisa melakukan screenshot area desain atau menyimpannya untuk keperluan cetak UV.`);
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Admin */}
        <div className="bg-primary rounded-3xl p-8 text-white shadow-xl mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck className="w-5 h-5 text-accent" />
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Panel Administrator</span>
            </div>
            <h1 className="text-2xl font-bold">BimaReview Acrylic & NFC Generator</h1>
            <p className="text-slate-300 text-sm mt-1">Generate ID unik lengkap dengan desain cetak akrilik siap produksi.</p>
          </div>
          <button
            onClick={handleGenerateNewCard}
            className="flex items-center gap-2 bg-accent hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-2xl shadow-lg transition-all transform active:scale-95"
          >
            <RefreshCw className="w-5 h-5" />
            Buat Desain Akrilik Baru
          </button>
        </div>

        {/* Daftar Desain Akrilik yang Telah Di-generate */}
        <div className="space-y-6">
          {generatedCards.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm">
              <QrCode className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-700">Belum ada desain akrilik</h3>
              <p className="text-slate-400 text-sm mt-1 mb-6">Klik tombol di atas untuk membuat template akrilik meja pertama Anda.</p>
              <button
                onClick={handleGenerateNewCard}
                className="bg-slate-900 text-white font-semibold py-2.5 px-6 rounded-xl text-sm transition-all hover:bg-slate-800"
              >
                Generate Sekarang
              </button>
            </div>
          ) : (
            generatedCards.map((card) => (
              <div key={card.id} className="bg-white rounded-3xl p-6 md:p-8 shadow-md border border-slate-200 flex flex-col lg:flex-row items-center justify-between gap-8">
                
                {/* PREVIEW VISUAL AKRILIK MEJA (MOCKUP) */}
                <div className="w-full max-w-[280px] bg-slate-900 rounded-3xl p-6 text-center text-white shadow-2xl relative overflow-hidden border-4 border-slate-800 shrink-0">
                  
                  {/* Efek Kilau Akrilik */}
                  <div className="absolute top-0 right-0 -mr-12 -mt-12 w-32 h-32 rounded-full bg-white opacity-10 blur-xl"></div>
                  
                  {/* Logo di Akrilik */}
                  <div className="mx-auto w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center mb-3 p-1.5">
                    <img 
                      src="/logo.jpg" 
                      alt="Logo" 
                      className="w-full h-full object-contain rounded-lg"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  </div>

                  <h4 className="font-bold text-lg tracking-tight text-white">BimaReview</h4>
                  <p className="text-[11px] text-slate-400 mb-4">Scan / Tap untuk Ulasan</p>

                  {/* QR Code Tersemat di Dalam Desain */}
                  <div className="bg-white p-3 rounded-2xl shadow-inner inline-block mb-4">
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=130x130&data=${encodeURIComponent(card.link)}`} 
                      alt={`QR Code ${card.id}`}
                      className="w-32 h-32 rounded-lg"
                    />
                  </div>

                  <div className="bg-slate-800 py-1.5 px-3 rounded-xl border border-slate-700 inline-block">
                    <p className="text-[10px] text-slate-300 font-mono tracking-wider">ID: {card.id}</p>
                  </div>
                </div>

                {/* DETAIL INFORMASI & AKSI ADMIN */}
                <div className="flex-1 space-y-4 w-full text-center lg:text-left">
                  <div>
                    <span className="bg-blue-50 text-accent font-semibold text-xs px-3 py-1 rounded-full inline-flex items-center gap-1 mb-2">
                      <Sparkles className="w-3 h-3" /> Template Akrilik Siap Cetak (UV Print)
                    </span>
                    <h3 className="text-xl font-bold text-slate-800">Kartu/Akrilik ID: {card.id}</h3>
                    <p className="text-sm text-slate-500 mt-1">
                      Desain akrilik meja ini sudah menyatukan QR Code dan chip NFC dengan link unik di bawah ini.
                    </p>
                  </div>

                  {/* Kotak Link untuk NFC */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                    <p className="text-xs font-semibold text-slate-600 mb-1">Link URL untuk diprogram ke Chip NFC:</p>
                    <code className="text-xs text-accent font-mono block bg-white p-2.5 rounded-xl border border-slate-200 truncate select-all">
                      {card.link}
                    </code>
                  </div>

                  {/* Tombol Aksi */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(card.link);
                        alert(`Link ${card.link} berhasil disalin untuk NFC Tools!`);
                      }}
                      className="flex-1 bg-primary hover:bg-slate-800 text-white font-semibold py-3 px-5 rounded-xl text-sm transition-all shadow"
                    >
                      Salin Link untuk NFC
                    </button>
                    
                    <button
                      onClick={() => handleDownloadAcrylicDesign(card.id)}
                      className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-3 px-5 rounded-xl text-sm transition-colors border border-slate-200"
                    >
                      <Download className="w-4 h-4" /> Info Cetak Akrilik
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