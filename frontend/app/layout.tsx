import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Menu, User, Bell } from "lucide-react";

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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}>
        <div className="min-h-screen flex flex-col">
          <header className="bg-blue-700 text-white p-4 shadow-md sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <Menu className="w-6 h-6 lg:hidden" />
                <h1 className="text-xl font-bold tracking-tight">LIS DASHBOARD</h1>
              </div>

              <nav className="hidden lg:flex space-x-6 text-sm font-medium uppercase tracking-wider">
                <Link href="/" className="hover:text-blue-200 transition">Overview</Link>
                <Link href="/patients" className="hover:text-blue-200 transition">Patients</Link>
                <Link href="/samples" className="hover:text-blue-200 transition">Samples</Link>
                <Link href="/results" className="hover:text-blue-200 transition">Results</Link>
              </nav>

              <div className="flex items-center space-x-4">
                <Bell className="w-5 h-5 cursor-pointer hover:text-blue-200" />
                <div className="flex items-center space-x-2 bg-blue-800 px-3 py-1.5 rounded-full cursor-pointer hover:bg-blue-900">
                  <User className="w-4 h-4" />
                  <span className="text-xs font-bold hidden sm:inline">ADMIN</span>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 container mx-auto p-4 lg:p-8">
            {children}
          </main>

          <footer className="bg-white border-t p-6 text-center text-gray-400 text-xs">
            <p className="mb-1 font-bold">LABORATORY INFORMATION SYSTEM v1.0</p>
            <p>&copy; 2024. All healthcare data is encrypted and protected.</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
