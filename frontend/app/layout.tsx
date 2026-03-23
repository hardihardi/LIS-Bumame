import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
          <header className="bg-blue-700 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
              <h1 className="text-xl font-bold tracking-tight">LIS Dashboard</h1>
              <nav className="space-x-4">
                <a href="/" className="hover:underline">Dashboard</a>
                <a href="/patients" className="hover:underline">Patients</a>
                <a href="/samples" className="hover:underline">Samples</a>
              </nav>
            </div>
          </header>
          <main className="flex-1 container mx-auto p-4 lg:p-8">
            {children}
          </main>
          <footer className="bg-white border-t p-4 text-center text-gray-500 text-sm">
            &copy; 2024 Laboratory Information System. All rights reserved.
          </footer>
        </div>
      </body>
    </html>
  );
}
