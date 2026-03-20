"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAction } from "@/lib/actions";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const result = await loginAction({ email, password });
    if (result.success && result.data.success) {
      // Save user to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(result.data.user));
      }
      router.push("/users");
    } else {
      setError(result.data?.message || result.error || "Login failed");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-6 font-sans overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#15aabf]/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="w-full max-w-[480px] relative z-10 animate-in fade-in zoom-in-95 duration-700">
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-12 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
          <div className="mb-12 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-[#15aabf] to-[#15aabf]/50 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-2xl shadow-[#15aabf]/30 ring-8 ring-white/5">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <h1 className="text-4xl font-black text-white tracking-tight mb-3">Identity Access</h1>
            <p className="text-white/40 font-bold text-[10px] uppercase tracking-[0.4em]">Integrated Auth Protocol v2.4</p>
          </div>

          {error && (
            <div className="mb-8 p-5 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-center gap-4 text-rose-400 animate-in slide-in-from-top-4">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
               <span className="text-[11px] font-black uppercase tracking-wider">{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] px-3">System Email Address</label>
              <div className="relative group">
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  className="w-full bg-white/5 border-2 border-white/5 rounded-3xl px-8 py-5 h-[74px] outline-none focus:border-[#15aabf] focus:bg-white/10 transition-all font-bold text-white placeholder:text-white/10" 
                  placeholder="identity@org.root" 
                  required 
                />
                <div className="absolute right-8 top-1/2 -translate-y-1/2 text-white/10 group-focus-within:text-[#15aabf] transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] px-3">Security Token</label>
              <div className="relative group">
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  className="w-full bg-white/5 border-2 border-white/5 rounded-3xl px-8 py-5 h-[74px] outline-none focus:border-[#15aabf] focus:bg-white/10 transition-all font-bold text-white placeholder:text-white/10" 
                  placeholder="••••••••" 
                  required 
                />
                <div className="absolute right-8 top-1/2 -translate-y-1/2 text-white/10 group-focus-within:text-[#15aabf] transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between px-2">
               <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="hidden" />
                  <div className="w-6 h-6 rounded-lg bg-white/5 border-2 border-white/5 flex items-center justify-center transition-all group-hover:border-[#15aabf]/30">
                     <div className="w-2.5 h-2.5 bg-[#15aabf] rounded-[2px] opacity-0 transition-opacity"></div>
                  </div>
                  <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">Remember Identity</span>
               </label>
               <button type="button" className="text-[10px] font-black text-[#15aabf] uppercase tracking-widest hover:text-white transition-all">Forgot Token?</button>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-[#15aabf] text-white py-7 rounded-[2.5rem] font-black uppercase tracking-[0.2em] shadow-2xl shadow-[#15aabf]/40 hover:scale-[1.02] hover:brightness-110 active:scale-95 transition-all text-xs border-none"
            >
              {isSubmitting ? 'Authenticating...' : 'Initiate Secure Login'}
            </button>
          </form>

          <p className="mt-12 text-center text-[10px] font-black uppercase tracking-[0.2em] text-white/20">
            No active identity? <Link href="/register" className="text-[#15aabf] hover:text-white transition-all">Provision New Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
