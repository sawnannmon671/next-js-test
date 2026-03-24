"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { createStatusAction, fetchPermissionsAction } from "@/lib/actions";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function CreateApprovalStatusPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [globalError, setGlobalError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    approval_type: 1,
    status: true,
    remark: ""
  });

  const [permissions, setPermissions] = useState<any[]>([]);
  const [selectedPermissionIds, setSelectedPermissionIds] = useState<string[]>([]);

  // Fetch permissions on mount
  useEffect(() => {
    const loadPermissions = async () => {
      const response = await fetchPermissionsAction();
      if (response.success) setPermissions(response.data || []);
    };
    loadPermissions();
  }, []);

  const handlePermissionToggle = (permissionId: string) => {
    setSelectedPermissionIds(prev =>
      prev.includes(permissionId)
        ? prev.filter(id => id !== permissionId)
        : [...prev, permissionId]
    );
  };

  const groupedPermissions = useMemo(() => {
    const groups: Record<string, any[]> = {};
    permissions.forEach(p => {
      const category = p.code?.split('.')[0] || 'other';
      if (!groups[category]) groups[category] = [];
      groups[category].push(p);
    });
    const order = ['approval_status', 'permissions', 'roles', 'users'];
    const sortedCategories = Object.keys(groups).sort((a, b) => {
      const aIndex = order.indexOf(a);
      const bIndex = order.indexOf(b);
      if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
      if (aIndex !== -1) return -1;
      if (bIndex !== -1) return 1;
      return a.localeCompare(b);
    });
    return sortedCategories.map(category => ({
      category,
      label: category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      permissions: groups[category]
    }));
  }, [permissions]);

  const toggleGroup = (groupPermissions: any[]) => {
    const groupIds = groupPermissions.map(p => p.id);
    const allSelected = groupIds.every(id => selectedPermissionIds.includes(id));
    if (allSelected) {
      setSelectedPermissionIds(prev => prev.filter(id => !groupIds.includes(id)));
    } else {
      setSelectedPermissionIds(prev => [...new Set([...prev, ...groupIds])]);
    }
  };

  const isGroupSelected = (groupPermissions: any[]) => {
    const groupIds = groupPermissions.map(p => p.id);
    return groupIds.length > 0 && groupIds.every(id => selectedPermissionIds.includes(id));
  };

  const toggleAllPermissions = () => {
    const allIds = permissions.map(p => p.id);
    const allSelected = allIds.every(id => selectedPermissionIds.includes(id));
    if (allSelected) {
      setSelectedPermissionIds([]);
    } else {
      setSelectedPermissionIds(allIds);
    }
  };

  const isAllSelected = () => {
    return permissions.length > 0 && permissions.every(p => selectedPermissionIds.includes(p.id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormErrors({});
    setGlobalError(null);

    const errors: Record<string, string> = {};
    if (!formData.name) errors.name = "Status name is required";
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await createStatusAction({ ...formData, permission_ids: selectedPermissionIds });
      if (response.success) {
        router.push("/approval-status");
      } else {
        setGlobalError(response.error || "Failed to create approval status");
      }
    } catch (error: any) {
      setGlobalError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
    if (formErrors[field]) {
       const newErrors = { ...formErrors };
       delete newErrors[field];
       setFormErrors(newErrors);
    }
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumbs & Header */}
            <div className="mb-12 space-y-4">
               <button 
                  onClick={() => router.back()} 
                  className="flex items-center gap-2 text-gray-400 hover:text-[#15aabf] transition-all font-black text-[10px] uppercase tracking-[0.2em] group"
               >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
                  Back to Directory
               </button>
               <div className="flex justify-between items-end">
                  <div className="space-y-2">
                     <h1 className="text-5xl font-black text-gray-900 tracking-tight leading-none">New Approval Status</h1>
                     <p className="text-gray-500 font-medium italic">Define a new approval state or workflow stage.</p>
                  </div>
               </div>
            </div>

            {/* Error Notification */}
            {globalError && (
              <div className="mb-8 p-6 bg-rose-50 border-2 border-rose-100 rounded-3xl flex flex-col gap-2 text-rose-600 animate-in slide-in-from-top-4 duration-300">
                <div className="flex items-center gap-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  <div className="font-black text-sm uppercase tracking-widest">{globalError}</div>
                </div>
                <p className="text-[10px] font-bold text-rose-400 pl-10">⚠️ System Mismatch Detected: Please restart both Go and Next.js servers to clear binary cache.</p>
              </div>
            )}

            {/* Premium Registration Card */}
            <div className="bg-white rounded-[1.5rem] shadow-[0_45px_100px_-25px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
               <div className="bg-[#15aabf] p-10 text-white relative">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-white rounded-full blur-[120px] opacity-20 -translate-y-1/2 translate-x-1/2"></div>
                  <h2 className="text-3xl font-black tracking-tight relative z-10">Approval Configuration</h2>
                  <p className="text-white/60 font-bold text-xs uppercase tracking-widest mt-2 relative z-10">Workflow Management System</p>
               </div>

               <form onSubmit={handleSubmit} className="p-12 space-y-12">
                  {/* Section: Status Details */}
                  <div className="space-y-8">
                     <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
                        <span className="p-2.5 bg-indigo-50 rounded-2xl text-indigo-500">
                           <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                        </span>
                        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">01 Status Information</h3>
                     </div>
                     <div className="grid grid-cols-2 gap-10">
                        <div className="space-y-3">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-3 flex items-center gap-1.5">
                              <span>Status Name</span>
                              <span className="text-rose-500 text-lg">*</span>
                           </label>
                           <input type="text" value={formData.name} onChange={(e) => handleChange('name', e.target.value)} className={`w-full bg-slate-50 border-2 rounded-3xl px-8 py-5 h-[74px] outline-none focus:bg-white transition-all font-bold text-lg ${formErrors.name ? 'border-rose-400 bg-rose-50/20' : 'border-slate-100 focus:border-[#15aabf]'}`} placeholder="e.g. Pending Review" />
                           {formErrors.name && <div className="text-[10px] font-black text-rose-500 uppercase tracking-widest px-3">{formErrors.name}</div>}
                        </div>
                        <div className="space-y-3">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-3 flex items-center gap-1.5">
                              <span>Approval Type</span>
                           </label>
                           <select 
                              value={formData.approval_type}
                              onChange={(e) => handleChange('approval_type', parseInt(e.target.value))}
                              className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl px-8 py-5 h-[74px] outline-none focus:border-[#15aabf] focus:bg-white transition-all font-bold text-lg appearance-none"
                           >
                              <option value={1}>Pending</option>
                              <option value={2}>Approve</option>
                              <option value={3}>Cancel</option>
                              <option value={4}>Reject</option>
                           </select>
                        </div>
                        <div className="space-y-3">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-3">
                              <span>Status</span>
                           </label>
                           <button 
                              type="button" 
                              onClick={() => handleChange('status', !formData.status)} 
                              className={`w-full h-[74px] rounded-[2.5rem] border-2 flex items-center justify-center gap-4 transition-all font-black text-xs tracking-widest ${formData.status ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-rose-50 border-rose-100 text-rose-700'}`}
                           >
                              <div className={`w-3 h-3 rounded-full ${formData.status ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`}></div>
                              {formData.status ? 'OPERATIONAL' : 'DISABLED'}
                           </button>
                        </div>
                        <div className="space-y-3 col-span-2">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-3">
                              <span>Remark</span>
                           </label>
                           <textarea value={formData.remark} onChange={(e) => handleChange('remark', e.target.value)} className="w-full bg-slate-50 border-2 border-slate-100 rounded-[2.5rem] px-8 py-6 outline-none focus:border-[#15aabf] focus:bg-white transition-all min-h-[120px] font-medium text-gray-600" placeholder="Describe this stage or internal purpose..."></textarea>
                        </div>
                     </div>
                   </div>

                   {/* Section: Permissions */}
                   <div className="space-y-8">
                      <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
                         <span className="p-2.5 bg-amber-50 rounded-2xl text-amber-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                         </span>
                         <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Permissions</h3>
                      </div>
                      
                      {permissions.length === 0 ? (
                        <p className="text-gray-500 text-sm italic">No permissions available. Please seed permissions first.</p>
                      ) : (
                        <div className="space-y-8">
                          {/* Select All checkbox */}
                          <div className="flex items-center gap-3 py-2 cursor-pointer" onClick={toggleAllPermissions}>
                            <input
                              type="checkbox"
                              checked={isAllSelected()}
                              onChange={toggleAllPermissions}
                              className="w-5 h-5 rounded border-gray-300 text-amber-500 focus:ring-amber-500"
                              onClick={(e) => e.stopPropagation()}
                            />
                            <h4 className="text-sm font-bold text-gray-800">Select All</h4>
                            <span className="ml-auto text-xs text-gray-400">{selectedPermissionIds.length} / {permissions.length} selected</span>
                          </div>
                          {groupedPermissions.map((group) => (
                            <div key={group.category} className="space-y-4">
                              <div className="flex items-center gap-3 py-2 cursor-pointer" onClick={() => toggleGroup(group.permissions)}>
                                <input
                                  type="checkbox"
                                  checked={isGroupSelected(group.permissions)}
                                  onChange={() => toggleGroup(group.permissions)}
                                  className="w-5 h-5 rounded border-gray-300 text-amber-500 focus:ring-amber-500"
                                  onClick={(e) => e.stopPropagation()}
                                />
                                <h4 className="text-sm font-bold text-gray-800">{group.label}</h4>
                                <span className="ml-auto text-xs text-gray-400">{group.permissions.length} permissions</span>
                              </div>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                {group.permissions.map((permission) => (
                                  <div key={permission.id} className="flex items-center gap-3 py-2 cursor-pointer" onClick={() => handlePermissionToggle(permission.id)}>
                                    <input
                                      type="checkbox"
                                      checked={selectedPermissionIds.includes(permission.id)}
                                      onChange={() => handlePermissionToggle(permission.id)}
                                      className="w-5 h-5 rounded border-gray-300 text-amber-500 focus:ring-amber-500"
                                      onClick={(e) => e.stopPropagation()}
                                    />
                                    <div>
                                      <span className="text-sm font-bold text-gray-800 block">{permission.code}</span>
                                      <span className="text-[10px] text-gray-500">{permission.name}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                   </div>

                   <div className="pt-10 flex gap-6">
                     <button 
                        type="button" 
                        onClick={() => router.push("/approval-status")}
                        className="flex-1 bg-white border-4 border-slate-100 text-slate-400 py-7 rounded-[2.5rem] font-black uppercase tracking-widest hover:border-slate-200 hover:text-slate-500 transition-all"
                     >
                        Cancel
                     </button>
                     <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="flex-[2] bg-[#15aabf] text-white py-7 rounded-[2.5rem] font-black uppercase tracking-widest shadow-2xl shadow-[#15aabf]/30 hover:scale-[1.02] transition-all disabled:opacity-50 border-none"
                     >
                        {isSubmitting ? 'Creating...' : 'Create Approval Status'}
                     </button>
                  </div>
               </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}