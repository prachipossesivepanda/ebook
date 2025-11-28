import { useState } from 'react';

const Dashboard = () => {
  const userRole = localStorage.getItem('userRole') || 'super_admin';
  const isSuperAdmin = userRole === 'super_admin';

  const stats = [
    { label: 'Total Vendors', value: '1,234', change: '+12%', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
    { label: 'Total Orders', value: '5,678', change: '+8%', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
    { label: 'Total Revenue', value: '$125,430', change: '+15%', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { label: 'Pending KYC', value: '23', change: '-5%', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
  ];

  const recentVendors = [
    { id: 1, name: 'BookStore Pro', email: 'contact@bookstorepro.com', status: 'Active', joinDate: '2024-01-15' },
    { id: 2, name: 'Literary Hub', email: 'info@literaryhub.com', status: 'Pending', joinDate: '2024-01-20' },
    { id: 3, name: 'ReadMore Books', email: 'hello@readmore.com', status: 'Active', joinDate: '2024-01-18' },
    { id: 4, name: 'Novel Corner', email: 'support@novelcorner.com', status: 'Suspended', joinDate: '2024-01-10' },
  ];

  const recentOrders = [
    { id: 'ORD-001', vendor: 'BookStore Pro', customer: 'John Doe', amount: '$45.99', status: 'Delivered', date: '2024-01-22' },
    { id: 'ORD-002', vendor: 'Literary Hub', customer: 'Jane Smith', amount: '$89.50', status: 'Processing', date: '2024-01-22' },
    { id: 'ORD-003', vendor: 'ReadMore Books', customer: 'Bob Johnson', amount: '$32.00', status: 'Pending', date: '2024-01-21' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-900 mb-1">
          Welcome back, {localStorage.getItem('userName') || 'Admin'}
        </h2>
        <p className="text-gray-600">
          {isSuperAdmin ? 'Super Admin Dashboard' : 'Sub-Admin Dashboard'} - Manage your multi-vendor book portal
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const iconBgColors = [
            'bg-blue-50',
            'bg-slate-50',
            'bg-emerald-50',
            'bg-amber-50',
          ];
          const iconColors = [
            'text-blue-600',
            'text-slate-600',
            'text-emerald-600',
            'text-amber-600',
          ];
          
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm hover:shadow-md border border-gray-200 p-6 transition-all duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${iconBgColors[index]} rounded-lg flex items-center justify-center`}>
                  <svg className={`w-6 h-6 ${iconColors[index]}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                  </svg>
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded ${stat.change.startsWith('+') ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Vendors */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Vendors</h3>
            <a href="/admin/vendors" className="text-slate-600 hover:text-slate-900 text-sm font-medium flex items-center gap-1 transition-colors">
              View all
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
          <div className="space-y-3">
            {recentVendors.map((vendor) => (
              <div key={vendor.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                    {vendor.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{vendor.name}</p>
                    <p className="text-sm text-gray-600">{vendor.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-2.5 py-1 rounded text-xs font-medium ${
                    vendor.status === 'Active' ? 'bg-emerald-50 text-emerald-700' :
                    vendor.status === 'Pending' ? 'bg-amber-50 text-amber-700' :
                    'bg-red-50 text-red-700'
                  }`}>
                    {vendor.status}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">{vendor.joinDate}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
            <a href="/admin/orders" className="text-slate-600 hover:text-slate-900 text-sm font-medium flex items-center gap-1 transition-colors">
              View all
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200">
                <div>
                  <p className="font-medium text-gray-900">{order.id}</p>
                  <p className="text-sm text-gray-600">{order.vendor} • {order.customer}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{order.amount}</p>
                  <span className={`px-2.5 py-1 rounded text-xs font-medium ${
                    order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-700' :
                    order.status === 'Processing' ? 'bg-blue-50 text-blue-700' :
                    'bg-amber-50 text-amber-700'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      {isSuperAdmin && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <a href="/admin/vendor-onboarding" className="group p-5 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-center border border-gray-200 hover:border-gray-300">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-900">Onboard Vendor</p>
            </a>
            <a href="/admin/kyc-verification" className="group p-5 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-center border border-gray-200 hover:border-gray-300">
              <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-900">Verify KYC</p>
            </a>
            <a href="/admin/sub-admins" className="group p-5 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-center border border-gray-200 hover:border-gray-300">
              <div className="w-10 h-10 bg-slate-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-900">Manage Admins</p>
            </a>
            <a href="/admin/commission" className="group p-5 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-center border border-gray-200 hover:border-gray-300">
              <div className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-900">Commission</p>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

