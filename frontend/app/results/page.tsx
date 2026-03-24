"use client";

import { useState } from 'react';
import { ShieldCheck, MoreVertical, Search, Filter, AlertTriangle, CheckCircle2, FileText, Share2, Printer, ChevronRight, X, Clock } from 'lucide-react';

export default function BlogPage() {
  const [results] = useState<any[]>([
    { result_id: 'RES-001', sample_id: 'LAB-2024-001', parameter: 'Hemoglobin', value: '11.5', unit: 'g/dL', range: '13.0 - 17.0', flag: 'ABNORMAL', status: 'WAITING_VALIDATION' },
    { result_id: 'RES-002', sample_id: 'LAB-2024-002', parameter: 'Glukosa Sewaktu', value: '145', unit: 'mg/dL', range: '< 200', flag: 'NORMAL', status: 'VALIDATED' },
    { result_id: 'RES-003', sample_id: 'LAB-2024-003', parameter: 'Kolesterol Total', value: '210', unit: 'mg/dL', range: '< 200', flag: 'CRITICAL', status: 'WAITING_VALIDATION' },
    { result_id: 'RES-004', sample_id: 'LAB-2024-004', parameter: 'Asam Urat', value: '6.2', unit: 'mg/dL', range: '3.4 - 7.0', flag: 'NORMAL', status: 'VALIDATED' },
  ]);

  const [selectedResult, setSelectedResult] = useState(results[0]);
  const [showMobileValidation, setShowMobileValidation] = useState(false);

  const handleResultSelect = (r: any) => {
    setSelectedResult(r);
    if (window.innerWidth < 1024) {
      setShowMobileValidation(true);
    }
  };

  return (
    <div className="space-y-12 animate-in slide-in-from-bottom-2 duration-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <h2 className="text-3xl font-black text-gray-900 tracking-tighter">Blog</h2>
        <div className="flex space-x-4 w-full sm:w-auto">
           <button className="bg-white border-2 border-gray-100 text-gray-900 px-8 py-4 rounded-2xl flex items-center justify-center space-x-3 font-black text-xs hover:border-gray-900 transition flex-1 sm:flex-none transform active:scale-95">
             <Printer className="w-4 h-4" />
             <span className="uppercase tracking-[0.2em]">Print</span>
           </button>
           <button className="bg-gray-900 text-white px-8 py-4 rounded-2xl flex items-center justify-center space-x-3 font-black text-xs shadow-2xl shadow-gray-200 hover:bg-black transition flex-1 sm:flex-none transform active:scale-95">
             <Share2 className="w-4 h-4" />
             <span className="uppercase tracking-[0.2em]">Export</span>
           </button>
        </div>
      </div>

      <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-6">
        <div className="relative flex-1 w-full group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-600 transition duration-300" />
          <input
            type="text"
            placeholder="Search blog results..."
            className="w-full pl-16 pr-8 py-5 bg-gray-50/50 border-none rounded-2xl focus:ring-2 focus:ring-blue-100 outline-none text-sm font-bold tracking-tight transition duration-300"
          />
        </div>
        <button className="flex items-center justify-center space-x-3 px-8 py-5 bg-white border border-gray-200 rounded-2xl text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-gray-900 transition duration-300 w-full md:w-auto">
          <Filter className="w-4 h-4" />
          <span>Sort By</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Result List */}
        <div className="space-y-8 overflow-y-auto max-h-[800px] pr-2 scrollbar-hide">
          {results.map((r) => (
            <div
              key={r.result_id}
              onClick={() => handleResultSelect(r)}
              className={`p-10 rounded-[3.5rem] shadow-sm border group transition-all duration-500 cursor-pointer relative overflow-hidden ${selectedResult.result_id === r.result_id ? 'bg-[#D1E9FF] border-blue-200 scale-[1.02] shadow-2xl shadow-blue-100' : 'bg-white border-gray-100 hover:border-blue-200 hover:scale-[1.01]'}`}
            >
              <div className="flex justify-between items-start mb-8 relative z-10">
                <div className="flex items-center space-x-6">
                   <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transform transition-transform duration-500 group-hover:rotate-12 ${selectedResult.result_id === r.result_id ? 'bg-blue-600 text-white shadow-blue-200' : 'bg-gray-100 text-gray-500'}`}>
                      <FileText className="w-7 h-7" />
                   </div>
                   <div>
                      <p className={`text-[9px] font-black uppercase tracking-[0.3em] mb-1 ${selectedResult.result_id === r.result_id ? 'text-blue-800' : 'text-gray-400'}`}>{r.sample_id}</p>
                      <h4 className="text-xl font-black text-gray-900 tracking-tighter uppercase">{r.parameter}</h4>
                   </div>
                </div>
                {r.status === 'VALIDATED' ? <CheckCircle2 className="w-6 h-6 text-green-500" /> : <Clock className="w-6 h-6 text-orange-500 animate-pulse" />}
              </div>

              <div className="flex items-end justify-between relative z-10">
                <div>
                   <p className={`text-[9px] font-black uppercase tracking-[0.2em] mb-2 ${selectedResult.result_id === r.result_id ? 'text-blue-800' : 'text-gray-400'}`}>Clinical Value</p>
                   <div className="flex items-baseline space-x-3">
                      <span className={`text-4xl font-black tracking-tighter transition-colors duration-500 ${r.flag !== 'NORMAL' ? 'text-red-600' : 'text-gray-900'}`}>{r.value}</span>
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{r.unit}</span>
                   </div>
                </div>
                {r.flag !== 'NORMAL' && (
                  <div className="flex items-center space-x-2 px-5 py-2.5 bg-red-100 rounded-xl text-red-600 text-[10px] font-black uppercase tracking-[0.1em] shadow-lg shadow-red-100 border border-red-200">
                     <AlertTriangle className="w-4 h-4" />
                     <span>{r.flag}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Validation View */}
        <div className="hidden lg:block h-full">
           <ValidationPanel selectedResult={selectedResult} />
        </div>
      </div>

      {/* Mobile Validation Sheet */}
      {showMobileValidation && (
        <div className="lg:hidden fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[3.5rem] p-10 space-y-10 animate-in slide-in-from-bottom-full duration-500 shadow-2xl">
             <div className="flex justify-between items-center mb-4">
                <div className="w-16 h-1 bg-gray-200 rounded-full mx-auto absolute top-4 left-1/2 -translate-x-1/2"></div>
                <h3 className="text-xl font-black text-gray-900 tracking-tight">Validation</h3>
                <button onClick={() => setShowMobileValidation(false)} className="p-3 bg-gray-50 rounded-2xl hover:bg-gray-100 transition"><X className="w-5 h-5" /></button>
             </div>
             <div className="max-h-[70vh] overflow-y-auto pr-2 scrollbar-hide">
                <ValidationPanel selectedResult={selectedResult} />
             </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ValidationPanel({ selectedResult }: any) {
  return (
    <div className="bg-white p-12 rounded-[3.5rem] shadow-sm border border-gray-100 h-full flex flex-col justify-between sticky top-32 group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -mr-32 -mt-32 transition-all duration-1000 group-hover:scale-125"></div>

      <div className="relative z-10 space-y-12">
        <div className="flex justify-between items-start">
          <div>
             <h3 className="text-4xl font-black text-gray-900 tracking-tighter mb-2 uppercase">{selectedResult.parameter}</h3>
             <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.4em]">Multi-level Review</p>
          </div>
          <div className="p-5 bg-blue-600 text-white rounded-3xl shadow-xl shadow-blue-100 transform -rotate-6">
             <ShieldCheck className="w-10 h-10" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-12 gap-y-10">
          <ResultDetail label="Result ID" value={selectedResult.result_id} />
          <ResultDetail label="Sample ID" value={selectedResult.sample_id} />
          <ResultDetail label="Range Normal" value={selectedResult.range} />
          <ResultDetail label="Status" value={selectedResult.status} />
        </div>

        <div className="p-12 bg-gray-50/50 rounded-[3rem] border border-gray-100 shadow-inner group/val">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">Verified Value</p>
          <div className="flex items-baseline space-x-6">
             <span className={`text-7xl font-black tracking-tighter transition-all duration-700 ${selectedResult.flag !== 'NORMAL' ? 'text-red-600' : 'text-gray-900'}`}>{selectedResult.value}</span>
             <span className="text-xl font-bold text-gray-400 uppercase tracking-widest">{selectedResult.unit}</span>
          </div>
          {selectedResult.flag !== 'NORMAL' && (
            <div className="mt-10 p-8 bg-white rounded-3xl shadow-xl shadow-red-50 border border-red-50 flex items-center space-x-6 animate-in zoom-in-95 duration-700">
               <div className="w-12 h-12 bg-red-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-red-200">
                  <AlertTriangle className="w-7 h-7" />
               </div>
               <div>
                  <p className="text-sm font-black text-red-800 uppercase tracking-[0.1em] mb-1">Anomaly Detected</p>
                  <p className="text-[11px] font-black text-red-600 tracking-tight">AI Validation: {selectedResult.flag} probability is high.</p>
               </div>
            </div>
          )}
        </div>
      </div>

      <div className="pt-14 grid grid-cols-2 gap-8">
         <button className="py-6 bg-white border-2 border-gray-900 text-gray-900 text-[11px] font-black rounded-[1.5rem] uppercase tracking-[0.3em] hover:bg-gray-900 hover:text-white transition-all duration-500 shadow-sm">Reject</button>
         <button className={`py-6 text-white text-[11px] font-black rounded-[1.5rem] uppercase tracking-[0.3em] shadow-2xl transition-all duration-500 transform active:scale-95 ${selectedResult.status === 'VALIDATED' ? 'bg-green-600 shadow-green-200' : 'bg-blue-600 shadow-blue-200 hover:bg-blue-700'}`}>
            {selectedResult.status === 'VALIDATED' ? 'Validated' : 'Approve & Sign'}
         </button>
      </div>
    </div>
  );
}

function ResultDetail({ label, value }: any) {
  return (
    <div>
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">{label}</p>
      <p className="text-sm font-black text-gray-900 tracking-tight uppercase">{value}</p>
    </div>
  );
}
