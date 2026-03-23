"use client";

import { useState } from 'react';
import { Activity, Users, Beaker, CheckCircle } from 'lucide-react';

export default function Dashboard() {
  const [stats] = useState({
    totalPatients: 124,
    activeSamples: 42,
    completedToday: 18,
    criticalValues: 3,
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Laboratory Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Patients" value={stats.totalPatients} icon={<Users className="w-6 h-6 text-blue-500" />} />
        <StatCard title="Active Samples" value={stats.activeSamples} icon={<Activity className="w-6 h-6 text-orange-500" />} />
        <StatCard title="Completed Today" value={stats.completedToday} icon={<CheckCircle className="w-6 h-6 text-green-500" />} />
        <StatCard title="Critical Values" value={stats.criticalValues} icon={<Beaker className="w-6 h-6 text-red-500" />} />
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <p className="text-gray-500 italic">No recent activity to display.</p>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }: { title: string, value: number, icon: React.ReactNode }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border flex items-center space-x-4">
      <div className="bg-gray-50 p-3 rounded-lg">{icon}</div>
      <div>
        <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}
