"use client";

import { useState, useEffect } from "react";
import { 
  fetchApprovalStatuses, 
  createStatusAction, 
  updateStatusAction, 
  deleteStatusAction 
} from "@/lib/actions";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function ApprovalStatusPage() {
  const [statuses, setStatuses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    approval_type: 1,
    status: true,
    remark: ""
  });

  const fetchData = async () => {
    setIsLoading(true);
    setApiError(null);
    const response = await fetchApprovalStatuses();
    if (response.success) {
      setStatuses(response.data || []);
    } else {
      setApiError(response.error || "An error occurred");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    
    let response;
    if (editingId) {
      response = await updateStatusAction({ ...formData, id: editingId });
    } else {
      response = await createStatusAction(formData);
    }
    
    if (response.success) {
      setIsModalOpen(false);
      setFormData({ name: "", approval_type: 1, status: true, remark: "" });
      setEditingId(null);
      fetchData();
    } else {
      alert(response.error);
    }
  };

  const handleEdit = (status: any) => {
    setApiError(null);
    setFormData({
      name: status.name,
      approval_type: status.approval_type,
      status: status.status,
      remark: status.remark
    });
    setEditingId(status.id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this status?")) {
      const response = await deleteStatusAction(id);
      if (response.success) {
        fetchData();
      } else {
        alert(response.error);
      }
    }
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-10">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="flex justify-between items-end mb-10">
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-[10px] font-black tracking-[0.2em] text-gray-400 uppercase">
                  <span>Configuration</span>
                  <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                  <span>System</span>
                </div>
                <h1 className="text-4xl font-black text-gray-900 tracking-tight">Approval Status</h1>
                <p className="text-gray-500 font-medium pb-1">Efficiently manage and organize your approval states and workflow stages.</p>
              </div>

              <button 
                onClick={() => {
                   setEditingId(null);
                   setFormData({ name: "", approval_type: 1, status: true, remark: "" });
                   setIsModalOpen(true);
                }}
                className="group relative bg-[#15aabf] text-white px-8 py-4 rounded-[1.5rem] font-bold shadow-2xl shadow-[#15aabf]/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-3 overflow-hidden"
              >
                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <div className="p-2 bg-white/10 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </div>
                <span>Create New Status</span>
              </button>
            </div>

            {apiError && (
              <div className="mb-8 p-6 bg-red-50 border border-red-100 text-red-700 rounded-[2rem] flex items-center gap-4 animate-in slide-in-from-top-4 duration-300">
                <div className="p-2 bg-red-100 rounded-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                </div>
                <div>
                  <p className="font-black text-sm uppercase tracking-wider">Connection Failure</p>
                  <p className="text-sm font-medium opacity-80">{apiError}</p>
                </div>
                <button onClick={fetchData} className="ml-auto bg-red-100 px-6 py-2 rounded-xl text-sm font-black hover:bg-red-200 transition-colors">Reconnect</button>
              </div>
            )}

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-40 gap-4 opacity-30">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
                <span className="text-[10px] font-black uppercase tracking-widest">Retrieving Data...</span>
              </div>
            ) : (
              <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.02)] border border-gray-100 overflow-hidden translate-y-0 transition-all">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50/50 border-b border-gray-100">
                      <th className="px-10 py-7 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Name</th>
                      <th className="px-10 py-7 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Approval Type</th>
                      <th className="px-10 py-7 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Status</th>
                      <th className="px-10 py-7 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Created At</th>
                      <th className="px-10 py-7 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Updated At</th>
                      <th className="px-10 py-7 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Remark</th>
                      <th className="px-10 py-7 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-right">Settings</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {statuses.map((item) => (
                      <tr key={item.id} className="group hover:bg-gray-50/40 transition-all duration-300">
                        <td className="px-10 py-8">
                          <span className="text-lg font-black text-gray-900 leading-tight block">{item.name}</span>
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">ID: {item.id.substring(0,8)}...</span>
                        </td>
                        <td className="px-10 py-8">
                          <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.1em] border shadow-sm ${
                            item.approval_type === 1 ? 'bg-amber-50 border-amber-100 text-amber-600' : 
                            item.approval_type === 2 ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 
                            item.approval_type === 3 ? 'bg-gray-50 border-gray-100 text-gray-600' : 
                            'bg-rose-50 border-rose-100 text-rose-600'
                          }`}>
                            {item.approval_type === 1 ? 'Pending' : 
                             item.approval_type === 2 ? 'Approve' : 
                             item.approval_type === 3 ? 'Cancel' : 
                             'Reject'}
                          </span>
                        </td>
                        <td className="px-10 py-8">
                          <div className="flex items-center gap-3">
                            <div className={`h-2.5 w-2.5 rounded-full ring-4 ${item.status ? 'bg-emerald-500 ring-emerald-50' : 'bg-rose-500 ring-rose-50'}`}></div>
                            <span className="text-sm font-bold text-gray-700">{item.status ? 'Operational' : 'Disabled'}</span>
                          </div>
                        </td>
                        <td className="px-10 py-8">
                          <span className="text-[11px] font-bold text-gray-500">{item.created_at ? new Date(item.created_at).toLocaleDateString() : 'N/A'}</span>
                        </td>
                        <td className="px-10 py-8">
                          <span className="text-[11px] font-bold text-gray-500">{item.updated_at ? new Date(item.updated_at).toLocaleDateString() : 'N/A'}</span>
                        </td>
                        <td className="px-10 py-8">
                          <p className="text-sm text-gray-500 font-medium max-w-[200px] truncate italic leading-relaxed">"{item.remark || "No documentation"}"</p>
                        </td>
                        <td className="px-10 py-8 text-right transition-all duration-300">
                          <div className="flex justify-end gap-2">
                             <button 
                               onClick={() => handleEdit(item)} 
                               className="p-3 bg-[#15aabf] text-white shadow-lg shadow-[#15aabf]/20 rounded-xl hover:scale-110 active:scale-90 transition-all border-none"
                             >
                               <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                             </button>
                             <button 
                               onClick={() => handleDelete(item.id)} 
                               className="p-3 bg-rose-500 text-white shadow-lg shadow-rose-500/20 rounded-xl hover:scale-110 active:scale-90 transition-all border-none"
                             >
                               <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                             </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {statuses.length === 0 && (
                  <div className="py-20 text-center flex flex-col items-center gap-4 border-t border-gray-50">
                     <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mt-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                     </div>
                     <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No Statuses Found</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="bg-white rounded-[3rem] shadow-[0_30px_100px_rgba(0,0,0,0.3)] w-full max-w-xl overflow-hidden animate-in zoom-in-95 duration-200 border border-white/20">
            <div className="bg-[#15aabf] px-10 py-10 text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/2"></div>
               <div className="relative z-10 flex justify-between items-center">
                 <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-50 mb-1 block">Maintenance Portal</span>
                    <h2 className="text-3xl font-black tracking-tight">{editingId ? 'Edit Configuration' : 'Establish New State'}</h2>
                 </div>
                 <button onClick={() => setIsModalOpen(false)} className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all active:scale-90">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                 </button>
               </div>
            </div>
            
            <form onSubmit={handleSubmit} className="p-10 space-y-8 bg-white">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-1">Name</label>
                <div className="relative group">
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-[#F8FAFC] border-2 border-[#F1F5F9] focus:border-[#15aabf] focus:bg-white rounded-2xl px-6 py-4.5 outline-none transition-all font-bold text-gray-800"
                    placeholder="Enter status name..."
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 mt-2">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-1">Approval Type</label>
                  <select 
                    value={formData.approval_type}
                    onChange={(e) => setFormData({...formData, approval_type: parseInt(e.target.value)})}
                    className="w-full bg-[#F8FAFC] border-2 border-[#F1F5F9] focus:border-[#15aabf] focus:bg-white rounded-2xl px-6 py-4.5 outline-none transition-all appearance-none font-bold text-gray-800"
                  >
                    <option value={1}>Pending</option>
                    <option value={2}>Approve</option>
                    <option value={3}>Cancel</option>
                    <option value={4}>Reject</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-1">Status</label>
                  <div className="flex items-center h-[54px]">
                    <div 
                      onClick={() => setFormData({...formData, status: !formData.status})}
                      className={`w-full flex items-center gap-3 p-4 rounded-2xl border-2 transition-all cursor-pointer ${formData.status ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-rose-50 border-rose-100 text-rose-700'}`}
                    >
                      <div className={`w-3 h-3 rounded-full ${formData.status ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`}></div>
                      <span className="text-xs font-black uppercase tracking-widest">{formData.status ? 'Operational' : 'Deactivated'}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-1">Remark</label>
                <textarea 
                  value={formData.remark}
                  onChange={(e) => setFormData({...formData, remark: e.target.value})}
                  className="w-full bg-[#F8FAFC] border-2 border-[#F1F5F9] focus:border-[#15aabf] focus:bg-white rounded-2xl px-6 py-4.5 outline-none transition-all min-h-[120px] font-medium text-gray-600 leading-relaxed"
                  placeholder="Describe this stage or internal purpose..."
                ></textarea>
              </div>

              <div className="pt-4">
                <button type="submit" className="w-full bg-[#15aabf] text-white py-5 rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-sm shadow-2xl shadow-[#15aabf]/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3">
                  <span>Commit Configuration</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
