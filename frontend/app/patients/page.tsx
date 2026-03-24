"use client";

import { useState } from 'react';
import { UserPlus, Search, Filter, MoreVertical, ShieldCheck, UserCheck, ChevronLeft, ChevronRight, Edit2, Trash2, Eye } from 'lucide-react';

export default function UserPage() {
  const [patients] = useState<any[]>([
    { patient_id: '321234567890001', nama_lengkap: 'Siti Aminah', email: 'siti.aminah@example.com', role: 'Analis', is_verified: true, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Siti' },
    { patient_id: '321234567890002', nama_lengkap: 'Ahmad Dahlan', email: 'ahmad.dahlan@example.com', role: 'Petugas', is_verified: true, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmad' },
    { patient_id: '321234567890003', nama_lengkap: 'Budi Santoso', email: 'budi.santoso@example.com', role: 'Dokter', is_verified: false, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Budi' },
    { patient_id: '321234567890004', nama_lengkap: 'Dewi Sartika', email: 'dewi.sartika@example.com', role: 'Admin', is_verified: true, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dewi' },
  ]);

  return (
    <div className="space-y-12 animate-in slide-in-from-bottom-2 duration-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <h2 className="text-3xl font-black text-gray-900 tracking-tighter">User</h2>
        <button className="bg-gray-900 text-white px-8 py-4 rounded-[1.5rem] flex items-center space-x-3 font-black text-xs shadow-2xl shadow-gray-200 hover:bg-black transition transform active:scale-95">
          <UserPlus className="w-5 h-5" />
          <span className="uppercase tracking-[0.2em]">New User</span>
        </button>
      </div>

      <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-6">
        <div className="relative flex-1 w-full group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-600 transition duration-300" />
          <input
            type="text"
            placeholder="Search user..."
            className="w-full pl-16 pr-8 py-5 bg-gray-50/50 border-none rounded-2xl focus:ring-2 focus:ring-blue-100 outline-none text-sm font-bold tracking-tight transition duration-300"
          />
        </div>
        <button className="flex items-center justify-center space-x-3 px-8 py-5 bg-white border border-gray-200 rounded-2xl text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-gray-900 hover:border-gray-900 transition duration-300 w-full md:w-auto">
          <Filter className="w-4 h-4" />
          <span>Filters</span>
        </button>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block bg-white rounded-[3.5rem] shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/30 border-b border-gray-100">
              <th className="p-10 text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">Name</th>
              <th className="p-10 text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">Company</th>
              <th className="p-10 text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">Role</th>
              <th className="p-10 text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">Verified</th>
              <th className="p-10 text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">Status</th>
              <th className="p-10"></th>
            </tr>
          </thead>
          <tbody>
            {patients.map((u) => (
              <tr key={u.patient_id} className="border-b border-gray-50 hover:bg-gray-50/20 group transition duration-300">
                <td className="p-10">
                  <div className="flex items-center space-x-6">
                    <div className="w-14 h-14 bg-gray-100 rounded-full overflow-hidden shadow-2xl shadow-gray-200 border-2 border-white group-hover:scale-110 transition duration-500">
                      <img src={u.avatar} alt="Avatar" />
                    </div>
                    <div>
                      <p className="font-black text-gray-900 group-hover:text-blue-600 transition tracking-tight">{u.nama_lengkap}</p>
                      <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.1em]">{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className="p-10 font-black text-gray-700 text-xs tracking-[0.1em] uppercase">Leader Laboratory</td>
                <td className="p-10 font-black text-gray-700 text-xs tracking-[0.1em] uppercase">{u.role}</td>
                <td className="p-10">
                  {u.is_verified ? (
                    <UserCheck className="w-6 h-6 text-green-500 bg-green-50 p-1.5 rounded-full shadow-sm" />
                  ) : (
                    <ShieldCheck className="w-6 h-6 text-gray-300 bg-gray-50 p-1.5 rounded-full" />
                  )}
                </td>
                <td className="p-10">
                  <span className={`text-[10px] font-black px-5 py-2.5 rounded-xl tracking-[0.1em] uppercase shadow-sm ${u.is_verified ? 'bg-green-100 text-[#229A16]' : 'bg-red-100 text-[#7A0C2E]'}`}>
                    {u.is_verified ? 'Active' : 'Banned'}
                  </span>
                </td>
                <td className="p-10">
                   <button className="p-4 text-gray-400 hover:text-gray-900 transition rounded-2xl hover:bg-gray-100 duration-300"><MoreVertical className="w-5 h-5" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card-based UI with Quick Actions */}
      <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-8">
        {patients.map((u) => (
          <div key={u.patient_id} className="bg-white p-8 rounded-[3rem] shadow-sm border border-gray-100 space-y-8 group hover:shadow-2xl transition duration-500 relative overflow-hidden">
            <div className="flex justify-between items-start relative z-10">
              <div className="flex items-center space-x-6">
                <div className="w-16 h-16 bg-gray-100 rounded-full overflow-hidden border-4 border-white shadow-2xl shadow-gray-200 group-hover:scale-110 transition duration-500">
                  <img src={u.avatar} alt="Avatar" />
                </div>
                <div>
                  <p className="font-black text-gray-900 tracking-tight">{u.nama_lengkap}</p>
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{u.email}</p>
                </div>
              </div>
              <button className="p-2 text-gray-400 group-hover:text-gray-900 transition"><MoreVertical className="w-5 h-5" /></button>
            </div>

            <div className="relative z-10 grid grid-cols-2 gap-6 pt-8 border-t border-dashed border-gray-100">
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Role</p>
                <p className="text-xs font-black text-gray-800 uppercase tracking-tight">{u.role}</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Status</p>
                <span className={`text-[9px] font-black px-4 py-1.5 rounded-lg tracking-widest uppercase ${u.is_verified ? 'bg-green-100 text-[#229A16]' : 'bg-red-100 text-[#7A0C2E]'}`}>
                  {u.is_verified ? 'Active' : 'Banned'}
                </span>
              </div>
            </div>

            <div className="relative z-10 flex space-x-3 pt-4">
               <button className="flex-1 py-4 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition duration-500 group/btn">
                  <Edit2 className="w-4 h-4 group-hover/btn:scale-110 transition" />
               </button>
               <button className="flex-1 py-4 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center text-gray-600 hover:bg-gray-900 hover:text-white transition duration-500 group/btn">
                  <Eye className="w-4 h-4 group-hover/btn:scale-110 transition" />
               </button>
               <button className="flex-1 py-4 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center text-red-600 hover:bg-red-600 hover:text-white transition duration-500 group/btn">
                  <Trash2 className="w-4 h-4 group-hover/btn:scale-110 transition" />
               </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center px-6 pt-8">
         <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Page 1 of 10</p>
         <div className="flex space-x-3">
            <button className="p-4 border border-gray-100 rounded-2xl text-gray-400 hover:text-gray-900 transition shadow-sm"><ChevronLeft className="w-5 h-5" /></button>
            <button className="p-4 border border-gray-100 rounded-2xl text-gray-400 hover:text-gray-900 transition shadow-sm"><ChevronRight className="w-5 h-5" /></button>
         </div>
      </div>
    </div>
  );
}
