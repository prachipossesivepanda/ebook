import { useMemo, useState } from 'react';
import { useRoleContext } from '../hooks/useRoleContext';

const Vendors = () => {
  const { isOwnerTeam } = useRoleContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const vendors = [
    { id: 1, name: 'BookStore Pro', email: 'contact@bookstorepro.com', phone: '+1 234-567-8900', status: 'Active', joinDate: '2024-01-15', totalOrders: 234, revenue: '$12,450' },
    { id: 2, name: 'Literary Hub', email: 'info@literaryhub.com', phone: '+1 234-567-8901', status: 'Pending', joinDate: '2024-01-20', totalOrders: 0, revenue: '$0' },
    { id: 3, name: 'ReadMore Books', email: 'hello@readmore.com', phone: '+1 234-567-8902', status: 'Active', joinDate: '2024-01-18', totalOrders: 156, revenue: '$8,920' },
    { id: 4, name: 'Novel Corner', email: 'support@novelcorner.com', phone: '+1 234-567-8903', status: 'Suspended', joinDate: '2024-01-10', totalOrders: 89, revenue: '$4,560' },
    { id: 5, name: 'Book World', email: 'info@bookworld.com', phone: '+1 234-567-8904', status: 'Active', joinDate: '2024-01-12', totalOrders: 312, revenue: '$18,750' },
  ];

  const summary = useMemo(() => {
    return vendors.reduce(
      (acc, vendor) => {
        acc.total += 1;
        const key = vendor.status.toLowerCase();
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      },
      { total: 0 }
    );
  }, [vendors]);

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || vendor.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const styles = {
      Active: 'bg-green-100 text-green-700',
      Pending: 'bg-yellow-100 text-yellow-700',
      Suspended: 'bg-red-100 text-red-700',
      Inactive: 'bg-gray-100 text-gray-700',
    };
    return styles[status] || styles.Inactive;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">University Management</h2>
          <p className="text-gray-600">
            {isOwnerTeam ? 'Oversee university health, onboarding, and compliance' : 'Browse marketplace university partners'}
          </p>
        </div>
        {isOwnerTeam && (
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium">
              Export List
            </button>
            <button className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-medium">
              Start Onboarding
            </button>
          </div>
        )}
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Total Universities</p>
          <p className="text-2xl font-semibold text-gray-900 mt-1">{summary.total}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Active</p>
          <p className="text-2xl font-semibold text-emerald-700 mt-1">{summary.active || 0}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Pending onboarding</p>
          <p className="text-2xl font-semibold text-amber-600 mt-1">{summary.pending || 0}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Requires attention</p>
          <p className="text-2xl font-semibold text-red-600 mt-1">{summary.suspended || 0}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search vendors by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="suspended">Suspended</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {['all', 'active', 'pending', 'suspended', 'inactive'].map((status) => (
            <button
              key={status}
              className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                filterStatus === status ? 'bg-slate-900 text-white border-slate-900' : 'text-slate-600 border-slate-200 hover:border-slate-400'
              }`}
              onClick={() => setFilterStatus(status)}
            >
              {status === 'all' ? 'All Universities' : status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Vendors Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">University</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredVendors.map((vendor) => (
                <tr key={vendor.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{vendor.name}</div>
                      <div className="text-sm text-gray-500">Joined: {vendor.joinDate}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{vendor.email}</div>
                    <div className="text-sm text-gray-500">{vendor.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(vendor.status)}`}>
                      {vendor.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {vendor.totalOrders}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {vendor.revenue}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-900">View</button>
                      <button className="text-green-600 hover:text-green-900">Edit</button>
                      <button className="text-red-600 hover:text-red-900">Suspend</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of <span className="font-medium">5</span> universities
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            Previous
          </button>
          <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>

      {isOwnerTeam && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-500">Onboarding pipeline</p>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li>• 4 applications awaiting review</li>
              <li>• 2 vendors pending KYC</li>
              <li>• Avg. activation time 3.2 days</li>
            </ul>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-500">Compliance alerts</p>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li>• 1 vendor missing tax forms</li>
              <li>• 2 SLA breaches detected</li>
            </ul>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-500">Growth opportunities</p>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li>• 3 vendors eligible for Spotlight</li>
              <li>• 5 flagged for upsell outreach</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vendors;

