"use client";

import { useState } from 'react';
import { Search, Filter, MoreHorizontal, MessageCircle, Heart, Share2 } from 'lucide-react';

export default function BlogPage() {
  const [posts] = useState([
    { id: 'B-001', title: 'Hematology Results Analysis', category: 'Medical', date: '23 Mar 2024', status: 'Published', image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400&q=80' },
    { id: 'B-002', title: 'Glucose Fasting Reference Range', category: 'Biochemistry', date: '22 Mar 2024', status: 'Draft', image: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=400&q=80' },
    { id: 'B-003', title: 'Liver Function Panel Overview', category: 'Clinical', date: '21 Mar 2024', status: 'Published', image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=400&q=80' },
    { id: 'B-004', title: 'Cholesterol Profile Updates', category: 'Lipid', date: '20 Mar 2024', status: 'Published', image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400&q=80' },
  ]);

  return (
    <div className="space-y-10 animate-in slide-in-from-top-2 duration-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <h2 className="text-2xl font-black text-gray-900 tracking-tight">Blog</h2>
        <button className="bg-gray-900 text-white px-8 py-3 rounded-xl flex items-center space-x-3 font-bold text-xs shadow-xl shadow-gray-200 hover:bg-black transition active:scale-95">
          <span className="uppercase tracking-widest">+ New Post</span>
        </button>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="relative flex-1 w-full group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-600 transition" />
          <input
            type="text"
            placeholder="Search blog..."
            className="w-full pl-14 pr-8 py-4 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-100 outline-none text-sm font-bold tracking-tight transition shadow-sm"
          />
        </div>
        <button className="flex items-center justify-center space-x-2 px-8 py-4 bg-white border border-gray-200 rounded-2xl text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-gray-900 hover:border-gray-900 transition">
          <Filter className="w-4 h-4" />
          <span>Filters</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {posts.map((b) => (
          <div key={b.id} className="bg-white rounded-[2.5rem] shadow-sm border border-transparent hover:border-blue-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group overflow-hidden">
            <div className="h-48 relative overflow-hidden">
               <img src={b.image} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" alt={b.title} />
               <div className="absolute top-4 left-4">
                  <span className={`text-[9px] font-black px-3 py-1.5 rounded-lg border border-white/20 backdrop-blur-md text-white uppercase tracking-widest ${b.status === 'Published' ? 'bg-green-600/60' : 'bg-gray-900/60'}`}>
                    {b.status}
                  </span>
               </div>
            </div>

            <div className="p-8 space-y-6">
               <div className="flex justify-between items-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  <span>{b.category}</span>
                  <span>{b.date}</span>
               </div>
               <h3 className="text-lg font-black text-gray-900 leading-tight group-hover:text-blue-600 transition">{b.title}</h3>

               <div className="flex justify-between items-center pt-6 border-t border-dashed border-gray-100">
                  <div className="flex items-center -space-x-3">
                     {[1,2].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden shadow-sm">
                           <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${b.id}-${i}`} alt="Avatar" />
                        </div>
                     ))}
                  </div>
                  <div className="flex items-center space-x-4 text-gray-400">
                     <div className="flex items-center space-x-1 hover:text-red-500 cursor-pointer transition">
                        <Heart className="w-4 h-4" />
                        <span className="text-[10px] font-bold tracking-tighter uppercase">24</span>
                     </div>
                     <div className="flex items-center space-x-1 hover:text-blue-600 cursor-pointer transition">
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-[10px] font-bold tracking-tighter uppercase">8</span>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
