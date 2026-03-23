"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { fetchUsersAction, deleteUserAction } from "@/lib/actions";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function UsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const fetchData = async () => {
    setIsLoading(true);
    const response = await fetchUsersAction();
    if (response.success) setUsers(response.data || []);
    setIsLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const filteredUsers = useMemo(() => {
    if (!searchTerm) return users;
    const lowerSearch = searchTerm.toLowerCase();
    return users.filter(user => 
      user.email?.toLowerCase().includes(lowerSearch) ||
      user.employee_id?.toLowerCase().includes(lowerSearch) ||
      user.company_name?.toLowerCase().includes(lowerSearch) ||
      user.contact_number?.toLowerCase().includes(lowerSearch) ||
      user.address?.toLowerCase().includes(lowerSearch) ||
      (Number(user.user_type) === 0 ? 'global admin' : 'external client').includes(lowerSearch) ||
      (user.status ? 'active' : 'locked').includes(lowerSearch)
    );
  }, [users, searchTerm]);

  const totalPages = Math.ceil(filteredUsers.length / pageSize);
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredUsers.slice(startIndex, startIndex + pageSize);
  }, [filteredUsers, currentPage, pageSize]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Permanently delete this user profile?")) {
      const response = await deleteUserAction(id);
      if (response.success) fetchData();
      else alert(response.error);
    }
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-12">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="flex justify-between items-start">
              <div className="space-y-3">
                <div className="flex items-center gap-4 text-[11px] font-black tracking-[0.3em] text-gray-400 uppercase">
                  <span>Directory</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                  <span>RBAC Security</span>
                </div>
                <h1 className="text-5xl font-black text-gray-900 tracking-tight leading-none">System Users</h1>
                <p className="text-lg text-gray-500 font-medium max-w-2xl">Orchestrate your organization's digital identity with granular Control and Audit trails.</p>
              </div>
              <button 
                onClick={() => router.push("/users/create")} 
                className="group relative bg-[#15aabf] text-white px-10 py-5 rounded-[2rem] font-black shadow-[0_25px_60px_-15px_rgba(21,170,191,0.5)] hover:scale-[1.03] active:scale-[0.97] transition-all flex items-center gap-4 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <div className="p-2.5 bg-white/20 rounded-2xl">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </div>
                <span className="text-sm uppercase tracking-[0.15em]">Onboard User</span>
              </button>
            </div>

            <div className="bg-white rounded-[2.5rem] shadow-[0_45px_100px_-25px_rgba(0,0,0,0.03)] border border-gray-100 overflow-hidden">
              {/* Search and Pagination Controls */}
              <div className="p-8 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div className="relative w-full sm:w-80">
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#15aabf] focus:border-transparent"
                  />
                  <svg
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>Show</span>
                  <select
                    value={pageSize}
                    onChange={handlePageSizeChange}
                    className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#15aabf]"
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                  <span>entries</span>
                </div>
              </div>

              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100">
                    <th className="px-12 py-9 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">User</th>
                    <th className="px-12 py-9 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">User Type</th>
                    <th className="px-12 py-9 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Employee ID / Company</th>
                    <th className="px-12 py-9 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Contact</th>
                    <th className="px-12 py-9 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Status</th>
                    <th className="px-12 py-9 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] text-right">Settings</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {paginatedUsers.length > 0 ? (
                    paginatedUsers.map((u) => (
                      <tr key={u.id} className="hover:bg-gray-50/40 transition-all group duration-300">
                        <td className="px-12 py-9">
                           <div className="flex items-center gap-5">
                              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#15aabf]/10 to-[#15aabf]/5 flex items-center justify-center text-[#15aabf] font-black text-lg">
                                 {u.email.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                 <span className="font-black text-gray-900 text-lg block leading-tight">{u.email}</span>
                                 <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mt-1 block">UUID: {u.id.substring(0,8)}...</span>
                              </div>
                           </div>
                        </td>
                        <td className="px-12 py-9">
                           <span className={`px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.1em] border shadow-sm ${Number(u.user_type) === 0 ? 'bg-indigo-50 border-indigo-100 text-indigo-600' : 'bg-amber-50 border-amber-100 text-amber-600'}`}>
                             {Number(u.user_type) === 0 ? 'Global Admin' : 'External Client'}
                           </span>
                        </td>
                        <td className="px-12 py-9">
                           <div className="space-y-1">
                              <span className="text-sm font-black text-gray-700 block">{Number(u.user_type) === 0 ? u.employee_id || "NOT-SET" : u.company_name || "N/A"}</span>
                              <span className="text-[10px] font-bold text-gray-300 uppercase tracking-wider">{Number(u.user_type) === 0 ? 'Employee ID' : 'Entity Name'}</span>
                           </div>
                        </td>
                        <td className="px-12 py-9">
                           <div className="space-y-1">
                              <span className="text-sm font-bold text-gray-800 block">{u.contact_number || "+00 0000 000"}</span>
                              <span className="text-xs text-gray-400 font-medium truncate max-w-[180px] block leading-relaxed line-clamp-1 italic">"{u.address || "No secondary address"}"</span>
                           </div>
                        </td>
                        <td className="px-12 py-9">
                          <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-2xl border ${u.status ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-rose-50 border-rose-100 text-rose-700'}`}>
                             <div className={`h-2.5 w-2.5 rounded-full ring-4 ${u.status ? 'bg-emerald-500 ring-emerald-100' : 'bg-rose-500 ring-rose-100'}`}></div>
                             <span className="text-[10px] font-black uppercase tracking-widest">{u.status ? 'Active' : 'Locked'}</span>
                          </div>
                        </td>
                        <td className="px-12 py-9 text-right">
                           <div className="flex justify-end gap-3">
                             <button onClick={() => router.push(`/users/${u.id}/edit`)} className="p-4 bg-white border-2 border-[#15aabf]/30 text-[#15aabf] rounded-2xl hover:border-[#15aabf] hover:text-[#15aabf] hover:shadow-xl hover:shadow-[#15aabf]/10 transition-all">
                               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                             </button>
                             <button onClick={() => handleDelete(u.id)} className="p-4 bg-white border-2 border-rose-100 text-rose-500 rounded-2xl hover:border-rose-500 hover:text-rose-500 hover:shadow-xl hover:shadow-rose-500/10 transition-all">
                               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                             </button>
                           </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-12 py-20 text-center">
                        <div className="flex flex-col items-center gap-4">
                          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                          </div>
                          <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">
                            {searchTerm ? 'No users match your search' : 'No users found'}
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Pagination Footer */}
              {filteredUsers.length > 0 && (
                <div className="p-8 border-t border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center">
                  <div className="text-sm text-gray-600">
                    Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, filteredUsers.length)} of {filteredUsers.length} entries
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                    >
                      Previous
                    </button>
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                            currentPage === pageNum
                              ? 'bg-[#15aabf] text-white border-[#15aabf]'
                              : 'bg-white border-gray-200 hover:bg-gray-50'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}