import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  Beaker,
  ShieldCheck,
  LogOut,
  Bell,
  Search,
  Menu,
  ChevronRight,
  User,
  AlertCircle
} from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LIS - Laboratory Information System",
  description: "Next-gen Lab Information System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#F9FAFB] text-[#212B36]`}>
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar - Desktop */}
          <aside className="hidden lg:flex flex-col w-[280px] bg-white border-r border-dashed border-gray-200">
            <div className="p-8">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                <span className="text-white font-black text-xl italic leading-none">M</span>
              </div>
            </div>

            <div className="mx-4 mb-10 p-4 bg-[#F2F3F5] rounded-2xl flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0 overflow-hidden">
                 <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Avatar" />
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-bold truncate">Team I</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Free</p>
              </div>
            </div>

            <nav className="flex-1 px-4 space-y-1">
              <SidebarLink href="/" icon={<LayoutDashboard className="w-5 h-5" />} label="Dashboard" active />
              <SidebarLink href="/patients" icon={<Users className="w-5 h-5" />} label="User" />
              <SidebarLink href="/samples" icon={<Beaker className="w-5 h-5" />} label="Product" />
              <SidebarLink href="/results" icon={<ShieldCheck className="w-5 h-5" />} label="Blog" />
              <SidebarLink href="/login" icon={<User className="w-5 h-5" />} label="Sign in" />
              <SidebarLink href="/404" icon={<AlertCircle className="w-5 h-5" />} label="Not found" />
            </nav>

            <div className="p-8">
              <div className="bg-[#EDF2F7] p-8 rounded-3xl relative overflow-hidden group">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/20 rounded-full blur-2xl group-hover:scale-150 transition-all duration-700"></div>
                <div className="relative z-10">
                  <p className="text-xs font-bold text-gray-500 mb-1">More features?</p>
                  <p className="text-[10px] text-gray-400 font-bold mb-4">From only $69</p>
                  <button className="w-full py-2 bg-gray-900 text-white text-[10px] font-bold rounded-lg uppercase tracking-widest hover:bg-black transition">Upgrade to Pro</button>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            {/* Top Bar */}
            <header className="h-[80px] flex items-center justify-between px-8 bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-dashed lg:border-none">
              <div className="flex items-center lg:hidden">
                <Menu className="w-6 h-6 mr-4 text-gray-500 cursor-pointer" />
                <span className="font-black italic text-xl text-blue-600">M</span>
              </div>

              <div className="hidden lg:flex items-center">
                <Search className="w-5 h-5 text-gray-400 cursor-pointer" />
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2 cursor-pointer p-1 rounded-full hover:bg-gray-100 transition">
                   <img src="https://flagcdn.com/w20/gb.png" className="w-5 h-3.5 rounded-sm" alt="EN" />
                </div>
                <div className="relative cursor-pointer p-1 rounded-full hover:bg-gray-100 transition">
                  <Bell className="w-5 h-5 text-gray-500" />
                  <span className="absolute top-0 right-0 w-4 h-4 bg-[#FF4842] text-white text-[9px] font-black flex items-center justify-center rounded-full border-2 border-white shadow-sm">2</span>
                </div>
                <div className="w-10 h-10 bg-gray-200 rounded-full border-2 border-white shadow-md overflow-hidden cursor-pointer hover:scale-105 transition duration-200">
                   <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Avatar" />
                </div>
              </div>
            </header>

            {/* Scrollable Page Body */}
            <main className="flex-1 overflow-y-auto p-6 lg:p-12">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}

function SidebarLink({ href, icon, label, active }: { href: string, icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <Link href={href} className={`flex items-center justify-between px-4 py-4 rounded-xl transition-all duration-200 group ${active ? 'bg-[#D1E9FF] text-[#061B64]' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}>
      <div className="flex items-center space-x-4">
        <span className={`${active ? 'text-[#2065D1]' : 'text-gray-400 group-hover:text-gray-900'}`}>{icon}</span>
        <span className="text-sm font-bold tracking-tight">{label}</span>
      </div>
      {active && <div className="w-1.5 h-1.5 bg-[#2065D1] rounded-full"></div>}
    </Link>
  );
}
