"use client";

import { useState } from 'react';
import { TrendingUp, TrendingDown, MoreHorizontal } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <h2 className="text-2xl font-black text-gray-900 tracking-tight">Hi, Welcome back 👋</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Weekly sales"
          value="714k"
          trend="+2.6%"
          up={true}
          bg="bg-[#D0F2FF]"
          textColor="text-[#04297A]"
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
        />
        <StatCard
          title="New users"
          value="1.35m"
          trend="-0.1%"
          up={false}
          bg="bg-[#E9FCD4]"
          textColor="text-[#229A16]"
          iconBg="bg-green-100"
          iconColor="text-green-600"
        />
        <StatCard
          title="Purchase orders"
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
        <div className="lg:col-span-1 bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-lg font-black text-gray-900 tracking-tight">Current visits</h3>
            <MoreHorizontal className="w-5 h-5 text-gray-400 cursor-pointer" />
          </div>
          <div className="flex justify-center py-10">
            <div className="relative w-64 h-64 rounded-full border-[18px] border-blue-600 border-l-yellow-400 border-t-purple-600 border-b-orange-500 shadow-inner flex items-center justify-center transform hover:scale-105 transition duration-500 cursor-pointer">
              <div className="text-center">
                <p className="text-3xl font-black text-gray-900">Total</p>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">38,566</p>
              </div>
            </div>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4">
             <LegendItem label="America" color="bg-blue-600" />
             <LegendItem label="Asia" color="bg-yellow-400" />
             <LegendItem label="Europe" color="bg-purple-600" />
             <LegendItem label="Africa" color="bg-orange-500" />
          </div>
        </div>

        <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300">
           <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-black text-gray-900 tracking-tight">Website visits</h3>
              <MoreHorizontal className="w-5 h-5 text-gray-400 cursor-pointer" />
           </div>
           <p className="text-sm font-bold text-gray-400 mb-10 tracking-tight">(+43%) than last year</p>

           <div className="flex items-end justify-between space-x-2 h-72 pb-6 px-4">
              <Bar height="30%" label="Jan" />
              <Bar height="50%" label="Feb" />
              <Bar height="75%" label="Mar" />
              <Bar height="40%" label="Apr" />
              <Bar height="65%" label="May" />
              <Bar height="55%" label="Jun" />
              <Bar height="85%" label="Jul" />
              <Bar height="60%" label="Aug" />
              <Bar height="45%" label="Sep" />
           </div>

           <div className="flex justify-center space-x-6 pt-6 border-t border-dashed">
              <div className="flex items-center space-x-2">
                 <div className="w-2.5 h-2.5 bg-[#2065D1] rounded-full"></div>
                 <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Team A</span>
              </div>
              <div className="flex items-center space-x-2">
                 <div className="w-2.5 h-2.5 bg-[#D1E9FF] rounded-full"></div>
                 <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Team B</span>
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
         <div className="lg:col-span-2 bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
            <h3 className="text-lg font-black text-gray-900 tracking-tight mb-2">Conversion rates</h3>
            <p className="text-sm font-bold text-gray-400 mb-10 tracking-tight">(+43%) than last year</p>
            <div className="space-y-6">
               <ProgressItem label="Italy" value={75} />
               <ProgressItem label="Japan" value={60} />
               <ProgressItem label="China" value={90} />
               <ProgressItem label="Canada" value={45} />
               <ProgressItem label="France" value={80} />
            </div>
         </div>
         <div className="lg:col-span-1 bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col justify-between">
            <h3 className="text-lg font-black text-gray-900 tracking-tight mb-8">Current subject</h3>
            <div className="h-48 flex items-center justify-center">
               <div className="relative w-40 h-40">
                  <div className="absolute inset-0 border-[12px] border-gray-100 rounded-full"></div>
                  <div className="absolute inset-0 border-[12px] border-blue-600 border-l-transparent border-b-transparent rounded-full transform -rotate-45"></div>
                  <div className="absolute inset-0 flex items-center justify-center font-black text-2xl text-gray-900 tracking-tighter">78%</div>
               </div>
            </div>
            <div className="space-y-3 mt-8">
               <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
                  <span>English</span>
                  <span className="text-gray-900">100</span>
               </div>
               <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
                  <span>NBC</span>
                  <span className="text-gray-900">85</span>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, trend, up, bg, textColor, iconBg, iconColor }: any) {
  return (
    <div className={`${bg} ${textColor} p-8 rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group`}>
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-all duration-700"></div>
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div className={`${iconBg} p-4 rounded-2xl shadow-sm border border-white/20`}>
            <div className={`${iconColor} w-6 h-6`}>
              <BeakerIcon />
            </div>
          </div>
          <div className="flex items-center space-x-1 font-black text-[10px] tracking-tight">
             {up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
             <span>{trend}</span>
          </div>
        </div>
        <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">{title}</p>
        <p className="text-4xl font-black tracking-tight">{value}</p>

        <div className="mt-6 flex justify-end h-8 space-x-1 items-end">
           <div className="w-1.5 h-3 bg-white/20 rounded-full"></div>
           <div className="w-1.5 h-6 bg-white/40 rounded-full"></div>
           <div className="w-1.5 h-4 bg-white/30 rounded-full"></div>
           <div className="w-1.5 h-8 bg-white/60 rounded-full"></div>
           <div className="w-1.5 h-5 bg-white/40 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

function BeakerIcon() {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
  );
}

function LegendItem({ label, color }: any) {
  return (
    <div className="flex items-center space-x-3">
      <div className={`w-3 h-3 ${color} rounded-full shadow-sm`}></div>
      <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{label}</span>
    </div>
  );
}

function Bar({ height, label }: any) {
  return (
    <div className="flex flex-col items-center flex-1 space-y-4 group">
      <div className="w-full flex justify-center space-x-1 h-full items-end">
         <div
           className="w-1.5 md:w-3 bg-[#2065D1] rounded-t-lg transition-all duration-700 hover:brightness-110 shadow-lg shadow-blue-100"
           style={{ height }}
         ></div>
         <div
           className="w-1.5 md:w-3 bg-[#D1E9FF] rounded-t-lg transition-all duration-700 hover:brightness-110"
           style={{ height: `calc(${height} * 0.7)` }}
         ></div>
      </div>
      <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter group-hover:text-gray-900 transition">{label}</span>
    </div>
  );
}

function ProgressItem({ label, value }: any) {
  return (
    <div className="space-y-2 group">
      <div className="flex justify-between text-xs font-black uppercase tracking-widest text-gray-500 group-hover:text-gray-900 transition">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-3 bg-gray-50 rounded-full overflow-hidden border border-gray-100">
        <div
          className="h-full bg-blue-600 rounded-full shadow-md transition-all duration-1000"
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
}
