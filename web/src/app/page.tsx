import { fetchUserAction } from "@/lib/actions";
import Link from "next/link";

export default async function Home() {
  const response = await fetchUserAction("1");
  const userData = response.success ? response.data : null;
  const error = response.success ? null : response.error;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
        <div className="flex gap-3">
          <button className="bg-white px-4 py-2 rounded-xl text-gray-500 font-medium border border-gray-100 shadow-sm hover:bg-gray-50 transition-colors">Export Report</button>
          <button className="bg-primary px-4 py-2 rounded-xl text-white font-medium shadow-lg shadow-primary-shadow hover:bg-primary-hover transition-all">New Application</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <p className="text-gray-400 text-sm font-semibold uppercase tracking-widest mb-2">Total Users</p>
          <div className="flex items-end gap-3">
            <span className="text-4xl font-bold text-gray-900">1,284</span>
            <span className="text-emerald-500 text-sm font-bold bg-emerald-50 px-2 py-0.5 rounded-full mb-1">+12.5%</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <p className="text-gray-400 text-sm font-semibold uppercase tracking-widest mb-2">Applications</p>
          <div className="flex items-end gap-3">
            <span className="text-4xl font-bold text-gray-900">432</span>
            <span className="text-emerald-500 text-sm font-bold bg-emerald-50 px-2 py-0.5 rounded-full mb-1">+8.2%</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <p className="text-gray-400 text-sm font-semibold uppercase tracking-widest mb-2">Approvals</p>
          <div className="flex items-end gap-3">
            <span className="text-4xl font-bold text-gray-900">89%</span>
            <span className="text-red-500 text-sm font-bold bg-red-50 px-2 py-0.5 rounded-full mb-1">-2.1%</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">Recent Users (via gRPC)</h2>
          <span className="bg-primary-light text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">PostgreSQL Backend</span>
        </div>
        <div className="p-8">
          {error ? (
            <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              <p>Backend Offline: {error}</p>
              <em className="ml-auto text-xs opacity-70">Run 'go run main.go' to connect</em>
            </div>
          ) : userData ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-400 text-xs font-bold uppercase tracking-widest border-b border-gray-50">
                    <th className="pb-4">User ID</th>
                    <th className="pb-4">Name</th>
                    <th className="pb-4">Email</th>
                    <th className="pb-4">Status</th>
                    <th className="pb-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 font-medium">
                  <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 font-mono text-xs">{userData.id}</td>
                    <td className="py-4 text-gray-900">{userData.name}</td>
                    <td className="py-4">{userData.email}</td>
                    <td className="py-4">
                      <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Active</span>
                    </td>
                    <td className="py-4 text-right">
                      <Link href="/settings" className="text-primary hover:underline decoration-2 underline-offset-4">Edit Profile</Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
             <div className="flex flex-col items-center justify-center py-12 text-gray-400 gap-4">
               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
               <p className="italic">Loading from Go backend...</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
