"use client";

import { useState, useEffect } from 'react';
import { patientsApi } from '@/lib/api';
import { UserPlus, Search, Filter, MoreVertical, Edit2, Trash2, Eye } from 'lucide-react';

export default function PatientsPage() {
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const res = await patientsApi.list();
      setPatients(res.data || []);
    } catch (err) {
      console.error(err);
      // Fallback for demo
      setPatients([
        { patient_id: 'uuid-1', nama_lengkap: 'Siti Aminah', nomor_identitas: '321234567890001', jenis_kelamin: 'Female', tanggal_lahir: '1985-05-15' },
        { patient_id: 'uuid-2', nama_lengkap: 'Ahmad Dahlan', nomor_identitas: '321234567890002', jenis_kelamin: 'Male', tanggal_lahir: '1990-10-20' },
        { patient_id: 'uuid-3', nama_lengkap: 'Budi Santoso', nomor_identitas: '321234567890003', jenis_kelamin: 'Male', tanggal_lahir: '1975-02-10' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Patient Management</h2>
          <p className="text-gray-500">Manage patient electronic health records.</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-2xl flex items-center space-x-3 font-bold text-sm shadow-lg shadow-blue-200 hover:bg-blue-700 hover:scale-[1.02] transition active:scale-[0.98]">
          <UserPlus className="w-5 h-5" />
          <span className="uppercase tracking-widest">Register Patient</span>
        </button>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by NIK, Name, or Patient ID..."
            className="w-full pl-12 pr-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none text-sm transition font-medium"
          />
        </div>
        <div className="flex space-x-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center space-x-2 px-6 py-4 bg-white border border-gray-200 rounded-2xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition">
            <Filter className="w-4 h-4" />
            <span className="uppercase tracking-widest">Filters</span>
          </button>
        </div>
      </div>

      {/* Desktop view */}
      <div className="hidden lg:block bg-white rounded-3xl shadow-sm border overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Patient</th>
              <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Identification</th>
              <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Gender</th>
              <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Birth Date</th>
              <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="p-12 text-center text-gray-400 font-bold uppercase tracking-widest text-xs">Loading patients...</td></tr>
            ) : patients.length === 0 ? (
              <tr><td colSpan={5} className="p-12 text-center text-gray-400 font-bold uppercase tracking-widest text-xs">No patients found.</td></tr>
            ) : (
              patients.map((p) => (
                <tr key={p.patient_id} className="border-b hover:bg-gray-50 group transition">
                  <td className="p-6">
                    <div>
                      <p className="font-bold text-gray-900 group-hover:text-blue-600 transition">{p.nama_lengkap}</p>
                      <p className="text-[10px] text-gray-400 font-bold tracking-tighter uppercase font-mono">{p.patient_id.substring(0, 13)}</p>
                    </div>
                  </td>
                  <td className="p-6 font-bold text-gray-700 text-sm tracking-widest">{p.nomor_identitas}</td>
                  <td className="p-6">
                    <span className={`text-[10px] font-black px-3 py-1.5 rounded-full tracking-widest uppercase ${p.jenis_kelamin === 'Female' ? 'bg-pink-50 text-pink-600' : 'bg-blue-50 text-blue-600'}`}>
                      {p.jenis_kelamin}
                    </span>
                  </td>
                  <td className="p-6 font-bold text-gray-700 text-sm uppercase">{p.tanggal_lahir}</td>
                  <td className="p-6">
                    <div className="flex justify-end space-x-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 transition hover:bg-blue-50 rounded-lg"><Eye className="w-4 h-4" /></button>
                      <button className="p-2 text-gray-400 hover:text-orange-600 transition hover:bg-orange-50 rounded-lg"><Edit2 className="w-4 h-4" /></button>
                      <button className="p-2 text-gray-400 hover:text-red-600 transition hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile view */}
      <div className="lg:hidden space-y-4">
        {patients.map((p) => (
          <div key={p.patient_id} className="bg-white p-6 rounded-3xl shadow-sm border space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-lg font-black text-gray-900">{p.nama_lengkap}</p>
                <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase font-mono mt-0.5">{p.patient_id.substring(0, 13)}</p>
              </div>
              <button className="p-2 text-gray-400 bg-gray-50 rounded-xl"><MoreVertical className="w-5 h-5" /></button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">NIK</p>
                <p className="text-xs font-bold text-gray-900 tracking-widest">{p.nomor_identitas}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Gender</p>
                <span className={`text-[9px] font-black px-2 py-1 rounded-full tracking-widest uppercase ${p.jenis_kelamin === 'Female' ? 'bg-pink-50 text-pink-600' : 'bg-blue-50 text-blue-600'}`}>
                  {p.jenis_kelamin}
                </span>
              </div>
            </div>

            <div className="pt-6 border-t flex space-x-3">
              <button className="flex-1 py-3 bg-gray-50 rounded-2xl text-[10px] font-black text-gray-600 uppercase tracking-widest hover:bg-blue-50 hover:text-blue-600 transition">View EHR</button>
              <button className="flex-1 py-3 bg-blue-600 rounded-2xl text-[10px] font-black text-white uppercase tracking-widest shadow-lg shadow-blue-100 hover:bg-blue-700 transition">Order Test</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
