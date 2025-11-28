import { useState } from 'react';

const SubAdmins = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'sub_admin',
    permissions: {
      vendors: true,
      orders: true,
      catalog: true,
      contentApproval: true,
      analytics: false,
      settings: false,
      commission: false,
      subscription: false,
    },
  });

  const subAdmins = [
    {
      id: 1,
      name: 'John Manager',
      email: 'john@ebook.com',
      role: 'Sub Admin',
      status: 'Active',
      lastLogin: '2024-01-22 10:30 AM',
      permissions: ['Vendors', 'Orders', 'Catalog', 'Content Approval'],
    },
    {
      id: 2,
      name: 'Sarah Assistant',
      email: 'sarah@ebook.com',
      role: 'Sub Admin',
      status: 'Active',
      lastLogin: '2024-01-22 09:15 AM',
      permissions: ['Vendors', 'Orders', 'Analytics'],
    },
    {
      id: 3,
      name: 'Mike Coordinator',
      email: 'mike@ebook.com',
      role: 'Sub Admin',
      status: 'Inactive',
      lastLogin: '2024-01-20 03:45 PM',
      permissions: ['Catalog', 'Content Approval'],
    },
  ];

  const handlePermissionChange = (permission) => {
    setFormData({
      ...formData,
      permissions: {
        ...formData.permissions,
        [permission]: !formData.permissions[permission],
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    alert('Sub-admin created successfully!');
    setShowAddModal(false);
    setFormData({
      name: '',
      email: '',
      role: 'sub_admin',
      permissions: {
        vendors: true,
        orders: true,
        catalog: true,
        contentApproval: true,
        analytics: false,
        settings: false,
        commission: false,
        subscription: false,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Sub-Admin Management</h2>
          <p className="text-gray-600">Manage sub-admin accounts and permissions</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-medium"
        >
          Add Sub-Admin
        </button>
      </div>

      {/* Sub-Admins List */}
      <div className="grid grid-cols-1 gap-6">
        {subAdmins.map((admin) => (
          <div key={admin.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">{admin.name.charAt(0)}</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{admin.name}</h3>
                  <p className="text-sm text-gray-600">{admin.email}</p>
                  <p className="text-xs text-gray-500 mt-1">Last login: {admin.lastLogin}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    admin.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {admin.status}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-blue-600 hover:text-blue-900 text-sm font-medium">
                    Edit
                  </button>
                  <button className="px-3 py-1 text-red-600 hover:text-red-900 text-sm font-medium">
                    Deactivate
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm font-medium text-gray-700 mb-2">Permissions:</p>
              <div className="flex flex-wrap gap-2">
                {admin.permissions.map((permission, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                    {permission}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Sub-Admin Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">Add New Sub-Admin</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">Permissions</label>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(formData.permissions).map(([key, value]) => (
                    <label key={key} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={() => handlePermissionChange(key)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 font-medium"
                >
                  Create Sub-Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubAdmins;

