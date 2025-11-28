const Analytics = () => {
  const analyticsData = {
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
    { name: 'BookStore Pro', orders: 234, revenue: '$12,450', growth: '+15%' },
    { name: 'Book World', orders: 312, revenue: '$18,750', growth: '+22%' },
    { name: 'ReadMore Books', orders: 156, revenue: '$8,920', growth: '+8%' },
    { name: 'Literary Hub', orders: 89, revenue: '$4,560', growth: '+5%' },
  ];

  const categorySales = [
    { category: 'Fiction', sales: 450, revenue: '$22,500', percentage: 35 },
    { category: 'Non-Fiction', sales: 320, revenue: '$18,200', percentage: 25 },
    { category: 'Educational', sales: 280, revenue: '$15,600', percentage: 22 },
    { category: 'Children', sales: 180, revenue: '$9,000', percentage: 14 },
    { category: 'Others', sales: 50, revenue: '$2,500', percentage: 4 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h2>
        <p className="text-gray-600">Comprehensive insights into your platform</p>
      </div>

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

      {/* Top Vendors */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Performing Vendors</h3>
        <div className="space-y-4">
          {topVendors.map((vendor, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center font-bold text-blue-600">
                  {index + 1}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{vendor.name}</p>
                  <p className="text-sm text-gray-600">{vendor.orders} orders</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-800">{vendor.revenue}</p>
                <p className="text-sm text-green-600">{vendor.growth}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

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

