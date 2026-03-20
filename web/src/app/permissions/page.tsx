"use client";

import { useState, useEffect } from "react";
import { fetchPermissionsAction, createPermissionAction } from "@/lib/actions";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function PermissionsPage() {
  const [permissions, setPermissions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", code: "" });

  const fetchData = async () => {
    setIsLoading(true);
    const response = await fetchPermissionsAction();
    if (response.success) setPermissions(response.data || []);
    setIsLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await createPermissionAction(formData);
    if (response.success) {
      setIsModalOpen(false);
      setFormData({ name: "", code: "" });
      fetchData();
    } else {
      alert(response.error);
    }
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h1 className="text-4xl font-black text-gray-900 tracking-tight">Permissions</h1>
                <p className="text-gray-500 font-medium">Manage system-wide access codes and permissions.</p>
              </div>
              <button onClick={() => setIsModalOpen(true)} className="bg-[#15aabf] text-white px-8 py-4 rounded-[1.5rem] font-bold shadow-2xl shadow-[#15aabf]/20 hover:scale-[1.02] transition-all flex items-center gap-3">
                Create Permission
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100">
                    <th className="px-10 py-7 text-[10px] font-black text-gray-400 uppercase tracking-widest">Name</th>
                    <th className="px-10 py-7 text-[10px] font-black text-gray-400 uppercase tracking-widest">Code</th>
                    <th className="px-10 py-7 text-[10px] font-black text-gray-400 uppercase tracking-widest">Created At</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {permissions.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50/40 transition-all">
                      <td className="px-10 py-8 font-black text-gray-900">{p.name}</td>
                      <td className="px-10 py-8"><span className="px-3 py-1 bg-gray-100 rounded-lg text-xs font-mono text-gray-600 border border-gray-200">{p.code}</span></td>
                      <td className="px-10 py-8 text-sm text-gray-500">{p.created_at}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-3xl overflow-hidden border border-white/20">
            <div className="bg-[#15aabf] px-10 py-10 text-white">
              <h2 className="text-3xl font-black tracking-tight">New Permission</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-10 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Name</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-[#F8FAFC] border-2 border-[#F1F5F9] rounded-2xl px-6 py-4 outline-none focus:border-[#15aabf] font-bold" placeholder="e.g. Edit Users" required />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Code</label>
                <input type="text" value={formData.code} onChange={(e) => setFormData({...formData, code: e.target.value})} className="w-full bg-[#F8FAFC] border-2 border-[#F1F5F9] rounded-2xl px-6 py-4 outline-none focus:border-[#15aabf] font-mono text-sm" placeholder="e.g. users.edit" required />
              </div>
              <div className="flex gap-4 pt-4">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-white border-2 border-slate-100 text-slate-400 py-5 rounded-[1.5rem] font-black uppercase tracking-widest hover:bg-slate-50 transition-all hover:text-slate-600"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-[2] bg-[#15aabf] text-white py-5 rounded-[1.5rem] font-black uppercase tracking-widest shadow-xl shadow-[#15aabf]/20 hover:scale-[1.02] transition-all"
                >
                  Save Permission
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
