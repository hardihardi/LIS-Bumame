"use client";

import {
  TrendingUp,
  TrendingDown,
  MoreHorizontal,
  ChevronRight,
  Beaker,
  Activity,
  Users,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Plus
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="space-y-12 animate-in slide-in-from-bottom-2 duration-700 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
           <h2 className="text-3xl font-black text-gray-900 tracking-tighter mb-1">Hi, Welcome back 👋</h2>
           <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Lab Dashboard Overview</p>
        </div>
        <div className="flex items-center space-x-4 p-4 bg-white rounded-3xl shadow-sm border border-gray-100 group cursor-pointer hover:shadow-lg transition">
           <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition duration-500">
              <Activity className="w-5 h-5" />
           </div>
           <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest group-hover:text-gray-900 transition">Performance</p>
              <p className="text-xs font-black text-gray-900 group-hover:text-blue-600 transition tracking-tighter">+24.5% vs Last Mo</p>
           </div>
           <ArrowUpRight className="w-5 h-5 text-gray-400 ml-4 group-hover:text-blue-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition duration-500" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard
          title="Weekly Sales"
          value="714k"
          trend="+2.6%"
          up={true}
          bg="bg-[#D0F2FF]"
          textColor="text-[#04297A]"
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
        />
        <StatCard
          title="New Users"
          value="1.35m"
          trend="-0.1%"
          up={false}
          bg="bg-[#E9FCD4]"
          textColor="text-[#229A16]"
          iconBg="bg-green-100"
          iconColor="text-green-600"
        />
        <StatCard
          title="Purchase Orders"
          value="1.72m"
          trend="+2.8%"
          up={true}
          bg="bg-[#FFF7CD]"
          textColor="text-[#7A4F01]"
          iconBg="bg-yellow-100"
          iconColor="text-yellow-600"
        />
        <StatCard
          title="Messages"
          value="234"
          trend="+3.6%"
          up={true}
          bg="bg-[#FFE7D9]"
          textColor="text-[#7A0C2E]"
          iconBg="bg-red-100"
          iconColor="text-red-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 transition-all duration-700 group-hover:scale-150"></div>

          <div className="relative z-10 space-y-12">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-black text-gray-900 tracking-tight">Current visits</h3>
              <MoreHorizontal className="w-5 h-5 text-gray-400 cursor-pointer" />
            </div>

            <div className="flex justify-center overflow-x-auto scrollbar-hide">
              <div className="relative w-64 h-64 flex-shrink-0">
                 <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#F4F6F8" strokeWidth="12" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#2065D1" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="50.2" className="transition-all duration-1000" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#FFC107" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="200.9" className="transition-all duration-1000" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#FF4842" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="150.7" className="transition-all duration-1000" />
                 </svg>
                 <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <p className="text-4xl font-black text-gray-900 tracking-tighter">78%</p>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Occupancy</p>
                 </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-12 gap-y-6 pt-6 border-t border-dashed border-gray-100">
               <LegendItem label="America" value="38,566" color="bg-blue-600" />
               <LegendItem label="Asia" value="18,476" color="bg-yellow-400" />
               <LegendItem label="Europe" value="12,345" color="bg-purple-600" />
               <LegendItem label="Africa" value="8,900" color="bg-orange-500" />
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 relative overflow-hidden group">
           <div className="relative z-10">
              <div className="flex justify-between items-center mb-12">
                 <div>
                    <h3 className="text-xl font-black text-gray-900 tracking-tight mb-1">Website visits</h3>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">(+43%) than last year</p>
                 </div>
                 <div className="flex space-x-2">
                    <div className="w-10 h-10 bg-gray-50 text-gray-400 rounded-xl flex items-center justify-center cursor-pointer hover:bg-gray-900 hover:text-white transition"><Activity className="w-5 h-5" /></div>
                 </div>
              </div>

              <div className="flex items-end justify-between space-x-4 h-80 pb-6 px-4 overflow-x-auto scrollbar-hide">
                 <Bar height="30%" label="Jan" />
                 <Bar height="55%" label="Feb" />
                 <Bar height="85%" label="Mar" />
                 <Bar height="45%" label="Apr" />
                 <Bar height="70%" label="May" />
                 <Bar height="60%" label="Jun" />
                 <Bar height="95%" label="Jul" />
                 <Bar height="65%" label="Aug" />
                 <Bar height="50%" label="Sep" />
              </div>

              <div className="flex justify-center space-x-12 pt-8 border-t border-dashed border-gray-100">
                 <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-[#2065D1] rounded-full shadow-lg shadow-blue-200"></div>
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Team A</span>
                 </div>
                 <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-[#D1E9FF] rounded-full"></div>
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Team B</span>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 space-y-10">
            <div className="flex justify-between items-center">
               <h3 className="text-xl font-black text-gray-900 tracking-tight uppercase tracking-widest text-sm">Conversion Rates</h3>
               <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:translate-x-1 transition flex items-center">View Full Report <ChevronRight className="w-4 h-4" /></button>
            </div>
            <div className="space-y-8">
               <ProgressItem label="Italy" value={75} color="bg-blue-600" />
               <ProgressItem label="Japan" value={60} color="bg-yellow-400" />
               <ProgressItem label="China" value={90} color="bg-purple-600" />
               <ProgressItem label="Canada" value={45} color="bg-orange-500" />
               <ProgressItem label="France" value={80} color="bg-teal-500" />
            </div>
         </div>

         <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 space-y-10">
            <h3 className="text-xl font-black text-gray-900 tracking-tight uppercase tracking-widest text-sm">Traffic Summary</h3>
            <div className="space-y-6">
               <TrafficItem label="Direct" value="23,456" icon={<Activity className="w-4 h-4 text-blue-600" />} bg="bg-blue-50" />
               <TrafficItem label="Search Engine" value="18,476" icon={<Users className="w-4 h-4 text-green-600" />} bg="bg-green-50" />
               <TrafficItem label="Social Media" value="12,345" icon={<ArrowUpRight className="w-4 h-4 text-purple-600" />} bg="bg-purple-50" />
               <TrafficItem label="Referral" value="8,900" icon={<Activity className="w-4 h-4 text-orange-600" />} bg="bg-orange-50" />
            </div>
         </div>
      </div>

      {/* Floating Action Button - Mobile Only */}
      <button className="fixed bottom-10 right-10 lg:hidden w-16 h-16 bg-gray-900 text-white rounded-full flex items-center justify-center shadow-2xl z-[50] transform active:scale-90 transition shadow-black/20">
         <Plus className="w-8 h-8" />
      </button>
    </div>
  );
}

function StatCard({ title, value, trend, up, bg, textColor, iconBg, iconColor }: any) {
  return (
    <div className={`${bg} ${textColor} p-10 rounded-[3rem] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 relative overflow-hidden group`}>
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/20 rounded-full blur-3xl group-hover:scale-150 transition-all duration-1000"></div>

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-10">
          <div className={`${iconBg} p-5 rounded-[1.5rem] shadow-md border border-white/20`}>
            <div className={`${iconColor} w-6 h-6`}>
              <Beaker />
            </div>
          </div>
          <div className="flex items-center space-x-1 font-black text-[11px] tracking-tight bg-white/20 px-3 py-1.5 rounded-full">
             {up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
             <span>{trend}</span>
          </div>
        </div>

        <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-2">{title}</p>
        <p className="text-4xl font-black tracking-tighter">{value}</p>

        <div className="mt-10 flex justify-end h-12 space-x-1.5 items-end">
           <div className="w-2 h-4 bg-white/20 rounded-full group-hover:h-8 transition-all duration-700"></div>
           <div className="w-2 h-8 bg-white/40 rounded-full group-hover:h-12 transition-all duration-1000 delay-100"></div>
           <div className="w-2 h-5 bg-white/30 rounded-full group-hover:h-6 transition-all duration-700 delay-200"></div>
           <div className="w-2 h-10 bg-white/60 rounded-full group-hover:h-4 transition-all duration-1000 delay-300"></div>
           <div className="w-2 h-6 bg-white/40 rounded-full group-hover:h-10 transition-all duration-700 delay-400"></div>
        </div>
      </div>
    </div>
  );
}

function LegendItem({ label, value, color }: any) {
  return (
    <div className="flex items-center space-x-4">
      <div className={`w-3.5 h-3.5 ${color} rounded-full shadow-lg shadow-gray-100`}></div>
      <div>
         <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-0.5">{label}</p>
         <p className="text-sm font-black text-gray-900 tracking-tight uppercase">{value}</p>
      </div>
    </div>
  );
}

function Bar({ height, label }: any) {
  return (
    <div className="flex flex-col items-center flex-1 space-y-6 group h-full flex-shrink-0 min-w-[60px]">
      <div className="w-full flex justify-center space-x-1.5 h-full items-end pb-2">
         <div
           className="w-2 md:w-4 bg-[#2065D1] rounded-full transition-all duration-1000 hover:brightness-110 shadow-xl shadow-blue-100"
           style={{ height }}
         ></div>
         <div
           className="w-2 md:w-4 bg-[#D1E9FF] rounded-full transition-all duration-1000 hover:brightness-110"
           style={{ height: `calc(${height} * 0.7)` }}
         ></div>
      </div>
      <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] group-hover:text-gray-900 transition duration-300">{label}</span>
    </div>
  );
}

function ProgressItem({ label, value, color }: any) {
  return (
    <div className="space-y-3 group">
      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-500 group-hover:text-gray-900 transition">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-4 bg-gray-50 rounded-full overflow-hidden border border-gray-100 p-0.5">
        <div
          className={`h-full ${color} rounded-full shadow-lg transition-all duration-1000 group-hover:brightness-110`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
}

function TrafficItem({ label, value, icon, bg }: any) {
   return (
      <div className="flex items-center justify-between p-6 rounded-[2rem] border border-gray-50 bg-white hover:bg-gray-50 hover:border-blue-100 transition-all duration-300 group">
         <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 ${bg} rounded-2xl flex items-center justify-center transition group-hover:rotate-12`}>{icon}</div>
            <div>
               <p className="text-xs font-black text-gray-900 tracking-tight">{label}</p>
               <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Active Source</p>
            </div>
         </div>
         <div className="text-right">
            <p className="text-sm font-black text-gray-900 tracking-tighter">{value}</p>
            <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest">Growth +5%</p>
         </div>
      </div>
   );
}
