"use client";

import { useState, useEffect } from 'react';
import { patientsApi } from '@/lib/api';
import { UserPlus, Search } from 'lucide-react';

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Patient Management</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition">
          <UserPlus className="w-5 h-5" />
          <span>Register Patient</span>
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by NIK, Name, or Patient ID..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-semibold text-gray-600">Patient ID</th>
              <th className="p-4 font-semibold text-gray-600">Full Name</th>
              <th className="p-4 font-semibold text-gray-600">NIK</th>
              <th className="p-4 font-semibold text-gray-600">Gender</th>
              <th className="p-4 font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="p-8 text-center text-gray-500">Loading patients...</td></tr>
            ) : patients.length === 0 ? (
              <tr><td colSpan={5} className="p-8 text-center text-gray-500">No patients found.</td></tr>
            ) : (
              patients.map((p) => (
                <tr key={p.patient_id} className="border-b hover:bg-gray-50">
                  <td className="p-4 text-sm font-mono text-gray-500">{p.patient_id.substring(0, 8)}...</td>
                  <td className="p-4 font-medium text-gray-900">{p.nama_lengkap}</td>
                  <td className="p-4 text-gray-600">{p.nomor_identitas}</td>
                  <td className="p-4 text-gray-600">{p.jenis_kelamin}</td>
                  <td className="p-4 text-blue-600 hover:underline cursor-pointer">View Details</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
