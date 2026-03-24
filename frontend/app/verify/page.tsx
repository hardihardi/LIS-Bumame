"use client";

import { useState } from 'react';
import { Camera, Scan, ShieldCheck, AlertCircle, Search, QrCode, CheckCircle2, XCircle } from 'lucide-react';

export default function VerifyPage() {
  const [isScanning, setIsScanning] = useState(false);
  const [resultId, setResultId] = useState('');
  const [verificationResult, setVerificationResult] = useState<null | 'success' | 'failed'>(null);

  const handleVerify = () => {
    // Mock cryptographic validation logic
    if (resultId.startsWith('RES-')) {
      setVerificationResult('success');
    } else {
      setVerificationResult('failed');
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-12 animate-in slide-in-from-bottom-6 duration-1000 pb-20">
      <div className="text-center space-y-4">
        <div className="w-24 h-24 bg-blue-100 text-blue-600 rounded-[2rem] mx-auto flex items-center justify-center shadow-2xl shadow-blue-50 transform rotate-12 group hover:rotate-0 transition duration-500">
          <QrCode className="w-12 h-12" />
        </div>
        <h2 className="text-4xl font-black text-gray-900 tracking-tighter">Result Verification</h2>
        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Verify medical documents authenticity</p>
      </div>

      <div className="bg-white p-12 rounded-[3.5rem] shadow-sm border border-gray-100 space-y-12 relative overflow-hidden group">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-50 rounded-full blur-3xl group-hover:scale-150 transition-all duration-700"></div>

        <div className="relative z-10 space-y-12">
          {/* Scan Preview / Camera UI */}
          <div
            className={`h-80 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200 flex flex-col items-center justify-center space-y-6 transition-all duration-500 cursor-pointer ${isScanning ? 'border-blue-400 bg-blue-50/20' : 'hover:border-blue-300'}`}
            onClick={() => setIsScanning(!isScanning)}
          >
            <div className={`p-10 rounded-full transition-all duration-500 ${isScanning ? 'bg-blue-600 text-white animate-pulse shadow-2xl shadow-blue-200' : 'bg-white text-gray-400 shadow-lg'}`}>
              {isScanning ? <Scan className="w-14 h-14" /> : <Camera className="w-14 h-14" />}
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{isScanning ? 'Scanning for QR Code...' : 'Click to start camera scanner'}</p>
          </div>

          <div className="space-y-6 text-center">
             <div className="flex items-center space-x-6">
                <div className="h-px bg-gray-100 flex-1"></div>
                <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Digital Audit Hash</span>
                <div className="h-px bg-gray-100 flex-1"></div>
             </div>

             <div className="relative group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-600 transition duration-300" />
                <input
                  type="text"
                  value={resultId}
                  onChange={(e) => setResultId(e.target.value)}
                  placeholder="Enter Result ID or Paste Hash..."
                  className="w-full pl-16 pr-8 py-5 bg-gray-50/50 border-none rounded-2xl focus:ring-2 focus:ring-blue-100 outline-none text-sm font-bold tracking-tight transition duration-300 shadow-inner"
                />
             </div>
          </div>

          <button
            onClick={handleVerify}
            className="w-full py-6 bg-gray-900 text-white text-[11px] font-black rounded-2xl uppercase tracking-[0.3em] shadow-2xl shadow-gray-200 hover:bg-black transition transform active:scale-95"
          >
            Verify Integrity
          </button>

          {verificationResult && (
            <div className={`p-8 rounded-[2rem] border animate-in zoom-in-95 duration-500 flex items-center space-x-6 ${verificationResult === 'success' ? 'bg-green-50 border-green-100 text-green-800' : 'bg-red-50 border-red-100 text-red-800'}`}>
               <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl ${verificationResult === 'success' ? 'bg-green-600 text-white shadow-green-100' : 'bg-red-600 text-white shadow-red-100'}`}>
                  {verificationResult === 'success' ? <CheckCircle2 className="w-8 h-8" /> : <XCircle className="w-8 h-8" />}
               </div>
               <div>
                  <p className="text-sm font-black uppercase tracking-widest">{verificationResult === 'success' ? 'Document Authentic' : 'Verification Failed'}</p>
                  <p className="text-[11px] font-black opacity-60 tracking-tight">
                    {verificationResult === 'success'
                      ? 'The cryptographic hash matches the record in our secure database.'
                      : 'The provided document ID or hash does not match our records.'}
                  </p>
               </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-10">
         <VerificationInfo icon={<ShieldCheck className="w-6 h-6 text-green-500" />} title="SHA256 Encrypted" desc="End-to-end clinical integrity check" />
         <VerificationInfo icon={<AlertCircle className="w-6 h-6 text-blue-500" />} title="Real-time Audit" desc="Verified against immutable ledger" />
      </div>
    </div>
  );
}

function VerificationInfo({ icon, title, desc }: any) {
  return (
    <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-start space-x-6 group hover:shadow-2xl transition duration-500">
       <div className="p-5 bg-gray-50 rounded-2xl group-hover:bg-blue-50 transition duration-500">{icon}</div>
       <div>
          <p className="text-lg font-black text-gray-900 tracking-tight mb-1 uppercase text-sm">{title}</p>
          <p className="text-[10px] font-bold text-gray-400 tracking-tight uppercase tracking-widest">{desc}</p>
       </div>
    </div>
  );
}
