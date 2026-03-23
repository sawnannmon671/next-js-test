"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { 
  fetchApprovalStatuses, 
  deleteStatusAction 
} from "@/lib/actions";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function ApprovalStatusPage() {
  const router = useRouter();
  const [statuses, setStatuses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

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

  const filteredStatuses = useMemo(() => {
    if (!searchTerm) return statuses;
    const lowerSearch = searchTerm.toLowerCase();
    return statuses.filter(status => 
      status.name?.toLowerCase().includes(lowerSearch) ||
      status.remark?.toLowerCase().includes(lowerSearch) ||
      (status.approval_type === 1 ? 'pending' : 
       status.approval_type === 2 ? 'approve' : 
       status.approval_type === 3 ? 'cancel' : 'reject').includes(lowerSearch) ||
      (status.status ? 'operational' : 'disabled').includes(lowerSearch)
    );
  }, [statuses, searchTerm]);

  const totalPages = Math.ceil(filteredStatuses.length / pageSize);
  const paginatedStatuses = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredStatuses.slice(startIndex, startIndex + pageSize);
  }, [filteredStatuses, currentPage, pageSize]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1);
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
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden font-sans">
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
                onClick={() => router.push("/approval-status/create")}
                className="group relative bg-[#15aabf] text-white px-8 py-4 rounded-[1.5rem] font-bold shadow-2xl shadow-[#15aabf]/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-3 overflow-hidden"
              >
                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <div className="p-2 bg-white/10 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </div>
                <span className="font-bold">New Status</span>
              </button>
            </div>

            {apiError && (
              <div className="mb-8 p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-4">
                <div className="p-2 bg-rose-100 rounded-lg text-rose-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                </div>
                <p className="text-sm font-medium opacity-80">{apiError}</p>
                <button onClick={fetchData} className="ml-auto bg-red-100 px-6 py-2 rounded-xl text-sm font-black hover:bg-red-200 transition-colors">Reconnect</button>
              </div>
            )}

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-40 gap-4 opacity-30">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
                <span className="text-[10px] font-black uppercase tracking-widest">Retrieving Data...</span>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.02)] border border-gray-100 overflow-hidden translate-y-0 transition-all">
                {/* Search and Pagination Controls */}
                <div className="p-8 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center">
                  <div className="relative w-full sm:w-80">
                    <input
                      type="text"
                      placeholder="Search approval statuses..."
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
                    {paginatedStatuses.length > 0 ? (
                      paginatedStatuses.map((item) => (
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
                                 onClick={() => router.push(`/approval-status/${item.id}/edit`)} 
                                 className="p-3 bg-white border-2 border-[#15aabf]/30 text-[#15aabf] rounded-xl hover:border-[#15aabf] hover:text-[#15aabf] hover:shadow-xl hover:shadow-[#15aabf]/10 transition-all"
                               >
                                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                               </button>
                               <button 
                                 onClick={() => handleDelete(item.id)} 
                                 className="p-3 bg-white border-2 border-rose-100 text-rose-500 rounded-xl hover:border-rose-500 hover:text-rose-500 hover:shadow-xl hover:shadow-rose-500/10 transition-all"
                               >
                                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                               </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="px-10 py-20 text-center">
                          <div className="flex flex-col items-center gap-4">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
                              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                            </div>
                            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">
                              {searchTerm ? 'No statuses match your search' : 'No Statuses Found'}
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>

                {/* Pagination Footer */}
                {filteredStatuses.length > 0 && (
                  <div className="p-8 border-t border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center">
                    <div className="text-sm text-gray-600">
                      Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, filteredStatuses.length)} of {filteredStatuses.length} entries
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
            )}
          </div>
        </main>
      </div>
    </div>
  );
}