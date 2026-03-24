"use client";

import { useState } from 'react';
import { Plus, Search, Filter, MoreVertical, Beaker, CheckCircle2, Clock, PlayCircle, ClipboardCheck, ChevronRight, X } from 'lucide-react';

export default function SamplePage() {
  const [samples] = useState<any[]>([
    { sample_id: 'LAB-2024-001', patient_name: 'Siti Aminah', jenis_test: 'Hematologi Lengkap', status: 'IN_PROCESS', collected_at: '2024-03-24 08:30' },
    { sample_id: 'LAB-2024-002', patient_name: 'Ahmad Dahlan', jenis_test: 'Kimia Klinik', status: 'COMPLETED', collected_at: '2024-03-24 09:15' },
    { sample_id: 'LAB-2024-003', patient_name: 'Budi Santoso', jenis_test: 'Urine Lengkap', status: 'REGISTERED', collected_at: '2024-03-24 10:00' },
    { sample_id: 'LAB-2024-004', patient_name: 'Dewi Sartika', jenis_test: 'Imunologi', status: 'VALIDATED', collected_at: '2024-03-24 10:45' },
  ]);

  const [selectedSample, setSelectedSample] = useState(samples[0]);
  const [showMobileDetail, setShowMobileDetail] = useState(false);

  const handleSampleSelect = (s: any) => {
    setSelectedSample(s);
    if (window.innerWidth < 1024) {
      setShowMobileDetail(true);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'REGISTERED': return 'bg-blue-100 text-blue-600';
      case 'COLLECTED': return 'bg-orange-100 text-orange-600';
      case 'IN_PROCESS': return 'bg-purple-100 text-purple-600';
      case 'COMPLETED': return 'bg-green-100 text-green-600';
      case 'VALIDATED': return 'bg-teal-100 text-teal-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'REGISTERED': return <Clock className="w-4 h-4" />;
      case 'IN_PROCESS': return <PlayCircle className="w-4 h-4" />;
      case 'COMPLETED': return <CheckCircle2 className="w-4 h-4" />;
      case 'VALIDATED': return <ClipboardCheck className="w-4 h-4" />;
      default: return <Beaker className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-12 animate-in slide-in-from-bottom-2 duration-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <h2 className="text-3xl font-black text-gray-900 tracking-tighter">Product</h2>
        <button className="bg-gray-900 text-white px-8 py-4 rounded-[1.5rem] flex items-center space-x-3 font-black text-xs shadow-2xl shadow-gray-200 hover:bg-black transition transform active:scale-95">
          <Plus className="w-5 h-5" />
          <span className="uppercase tracking-[0.2em]">New Product</span>
        </button>
      </div>

      <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-6">
        <div className="relative flex-1 w-full group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-600 transition duration-300" />
          <input
            type="text"
            placeholder="Search product..."
            className="w-full pl-16 pr-8 py-5 bg-gray-50/50 border-none rounded-2xl focus:ring-2 focus:ring-blue-100 outline-none text-sm font-bold tracking-tight transition duration-300"
          />
        </div>
        <button className="flex items-center justify-center space-x-3 px-8 py-5 bg-white border border-gray-200 rounded-2xl text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-gray-900 hover:border-gray-900 transition duration-300 w-full md:w-auto">
          <Filter className="w-4 h-4" />
          <span>Filters</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 h-full">
        {/* Desktop Table List */}
        <div className="hidden lg:block lg:col-span-2 bg-white rounded-[3.5rem] shadow-sm border border-gray-100 overflow-hidden flex flex-col">
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/30 border-b border-gray-100">
                  <th className="p-10 text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">Sample ID</th>
                  <th className="p-10 text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">Patient</th>
                  <th className="p-10 text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">Status</th>
                  <th className="p-10"></th>
                </tr>
              </thead>
              <tbody>
                {samples.map((s) => (
                  <tr
                    key={s.sample_id}
                    className={`border-b border-gray-50 group transition cursor-pointer duration-300 ${selectedSample.sample_id === s.sample_id ? 'bg-blue-50/50' : 'hover:bg-gray-50/20'}`}
                    onClick={() => handleSampleSelect(s)}
                  >
                    <td className="p-10">
                       <div className="flex items-center space-x-6">
                          <div className={`w-12 h-12 rounded-[1.2rem] flex items-center justify-center shadow-sm border border-white ${getStatusColor(s.status)}`}>
                             {getStatusIcon(s.status)}
                          </div>
                          <p className="font-black text-gray-900 group-hover:text-blue-600 transition tracking-tighter uppercase">{s.sample_id}</p>
                       </div>
                    </td>
                    <td className="p-10">
                       <p className="font-black text-gray-700 text-xs tracking-tight uppercase">{s.patient_name}</p>
                       <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{s.jenis_test}</p>
                    </td>
                    <td className="p-10">
                       <span className={`text-[9px] font-black px-5 py-2.5 rounded-xl tracking-[0.1em] uppercase shadow-sm ${getStatusColor(s.status)}`}>
                         {s.status}
                       </span>
                    </td>
                    <td className="p-10">
                       <button className="p-4 text-gray-400 hover:text-gray-900 transition rounded-2xl hover:bg-white shadow-sm border border-transparent hover:border-gray-100 duration-300"><MoreVertical className="w-5 h-5" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile: Card View */}
        <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-8">
           {samples.map((s) => (
             <div
               key={s.sample_id}
               onClick={() => handleSampleSelect(s)}
               className={`bg-white p-8 rounded-[3rem] shadow-sm border border-gray-100 space-y-8 group transition duration-500 relative overflow-hidden ${selectedSample.sample_id === s.sample_id ? 'border-blue-200 bg-blue-50/20' : ''}`}
             >
                <div className="flex justify-between items-start relative z-10">
                   <div className="flex items-center space-x-6">
                      <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center shadow-2xl shadow-gray-200 border-4 border-white ${getStatusColor(s.status)}`}>
                        {getStatusIcon(s.status)}
                      </div>
                      <div>
                        <p className="font-black text-gray-900 tracking-tighter uppercase text-lg">{s.sample_id}</p>
                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{s.jenis_test}</p>
                      </div>
                   </div>
                   <button className="p-2 text-gray-400"><MoreVertical className="w-6 h-6" /></button>
                </div>

                <div className="relative z-10 grid grid-cols-2 gap-6 pt-8 border-t border-dashed border-gray-100">
                   <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Patient</p>
                      <p className="text-xs font-black text-gray-800 uppercase tracking-tight">{s.patient_name}</p>
                   </div>
                   <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Status</p>
                      <span className={`text-[9px] font-black px-4 py-1.5 rounded-lg tracking-widest uppercase shadow-sm ${getStatusColor(s.status)}`}>
                        {s.status}
                      </span>
                   </div>
                </div>

                <button className="w-full py-4 bg-gray-50 border border-gray-100 text-[9px] font-black text-gray-900 rounded-2xl uppercase tracking-[0.2em] flex items-center justify-center space-x-3 group-hover:bg-gray-900 group-hover:text-white transition duration-500 shadow-sm">
                   <span>View details</span>
                   <ChevronRight className="w-4 h-4" />
                </button>
             </div>
           ))}
        </div>

        {/* Right Detail Panel (Desktop) / Mobile Modal */}
        <div className="hidden lg:block lg:col-span-1">
           <SampleDetailPanel selectedSample={selectedSample} getStatusColor={getStatusColor} />
        </div>

        {/* Mobile Detail Modal */}
        {showMobileDetail && (
          <div className="lg:hidden fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
             <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[3.5rem] p-10 space-y-10 animate-in slide-in-from-bottom-full duration-500 shadow-2xl">
                <div className="flex justify-between items-center mb-4">
                   <div className="w-16 h-1 bg-gray-200 rounded-full mx-auto absolute top-4 left-1/2 -translate-x-1/2"></div>
                   <h3 className="text-xl font-black text-gray-900 tracking-tight">Details</h3>
                   <button onClick={() => setShowMobileDetail(false)} className="p-3 bg-gray-50 rounded-2xl hover:bg-gray-100 transition"><X className="w-5 h-5" /></button>
                </div>
                <div className="max-h-[70vh] overflow-y-auto scrollbar-hide">
                   <SampleDetailPanel selectedSample={selectedSample} getStatusColor={getStatusColor} />
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SampleDetailPanel({ selectedSample, getStatusColor }: any) {
  return (
    <div className="bg-white p-12 rounded-[3.5rem] shadow-sm border border-gray-100 h-full relative overflow-hidden group flex flex-col justify-between sticky top-32">
      <div className="absolute top-0 right-0 w-48 h-48 bg-blue-50 rounded-full -mr-24 -mt-24 transition-all duration-700 group-hover:scale-125"></div>

      <div className="relative z-10 space-y-12">
        <div>
          <h3 className="text-4xl font-black text-gray-900 tracking-tighter mb-2 uppercase">{selectedSample.sample_id}</h3>
          <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.4em] mb-12">Document details</p>
        </div>

        <div className="space-y-10">
          <DetailItem label="Patient Name" value={selectedSample.patient_name} />
          <DetailItem label="Test Protocol" value={selectedSample.jenis_test} />
          <DetailItem label="Collection Timestamp" value={selectedSample.collected_at} />

          <div className="pt-4">
             <div className="flex justify-between items-center mb-4">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Progress</p>
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">
                   {selectedSample.status === 'VALIDATED' ? '100%' : selectedSample.status === 'COMPLETED' ? '75%' : selectedSample.status === 'IN_PROCESS' ? '50%' : '25%'}
                </span>
             </div>
             <div className="h-5 bg-gray-50 rounded-full overflow-hidden p-1 border border-gray-100 shadow-inner">
                <div
                  className={`h-full ${getStatusColor(selectedSample.status)} rounded-full transition-all duration-1000 shadow-xl shadow-blue-100 flex items-center justify-center`}
                  style={{ width: selectedSample.status === 'VALIDATED' ? '100%' : selectedSample.status === 'COMPLETED' ? '75%' : selectedSample.status === 'IN_PROCESS' ? '50%' : '25%' }}
                ></div>
             </div>
          </div>
        </div>

        <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
           <button className="py-6 bg-gray-900 text-white text-[11px] font-black rounded-2xl uppercase tracking-[0.2em] shadow-2xl shadow-gray-200 hover:bg-black transition transform active:scale-95">Edit Metadata</button>
           <button className="py-6 bg-white border-2 border-gray-900 text-gray-900 text-[11px] font-black rounded-2xl uppercase tracking-[0.2em] hover:bg-gray-900 hover:text-white transition duration-500">Print Label</button>
        </div>
      </div>
    </div>
  );
}

function DetailItem({ label, value }: any) {
  return (
    <div className="group">
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1.5 group-hover:text-blue-600 transition duration-300">{label}</p>
      <p className="font-black text-gray-900 tracking-tight text-sm uppercase">{value}</p>
    </div>
  );
}
