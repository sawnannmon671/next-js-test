"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAction } from "@/lib/actions";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    const result = await loginAction({ email, password });
    if (result.success && result.data.success) {
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(result.data.user));
      }
      router.push("/users");
    } else {
      setError(result.data?.message || result.error || "Login failed");
    }
    setIsSubmitting(false);
  };

  const isEmailValid = email.length > 4 && email.includes("@");
  const isPasswordStrong = password.length >= 8;

  return (
    <div className="min-h-screen flex items-center justify-center p-6 font-sans"
      style={{ background: "#1e2140" }}
    >
      {/* Outer card */}
      <div className="relative w-full max-w-[780px] rounded-[28px] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
        style={{ background: "#252a4a" }}
      >
        {/* Decorative leaf shapes — top left */}
        <div className="absolute top-0 left-0 w-[220px] h-[280px] pointer-events-none select-none">
          {/* Back leaf — teal */}
          <div className="absolute top-[-20px] left-[-30px] w-[180px] h-[240px] rounded-[50%_10%_50%_10%] rotate-[-15deg]"
            style={{ background: "linear-gradient(145deg, #0db4cc, #0891b2)", opacity: 0.9 }}
          />
          {/* Middle leaf — blue */}
          <div className="absolute top-[10px] left-[20px] w-[160px] h-[210px] rounded-[50%_10%_50%_10%] rotate-[10deg]"
            style={{ background: "linear-gradient(145deg, #3b5bdb, #1e3a8a)", opacity: 0.95 }}
          />
          {/* Front leaf — dark teal */}
          <div className="absolute top-[50px] left-[-10px] w-[130px] h-[180px] rounded-[50%_10%_50%_10%] rotate-[-5deg]"
            style={{ background: "linear-gradient(145deg, #0e9488, #0d7270)", opacity: 0.85 }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center py-14 px-10">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c0 0-8-4-8-10V5l8-3 8 3v7c0 6-8 10-8 10z"/></svg>
            <span className="text-white text-3xl font-black tracking-tight">Approval<span style={{ color: "#22d3ee" }}>Sys</span></span>
          </div>
          <p className="text-sm mb-10" style={{ color: "rgba(255,255,255,0.35)" }}>Fast &amp; Easy Approval Management</p>

          <h1 className="text-white text-3xl font-bold mb-10 tracking-wide">Welcome Back!</h1>

          {/* Error banner */}
          {error && (
            <div className="w-full max-w-[320px] mb-6 px-4 py-3 rounded-xl text-xs font-bold text-red-400 bg-red-500/10 border border-red-500/20">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="w-full max-w-[320px] space-y-8">
            {/* Email */}
            <div>
              <label className="text-xs font-semibold mb-2 block" style={{ color: "rgba(255,255,255,0.5)" }}>Email</label>
              <div className="relative flex items-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent pb-2 text-white text-sm font-medium focus:outline-none"
                  style={{ borderBottom: "1.5px solid rgba(255,255,255,0.15)", background: "transparent", WebkitBoxShadow: "0 0 0 1000px #252a4a inset", WebkitTextFillColor: "white" }}
                  placeholder=""
                  required
                />
                {isEmailValid && (
                  <svg className="absolute right-0" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                )}
              </div>
              {isEmailValid && <p className="text-[11px] mt-1 font-semibold" style={{ color: "#22d3ee" }}>Perfect!</p>}
            </div>

            {/* Password */}
            <div>
              <label className="text-xs font-semibold mb-2 block" style={{ color: "rgba(255,255,255,0.5)" }}>Password</label>
              <div className="relative flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent pb-2 pr-8 text-white text-sm font-medium focus:outline-none"
                  style={{ borderBottom: "1.5px solid rgba(255,255,255,0.15)", background: "transparent", WebkitBoxShadow: "0 0 0 1000px #252a4a inset", WebkitTextFillColor: "white" }}
                  placeholder=""
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 transition-colors"
                  style={{ color: showPassword ? "#22d3ee" : "rgba(255,255,255,0.3)" }}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  )}
                </button>
              </div>
              {isPasswordStrong && <p className="text-[11px] mt-1 font-semibold" style={{ color: "#22d3ee" }}>Your password is strong.</p>}
            </div>

            {/* Sign in button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl font-bold text-sm text-white tracking-wide transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-60"
              style={{ background: "linear-gradient(90deg, #06b6d4, #22d3ee)" }}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                  Signing in...
                </span>
              ) : "Sign in"}
            </button>
          </form>

          {/* Forgot */}
          <button type="button" className="mt-6 text-sm font-medium transition-colors hover:text-white"
            style={{ color: "rgba(255,255,255,0.4)" }}>
            Forget My Password
          </button>

          {/* Footer links */}
          <div className="mt-16 flex items-center gap-3 text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
            <span>Term of use</span>
            <span>|</span>
            <span>Privacy policy</span>
          </div>
        </div>

        {/* Bottom-right floating buttons */}
        <div className="absolute bottom-6 right-6 flex flex-col items-end gap-2">
          <Link href="/register"
            className="px-5 py-2.5 rounded-xl text-white text-xs font-bold shadow-lg transition-all hover:brightness-110"
            style={{ background: "linear-gradient(135deg, #3b82f6, #1d4ed8)" }}
          >
            Request An Account
          </Link>
          <button className="px-5 py-2.5 bg-white rounded-xl text-gray-700 text-xs font-bold shadow-lg hover:bg-gray-50 transition-all">
            Need Help?
          </button>
        </div>
      </div>
    </div>
  );
}
