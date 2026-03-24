"use client";

import { useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  Beaker,
  ShieldCheck,
  Bell,
  Search,
  Menu,
  User,
  AlertCircle,
  QrCode, History, Settings,
  X,
  ChevronRight
} from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#F9FAFB] text-[#212B36] font-sans h-screen overflow-hidden`}>
        <div className="flex h-full">
          {/* Mobile Sidebar Overlay */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] lg:hidden animate-in fade-in duration-300"
              onClick={() => setIsSidebarOpen(false)}
            ></div>
          )}

          {/* Sidebar */}
          <aside className={`fixed inset-y-0 left-0 w-[320px] bg-white border-r border-dashed border-gray-200 shadow-2xl z-[70] transform transition-transform duration-500 lg:relative lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="p-12 flex justify-between items-center">
              <div className="w-12 h-12 bg-blue-600 rounded-[1.5rem] flex items-center justify-center shadow-xl shadow-blue-100 transform hover:rotate-12 transition duration-500 cursor-pointer group">
                <span className="text-white font-black text-2xl italic leading-none group-hover:scale-110 transition">M</span>
              </div>
              <button
                className="lg:hidden p-3 bg-gray-50 rounded-2xl text-gray-400 hover:text-gray-900 transition"
                onClick={() => setIsSidebarOpen(false)}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mx-6 mb-12 p-6 bg-gray-50 rounded-[2rem] flex items-center space-x-4 border border-gray-100 group cursor-pointer hover:bg-gray-900 transition-all duration-500">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0 overflow-hidden border-2 border-white shadow-md group-hover:scale-110 transition duration-500">
                 <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Avatar" />
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-black truncate group-hover:text-white transition">Team I</p>
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] group-hover:text-gray-400 transition">Administrator</p>
              </div>
            </div>

            <nav className="flex-1 px-6 space-y-2 overflow-y-auto scrollbar-hide">
              <SidebarLink href="/" icon={<LayoutDashboard className="w-5 h-5" />} label="Dashboard" onClick={() => setIsSidebarOpen(false)} />
              <SidebarLink href="/patients" icon={<Users className="w-5 h-5" />} label="User" onClick={() => setIsSidebarOpen(false)} />
              <SidebarLink href="/samples" icon={<Beaker className="w-5 h-5" />} label="Product" onClick={() => setIsSidebarOpen(false)} />
              <SidebarLink href="/results" icon={<ShieldCheck className="w-5 h-5" />} label="Blog" onClick={() => setIsSidebarOpen(false)} />
              <SidebarLink href="/verify" icon={<QrCode className="w-5 h-5" />} label="Verification" onClick={() => setIsSidebarOpen(false)} />
              <SidebarLink href="/audit" icon={<History className="w-5 h-5" />} label="Audit Trail" onClick={() => setIsSidebarOpen(false)} />
              <SidebarLink href="/settings" icon={<Settings className="w-5 h-5" />} label="Settings" onClick={() => setIsSidebarOpen(false)} />

              <div className="pt-10">
                 <p className="px-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-4">Account</p>
                 <SidebarLink href="/login" icon={<User className="w-5 h-5" />} label="Sign in" onClick={() => setIsSidebarOpen(false)} />
                 <SidebarLink href="/404" icon={<AlertCircle className="w-5 h-5" />} label="Not found" onClick={() => setIsSidebarOpen(false)} />
              </div>
            </nav>

            <div className="p-10">
              <div className="bg-[#EDF2F7] p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-700">
                  <p className="text-xs font-black text-gray-500 mb-1">Scale up?</p>
                  <p className="text-[10px] text-gray-400 font-bold mb-6">Pro plan for only $69</p>
                  <button className="w-full py-4 bg-gray-900 text-white text-[10px] font-black rounded-2xl uppercase tracking-[0.2em] shadow-lg hover:bg-black transition">Upgrade now</button>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
            {/* Top Bar */}
            <header className="h-[100px] flex items-center justify-between px-8 lg:px-14 bg-white/80 backdrop-blur-xl sticky top-0 z-40 border-b border-dashed border-gray-100 lg:border-none">
              <div className="flex items-center">
                <div
                  className="lg:hidden p-3 bg-gray-50 rounded-2xl text-gray-400 hover:text-gray-900 transition mr-4 cursor-pointer"
                  onClick={() => setIsSidebarOpen(true)}
                >
                   <Menu className="w-6 h-6" />
                </div>
                <div className="hidden lg:flex items-center flex-1 max-w-lg">
                  <div className="relative w-[400px] group">
                     <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition duration-300" />
                     <input type="text" placeholder="Search..." className="w-full pl-16 pr-8 py-4 bg-gray-50/50 border-none rounded-2xl focus:ring-2 focus:ring-blue-100 outline-none text-sm font-bold transition duration-300 shadow-inner" />
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-6 sm:space-x-10">
                <div className="flex items-center space-x-2 cursor-pointer p-2.5 rounded-2xl hover:bg-gray-100 transition duration-300">
                   <img src="https://flagcdn.com/w20/gb.png" className="w-6 h-4 rounded-sm shadow-sm" alt="EN" />
                </div>
                <div className="relative cursor-pointer p-3 rounded-2xl hover:bg-gray-100 transition duration-300">
                  <Bell className="w-6 h-6 text-gray-500" />
                  <span className="absolute top-2.5 right-2.5 w-4.5 h-4.5 bg-[#FF4842] text-white text-[10px] font-black flex items-center justify-center rounded-full border-2 border-white shadow-xl shadow-red-100">2</span>
                </div>
                <div className="w-12 h-12 bg-gray-200 rounded-[1.5rem] border-2 border-white shadow-2xl shadow-gray-200 overflow-hidden cursor-pointer hover:scale-110 hover:-translate-y-1 transition-all duration-500">
                   <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Avatar" />
                </div>
              </div>
            </header>

            {/* Scrollable Page Body */}
            <main className="flex-1 overflow-y-auto p-6 sm:p-10 lg:p-14 scrollbar-hide">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}

function SidebarLink({ href, icon, label, onClick }: { href: string, icon: React.ReactNode, label: string, onClick?: () => void }) {
  return (
    <Link href={href} onClick={onClick} className="flex items-center justify-between px-5 py-4.5 rounded-[1.5rem] transition-all duration-300 group hover:bg-gray-50 active:scale-95">
      <div className="flex items-center space-x-5">
        <span className="text-gray-400 group-hover:text-blue-600 transition-all duration-500 group-hover:scale-110">{icon}</span>
        <span className="text-sm font-black tracking-tight text-gray-500 group-hover:text-gray-900 transition-all duration-300">{label}</span>
      </div>
      <div className="w-1.5 h-1.5 bg-transparent group-hover:bg-blue-600 rounded-full transition duration-500 shadow-lg shadow-blue-200"></div>
    </Link>
  );
}
