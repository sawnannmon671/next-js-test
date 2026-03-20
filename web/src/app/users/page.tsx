"use client";

import { useState, useEffect } from "react";
import { fetchUsersAction, createUserAction } from "@/lib/actions";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    const response = await createUserAction(formData);
    if (response.success) {
      setIsModalOpen(false);
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
                <h1 className="text-4xl font-black text-gray-900 tracking-tight">System Users</h1>
                <p className="text-gray-500 font-medium">Manage administrators and external customers.</p>
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
                    <th className="px-10 py-7 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-gray-50/40 transition-all">
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
                         {u.user_type === 0 ? `Emp: ${u.employee_id || "N/A"}` : `Co: ${u.company_name || "N/A"}`}
                      </td>
                      <td className="px-10 py-8">
                        <div className="flex items-center gap-2">
                           <div className={`h-2.5 w-2.5 rounded-full ${u.status ? 'bg-emerald-500' : 'bg-gray-300'}`}></div>
                           <span className="text-sm font-bold text-gray-700">{u.status ? 'Active' : 'Inactive'}</span>
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
          <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-2xl overflow-hidden border border-white/20">
            <div className="bg-[#15aabf] px-10 py-10 text-white flex justify-between items-center">
              <h2 className="text-3xl font-black tracking-tight">New System User</h2>
              <button 
                onClick={() => setFormData({...formData, user_type: formData.user_type === 0 ? 1 : 0})}
                className="px-5 py-2 rounded-xl bg-white/20 font-black text-[10px] tracking-widest uppercase hover:bg-white/30 transition-all"
              >
                Switch to {formData.user_type === 0 ? 'External' : 'Admin'}
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-10 grid grid-cols-2 gap-6">
              <div className="space-y-2 col-span-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email Address</label>
                <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-[#F8FAFC] border-2 border-[#F1F5F9] rounded-2xl px-6 py-4 outline-none focus:border-[#15aabf] font-bold" placeholder="user@example.com" required />
              </div>
              <div className="space-y-2 col-span-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Initial Password</label>
                <input type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full bg-[#F8FAFC] border-2 border-[#F1F5F9] rounded-2xl px-6 py-4 outline-none focus:border-[#15aabf] font-bold" placeholder="••••••••" required />
              </div>
              
              {formData.user_type === 0 ? (
                <div className="space-y-2 col-span-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Employee Identifier</label>
                  <input type="text" value={formData.employee_id} onChange={(e) => setFormData({...formData, employee_id: e.target.value})} className="w-full bg-[#F8FAFC] border-2 border-[#F1F5F9] rounded-2xl px-6 py-4 outline-none focus:border-[#15aabf] font-bold" placeholder="EMP-2024-XXX" />
                </div>
              ) : (
                <div className="space-y-2 col-span-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Entity / Company Name</label>
                  <input type="text" value={formData.company_name} onChange={(e) => setFormData({...formData, company_name: e.target.value})} className="w-full bg-[#F8FAFC] border-2 border-[#F1F5F9] rounded-2xl px-6 py-4 outline-none focus:border-[#15aabf] font-bold" placeholder="Global Dynamics Inc." />
                </div>
              )}

              <div className="space-y-3 col-span-2">
                <button type="submit" className="w-full bg-[#15aabf] text-white py-5 rounded-[1.5rem] font-black uppercase tracking-widest shadow-xl shadow-[#15aabf]/20 hover:scale-[1.02] transition-all">
                  Onboard User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
