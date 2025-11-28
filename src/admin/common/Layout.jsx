import { useState } from 'react';
import Sidebar from './sidebar';
import { useLocation } from 'react-router-dom';
import { getStoredSession, getRoleLabel } from '../utils/session';

const variantCopy = {
  owner: 'Manage your platform efficiently',
  vendor: 'Operate your university partnerships and teams',
  subadmin: 'Execute assigned workflows',
};

const Layout = ({ children, variant = 'owner', subtitle }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const session = getStoredSession();

  const getPageTitle = () => {
    const path = location.pathname.split('/').pop();
    return path
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        variant={variant}
      />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 sticky top-0 z-20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors group"
              >
                <svg className="w-5 h-5 text-gray-600 group-hover:text-gray-900 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                  {getPageTitle()}
                </h1>
                <p className="text-xs text-gray-500 mt-0.5">
                  {subtitle || variantCopy[variant] || variantCopy.owner}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* Search Bar */}
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors focus-within:ring-2 focus-within:ring-slate-500/20 focus-within:border-slate-300">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Quick search..."
                  className="bg-transparent border-none outline-none text-sm w-40 text-gray-700 placeholder-gray-400"
                />
              </div>

              {/* Notifications */}
              <div className="relative">
                <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative group">
                  <svg className="w-5 h-5 text-gray-600 group-hover:text-gray-900 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-semibold rounded-full flex items-center justify-center border-2 border-white">
                    3
                  </span>
                </button>
              </div>

              {/* User Profile */}
              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">
                    {session?.user?.name || 'Admin User'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {session?.user?.email || `${session?.user?.name || 'admin'}@example.com`}
                  </p>
                  <p className="text-xs text-gray-400">
                    {getRoleLabel(session?.role)}
                  </p>
                </div>
                <div className="relative group cursor-pointer">
                  <div className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center text-white font-semibold text-sm shadow-sm hover:bg-slate-800 transition-colors">
                    {session?.user?.name?.charAt(0).toUpperCase() || 'A'}
                  </div>
                  {/* Online status indicator */}
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content with custom scrollbar */}
        <main className="flex-1 overflow-y-auto p-6 scrollbar-thin">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
