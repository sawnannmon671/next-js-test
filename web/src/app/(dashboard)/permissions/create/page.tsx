"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPermissionAction } from "@/lib/actions";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function CreatePermissionPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [globalError, setGlobalError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    code: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormErrors({});
    setGlobalError(null);

    const errors: Record<string, string> = {};
    if (!formData.name) errors.name = "Permission name is required";
    if (!formData.code) errors.code = "Permission code is required";
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await createPermissionAction(formData);
      if (response.success) {
        router.push("/permissions");
      } else {
        setGlobalError(response.error || "Failed to create permission");
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
                     <h1 className="text-5xl font-black text-gray-900 tracking-tight leading-none">New Permission</h1>
                     <p className="text-gray-500 font-medium italic">Define a new system permission.</p>
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
                  <h2 className="text-3xl font-black tracking-tight relative z-10">Permission Configuration</h2>
                  <p className="text-white/60 font-bold text-xs uppercase tracking-widest mt-2 relative z-10">Access Control System</p>
               </div>

               <form onSubmit={handleSubmit} className="p-12 space-y-12">
                  {/* Section: Permission Details */}
                  <div className="space-y-8">
                     <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
                        <span className="p-2.5 bg-indigo-50 rounded-2xl text-indigo-500">
                           <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                        </span>
                        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">01 Permission Information</h3>
                     </div>
                     <div className="grid grid-cols-2 gap-10">
                        <div className="space-y-3">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-3 flex items-center gap-1.5">
                              <span>Permission Name</span>
                              <span className="text-rose-500 text-lg">*</span>
                           </label>
                           <input type="text" value={formData.name} onChange={(e) => handleChange('name', e.target.value)} className={`w-full bg-slate-50 border-2 rounded-3xl px-8 py-5 h-[74px] outline-none focus:bg-white transition-all font-bold text-lg ${formErrors.name ? 'border-rose-400 bg-rose-50/20' : 'border-slate-100 focus:border-[#15aabf]'}`} placeholder="e.g. Edit Users" />
                           {formErrors.name && <div className="text-[10px] font-black text-rose-500 uppercase tracking-widest px-3">{formErrors.name}</div>}
                        </div>
                        <div className="space-y-3">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-3 flex items-center gap-1.5">
                              <span>Permission Code</span>
                              <span className="text-rose-500 text-lg">*</span>
                           </label>
                           <input type="text" value={formData.code} onChange={(e) => handleChange('code', e.target.value)} className={`w-full bg-slate-50 border-2 rounded-3xl px-8 py-5 h-[74px] outline-none focus:bg-white transition-all font-mono text-lg ${formErrors.code ? 'border-rose-400 bg-rose-50/20' : 'border-slate-100 focus:border-[#15aabf]'}`} placeholder="e.g. users.edit" />
                           {formErrors.code && <div className="text-[10px] font-black text-rose-500 uppercase tracking-widest px-3">{formErrors.code}</div>}
                        </div>
                     </div>
                  </div>

                  <div className="pt-10 flex gap-6">
                     <button 
                        type="button" 
                        onClick={() => router.push("/permissions")}
                        className="flex-1 bg-white border-4 border-slate-100 text-slate-400 py-7 rounded-[2.5rem] font-black uppercase tracking-widest hover:border-slate-200 hover:text-slate-500 transition-all"
                     >
                        Cancel
                     </button>
                     <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="flex-[2] bg-[#15aabf] text-white py-7 rounded-[2.5rem] font-black uppercase tracking-widest shadow-2xl shadow-[#15aabf]/30 hover:scale-[1.02] transition-all disabled:opacity-50 border-none"
                     >
                        {isSubmitting ? 'Creating...' : 'Create Permission'}
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