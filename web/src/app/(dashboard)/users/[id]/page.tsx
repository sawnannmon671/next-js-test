"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { fetchUsersAction, fetchRolesAction } from "@/lib/actions";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function UserDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const userId = params.id as string;
  
  const [isLoading, setIsLoading] = useState(true);
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [roles, setRoles] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [usersResponse, rolesResponse] = await Promise.all([
          fetchUsersAction(),
          fetchRolesAction()
        ]);
        
        if (rolesResponse.success) {
          setRoles(rolesResponse.data || []);
        }
        
        if (usersResponse.success) {
          const users = usersResponse.data || [];
          const found = users.find((u: any) => u.id === userId);
          if (found) {
            setUser(found);
          } else {
            setGlobalError("User not found");
          }
        } else {
          setGlobalError(usersResponse.error || "Failed to load user");
        }
      } catch (error: any) {
        setGlobalError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [userId]);

  const getRoleName = (roleId: string) => {
    const role = roles.find(r => r.id === roleId);
    return role ? role.name : roleId;
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

  if (globalError) {
    return (
      <div className="flex h-screen bg-[#F8FAFC] overflow-hidden font-sans">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="text-rose-500 text-lg font-bold mb-4">{globalError}</div>
              <button 
                onClick={() => router.push("/users")}
                className="text-[#15aabf] hover:underline font-bold"
              >
                Back to Users
              </button>
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
                     <h1 className="text-5xl font-black text-gray-900 tracking-tight leading-none">User Details</h1>
                     <p className="text-gray-500 font-medium italic">View user identity information.</p>
                  </div>
                  <button
                     onClick={() => router.push(`/users/${userId}/edit`)}
                     className="group relative bg-[#15aabf] text-white px-8 py-4 rounded-[2rem] font-black shadow-[0_25px_60px_-15px_rgba(21,170,191,0.5)] hover:scale-[1.03] active:scale-[0.97] transition-all flex items-center gap-3 overflow-hidden"
                  >
                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                     <span className="text-sm uppercase tracking-[0.15em]">Edit User</span>
                  </button>
               </div>
            </div>

            {/* User Info Card */}
            <div className="bg-white rounded-[2.5rem] shadow-[0_45px_100px_-25px_rgba(0,0,0,0.03)] border border-gray-100 overflow-hidden">
               <div className="bg-[#15aabf] p-10 text-white relative">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-white rounded-full blur-[120px] opacity-20 -translate-y-1/2 translate-x-1/2"></div>
                  <div className="flex items-center gap-6 relative z-10">
                     <div className="w-20 h-20 rounded-3xl bg-white/20 flex items-center justify-center text-3xl font-black">
                        {user.email.charAt(0).toUpperCase()}
                     </div>
                     <div>
                        <h2 className="text-3xl font-black tracking-tight">{user.email}</h2>
                        <p className="text-white/60 font-bold text-xs uppercase tracking-widest mt-2">UUID: {user.id}</p>
                     </div>
                  </div>
               </div>

               <div className="p-12 space-y-12">
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
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-3">Login Email</label>
                           <div className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl px-8 py-5 h-[74px] font-bold text-lg text-gray-700">{user.email}</div>
                        </div>
                        <div className="space-y-3">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-3">User Type</label>
                           <div className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl px-8 py-5 h-[74px] font-bold text-lg text-gray-700">
                              {Number(user.user_type) === 0 ? 'Global Admin' : 'External Client'}
                           </div>
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
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-3">Phone</label>
                           <div className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl px-8 py-5 h-[74px] font-bold text-gray-700">{user.contact_number || "Not provided"}</div>
                        </div>
                        <div className="space-y-3">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-3">
                              {Number(user.user_type) === 0 ? 'Employee ID' : 'Customer Name'}
                           </label>
                           <div className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl px-8 py-5 h-[74px] font-bold text-gray-700">
                              {Number(user.user_type) === 0 ? (user.employee_id || "Not set") : (user.company_name || "Not provided")}
                           </div>
                        </div>
                        <div className="space-y-3 col-span-2">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-3">Address</label>
                           <div className="w-full bg-slate-50 border-2 border-slate-100 rounded-[2.5rem] px-8 py-6 min-h-[120px] font-medium text-gray-600 whitespace-pre-wrap">{user.address || "No address provided"}</div>
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
                           <div className={`w-full h-[74px] rounded-[2.5rem] border-2 flex items-center justify-center gap-4 transition-all font-black text-xs tracking-widest ${user.status ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-rose-50 border-rose-100 text-rose-700'}`}>
                              <div className={`w-3 h-3 rounded-full ${user.status ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`}></div>
                              {user.status ? 'ACTIVE' : 'LOCKED'}
                           </div>
                        </div>
                        <div className="space-y-3 flex-1">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-3">Remark</label>
                           <div className="w-full bg-slate-50 border-2 border-slate-100 rounded-[2.5rem] px-8 py-5 h-[74px] font-medium text-gray-700">{user.remark || "No remark"}</div>
                        </div>
                     </div>
                  </div>

                  {/* Section: Role Assignment (Read-only) */}
                  <div className="space-y-8">
                     <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
                        <span className="p-2.5 bg-rose-50 rounded-2xl text-rose-500">
                           <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                        </span>
                        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">04 Role Assignment</h3>
                     </div>
                     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {user.role_ids && user.role_ids.length > 0 ? (
                           user.role_ids.map((roleId: string) => (
                               <div key={roleId} className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                                 <span className="text-sm font-bold text-emerald-700">Role: {getRoleName(roleId)}</span>
                              </div>
                           ))
                        ) : (
                           <p className="text-gray-500 text-sm italic col-span-full">No roles assigned</p>
                        )}
                     </div>
                  </div>

                  <div className="pt-10 flex gap-6">
                     <button 
                        type="button" 
                        onClick={() => router.push("/users")}
                        className="flex-1 bg-white border-4 border-slate-100 text-slate-400 py-7 rounded-[2.5rem] font-black uppercase tracking-widest hover:border-slate-200 hover:text-slate-500 transition-all"
                     >
                        Back to Users
                     </button>
                  </div>
               </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}