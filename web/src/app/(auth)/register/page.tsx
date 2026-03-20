"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserAction } from "@/lib/actions";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    user_type: "1", // Default to External/Client for public registration
    employee_id: "",
    company_name: "",
    contact_number: "",
    address: "",
    status: true,
    remark: "Public Registration"
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const response = await createUserAction(formData);
    if (response.success) {
      router.push("/login?registered=true");
    } else {
      setError(response.error || "Provisioning failed");
    }
    setIsSubmitting(false);
  };

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-6 font-sans overflow-y-auto font-sans relative">
      {/* Background Decorative Elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#15aabf]/15 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="w-full max-w-[640px] relative z-10 py-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[4rem] p-16 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
          <div className="mb-16">
            <h1 className="text-5xl font-black text-white tracking-tight mb-4">New Account</h1>
            <p className="text-white/30 font-bold text-[10px] uppercase tracking-[0.4em]">Integrated Registration System v3.0</p>
          </div>

          {error && (
            <div className="mb-10 p-6 bg-rose-500/10 border border-rose-500/20 rounded-3xl flex items-center gap-4 text-rose-400">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
               <span className="text-[11px] font-black uppercase tracking-wider">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-12">
            {/* Step 01: Core Credentials */}
            <div className="space-y-8">
               <h3 className="text-[10px] font-black text-[#15aabf] uppercase tracking-[0.4em] px-2 flex items-center gap-4">
                  01 Architecture
                  <div className="h-px flex-1 bg-white/5"></div>
               </h3>
               <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] px-3">Login ဝင်ရန် Email</label>
                    <input type="email" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} className="w-full bg-white/5 border-2 border-white/5 rounded-3xl px-8 py-5 h-[74px] outline-none focus:border-[#15aabf] focus:bg-white/10 transition-all font-bold text-white text-lg" placeholder="identity@org.root" required />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] px-3">Password</label>
                    <input type="password" value={formData.password} onChange={(e) => handleChange('password', e.target.value)} className="w-full bg-white/5 border-2 border-white/5 rounded-3xl px-8 py-5 h-[74px] outline-none focus:border-[#15aabf] focus:bg-white/10 transition-all font-bold text-white text-lg" placeholder="••••••••" required />
                  </div>
               </div>
            </div>

            {/* Step 02: Verification */}
            <div className="space-y-8">
               <h3 className="text-[10px] font-black text-[#15aabf] uppercase tracking-[0.4em] px-2 flex items-center gap-4">
                  02 Identity Reference
                  <div className="h-px flex-1 bg-white/5"></div>
               </h3>
               <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] px-3">ဖုန်းနံပါတ်</label>
                    <input type="text" value={formData.contact_number} onChange={(e) => handleChange('contact_number', e.target.value)} className="w-full bg-white/5 border-2 border-white/5 rounded-3xl px-8 py-5 h-[74px] outline-none focus:border-[#15aabf] focus:bg-white/10 transition-all font-bold text-white" placeholder="+95 ..." required />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] px-3">Customer အတွက် Name</label>
                    <input type="text" value={formData.company_name} onChange={(e) => handleChange('company_name', e.target.value)} className="w-full bg-white/5 border-2 border-white/5 rounded-3xl px-8 py-5 h-[74px] outline-none focus:border-[#15aabf] focus:bg-white/10 transition-all font-bold text-white" placeholder="Entity / Corp Name" />
                  </div>
                  <div className="space-y-3 col-span-2">
                    <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] px-3">အသေးစိတ်လိပ်စာ (Address)</label>
                    <textarea value={formData.address} onChange={(e) => handleChange('address', e.target.value)} className="w-full bg-white/5 border-2 border-white/5 rounded-[2.5rem] px-8 py-6 outline-none focus:border-[#15aabf] focus:bg-white/10 transition-all font-medium text-white min-h-[120px]" placeholder="Street, City, Floor..." required />
                  </div>
               </div>
            </div>

            <div className="pt-8">
               <button 
                 type="submit" 
                 disabled={isSubmitting}
                 className="w-full bg-white text-[#0F172A] py-7 rounded-[2.5rem] font-black uppercase tracking-[0.2em] shadow-2xl shadow-indigo-500/10 hover:bg-[#15aabf] hover:text-white transition-all text-xs border-none"
               >
                 {isSubmitting ? 'Provisioning...' : 'Complete Final Registration'}
               </button>
               <p className="mt-10 text-center text-[10px] font-black uppercase tracking-[0.2em] text-white/20">
                  Existing Identity? <Link href="/login" className="text-[#15aabf] hover:text-white transition-all">Go to Login</Link>
               </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
