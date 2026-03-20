"use client";

import { useState, useEffect } from "react";
import { fetchRolesAction, createRoleAction } from "@/lib/actions";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function RolesPage() {
  const [roles, setRoles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", status: true, remark: "" });

  const fetchData = async () => {
    setIsLoading(true);
    const response = await fetchRolesAction();
    if (response.success) setRoles(response.data || []);
    setIsLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await createRoleAction(formData);
    if (response.success) {
      setIsModalOpen(false);
      setFormData({ name: "", status: true, remark: "" });
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
                <h1 className="text-4xl font-black text-gray-900 tracking-tight">Roles</h1>
                <p className="text-gray-500 font-medium">Define and manage user roles within the organization.</p>
              </div>
              <button onClick={() => setIsModalOpen(true)} className="bg-[#15aabf] text-white px-8 py-4 rounded-[1.5rem] font-bold shadow-2xl shadow-[#15aabf]/20 hover:scale-[1.02] transition-all flex items-center gap-3">
                Create Role
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100">
                    <th className="px-10 py-7 text-[10px] font-black text-gray-400 uppercase tracking-widest">Name</th>
                    <th className="px-10 py-7 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                    <th className="px-10 py-7 text-[10px] font-black text-gray-400 uppercase tracking-widest">Remark</th>
                    <th className="px-10 py-7 text-[10px] font-black text-gray-400 uppercase tracking-widest">Created At</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {roles.map((r) => (
                    <tr key={r.id} className="hover:bg-gray-50/40 transition-all">
                      <td className="px-10 py-8 font-black text-gray-900 text-lg leading-tight">{r.name}</td>
                      <td className="px-10 py-8">
                        <div className="flex items-center gap-2">
                           <div className={`h-2.5 w-2.5 rounded-full ${r.status ? 'bg-emerald-500' : 'bg-gray-300'}`}></div>
                           <span className="text-sm font-bold text-gray-700">{r.status ? 'Active' : 'Inactive'}</span>
                        </div>
                      </td>
                      <td className="px-10 py-8 italic text-sm text-gray-500">"{r.remark || "No documentation"}"</td>
                      <td className="px-10 py-8 text-sm text-gray-500">{r.created_at}</td>
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
              <h2 className="text-3xl font-black tracking-tight">New Role</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-10 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Name</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-[#F8FAFC] border-2 border-[#F1F5F9] rounded-2xl px-6 py-4 outline-none focus:border-[#15aabf] font-bold" placeholder="e.g. System Administrator" required />
              </div>
              <div className="flex items-center gap-4">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-auto">Status</label>
                <button type="button" onClick={() => setFormData({...formData, status: !formData.status})} className={`px-5 py-2 rounded-xl text-[10px] font-black tracking-widest transition-all ${formData.status ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                  {formData.status ? 'ACTIVE' : 'INACTIVE'}
                </button>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Remark</label>
                <textarea value={formData.remark} onChange={(e) => setFormData({...formData, remark: e.target.value})} className="w-full bg-[#F8FAFC] border-2 border-[#F1F5F9] rounded-2xl px-6 py-4 outline-none focus:border-[#15aabf] min-h-[100px] font-medium" placeholder="Describe this role..."></textarea>
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
                  Save Role
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
