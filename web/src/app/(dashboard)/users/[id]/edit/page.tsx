"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { fetchUsersAction, updateUserAction } from "@/lib/actions";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function EditUserPage() {
  const router = useRouter();
  const params = useParams();
  const userId = params.id as string;
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [globalError, setGlobalError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    user_type: "0",
    employee_id: "",
    company_name: "",
    contact_number: "",
    address: "",
    status: true,
    remark: ""
  });

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await fetchUsersAction();
        if (response.success) {
          const users = response.data || [];
          const user = users.find((u: any) => u.id === userId);
          if (user) {
            setFormData({
              email: user.email || "",
              password: "",
              user_type: String(user.user_type || "0"),
              employee_id: user.employee_id || "",
              company_name: user.company_name || "",
              contact_number: user.contact_number || "",
              address: user.address || "",
              status: user.status ?? true,
              remark: user.remark || ""
            });
          } else {
            setGlobalError("User not found");
          }
        } else {
          setGlobalError(response.error || "Failed to load user");
        }
      } catch (error: any) {
        setGlobalError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    loadUser();
  }, [userId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormErrors({});
    setGlobalError(null);

    const errors: Record<string, string> = {};
    if (!formData.email) errors.email = "Email address is required (Login ဝင်ရန်)";
    if (!formData.contact_number) errors.contact_number = "Contact number is required (ဖုန်းနံပါတ်)";
    if (!formData.address) errors.address = "Logistics address is required (အသေးစိတ်လိပ်စာ)";
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await updateUserAction({
        id: userId,
        ...formData,
        user_type: parseInt(formData.user_type)
      });
      
      if (response.success) {
        router.push("/users");
      } else {
        setGlobalError(response.error || "Failed to update user");
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

  if (isLoading) {
    return (
      <div className="flex h-screen bg-[#F8FAFC] overflow-hidden font-sans">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#15aabf] mx-auto"></div>
              <p className="mt-4 text-gray-500 font-medium">Loading user data...</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

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
                     <h1 className="text-5xl font-black text-gray-900 tracking-tight leading-none">Edit Identity</h1>
                     <p className="text-gray-500 font-medium italic">Modify decentralized authentication architecture.</p>
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
                  <h2 className="text-3xl font-black tracking-tight relative z-10">Account Configuration</h2>
                  <p className="text-white/60 font-bold text-xs uppercase tracking-widest mt-2 relative z-10">Global System Protocol</p>
               </div>

               <form onSubmit={handleSubmit} className="p-12 space-y-12">
                  {/* Section: Authentication */}
                  <div className="space-y-8">
                     <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
                        <span className="p-2.5 bg-indigo-50 rounded-2xl text-indigo-500">
                           <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                        </span>
                        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">01 Authentication Architecture</h3>
                     </div>
                     <div className="grid grid-cols-2 gap-10">
                        <div className="space-y-3">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-3 flex items-center gap-1.5">
                              <span>Login Email</span>
                              <span className="text-rose-500 text-lg">*</span>
                           </label>
                           <input type="email" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} className={`w-full bg-slate-50 border-2 rounded-3xl px-8 py-5 h-[74px] outline-none focus:bg-white transition-all font-bold text-lg ${formErrors.email ? 'border-rose-400 bg-rose-50/20' : 'border-slate-100 focus:border-[#15aabf]'}`} placeholder="identity@org.root" required />
                           {formErrors.email && <div className="text-[10px] font-black text-rose-500 uppercase tracking-widest px-3">{formErrors.email}</div>}
                        </div>
                        <div className="space-y-3">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-3">
                              <span>Password (leave blank to keep current)</span>
                           </label>
                           <input type="password" value={formData.password} onChange={(e) => handleChange('password', e.target.value)} className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl px-8 py-5 h-[74px] outline-none focus:border-[#15aabf] focus:bg-white transition-all font-bold text-lg" placeholder="••••••••" />
                        </div>
                     </div>
                  </div>

                  {/* Section: Professional Details */}
                  <div className="space-y-8">
                     <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
                        <span className="p-2.5 bg-amber-50 rounded-2xl text-amber-500">
                           <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                        </span>
                        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">02 Geo-Stationary & Contact</h3>
                     </div>
                     <div className="grid grid-cols-2 gap-10">
                        <div className="space-y-3">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-3 flex items-center gap-1.5">
                              <span>Phone</span>
                              <span className="text-rose-500 text-lg">*</span>
                           </label>
                           <input type="text" value={formData.contact_number} onChange={(e) => handleChange('contact_number', e.target.value)} className={`w-full bg-slate-50 border-2 rounded-3xl px-8 py-5 h-[74px] outline-none focus:bg-white transition-all font-bold ${formErrors.contact_number ? 'border-rose-400' : 'border-slate-100 focus:border-[#15aabf]'}`} placeholder="+95 ..." required />
                           {formErrors.contact_number && <div className="text-[10px] font-black text-rose-500 uppercase tracking-widest px-3">{formErrors.contact_number}</div>}
                        </div>
                        <div className="space-y-3">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-3">Admin ID</label>
                           <input type="text" value={formData.employee_id} onChange={(e) => handleChange('employee_id', e.target.value)} className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl px-8 py-5 h-[74px] outline-none focus:border-[#15aabf] focus:bg-white transition-all font-bold" placeholder="ORG-2026-X" />
                        </div>
                        <div className="space-y-3">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-3">Customer Name</label>
                           <input type="text" value={formData.company_name} onChange={(e) => handleChange('company_name', e.target.value)} className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl px-8 py-5 h-[74px] outline-none focus:border-[#15aabf] focus:bg-white transition-all font-bold" placeholder="Partner Corp." />
                        </div>
                        <div className="space-y-3 col-span-2">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-3 flex items-center gap-1.5">
                              <span>Address</span>
                              <span className="text-rose-500 text-lg">*</span>
                           </label>
                           <textarea value={formData.address} onChange={(e) => handleChange('address', e.target.value)} className={`w-full bg-slate-50 border-2 rounded-[2.5rem] px-8 py-6 outline-none focus:bg-white transition-all min-h-[120px] font-medium text-gray-600 ${formErrors.address ? 'border-rose-400' : 'border-slate-100 focus:border-[#15aabf]'}`} placeholder="Street, City, Floor..." required></textarea>
                           {formErrors.address && <div className="text-[10px] font-black text-rose-500 uppercase tracking-widest px-3">{formErrors.address}</div>}
                        </div>
                     </div>
                  </div>

                  {/* Operational Status */}
                  <div className="space-y-8">
                     <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
                        <span className="p-2.5 bg-emerald-50 rounded-2xl text-emerald-500">
                           <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                        </span>
                        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">03 Lifecycle & Logging</h3>
                     </div>
                     <div className="flex gap-10">
                        <div className="space-y-3 w-64">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-3">Status</label>
                           <button 
                              type="button" 
                              onClick={() => handleChange('status', !formData.status)} 
                              className={`w-full h-[74px] rounded-[2.5rem] border-2 flex items-center justify-center gap-4 transition-all font-black text-xs tracking-widest ${formData.status ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-rose-50 border-rose-100 text-rose-700'}`}
                           >
                              <div className={`w-3 h-3 rounded-full ${formData.status ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`}></div>
                              {formData.status ? 'ACTIVE' : 'LOCKED'}
                           </button>
                        </div>
                        <div className="space-y-3 flex-1">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-3">Remark</label>
                           <input type="text" value={formData.remark} onChange={(e) => handleChange('remark', e.target.value)} className="w-full bg-slate-50 border-2 border-slate-100 rounded-[2.5rem] px-8 py-5 h-[74px] outline-none focus:border-[#15aabf] focus:bg-white transition-all font-medium" placeholder="Remark" />
                        </div>
                     </div>
                  </div>

                  <div className="pt-10 flex gap-6">
                     <button 
                        type="button" 
                        onClick={() => router.push("/users")}
                        className="flex-1 bg-white border-4 border-slate-100 text-slate-400 py-7 rounded-[2.5rem] font-black uppercase tracking-widest hover:border-slate-200 hover:text-slate-500 transition-all"
                     >
                        Cancel
                     </button>
                     <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="flex-[2] bg-[#15aabf] text-white py-7 rounded-[2.5rem] font-black uppercase tracking-widest shadow-2xl shadow-[#15aabf]/30 hover:scale-[1.02] transition-all disabled:opacity-50 border-none"
                     >
                        {isSubmitting ? 'Updating...' : 'Update User'}
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