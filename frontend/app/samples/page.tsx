"use client";

import { useState } from 'react';
import { Beaker, Filter, Calendar, MapPin, Search, CheckCircle } from 'lucide-react';

export default function SamplesPage() {
  const [samples] = useState([
    { id: 'S-2024-001', patient: 'Ahmad Dahlan', test: 'Hematology', status: 'IN_PROCESS', time: '2024-03-23 09:00', location: 'Lab Room A' },
    { id: 'S-2024-002', patient: 'Siti Aminah', test: 'HbA1c / Glucose', status: 'REGISTERED', time: '2024-03-23 10:15', location: 'Sampling Desk 1' },
    { id: 'S-2024-003', patient: 'Budi Santoso', test: 'Liver Function Panel', status: 'COMPLETED', time: '2024-03-22 14:30', location: 'Lab Room B' },
    { id: 'S-2024-004', patient: 'Dewi Sartika', test: 'Cholesterol Profile', status: 'COLLECTED', time: '2024-03-23 11:45', location: 'Sampling Desk 2' },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'REGISTERED': return 'bg-gray-100 text-gray-600 border-gray-200';
      case 'COLLECTED': return 'bg-blue-100 text-blue-600 border-blue-200';
      case 'IN_PROCESS': return 'bg-orange-100 text-orange-600 border-orange-200';
      case 'COMPLETED': return 'bg-green-100 text-green-600 border-green-200';
      case 'VALIDATED': return 'bg-purple-100 text-purple-600 border-purple-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight uppercase">Sample Tracking</h2>
          <p className="text-gray-500">End-to-end laboratory specimen lifecycle.</p>
        </div>
        <button className="bg-blue-600 text-white px-8 py-4 rounded-2xl flex items-center space-x-3 font-bold text-sm shadow-xl shadow-blue-200 hover:bg-blue-700 transition">
          <Beaker className="w-5 h-5" />
          <span className="uppercase tracking-widest">New Specimen</span>
        </button>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-sm border grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input type="text" placeholder="Search Sample ID..." className="w-full pl-11 pr-4 py-3 bg-gray-50 border-none rounded-2xl text-xs font-bold" />
        </div>
        <div className="flex items-center space-x-3 bg-blue-50 p-4 rounded-2xl border border-blue-100">
          <Beaker className="w-5 h-5 text-blue-600" />
          <div>
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">In Process</p>
            <p className="text-lg font-black text-blue-700">12 Samples</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 bg-green-50 p-4 rounded-2xl border border-green-100">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <div>
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Ready</p>
            <p className="text-lg font-black text-green-700">30 Samples</p>
          </div>
        </div>
        <button className="flex items-center justify-center space-x-2 px-6 py-4 bg-white border-2 border-dashed border-gray-200 rounded-2xl text-[10px] font-black text-gray-400 uppercase tracking-widest hover:border-blue-400 hover:text-blue-500 transition">
          <Filter className="w-4 h-4" />
          <span>Advanced Filter</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {samples.map((s) => (
          <div key={s.id} className="bg-white rounded-[2rem] shadow-sm border border-transparent hover:border-blue-300 transition-all hover:shadow-xl hover:-translate-y-1 group overflow-hidden">
            <div className="p-8 space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] font-black text-blue-600 tracking-widest uppercase font-mono">{s.id}</p>
                  <h3 className="text-xl font-black text-gray-900 mt-1 leading-tight group-hover:text-blue-700 transition">{s.patient}</h3>
                </div>
                <span className={`text-[9px] px-3 py-1.5 rounded-full font-black border uppercase tracking-widest ${getStatusColor(s.status)}`}>
                  {s.status}
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-gray-500">
                  <Beaker className="w-4 h-4 flex-shrink-0" />
                  <p className="text-xs font-bold text-gray-800 uppercase tracking-tight">{s.test}</p>
                </div>
                <div className="flex items-center space-x-3 text-gray-500">
                  <Calendar className="w-4 h-4 flex-shrink-0" />
                  <p className="text-xs font-bold text-gray-600">{s.time}</p>
                </div>
                <div className="flex items-center space-x-3 text-gray-500">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <p className="text-xs font-bold text-gray-600">{s.location}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 border-t flex space-x-2">
              <button className="flex-1 py-3 bg-white border border-gray-200 rounded-2xl text-[9px] font-black text-gray-500 uppercase tracking-widest hover:text-blue-600 hover:border-blue-200 transition">Print Label</button>
              <button className="flex-1 py-3 bg-blue-600 rounded-2xl text-[9px] font-black text-white uppercase tracking-widest hover:bg-blue-700 transition shadow-lg shadow-blue-100">Process</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
