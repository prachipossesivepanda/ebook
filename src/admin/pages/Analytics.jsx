import { useMemo, useState } from 'react';
import { useRoleContext } from '../hooks/useRoleContext';

const Analytics = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { isVendorTeam, vendorName } = useRoleContext();

  const analyticsData = isVendorTeam
    ? {
        revenue: { total: '$18,750', growth: '+9%', period: 'This Month' },
        orders: { total: '312', growth: '+14%', period: 'This Month' },
        catalog: { total: '48 SKUs', growth: '+6%', period: 'Active Listings' },
        payouts: { total: '$4,120', growth: '+$640', period: 'Next Payout' },
      }
    : {
    revenue: {
      total: '$125,430',
      growth: '+15%',
      period: 'This Month',
    },
    orders: {
      total: '1,234',
      growth: '+8%',
      period: 'This Month',
    },
    vendors: {
      total: '156',
      growth: '+12%',
      period: 'This Month',
    },
    customers: {
      total: '5,678',
      growth: '+20%',
      period: 'This Month',
    },
  };

  const topVendors = [
    { accountId: 'VND-001', name: 'BookStore Pro', orders: 234, revenue: '$12,450', growth: '+15%', status: 'Active' },
    { accountId: 'VND-005', name: 'Book World', orders: 312, revenue: '$18,750', growth: '+22%', status: 'Active' },
    { accountId: 'VND-003', name: 'ReadMore Books', orders: 156, revenue: '$8,920', growth: '+8%', status: 'Active' },
    { accountId: 'VND-002', name: 'Literary Hub', orders: 89, revenue: '$4,560', growth: '+5%', status: 'Pending' },
    { accountId: 'VND-004', name: 'Novel Corner', orders: 45, revenue: '$2,340', growth: '-3%', status: 'Suspended' },
  ];

  const vendorStatusDistribution = [
    { status: 'Active', count: 120, percentage: 77, color: 'bg-green-500' },
    { status: 'Pending', count: 20, percentage: 13, color: 'bg-yellow-500' },
    { status: 'Suspended', count: 12, percentage: 8, color: 'bg-red-500' },
    { status: 'Inactive', count: 4, percentage: 2, color: 'bg-gray-500' },
  ];

  const vendorRevenueContribution = [
    { accountId: 'VND-005', name: 'Book World', revenue: '$18,750', percentage: 30, color: 'bg-blue-500' },
    { accountId: 'VND-001', name: 'BookStore Pro', revenue: '$12,450', percentage: 20, color: 'bg-green-500' },
    { accountId: 'VND-003', name: 'ReadMore Books', revenue: '$8,920', percentage: 14, color: 'bg-purple-500' },
    { accountId: 'VND-002', name: 'Literary Hub', revenue: '$4,560', percentage: 7, color: 'bg-yellow-500' },
    { accountId: 'VND-OTHERS', name: 'Others', revenue: '$20,750', percentage: 33, color: 'bg-gray-400' },
  ];

  // Filter vendors based on search term (name or account ID)
  const baseTopVendors = useMemo(() => {
    if (isVendorTeam && vendorName) {
      const scoped = topVendors.filter((vendor) => vendor.name === vendorName);
      return scoped.length ? scoped : topVendors;
    }
    return topVendors;
  }, [isVendorTeam, vendorName]);

  const filteredTopVendors = baseTopVendors.filter(vendor => {
    if (!searchTerm || !searchTerm.trim()) return true;
    const searchLower = searchTerm.trim().toLowerCase();
    return (
      vendor.name.toLowerCase().includes(searchLower) ||
      vendor.accountId.toLowerCase().includes(searchLower)
    );
  });

  const baseRevenueContribution = useMemo(() => {
    if (isVendorTeam && vendorName) {
      const scoped = vendorRevenueContribution.filter((vendor) => vendor.name === vendorName);
      return scoped.length ? scoped : vendorRevenueContribution;
    }
    return vendorRevenueContribution;
  }, [isVendorTeam, vendorName]);

  const filteredVendorRevenueContribution = baseRevenueContribution.filter(vendor => {
    if (!searchTerm || !searchTerm.trim()) return true;
    const searchLower = searchTerm.trim().toLowerCase();
    // Exclude "Others" from search results unless specifically searched
    if (vendor.accountId === 'VND-OTHERS' && searchLower !== 'others') {
      return false;
    }
    return (
      vendor.name.toLowerCase().includes(searchLower) ||
      vendor.accountId.toLowerCase().includes(searchLower)
    );
  });

  const hasSearch = Boolean(searchTerm && searchTerm.trim());

  const newVendorsByMonth = [
    { month: 'Jan', count: 12 },
    { month: 'Feb', count: 15 },
    { month: 'Mar', count: 18 },
    { month: 'Apr', count: 14 },
    { month: 'May', count: 20 },
    { month: 'Jun', count: 16 },
  ];

  const vendorPerformanceMetrics = {
    averageOrdersPerVendor: 78,
    averageRevenuePerVendor: '$4,200',
    topVendorContribution: '30%',
    activeVendorRate: '77%',
  };
  const vendorFocusedMetrics = {
    fulfillmentRate: '97%',
    returnRate: '1.2%',
    avgOrderValue: '$62.40',
    payoutStatus: 'On Track',
  };

  const categorySales = [
    { category: 'Fiction', sales: 450, revenue: '$22,500', percentage: 35 },
    { category: 'Non-Fiction', sales: 320, revenue: '$18,200', percentage: 25 },
    { category: 'Educational', sales: 280, revenue: '$15,600', percentage: 22 },
    { category: 'Children', sales: 180, revenue: '$9,000', percentage: 14 },
    { category: 'Others', sales: 50, revenue: '$2,500', percentage: 4 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h2>
          <p className="text-gray-600">Comprehensive insights into your platform</p>
        </div>
        <div className="w-full md:w-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by vendor name or account ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-80 px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                type="button"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          {searchTerm && (
            <p className="text-xs text-gray-500 mt-1">
              Found {filteredTopVendors.length} vendor(s) in top performers, {filteredVendorRevenueContribution.length} in revenue contribution
            </p>
          )}
        </div>
      </div>

      {hasSearch && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <p className="text-sm text-gray-600">
                Showing results for <span className="font-semibold text-gray-800">"{searchTerm.trim()}"</span>
              </p>
              <p className="text-xs text-gray-500">
                {filteredTopVendors.length} match{filteredTopVendors.length === 1 ? '' : 'es'} in top performers ·{' '}
                {filteredVendorRevenueContribution.length} in revenue breakdown
              </p>
            </div>
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              Clear search
            </button>
          </div>

          {filteredTopVendors.length > 0 || filteredVendorRevenueContribution.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTopVendors.slice(0, 4).map((vendor) => (
                <div
                  key={`search-${vendor.accountId}`}
                  className="p-4 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-800">{vendor.name}</p>
                      <p className="text-xs text-gray-500">{vendor.accountId}</p>
                    </div>
                    <span
                      className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                        vendor.status === 'Active'
                          ? 'bg-green-100 text-green-700'
                          : vendor.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {vendor.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
                    <div>
                      <p className="text-xs text-gray-500">Orders</p>
                      <p className="font-semibold text-gray-800">{vendor.orders}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Revenue</p>
                      <p className="font-semibold text-gray-800">{vendor.revenue}</p>
                    </div>
                  </div>
                  <p
                    className={`text-xs font-medium mt-3 ${
                      vendor.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    Growth {vendor.growth}
                  </p>
                </div>
              ))}

              {filteredTopVendors.length === 0 &&
                filteredVendorRevenueContribution.slice(0, 3).map((vendor) => (
                  <div
                    key={`search-revenue-${vendor.accountId}`}
                    className="p-4 border border-dashed border-gray-200 rounded-lg bg-white"
                  >
                    <p className="font-semibold text-gray-800">{vendor.name}</p>
                    {vendor.accountId !== 'VND-OTHERS' && (
                      <p className="text-xs text-gray-500 mb-2">{vendor.accountId}</p>
                    )}
                    <p className="text-sm text-gray-600">Revenue {vendor.revenue}</p>
                    <div className="mt-2 h-2 rounded-full bg-gray-200">
                      <div
                        className={`${vendor.color} h-2 rounded-full`}
                        style={{ width: `${vendor.percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{vendor.percentage}% contribution</p>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No vendors found. Try a different name or account ID.</p>
            </div>
          )}
        </div>
      )}

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(analyticsData).map(([key, data]) => (
          <div key={key} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600 capitalize">{key}</h3>
              <span className="text-xs text-green-600 font-semibold">{data.growth}</span>
            </div>
            <p className="text-3xl font-bold text-gray-800 mb-1">{data.total}</p>
            <p className="text-xs text-gray-500">{data.period}</p>
          </div>
        ))}
      </div>

      {/* Vendor Performance Metrics */}
      {!isVendorTeam ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Avg Orders/Vendor</h3>
            <p className="text-2xl font-bold text-gray-800">{vendorPerformanceMetrics.averageOrdersPerVendor}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Avg Revenue/Vendor</h3>
            <p className="text-2xl font-bold text-gray-800">{vendorPerformanceMetrics.averageRevenuePerVendor}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Top Vendor Share</h3>
            <p className="text-2xl font-bold text-gray-800">{vendorPerformanceMetrics.topVendorContribution}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Active Rate</h3>
            <p className="text-2xl font-bold text-gray-800">{vendorPerformanceMetrics.activeVendorRate}</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-1">Fulfillment Rate</h3>
            <p className="text-2xl font-bold text-gray-800">{vendorFocusedMetrics.fulfillmentRate}</p>
            <p className="text-xs text-gray-500 mt-1">Deliveries on time</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-1">Return Rate</h3>
            <p className="text-2xl font-bold text-gray-800">{vendorFocusedMetrics.returnRate}</p>
            <p className="text-xs text-gray-500 mt-1">Of total orders</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-1">Avg Order Value</h3>
            <p className="text-2xl font-bold text-gray-800">{vendorFocusedMetrics.avgOrderValue}</p>
            <p className="text-xs text-gray-500 mt-1">Rolling 30 days</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-1">Payout Status</h3>
            <p className="text-2xl font-bold text-gray-800">{vendorFocusedMetrics.payoutStatus}</p>
            <p className="text-xs text-gray-500 mt-1">Next disbursement scheduled</p>
          </div>
        </div>
      )}

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Revenue Trend</h3>
          <div className="h-64 flex items-end justify-between gap-2">
            {[65, 75, 60, 80, 70, 85, 90, 75, 88, 92, 85, 95].map((height, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-slate-600 rounded-t-lg hover:bg-slate-700 transition-colors"
                  style={{ height: `${height}%` }}
                />
                <span className="text-xs text-gray-500 mt-2">{index + 1}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-600 mt-4">Last 12 Months</p>
        </div>

        {/* Orders Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Orders Trend</h3>
          <div className="h-64 flex items-end justify-between gap-2">
            {[50, 60, 55, 70, 65, 75, 80, 70, 82, 85, 78, 90].map((height, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-green-500 rounded-t-lg hover:bg-green-600 transition-colors"
                  style={{ height: `${height}%` }}
                />
                <span className="text-xs text-gray-500 mt-2">{index + 1}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-600 mt-4">Last 12 Months</p>
        </div>
      </div>

      {!isVendorTeam && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Vendor Status Distribution</h3>
              <div className="space-y-4">
                {vendorStatusDistribution.map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">{item.status}</span>
                      <span className="text-sm font-semibold text-gray-800">{item.count} vendors ({item.percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`${item.color} h-3 rounded-full transition-all`}
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">New Vendors Added</h3>
              <div className="h-64 flex items-end justify-between gap-2">
                {newVendorsByMonth.map((item, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-blue-500 rounded-t-lg hover:bg-blue-600 transition-colors"
                      style={{ height: `${(item.count / 20) * 100}%` }}
                    />
                    <span className="text-xs text-gray-500 mt-2">{item.month}</span>
                    <span className="text-xs font-semibold text-gray-700">{item.count}</span>
                  </div>
                ))}
              </div>
              <p className="text-center text-sm text-gray-600 mt-4">Last 6 Months</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Vendor Revenue Contribution</h3>
            {filteredVendorRevenueContribution.length > 0 ? (
              <div className="space-y-4">
                {filteredVendorRevenueContribution.map((vendor, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-700">{vendor.name}</span>
                        {vendor.accountId !== 'VND-OTHERS' && (
                          <span className="text-xs text-gray-500">({vendor.accountId})</span>
                        )}
                      </div>
                      <span className="text-sm font-semibold text-gray-800">{vendor.revenue} ({vendor.percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`${vendor.color} h-3 rounded-full transition-all`}
                        style={{ width: `${vendor.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No vendors found matching your search criteria.</p>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Performing Vendors</h3>
            {filteredTopVendors.length > 0 ? (
              <div className="space-y-4">
                {filteredTopVendors.map((vendor, index) => (
                  <div key={vendor.accountId} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center font-bold text-blue-600">
                        {index + 1}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-gray-800">{vendor.name}</p>
                          <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                            vendor.status === 'Active' ? 'bg-green-100 text-green-700' :
                            vendor.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {vendor.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm text-gray-600">{vendor.orders} orders</p>
                          <span className="text-xs text-gray-500">• {vendor.accountId}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-800">{vendor.revenue}</p>
                      <p className={`text-sm font-medium ${vendor.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {vendor.growth}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No vendors found matching your search criteria.</p>
              </div>
            )}
          </div>
        </>
      )}

      {/* Category Sales */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Sales by Category</h3>
        <div className="space-y-4">
          {categorySales.map((category, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">{category.category}</span>
                <span className="text-sm font-semibold text-gray-800">{category.revenue}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-slate-600 h-2 rounded-full transition-all"
                  style={{ width: `${category.percentage}%` }}
                />
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-gray-500">{category.sales} books sold</span>
                <span className="text-xs text-gray-500">{category.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;

