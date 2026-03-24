"use client";

import { useState, useEffect } from 'react';
import { UserPlus, Search, Filter, MoreVertical, Edit2, Trash2, Eye, ShieldCheck, UserCheck } from 'lucide-react';

export default function UserPage() {
  const [patients, setPatients] = useState<any[]>([
    { patient_id: '321234567890001', nama_lengkap: 'Siti Aminah', email: 'siti.aminah@example.com', role: 'Analis', is_verified: true, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Siti' },
    { patient_id: '321234567890002', nama_lengkap: 'Ahmad Dahlan', email: 'ahmad.dahlan@example.com', role: 'Petugas', is_verified: true, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmad' },
    { patient_id: '321234567890003', nama_lengkap: 'Budi Santoso', email: 'budi.santoso@example.com', role: 'Dokter', is_verified: false, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Budi' },
    { patient_id: '321234567890004', nama_lengkap: 'Dewi Sartika', email: 'dewi.sartika@example.com', role: 'Admin', is_verified: true, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dewi' },
  ]);

  return (
    <div className="space-y-10 animate-in slide-in-from-bottom-2 duration-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <h2 className="text-2xl font-black text-gray-900 tracking-tight">User</h2>
        <button className="bg-gray-900 text-white px-8 py-3 rounded-xl flex items-center space-x-3 font-bold text-xs shadow-xl shadow-gray-200 hover:bg-black transition active:scale-95">
          <UserPlus className="w-5 h-5" />
          <span className="uppercase tracking-widest">New User</span>
        </button>
      </div>

      <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 w-full group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-600 transition" />
          <input
            type="text"
            placeholder="Search user..."
            className="w-full pl-14 pr-8 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-100 outline-none text-sm font-bold tracking-tight transition"
          />
        </div>
        <button className="flex items-center justify-center space-x-2 px-6 py-4 bg-white border border-gray-200 rounded-2xl text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-gray-900 hover:border-gray-900 transition">
          <Filter className="w-4 h-4" />
          <span>Filters</span>
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="p-8 text-[11px] font-black uppercase tracking-widest text-gray-400">Name</th>
              <th className="p-8 text-[11px] font-black uppercase tracking-widest text-gray-400">Company</th>
              <th className="p-8 text-[11px] font-black uppercase tracking-widest text-gray-400">Role</th>
              <th className="p-8 text-[11px] font-black uppercase tracking-widest text-gray-400">Verified</th>
              <th className="p-8 text-[11px] font-black uppercase tracking-widest text-gray-400">Status</th>
              <th className="p-8"></th>
            </tr>
          </thead>
          <tbody>
            {patients.map((u) => (
              <tr key={u.patient_id} className="border-b border-gray-50 hover:bg-gray-50/50 group transition">
                <td className="p-8">
                  <div className="flex items-center space-x-6">
                    <div className="w-12 h-12 bg-gray-100 rounded-full overflow-hidden shadow-sm border border-white">
                      <img src={u.avatar} alt="Avatar" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 group-hover:text-blue-600 transition">{u.nama_lengkap}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className="p-8 font-bold text-gray-700 text-sm tracking-tight uppercase">Leader Laboratory</td>
                <td className="p-8 font-bold text-gray-700 text-sm tracking-tight uppercase">{u.role}</td>
                <td className="p-8">
                  {u.is_verified ? (
                    <UserCheck className="w-5 h-5 text-green-500 bg-green-50 p-1 rounded-full" />
                  ) : (
                    <ShieldCheck className="w-5 h-5 text-gray-300 bg-gray-50 p-1 rounded-full" />
                  )}
                </td>
                <td className="p-8">
                  <span className={`text-[10px] font-black px-4 py-2 rounded-lg tracking-widest uppercase ${u.is_verified ? 'bg-green-100 text-[#229A16]' : 'bg-red-100 text-[#7A0C2E]'}`}>
                    {u.is_verified ? 'Active' : 'Banned'}
                  </span>
                </td>
                <td className="p-8">
                   <button className="p-3 text-gray-400 hover:text-gray-900 transition rounded-xl hover:bg-gray-100"><MoreVertical className="w-5 h-5" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center px-4">
         <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Page 1 of 10</p>
         <div className="flex space-x-2">
            <button className="p-3 border border-gray-200 rounded-xl text-gray-400 hover:text-gray-900 hover:border-gray-900 transition"><ChevronLeftIcon className="w-4 h-4" /></button>
            <button className="p-3 border border-gray-200 rounded-xl text-gray-400 hover:text-gray-900 hover:border-gray-900 transition"><ChevronRightIcon className="w-4 h-4" /></button>
         </div>
      </div>
    </div>
  );
}

function ChevronLeftIcon({ className }: any) {
  return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>;
}

function ChevronRightIcon({ className }: any) {
  return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>;
}
