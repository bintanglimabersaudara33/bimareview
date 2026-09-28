import { useState, useRef } from "react";
import { ShieldCheck, Download, PlusCircle, QrCode } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";

export default function AdminGenerator() {
  const [cardData, setCardData] = useState(null);
  const qrRef = useRef(null);

  const handleGenerate = () => {
    // Generate ID Unik (Contoh: K9X2P1)
    const newUniqueId = Math.random().toString(36).substring(2, 8).toUpperCase();
    const generatedUrl = `${window.location.origin}/card/${newUniqueId}`;
    
    setCardData({ id: newUniqueId, url: generatedUrl });
  };

  const downloadQR = () => {
    const canvas = qrRef.current.querySelector("canvas");
    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = url;
    link.download = `QR-Kosong-${cardData.id}.png`;
    link.click();
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        <div className="bg-primary px-8 py-10 text-center relative overflow-hidden">
          
          {/* Bagian Logo */}
          <div className="mx-auto w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center mb-4 p-2">
            <img 
              src="/logo.png" 
              alt="BimaReview Logo" 
              className="w-full h-full object-contain" 
            />
          </div>

          <h1 className="text-2xl font-bold text-white tracking-wide">BimaReview</h1>
          <p className="text-slate-300 text-sm mt-2">Aktivasi Kartu Bisnis Anda</p>
        </div>
        <div className="p-8 text-center">
          {cardData ? (
            <div className="animate-fade-in">
              <h2 className="text-lg font-bold text-slate-800 mb-4">QR Code Siap Cetak!</h2>
              
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col items-center justify-center mb-6" ref={qrRef}>
                <div className="bg-white p-3 rounded-xl shadow-sm mb-4">
                  <QRCodeCanvas value={cardData.url} size={160} level={"H"} fgColor={"#0f172a"} />
                </div>
                <p className="text-xs font-mono text-slate-400">ID: {cardData.id}</p>
              </div>

              <div className="space-y-3">
                <button onClick={downloadQR} className="w-full flex items-center justify-center bg-accent hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-all shadow-md">
                  <Download className="w-5 h-5 mr-2" /> Unduh QR Kosong
                </button>
                <button onClick={() => setCardData(null)} className="w-full flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 px-4 rounded-xl transition-colors">
                  <PlusCircle className="w-5 h-5 mr-2" /> Buat Kartu Baru Lagi
                </button>
              </div>
            </div>
          ) : (
            <div className="py-6">
              <QrCode className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 mb-6 text-sm px-4">Generate QR Code dengan link aktivasi unik untuk diberikan ke klien Anda.</p>
              <button onClick={handleGenerate} className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3.5 px-4 rounded-xl transition-all shadow-md">
                Generate QR Code Kosong
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}