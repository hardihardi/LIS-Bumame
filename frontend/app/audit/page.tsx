"use client";

import { useState } from 'react';
import { History, Search, Filter, Shield, User, Clock, ChevronRight } from 'lucide-react';

export default function AuditPage() {
  const [logs] = useState<any[]>([
    { log_id: 'LOG-001', user: 'Admin Felix', action: 'CREATE_PATIENT', entity: 'Patient', entity_id: '32123456...', timestamp: '2024-03-24 14:30:12' },
    { log_id: 'LOG-002', user: 'Analyst Siti', action: 'INPUT_RESULT', entity: 'Result', entity_id: 'RES-001', timestamp: '2024-03-24 14:45:05' },
    { log_id: 'LOG-003', user: 'Validator Budi', action: 'VALIDATE_RESULT', entity: 'Result', entity_id: 'RES-001', timestamp: '2024-03-24 15:00:22' },
    { log_id: 'LOG-004', user: 'Admin Felix', action: 'UPDATE_USER', entity: 'User', entity_id: 'Petugas Ahmad', timestamp: '2024-03-24 15:15:45' },
  ]);

  return (
    <div className="space-y-12 animate-in slide-in-from-bottom-2 duration-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
           <h2 className="text-3xl font-black text-gray-900 tracking-tighter mb-1">Audit Trail</h2>
           <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Immutable System Activity Logs</p>
        </div>
        <div className="p-4 bg-white rounded-3xl shadow-sm border border-gray-100 flex items-center space-x-4">
           <Shield className="w-6 h-6 text-green-500" />
           <p className="text-xs font-black text-gray-900 uppercase tracking-widest">Integrity Verified</p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-6">
        <div className="relative flex-1 w-full group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-600 transition duration-300" />
          <input
            type="text"
            placeholder="Search logs by user, action or ID..."
            className="w-full pl-16 pr-8 py-5 bg-gray-50/50 border-none rounded-2xl focus:ring-2 focus:ring-blue-100 outline-none text-sm font-bold tracking-tight transition duration-300"
          />
        </div>
        <button className="flex items-center justify-center space-x-3 px-8 py-5 bg-white border border-gray-200 rounded-2xl text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-gray-900 transition duration-300 w-full md:w-auto">
          <Filter className="w-4 h-4" />
          <span>Filter Logs</span>
        </button>
      </div>

      <div className="bg-white rounded-[3.5rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/30 border-b border-gray-100">
                <th className="p-10 text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">Timestamp</th>
                <th className="p-10 text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">User</th>
                <th className="p-10 text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">Action</th>
                <th className="p-10 text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">Entity</th>
                <th className="p-10"></th>
              </tr>
            </thead>
            <tbody>
              {logs.map((l) => (
                <tr key={l.log_id} className="border-b border-gray-50 hover:bg-gray-50/20 group transition duration-300">
                  <td className="p-10">
                     <div className="flex items-center space-x-4">
                        <Clock className="w-4 h-4 text-gray-300" />
                        <span className="text-xs font-black text-gray-600 tracking-tight">{l.timestamp}</span>
                     </div>
                  </td>
                  <td className="p-10">
                     <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center border border-white shadow-sm group-hover:bg-blue-600 group-hover:text-white transition duration-500">
                           <User className="w-5 h-5" />
                        </div>
                        <p className="font-black text-gray-900 tracking-tight text-sm uppercase">{l.user}</p>
                     </div>
                  </td>
                  <td className="p-10">
                     <span className="text-[10px] font-black px-4 py-2 bg-gray-100 text-gray-600 rounded-lg tracking-widest uppercase group-hover:bg-gray-900 group-hover:text-white transition duration-500 shadow-sm border border-white">
                       {l.action}
                     </span>
                  </td>
                  <td className="p-10">
                     <p className="font-black text-gray-700 text-xs tracking-widest uppercase">{l.entity}</p>
                     <p className="text-[10px] text-gray-400 font-bold tracking-tighter">{l.entity_id}</p>
                  </td>
                  <td className="p-10 text-right">
                     <button className="p-4 bg-gray-50 text-gray-400 rounded-2xl hover:bg-gray-900 hover:text-white transition-all duration-300 shadow-sm">
                        <ChevronRight className="w-5 h-5" />
                     </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
