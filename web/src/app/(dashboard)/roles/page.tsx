"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchRolesAction } from "@/lib/actions";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function RolesPage() {
  const router = useRouter();
  const [roles, setRoles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    const response = await fetchRolesAction();
    if (response.success) setRoles(response.data || []);
    setIsLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h1 className="text-4xl font-black text-gray-900 tracking-tight">Roles</h1>
                <p className="text-gray-500 font-medium">Define and manage user roles within the organization.</p>
              </div>
              <button onClick={() => router.push("/roles/create")} className="bg-[#15aabf] text-white px-8 py-4 rounded-[1.5rem] font-bold shadow-2xl shadow-[#15aabf]/20 hover:scale-[1.02] transition-all flex items-center gap-3">
                Create Role
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100">
                    <th className="px-10 py-7 text-[10px] font-black text-gray-400 uppercase tracking-widest">Name</th>
                    <th className="px-10 py-7 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                    <th className="px-10 py-7 text-[10px] font-black text-gray-400 uppercase tracking-widest">Remark</th>
                    <th className="px-10 py-7 text-[10px] font-black text-gray-400 uppercase tracking-widest">Created At</th>
                    <th className="px-10 py-7 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Settings</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {roles.map((r) => (
                    <tr key={r.id} className="hover:bg-gray-50/40 transition-all">
                      <td className="px-10 py-8 font-black text-gray-900 text-lg leading-tight">{r.name}</td>
                      <td className="px-10 py-8">
                        <div className="flex items-center gap-2">
                           <div className={`h-2.5 w-2.5 rounded-full ${r.status ? 'bg-emerald-500' : 'bg-gray-300'}`}></div>
                           <span className="text-sm font-bold text-gray-700">{r.status ? 'Active' : 'Inactive'}</span>
                        </div>
                      </td>
                      <td className="px-10 py-8 italic text-sm text-gray-500">"{r.remark || "No documentation"}"</td>
                      <td className="px-10 py-8 text-sm text-gray-500">{r.created_at}</td>
                      <td className="px-10 py-8 text-right">
                        <div className="flex justify-end gap-3">
                          <button onClick={() => router.push(`/roles/${r.id}/edit`)} className="p-4 bg-white border-2 border-[#15aabf]/30 text-[#15aabf] rounded-2xl hover:border-[#15aabf] hover:text-[#15aabf] hover:shadow-xl hover:shadow-[#15aabf]/10 transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                          </button>
                          {/* Delete button placeholder - can be added later */}
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
    </div>
  );
}