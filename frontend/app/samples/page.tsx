"use client";

import { useState } from 'react';
import { Beaker, Filter } from 'lucide-react';

export default function SamplesPage() {
  const [samples] = useState([
    { id: 'S-001', patient: 'Ahmad Dahlan', test: 'Hematology', status: 'IN_PROCESS', time: '2024-03-23 09:00' },
    { id: 'S-002', patient: 'Siti Aminah', test: 'Blood Sugar', status: 'REGISTERED', time: '2024-03-23 10:15' },
    { id: 'S-003', patient: 'Budi Santoso', test: 'Liver Function', status: 'COMPLETED', time: '2024-03-22 14:30' },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'REGISTERED': return 'bg-gray-100 text-gray-600';
      case 'COLLECTED': return 'bg-blue-100 text-blue-600';
      case 'IN_PROCESS': return 'bg-orange-100 text-orange-600';
      case 'COMPLETED': return 'bg-green-100 text-green-600';
      case 'VALIDATED': return 'bg-purple-100 text-purple-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Sample Tracking</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition">
          <Beaker className="w-5 h-5" />
          <span>New Sample</span>
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <span>Total: 42</span>
          <span>Pending: 12</span>
          <span>Completed: 30</span>
        </div>
        <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
          <Filter className="w-4 h-4" />
          <span>Filters</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {samples.map((s) => (
          <div key={s.id} className="bg-white p-6 rounded-xl shadow-sm border hover:border-blue-300 transition cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-xs font-bold text-blue-600 tracking-widest uppercase">{s.id}</p>
                <h3 className="text-lg font-bold text-gray-900">{s.patient}</h3>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full font-bold ${getStatusColor(s.status)}`}>
                {s.status}
              </span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Test Type</span>
                <span className="font-medium text-gray-800">{s.test}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Collected At</span>
                <span className="font-medium text-gray-800">{s.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
