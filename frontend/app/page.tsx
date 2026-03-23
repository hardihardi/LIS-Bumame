"use client";

import { useState } from 'react';
import { Activity, Users, Beaker, CheckCircle, AlertTriangle, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  const [stats] = useState({
    totalPatients: 124,
    activeSamples: 42,
    completedToday: 18,
    criticalValues: 3,
  });

  const recentActivity = [
    { time: '10:45 AM', user: 'Analis A', action: 'Input hasil Hematologi', patient: 'Siti Aminah' },
    { time: '10:30 AM', user: 'Petugas B', action: 'Registrasi Sampel', patient: 'Ahmad Dahlan' },
    { time: '09:15 AM', user: 'Dokter C', action: 'Validasi Hasil Gula Darah', patient: 'Budi Santoso' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">System Overview</h2>
          <p className="text-gray-500">Real-time laboratory operations monitoring.</p>
        </div>
        <div className="flex bg-white p-1 rounded-lg border shadow-sm">
          <button className="px-4 py-1.5 text-xs font-bold bg-blue-600 text-white rounded-md shadow-sm">Today</button>
          <button className="px-4 py-1.5 text-xs font-bold text-gray-500 hover:bg-gray-50">Week</button>
          <button className="px-4 py-1.5 text-xs font-bold text-gray-500 hover:bg-gray-50">Month</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Patients" value={stats.totalPatients} icon={<Users className="w-6 h-6 text-blue-500" />} trend="+12% from yesterday" />
        <StatCard title="Active Samples" value={stats.activeSamples} icon={<Activity className="w-6 h-6 text-orange-500" />} trend="Current load: High" />
        <StatCard title="Completed Today" value={stats.completedToday} icon={<CheckCircle className="w-6 h-6 text-green-500" />} trend="Avg TAT: 45m" />
        <StatCard title="Critical Values" value={stats.criticalValues} icon={<Beaker className="w-6 h-6 text-red-500" />} trend="Alerts active" highlight />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900">Throughput Analysis</h3>
            <TrendingUp className="text-gray-400 w-5 h-5" />
          </div>
          <div className="h-64 bg-gray-50 rounded-xl flex items-center justify-center border border-dashed">
            <p className="text-gray-400 text-sm">Throughput visualization will appear here.</p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h3>
          <div className="space-y-6">
            {recentActivity.map((act, i) => (
              <div key={i} className="flex space-x-4">
                <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-blue-500 shadow-sm shadow-blue-200"></div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{act.action}</p>
                  <p className="text-xs text-gray-500">{act.patient} • {act.user}</p>
                  <p className="text-[10px] text-gray-400 uppercase font-bold mt-1 tracking-wider">{act.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 text-xs font-bold text-blue-600 hover:bg-blue-50 rounded-xl transition uppercase tracking-widest">View Full Audit Log</button>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, trend, highlight }: { title: string, value: number, icon: React.ReactNode, trend?: string, highlight?: boolean }) {
  return (
    <div className={`p-6 rounded-2xl shadow-sm border transition hover:shadow-md ${highlight ? 'bg-red-50 border-red-100' : 'bg-white'}`}>
      <div className="flex justify-between items-start mb-4">
        <div className="bg-white p-3 rounded-xl shadow-sm border flex items-center justify-center">{icon}</div>
        {highlight && <AlertTriangle className="w-5 h-5 text-red-500 animate-pulse" />}
      </div>
      <div>
        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">{title}</p>
        <p className={`text-3xl font-black ${highlight ? 'text-red-600' : 'text-gray-900'}`}>{value}</p>
        {trend && <p className="text-[10px] text-gray-500 font-bold mt-2 uppercase tracking-tight">{trend}</p>}
      </div>
    </div>
  );
}
