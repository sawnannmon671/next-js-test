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
  const [selectedPermissionIds, setSelectedPermissionIds] = useState<string[]>([]);

  const fetchData = async () => {
    setIsLoading(true);
    const response = await fetchPermissionsAction();
    if (response.success) setPermissions(response.data || []);
    setIsLoading(false);
  };

  const togglePermission = (permissionId: string) => {
    setSelectedPermissionIds(prev =>
      prev.includes(permissionId)
        ? prev.filter(id => id !== permissionId)
        : [...prev, permissionId]
    );
  };

  const toggleGroup = (groupPermissions: any[]) => {
    const groupIds = groupPermissions.map(p => p.id);
    const allSelected = groupIds.every(id => selectedPermissionIds.includes(id));
    if (allSelected) {
      setSelectedPermissionIds(prev => prev.filter(id => !groupIds.includes(id)));
    } else {
      setSelectedPermissionIds(prev => [...new Set([...prev, ...groupIds])]);
    }
  };

  const isGroupSelected = (groupPermissions: any[]) => {
    const groupIds = groupPermissions.map(p => p.id);
    return groupIds.length > 0 && groupIds.every(id => selectedPermissionIds.includes(id));
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

  const groupedPaginatedPermissions = useMemo(() => {
    const groups: Record<string, any[]> = {};
    paginatedPermissions.forEach(p => {
      const category = p.code?.split('.')[0] || 'other';
      if (!groups[category]) groups[category] = [];
      groups[category].push(p);
    });
    const order = ['approval_status', 'permissions', 'roles', 'users'];
    const sortedCategories = Object.keys(groups).sort((a, b) => {
      const aIndex = order.indexOf(a);
      const bIndex = order.indexOf(b);
      if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
      if (aIndex !== -1) return -1;
      if (bIndex !== -1) return 1;
      return a.localeCompare(b);
    });
    return sortedCategories.map(category => ({
      category,
      label: category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      permissions: groups[category]
    }));
  }, [paginatedPermissions]);

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

              <div className="space-y-8">
                {groupedPaginatedPermissions.length > 0 ? (
                  groupedPaginatedPermissions.map((group) => (
                    <div key={group.category} className="space-y-4">
                       <div 
                         className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl cursor-pointer transition-all"
                         onClick={() => toggleGroup(group.permissions)}
                       >
                         <input
                           type="checkbox"
                           checked={isGroupSelected(group.permissions)}
                           onChange={() => toggleGroup(group.permissions)}
                           className="w-5 h-5 rounded border-gray-300 text-[#15aabf] focus:ring-[#15aabf]"
                           onClick={(e) => e.stopPropagation()}
                         />
                          <h3 className="text-sm font-bold text-gray-800">{group.category}</h3>
                       </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                         {group.permissions.map((permission) => (
                           <div 
                             key={permission.id} 
                             className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-[#15aabf]/30 transition-all cursor-pointer"
                             onClick={() => togglePermission(permission.id)}
                           >
                             <input
                               type="checkbox"
                               checked={selectedPermissionIds.includes(permission.id)}
                               onChange={() => togglePermission(permission.id)}
                               className="w-5 h-5 rounded border-gray-300 text-[#15aabf] focus:ring-[#15aabf]"
                               onClick={(e) => e.stopPropagation()}
                             />
                             <div>
                               <span className="text-sm font-bold text-gray-800 block">{permission.code}</span>
                               <span className="text-[10px] text-gray-500">{permission.name}</span>
                             </div>
                           </div>
                         ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-20">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                      </div>
                      <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">
                        {searchTerm ? 'No permissions match your search' : 'No Permissions Found'}
                      </p>
                    </div>
                  </div>
                )}
              </div>

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