"use client";

import { useState, useEffect } from "react";
import { fetchUsersAction, createUserAction, updateUserAction, deleteUserAction } from "@/lib/actions";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let response;
    if (editingId) {
       response = await updateUserAction({ ...formData, id: editingId });
    } else {
       response = await createUserAction(formData);
    }
    
    if (response.success) {
      handleCloseModal();
      fetchData();
    } else {
      alert(response.error);
    }
  };

  const handleEdit = (user: any) => {
    setEditingId(user.id);
    setFormData({
      email: user.email,
      password: "", // Don't fill password on edit for security
      user_type: user.user_type,
      employee_id: user.employee_id || "",
      company_name: user.company_name || "",
      contact_number: user.contact_number || "",
      address: user.address || "",
      status: user.status,
      remark: user.remark || ""
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Permanently delete this user profile?")) {
      const response = await deleteUserAction(id);
      if (response.success) fetchData();
      else alert(response.error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({
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
                <h1 className="text-4xl font-black text-gray-900 tracking-tight">System Users</h1>
                <p className="text-gray-500 font-medium">Manage administrators and external customers with RBAC.</p>
              </div>
              <button onClick={() => setIsModalOpen(true)} className="bg-[#15aabf] text-white px-8 py-4 rounded-[1.5rem] font-bold shadow-2xl shadow-[#15aabf]/20 hover:scale-[1.02] transition-all flex items-center gap-3">
                Create User
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100">
                    <th className="px-10 py-7 text-[10px] font-black text-gray-400 uppercase tracking-widest">User Profile</th>
                    <th className="px-10 py-7 text-[10px] font-black text-gray-400 uppercase tracking-widest">Classification</th>
                    <th className="px-10 py-7 text-[10px] font-black text-gray-400 uppercase tracking-widest">Details</th>
                    <th className="px-10 py-7 text-[10px] font-black text-gray-400 uppercase tracking-widest">Contact Info</th>
                    <th className="px-10 py-7 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                    <th className="px-10 py-7 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-gray-50/40 transition-all group">
                      <td className="px-10 py-8">
                         <span className="font-black text-gray-900 block">{u.email}</span>
                         <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">ID: {u.id.substring(0,8)}</span>
                      </td>
                      <td className="px-10 py-8">
                         <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${u.user_type === 0 ? 'bg-indigo-50 border-indigo-100 text-indigo-600' : 'bg-amber-50 border-amber-100 text-amber-600'}`}>
                           {u.user_type === 0 ? 'ADMIN' : 'EXTERNAL'}
                         </span>
                      </td>
                      <td className="px-10 py-8 text-sm font-medium text-gray-500">
                         {u.user_type === 0 ? `Emp ID: ${u.employee_id || "N/A"}` : `Co: ${u.company_name || "N/A"}`}
                      </td>
                      <td className="px-10 py-8">
                         <span className="text-sm font-bold text-gray-700 block">{u.contact_number || "None"}</span>
                         <span className="text-[11px] text-gray-400 italic truncate max-w-[150px] block">{u.address || "No address"}</span>
                      </td>
                      <td className="px-10 py-8">
                        <div className="flex items-center gap-2">
                           <div className={`h-2.5 w-2.5 rounded-full ${u.status ? 'bg-emerald-500' : 'bg-gray-300'}`}></div>
                           <span className="text-sm font-bold text-gray-700">{u.status ? 'Active' : 'Inactive'}</span>
                        </div>
                      </td>
                      <td className="px-10 py-8 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                         <div className="flex justify-end gap-2">
                           <button onClick={() => handleEdit(u)} className="p-3 bg-gray-100 rounded-xl hover:bg-[#15aabf] hover:text-white transition-all text-gray-400 border-none">
                             <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                           </button>
                           <button onClick={() => handleDelete(u.id)} className="p-3 bg-gray-100 rounded-xl hover:bg-rose-500 hover:text-white transition-all text-gray-400 border-none">
                             <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
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

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-4xl overflow-hidden border border-white/20">
            <div className="bg-[#15aabf] px-10 py-10 text-white flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-black tracking-tight">{editingId ? 'Edit User Profile' : 'New System User'}</h2>
                <p className="opacity-70 text-sm font-bold tracking-widest uppercase mt-1">Classification: {formData.user_type === 0 ? 'Admin Root' : 'External Client'}</p>
              </div>
              <button 
                onClick={() => setFormData({...formData, user_type: formData.user_type === 0 ? 1 : 0})}
                className="px-5 py-2 rounded-xl bg-white/20 font-black text-[10px] tracking-widest uppercase hover:bg-white/30 transition-all border-none"
              >
                Switch Type
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-10 grid grid-cols-2 gap-x-8 gap-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <div className="space-y-2 col-span-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email Address</label>
                <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-[#F8FAFC] border-2 border-[#F1F5F9] rounded-2xl px-6 py-4 outline-none focus:border-[#15aabf] font-bold" placeholder="user@example.com" required />
              </div>
              <div className="space-y-2 col-span-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{editingId ? 'New Password (Optional)' : 'Initial Password'}</label>
                <input type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full bg-[#F8FAFC] border-2 border-[#F1F5F9] rounded-2xl px-6 py-4 outline-none focus:border-[#15aabf] font-bold" placeholder="••••••••" required={!editingId} />
              </div>
              
              <div className="space-y-2 col-span-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Contact Number</label>
                <input type="text" value={formData.contact_number} onChange={(e) => setFormData({...formData, contact_number: e.target.value})} className="w-full bg-[#F8FAFC] border-2 border-[#F1F5F9] rounded-2xl px-6 py-4 outline-none focus:border-[#15aabf] font-bold" placeholder="+95 9..." />
              </div>

              {formData.user_type === 0 ? (
                <div className="space-y-2 col-span-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Employee Identifier</label>
                  <input type="text" value={formData.employee_id} onChange={(e) => setFormData({...formData, employee_id: e.target.value})} className="w-full bg-[#F8FAFC] border-2 border-[#F1F5F9] rounded-2xl px-6 py-4 outline-none focus:border-[#15aabf] font-bold" placeholder="EMP-XXX" />
                </div>
              ) : (
                <div className="space-y-2 col-span-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Company Name</label>
                  <input type="text" value={formData.company_name} onChange={(e) => setFormData({...formData, company_name: e.target.value})} className="w-full bg-[#F8FAFC] border-2 border-[#F1F5F9] rounded-2xl px-6 py-4 outline-none focus:border-[#15aabf] font-bold" placeholder="Acme Inc." />
                </div>
              )}

              <div className="space-y-2 col-span-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Full Address</label>
                <textarea value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className="w-full bg-[#F8FAFC] border-2 border-[#F1F5F9] rounded-2xl px-6 py-4 outline-none focus:border-[#15aabf] min-h-[80px] font-medium" placeholder="Street, City, Country..."></textarea>
              </div>

              <div className="space-y-2 col-span-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Status & Remark</label>
                <div className="flex gap-4">
                  <button type="button" onClick={() => setFormData({...formData, status: !formData.status})} className={`px-6 py-4 rounded-2xl border-2 font-black text-[10px] tracking-widest uppercase transition-all flex-shrink-0 ${formData.status ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-rose-50 border-rose-100 text-rose-600'}`}>
                    {formData.status ? 'ACTIVE' : 'INACTIVE'}
                  </button>
                  <input type="text" value={formData.remark} onChange={(e) => setFormData({...formData, remark: e.target.value})} className="flex-1 bg-[#F8FAFC] border-2 border-[#F1F5F9] rounded-2xl px-6 py-4 outline-none focus:border-[#15aabf] font-medium" placeholder="Add a internal remark..." />
                </div>
              </div>

              <div className="flex gap-4 col-span-2 pt-6">
                <button 
                  type="button" 
                  onClick={handleCloseModal}
                  className="flex-1 bg-white border-2 border-slate-100 text-slate-400 py-5 rounded-[1.5rem] font-black uppercase tracking-widest hover:bg-slate-50 transition-all hover:text-slate-600"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-[2] bg-[#15aabf] text-white py-5 rounded-[1.5rem] font-black uppercase tracking-widest shadow-xl shadow-[#15aabf]/20 hover:scale-[1.02] transition-all"
                >
                  {editingId ? 'Update User' : 'Onboard User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
