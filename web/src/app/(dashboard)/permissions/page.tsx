"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { fetchPermissionsAction, createPermissionAction } from "@/lib/actions";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function PermissionsPage() {
  const router = useRouter();
  const [permissions, setPermissions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [seeding, setSeeding] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    const response = await fetchPermissionsAction();
    if (response.success) setPermissions(response.data || []);
    setIsLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const filteredPermissions = useMemo(() => {
    if (!searchTerm) return permissions;
    const lowerSearch = searchTerm.toLowerCase();
    return permissions.filter(p => 
      p.name?.toLowerCase().includes(lowerSearch) ||
      p.code?.toLowerCase().includes(lowerSearch)
    );
  }, [permissions, searchTerm]);

  const totalPages = Math.ceil(filteredPermissions.length / pageSize);
  const paginatedPermissions = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredPermissions.slice(startIndex, startIndex + pageSize);
  }, [filteredPermissions, currentPage, pageSize]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1);
  };

  const seedPermissions = async () => {
    const defaultPermissions = [
      { name: "View Users", code: "users.view" },
      { name: "Create Users", code: "users.create" },
      { name: "Edit Users", code: "users.edit" },
      { name: "Detail Users", code: "users.detail" },
      { name: "Delete Users", code: "users.delete" },
      { name: "View Roles", code: "roles.view" },
      { name: "Create Roles", code: "roles.create" },
      { name: "Edit Roles", code: "roles.edit" },
      { name: "Detail Roles", code: "roles.detail" },
      { name: "Delete Roles", code: "roles.delete" },
      { name: "View Permissions", code: "permissions.view" },
      { name: "Create Permissions", code: "permissions.create" },
      { name: "Edit Permissions", code: "permissions.edit" },
      { name: "Detail Permissions", code: "permissions.detail" },
      { name: "Delete Permissions", code: "permissions.delete" },
      { name: "View Approval Status", code: "approval_status.view" },
      { name: "Create Approval Status", code: "approval_status.create" },
      { name: "Edit Approval Status", code: "approval_status.edit" },
      { name: "Detail Approval Status", code: "approval_status.detail" },
      { name: "Delete Approval Status", code: "approval_status.delete" },
    ];

    setSeeding(true);
    for (const perm of defaultPermissions) {
      try {
        await createPermissionAction(perm);
      } catch (error) {
        console.error(`Failed to seed permission ${perm.code}:`, error);
      }
    }
    await fetchData();
    setSeeding(false);
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h1 className="text-4xl font-black text-gray-900 tracking-tight">Permissions</h1>
                <p className="text-gray-500 font-medium">Manage system-wide access codes and permissions.</p>
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={seedPermissions}
                  disabled={seeding}
                  className="bg-emerald-500 text-white px-6 py-3 rounded-[1.5rem] font-bold shadow-lg shadow-emerald-500/20 hover:scale-[1.02] transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  {seeding ? 'Seeding...' : 'Seed Permissions'}
                </button>
                <button 
                  onClick={() => router.push("/permissions/create")}
                  className="bg-[#15aabf] text-white px-8 py-4 rounded-[1.5rem] font-bold shadow-2xl shadow-[#15aabf]/20 hover:scale-[1.02] transition-all flex items-center gap-3"
                >
                  Create Permission
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Search and Pagination Controls */}
              <div className="p-8 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div className="relative w-full sm:w-80">
                  <input
                    type="text"
                    placeholder="Search permissions..."
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

              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100">
                    <th className="px-10 py-7 text-[10px] font-black text-gray-400 uppercase tracking-widest">Name</th>
                    <th className="px-10 py-7 text-[10px] font-black text-gray-400 uppercase tracking-widest">Code</th>
                    <th className="px-10 py-7 text-[10px] font-black text-gray-400 uppercase tracking-widest">Created At</th>
                    <th className="px-10 py-7 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Settings</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {paginatedPermissions.length > 0 ? (
                    paginatedPermissions.map((p) => (
                      <tr key={p.id} className="hover:bg-gray-50/40 transition-all">
                        <td className="px-10 py-8 font-black text-gray-900">{p.name}</td>
                        <td className="px-10 py-8"><span className="px-3 py-1 bg-gray-100 rounded-lg text-xs font-mono text-gray-600 border border-gray-200">{p.code}</span></td>
                        <td className="px-10 py-8 text-sm text-gray-500">{p.created_at}</td>
                        <td className="px-10 py-8 text-right">
                          <div className="flex justify-end gap-3">
                            <button 
                              onClick={() => router.push(`/permissions/${p.id}/edit`)}
                              className="p-4 bg-white border-2 border-[#15aabf]/30 text-[#15aabf] rounded-2xl hover:border-[#15aabf] hover:text-[#15aabf] hover:shadow-xl hover:shadow-[#15aabf]/10 transition-all"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                            </button>
                            {/* Delete button placeholder - disabled until backend supports delete */}
                            <button 
                              disabled
                              className="p-4 bg-white border-2 border-gray-100 text-gray-300 rounded-2xl cursor-not-allowed"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-10 py-20 text-center">
                        <div className="flex flex-col items-center gap-4">
                          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                          </div>
                          <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">
                            {searchTerm ? 'No permissions match your search' : 'No Permissions Found'}
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Pagination Footer */}
              {filteredPermissions.length > 0 && (
                <div className="p-8 border-t border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center">
                  <div className="text-sm text-gray-600">
                    Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, filteredPermissions.length)} of {filteredPermissions.length} entries
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