"use client";

import { useState } from 'react';
import { CheckCircle, AlertCircle, FileText, QrCode, ShieldCheck, UserCheck, Search, Filter } from 'lucide-react';

export default function ResultsPage() {
  const [results] = useState([
    { id: 'R-101', patient: 'Siti Aminah', test: 'Glucose Fasting', value: '110', unit: 'mg/dL', range: '70-100', status: 'CRITICAL', validator: '-', time: '2024-03-23 10:45' },
    { id: 'R-102', patient: 'Ahmad Dahlan', test: 'Hemoglobin', value: '14.2', unit: 'g/dL', range: '13.5-17.5', status: 'VALIDATED', validator: 'Dr. Sarah', time: '2024-03-23 09:30' },
    { id: 'R-103', patient: 'Budi Santoso', test: 'Cholesterol', value: '190', unit: 'mg/dL', range: '<200', status: 'COMPLETED', validator: '-', time: '2024-03-22 15:00' },
  ]);

  return (
    <div className="space-y-8 animate-in zoom-in-95 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight uppercase">Result Validation</h2>
          <p className="text-gray-500 italic">Critical value oversight and digital verification.</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-white border-2 border-gray-100 text-gray-400 px-6 py-4 rounded-2xl flex items-center space-x-3 font-bold text-xs shadow-sm hover:text-blue-600 hover:border-blue-100 transition">
            <QrCode className="w-5 h-5" />
            <span className="uppercase tracking-widest">Verify QR</span>
          </button>
          <button className="bg-blue-600 text-white px-6 py-4 rounded-2xl flex items-center space-x-3 font-bold text-xs shadow-xl shadow-blue-200 hover:bg-blue-700 transition">
            <ShieldCheck className="w-5 h-5" />
            <span className="uppercase tracking-widest">Bulk Validate</span>
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-sm border flex flex-col lg:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input type="text" placeholder="Search Result ID, Patient, or Validator..." className="w-full pl-11 pr-4 py-3 bg-gray-50 border-none rounded-2xl text-xs font-bold" />
        </div>
        <div className="flex space-x-2 w-full lg:w-auto">
          <button className="flex-1 lg:flex-none py-3 px-6 bg-white border border-gray-200 rounded-2xl text-[10px] font-black text-gray-500 uppercase tracking-widest hover:text-blue-600 transition">Pending (12)</button>
          <button className="flex-1 lg:flex-none py-3 px-6 bg-blue-50 border border-blue-100 rounded-2xl text-[10px] font-black text-blue-600 uppercase tracking-widest">Validated (154)</button>
          <button className="p-3 bg-white border border-gray-200 rounded-2xl text-gray-400 hover:text-blue-600 transition"><Filter className="w-4 h-4" /></button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {results.map((r) => (
          <div key={r.id} className={`bg-white rounded-[2.5rem] shadow-sm border overflow-hidden transition-all hover:shadow-xl ${r.status === 'CRITICAL' ? 'border-red-200 ring-4 ring-red-50' : 'border-gray-100'}`}>
            <div className="flex flex-col lg:flex-row">
              <div className={`p-8 lg:w-1/3 flex flex-col justify-between ${r.status === 'CRITICAL' ? 'bg-red-50' : 'bg-gray-50'}`}>
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <p className="text-[10px] font-black text-gray-400 tracking-widest uppercase font-mono">{r.id}</p>
                    {r.status === 'CRITICAL' && <span className="text-[8px] font-black bg-red-600 text-white px-2 py-0.5 rounded-full uppercase tracking-tighter animate-pulse">Critical</span>}
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 leading-tight">{r.patient}</h3>
                  <p className="text-sm font-bold text-gray-500 mt-2 uppercase tracking-widest">{r.test}</p>
                </div>
                <div className="mt-8 flex items-center space-x-2 text-gray-400">
                  <FileText className="w-4 h-4" />
                  <p className="text-[10px] font-bold uppercase tracking-widest">{r.time}</p>
                </div>
              </div>

              <div className="p-8 lg:w-2/3 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                  <div>
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Value</p>
                    <p className={`text-3xl font-black ${r.status === 'CRITICAL' ? 'text-red-600' : 'text-gray-900'}`}>{r.value}</p>
                    <p className="text-[10px] text-gray-500 font-bold uppercase">{r.unit}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Ref. Range</p>
                    <p className="text-lg font-bold text-gray-800 tracking-widest">{r.range}</p>
                    <p className="text-[10px] text-gray-500 font-bold uppercase">{r.unit}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Validator</p>
                    <div className="flex items-center space-x-2">
                      <UserCheck className={`w-4 h-4 ${r.validator !== '-' ? 'text-green-500' : 'text-gray-300'}`} />
                      <p className="text-sm font-bold text-gray-800">{r.validator}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="flex-1 sm:flex-none py-4 px-8 bg-gray-100 rounded-2xl text-xs font-black text-gray-600 uppercase tracking-widest hover:bg-gray-200 transition">Review</button>
                  <button className={`flex-1 sm:flex-none py-4 px-8 rounded-2xl text-xs font-black text-white uppercase tracking-widest transition shadow-lg ${r.status === 'VALIDATED' ? 'bg-green-500 shadow-green-100 hover:bg-green-600' : 'bg-blue-600 shadow-blue-100 hover:bg-blue-700'}`}>
                    {r.status === 'VALIDATED' ? 'View PDF' : 'Validate'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
