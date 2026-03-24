"use client";

import { useState } from 'react';
import { Search, Filter, MoreHorizontal, ChevronRight, Grid, List } from 'lucide-react';

export default function ProductPage() {
  const [products] = useState([
    { id: 'S-2024-001', name: 'Hematology Specimen', category: 'Blood', price: '$14.2', status: 'In Process', image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400&q=80' },
    { id: 'S-2024-002', name: 'Glucose Tube', category: 'Biochemistry', price: '$110', status: 'Registered', image: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=400&q=80' },
    { id: 'S-2024-003', name: 'Liver Function Panel', category: 'Serology', price: '$190', status: 'Completed', image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=400&q=80' },
    { id: 'S-2024-004', name: 'Cholesterol Specimen', category: 'Lipid', price: '$45', status: 'Collected', image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400&q=80' },
  ]);

  return (
    <div className="space-y-10 animate-in slide-in-from-right-4 duration-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <h2 className="text-2xl font-black text-gray-900 tracking-tight">Product</h2>
        <button className="bg-gray-900 text-white px-8 py-3 rounded-xl flex items-center space-x-3 font-bold text-xs shadow-xl shadow-gray-200 hover:bg-black transition active:scale-95">
          <span className="uppercase tracking-widest">+ New Product</span>
        </button>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-100">
           <button className="p-3 bg-gray-900 text-white rounded-lg shadow-sm"><Grid className="w-5 h-5" /></button>
           <button className="p-3 text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition"><List className="w-5 h-5" /></button>
        </div>
        <div className="relative flex-1 w-full group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-600 transition" />
          <input
            type="text"
            placeholder="Search product..."
            className="w-full pl-14 pr-8 py-4 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-100 outline-none text-sm font-bold tracking-tight transition shadow-sm"
          />
        </div>
        <button className="flex items-center justify-center space-x-2 px-8 py-4 bg-white border border-gray-200 rounded-2xl text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-gray-900 hover:border-gray-900 transition">
          <Filter className="w-4 h-4" />
          <span>Filters</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((p) => (
          <div key={p.id} className="bg-white rounded-[2.5rem] shadow-sm border border-transparent hover:border-blue-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group overflow-hidden">
            <div className="h-64 relative overflow-hidden">
               <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" alt={p.name} />
               <div className="absolute top-4 right-4 flex space-x-2">
                  <span className={`text-[9px] font-black px-3 py-1.5 rounded-lg border border-white/20 backdrop-blur-md text-white uppercase tracking-widest ${p.status === 'Completed' ? 'bg-green-600/60' : 'bg-gray-900/60'}`}>
                    {p.status}
                  </span>
               </div>
            </div>

            <div className="p-8 space-y-6">
               <div>
                  <p className="text-[10px] font-black text-gray-400 tracking-widest uppercase mb-1">{p.category}</p>
                  <h3 className="text-xl font-black text-gray-900 leading-tight group-hover:text-blue-600 transition">{p.name}</h3>
               </div>

               <div className="flex justify-between items-center pt-4 border-t border-dashed border-gray-100">
                  <p className="text-2xl font-black text-gray-900 tracking-tighter">{p.price}</p>
                  <div className="flex items-center -space-x-3">
                     {[1,2,3].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden shadow-sm">
                           <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${p.id}-${i}`} alt="Avatar" />
                        </div>
                     ))}
                  </div>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
