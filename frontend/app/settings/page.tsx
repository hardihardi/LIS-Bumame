"use client";

import { useState } from 'react';
import { Settings, Globe, Shield, Bell, Database, Cloud, Save, CheckCircle2 } from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
     setSaved(true);
     setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in slide-in-from-bottom-2 duration-700 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
           <h2 className="text-3xl font-black text-gray-900 tracking-tighter mb-1">Settings</h2>
           <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Global System Configuration</p>
        </div>
        <button
          onClick={handleSave}
          className="bg-gray-900 text-white px-8 py-4 rounded-[1.5rem] flex items-center space-x-3 font-black text-xs shadow-2xl shadow-gray-200 hover:bg-black transition transform active:scale-95 w-full sm:w-auto justify-center"
        >
          {saved ? <CheckCircle2 className="w-5 h-5" /> : <Save className="w-5 h-5" />}
          <span className="uppercase tracking-[0.2em]">{saved ? 'Configuration Saved' : 'Save Changes'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
         {/* Navigation */}
         <div className="lg:col-span-1 space-y-2">
            <TabLink icon={<Globe className="w-5 h-5" />} label="General" active={activeTab === 'general'} onClick={() => setActiveTab('general')} />
            <TabLink icon={<Shield className="w-5 h-5" />} label="Security" active={activeTab === 'security'} onClick={() => setActiveTab('security')} />
            <TabLink icon={<Bell className="w-5 h-5" />} label="Notifications" active={activeTab === 'notifications'} onClick={() => setActiveTab('notifications')} />
            <TabLink icon={<Database className="w-5 h-5" />} label="Data & Backup" active={activeTab === 'data'} onClick={() => setActiveTab('data')} />
            <TabLink icon={<Cloud className="w-5 h-5" />} label="Integrations" active={activeTab === 'integrations'} onClick={() => setActiveTab('integrations')} />
         </div>

         {/* Content Area */}
         <div className="lg:col-span-3">
            <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 space-y-12 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -mr-32 -mt-32 transition-all duration-1000 group-hover:scale-110"></div>

               <div className="relative z-10">
                  {activeTab === 'general' && (
                    <div className="space-y-10">
                       <h3 className="text-xl font-black text-gray-900 tracking-tight mb-8 uppercase text-sm">General Information</h3>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <InputGroup label="Application Name" placeholder="LIS Core System" />
                          <InputGroup label="Company Name" placeholder="BioHealth Laboratories" />
                          <InputGroup label="System Language" placeholder="English (US)" />
                          <InputGroup label="Timezone" placeholder="UTC +07:00" />
                       </div>
                       <div className="pt-6">
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Platform Logo</p>
                          <div className="w-32 h-32 bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200 flex items-center justify-center group/logo cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition duration-500">
                             <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-xl italic shadow-xl shadow-blue-100">M</div>
                          </div>
                       </div>
                    </div>
                  )}

                  {activeTab === 'data' && (
                    <div className="space-y-10">
                       <h3 className="text-xl font-black text-gray-900 tracking-tight mb-8 uppercase text-sm">Backup & Disaster Recovery</h3>
                       <div className="p-8 bg-blue-50 rounded-3xl border border-blue-100 space-y-6">
                          <div className="flex items-center justify-between">
                             <div>
                                <p className="text-sm font-black text-blue-900 tracking-tight">Automated Cloud Backups</p>
                                <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Last backup: 2 hours ago</p>
                             </div>
                             <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-200"></div>
                          </div>
                          <button className="w-full py-4 bg-blue-600 text-white text-[10px] font-black rounded-2xl uppercase tracking-widest shadow-xl shadow-blue-200 hover:bg-blue-700 transition">Execute Manual Backup</button>
                       </div>

                       <div className="space-y-6 pt-6">
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Retention Policy</p>
                          <select className="w-full p-5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-100 outline-none text-sm font-bold tracking-tight appearance-none">
                             <option>Store logs for 90 days</option>
                             <option>Store logs for 1 year</option>
                             <option>Store logs indefinitely</option>
                          </select>
                       </div>
                    </div>
                  )}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}

function TabLink({ icon, label, active, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-6 py-5 rounded-[1.5rem] transition-all duration-300 group ${active ? 'bg-[#D1E9FF] text-[#061B64] shadow-lg shadow-blue-100' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
    >
      <div className="flex items-center space-x-5">
        <span className={`${active ? 'text-[#2065D1]' : 'text-gray-400 group-hover:text-gray-900'} transition duration-500`}>{icon}</span>
        <span className="text-sm font-black tracking-tight">{label}</span>
      </div>
      {active && <div className="w-1.5 h-1.5 bg-[#2065D1] rounded-full"></div>}
    </button>
  );
}

function InputGroup({ label, placeholder }: any) {
   return (
      <div className="space-y-3 group">
         <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest group-focus-within:text-blue-600 transition">{label}</label>
         <input
           type="text"
           placeholder={placeholder}
           className="w-full p-5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-100 outline-none text-sm font-bold tracking-tight transition duration-300 shadow-inner"
         />
      </div>
   );
}
