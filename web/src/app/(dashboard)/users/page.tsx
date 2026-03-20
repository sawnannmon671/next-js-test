"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchUsersAction, updateUserAction, deleteUserAction } from "@/lib/actions";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function UsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Edit Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    user_type: 0,
    employee_id: "",
    company_name: "",
    contact_number: "",
    address: "",
    status: true,
    remark: ""
  });

  const fetchData = async () => {
    setIsLoading(true);
    const response = await fetchUsersAction();
    if (response.success) setUsers(response.data || []);
    setIsLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleEdit = (user: any) => {
    setEditingId(user.id);
    setFormData({
      email: user.email,
      password: "", 
      user_type: user.user_type,
      employee_id: user.employee_id || "",
      company_name: user.company_name || "",
      contact_number: user.contact_number || "",
      address: user.address || "",
      status: user.status,
      remark: user.remark || ""
    });
    setIsEditModalOpen(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await updateUserAction({ ...formData, id: editingId });
    if (response.success) {
      setIsEditModalOpen(false);
      setEditingId(null);
      fetchData();
    } else {
      alert(response.error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Permanently delete this user profile?")) {
      const response = await deleteUserAction(id);
      if (response.success) fetchData();
      else alert(response.error);
    }
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-12">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="flex justify-between items-start">
              <div className="space-y-3">
                <div className="flex items-center gap-4 text-[11px] font-black tracking-[0.3em] text-gray-400 uppercase">
                  <span>Directory</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                  <span>RBAC Security</span>
                </div>
                <h1 className="text-5xl font-black text-gray-900 tracking-tight leading-none">System Users</h1>
                <p className="text-lg text-gray-500 font-medium max-w-2xl">Orchestrate your organization's digital identity with granular Control and Audit trails.</p>
              </div>
              <button 
                onClick={() => router.push("/users/create")} 
                className="group relative bg-[#15aabf] text-white px-10 py-5 rounded-[2rem] font-black shadow-[0_25px_60px_-15px_rgba(21,170,191,0.5)] hover:scale-[1.03] active:scale-[0.97] transition-all flex items-center gap-4 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <div className="p-2.5 bg-white/20 rounded-2xl">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </div>
                <span className="text-sm uppercase tracking-[0.15em]">Onboard User</span>
              </button>
            </div>

            <div className="bg-white rounded-[2.5rem] shadow-[0_45px_100px_-25px_rgba(0,0,0,0.03)] border border-gray-100 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100">
                    <th className="px-12 py-9 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Profile Architecture</th>
                    <th className="px-12 py-9 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Classification</th>
                    <th className="px-12 py-9 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Structural Meta</th>
                    <th className="px-12 py-9 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Communication</th>
                    <th className="px-12 py-9 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Status</th>
                    <th className="px-12 py-9 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] text-right">Settings</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-gray-50/40 transition-all group duration-300">
                      <td className="px-12 py-9">
                         <div className="flex items-center gap-5">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#15aabf]/10 to-[#15aabf]/5 flex items-center justify-center text-[#15aabf] font-black text-lg">
                               {u.email.charAt(0).toUpperCase()}
                            </div>
                            <div>
                               <span className="font-black text-gray-900 text-lg block leading-tight">{u.email}</span>
                               <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mt-1 block">UUID: {u.id.substring(0,8)}...</span>
                            </div>
                         </div>
                      </td>
                      <td className="px-12 py-9">
                         <span className={`px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.1em] border shadow-sm ${Number(u.user_type) === 0 ? 'bg-indigo-50 border-indigo-100 text-indigo-600' : 'bg-amber-50 border-amber-100 text-amber-600'}`}>
                           {Number(u.user_type) === 0 ? 'Global Admin' : 'External Client'}
                         </span>
                      </td>
                      <td className="px-12 py-9">
                         <div className="space-y-1">
                            <span className="text-sm font-black text-gray-700 block">{Number(u.user_type) === 0 ? u.employee_id || "NOT-SET" : u.company_name || "N/A"}</span>
                            <span className="text-[10px] font-bold text-gray-300 uppercase tracking-wider">{Number(u.user_type) === 0 ? 'Employee ID' : 'Entity Name'}</span>
                         </div>
                      </td>
                      <td className="px-12 py-9">
                         <div className="space-y-1">
                            <span className="text-sm font-bold text-gray-800 block">{u.contact_number || "+00 0000 000"}</span>
                            <span className="text-xs text-gray-400 font-medium truncate max-w-[180px] block leading-relaxed line-clamp-1 italic">"{u.address || "No secondary address"}"</span>
                         </div>
                      </td>
                      <td className="px-12 py-9">
                        <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-2xl border ${u.status ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-rose-50 border-rose-100 text-rose-700'}`}>
                           <div className={`h-2.5 w-2.5 rounded-full ring-4 ${u.status ? 'bg-emerald-500 ring-emerald-100' : 'bg-rose-500 ring-rose-100'}`}></div>
                           <span className="text-[10px] font-black uppercase tracking-widest">{u.status ? 'Active' : 'Locked'}</span>
                        </div>
                      </td>
                      <td className="px-12 py-9 text-right opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-4 group-hover:translate-x-0">
                         <div className="flex justify-end gap-3">
                           <button onClick={() => handleEdit(u)} className="p-4 bg-white border-2 border-slate-100 text-slate-400 rounded-2xl hover:border-[#15aabf] hover:text-[#15aabf] hover:shadow-xl hover:shadow-[#15aabf]/10 transition-all">
                             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                           </button>
                           <button onClick={() => handleDelete(u.id)} className="p-4 bg-white border-2 border-slate-100 text-slate-400 rounded-2xl hover:border-rose-500 hover:text-rose-500 hover:shadow-xl hover:shadow-rose-500/10 transition-all">
                             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                           </button>
                         </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {isEditModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xl z-50 flex items-center justify-center p-8 animate-in fade-in duration-500">
          <div className="bg-white rounded-[4rem] shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
            <div className="bg-[#15aabf] p-12 text-white flex justify-between items-center">
              <h2 className="text-4xl font-black tracking-tight">Refine Account</h2>
              <button onClick={() => setIsEditModalOpen(false)} className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all border-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <form onSubmit={handleUpdate} className="p-16 overflow-y-auto custom-scrollbar space-y-12">
              <div className="grid grid-cols-2 gap-10">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">Primary Email</label>
                  <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl px-8 py-5 outline-none focus:border-[#15aabf] focus:bg-white font-bold" required />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">Contact Link</label>
                  <input type="text" value={formData.contact_number} onChange={(e) => setFormData({...formData, contact_number: e.target.value})} className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl px-8 py-5 outline-none focus:border-[#15aabf] focus:bg-white font-bold" />
                </div>
                <div className="space-y-3 col-span-2">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">Physical Location</label>
                   <textarea value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className="w-full bg-slate-50 border-2 border-slate-100 rounded-[2.5rem] px-8 py-6 outline-none focus:border-[#15aabf] focus:bg-white min-h-[100px] font-medium" />
                </div>
              </div>
              <div className="flex gap-4 pt-6">
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="flex-1 bg-white border-2 border-slate-100 text-slate-400 py-6 rounded-3xl font-black uppercase tracking-widest hover:border-slate-200">Cancel</button>
                <button type="submit" className="flex-[2] bg-[#15aabf] text-white py-6 rounded-3xl font-black uppercase tracking-widest shadow-xl shadow-[#15aabf]/20">Apply Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
