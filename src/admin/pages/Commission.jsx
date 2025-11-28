import { useMemo, useState } from 'react';
import { useRoleContext } from '../hooks/useRoleContext';

const Commission = () => {
  const { isOwnerTeam, isVendorTeam, vendorName } = useRoleContext();
  const [commissionSettings, setCommissionSettings] = useState({
    defaultRate: 15,
    categoryRates: {
      Fiction: 12,
      'Non-Fiction': 15,
      Educational: 18,
      Children: 10,
    },
    paymentSchedule: 'monthly',
  });

  const vendorCommissions = [
    { vendor: 'BookStore Pro', totalSales: '$12,450', commissionRate: '12%', commissionAmount: '$1,494', status: 'Paid', period: 'Jan 2024' },
    { vendor: 'Book World', totalSales: '$18,750', commissionRate: '15%', commissionAmount: '$2,813', status: 'Pending', period: 'Jan 2024' },
    { vendor: 'ReadMore Books', totalSales: '$8,920', commissionRate: '18%', commissionAmount: '$1,606', status: 'Pending', period: 'Jan 2024' },
    { vendor: 'Literary Hub', totalSales: '$4,560', commissionRate: '12%', commissionAmount: '$547', status: 'Paid', period: 'Jan 2024' },
  ];

  const scopedCommissions = useMemo(() => {
    if (!isVendorTeam || !vendorName) return vendorCommissions;
    return vendorCommissions.filter((comm) => comm.vendor === vendorName);
  }, [isVendorTeam, vendorName]);

  const handleRateChange = (category, value) => {
    setCommissionSettings({
      ...commissionSettings,
      categoryRates: {
        ...commissionSettings.categoryRates,
        [category]: parseFloat(value) || 0,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          {isVendorTeam ? 'Commission & Payouts' : 'Commission Setup'}
        </h2>
        <p className="text-gray-600">
          {isVendorTeam ? 'Track your earnings, commission rates, and payout history' : 'Configure commission rates and manage vendor payouts'}
        </p>
      </div>

      {/* Commission Settings - Owner Only */}
      {isOwnerTeam && (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Commission Rates</h3>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Default Commission Rate (%)
            </label>
            <div className="flex items-center gap-4">
              <input
                type="number"
                value={commissionSettings.defaultRate}
                onChange={(e) => setCommissionSettings({ ...commissionSettings, defaultRate: parseFloat(e.target.value) || 0 })}
                className="w-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                min="0"
                max="100"
                step="0.1"
              />
              <span className="text-sm text-gray-600">%</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">This rate applies to categories without specific rates</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Category-Specific Rates
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(commissionSettings.categoryRates).map(([category, rate]) => (
                <div key={category} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">{category}</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={rate}
                      onChange={(e) => handleRateChange(category, e.target.value)}
                      className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                      min="0"
                      max="100"
                      step="0.1"
                    />
                    <span className="text-sm text-gray-600">%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Schedule
            </label>
            <select
              value={commissionSettings.paymentSchedule}
              onChange={(e) => setCommissionSettings({ ...commissionSettings, paymentSchedule: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="weekly">Weekly</option>
              <option value="bi-weekly">Bi-Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
            </select>
          </div>

          <button className="px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 font-medium">
            Save Settings
          </button>
        </div>
      </div>
      )}

      {/* Vendor Payout Stats - Vendor View */}
      {isVendorTeam && scopedCommissions.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-500">Total Earnings</p>
            <p className="text-2xl font-semibold text-gray-900 mt-1">
              {scopedCommissions.reduce((sum, c) => {
                const amount = parseFloat(c.commissionAmount.replace(/[^0-9.]/g, ''));
                return sum + amount;
              }, 0).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-500">Pending Payouts</p>
            <p className="text-2xl font-semibold text-yellow-600 mt-1">
              {scopedCommissions.filter(c => c.status === 'Pending').reduce((sum, c) => {
                const amount = parseFloat(c.commissionAmount.replace(/[^0-9.]/g, ''));
                return sum + amount;
              }, 0).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-500">Commission Rate</p>
            <p className="text-2xl font-semibold text-blue-600 mt-1">
              {scopedCommissions[0]?.commissionRate || 'N/A'}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-500">Next Payout</p>
            <p className="text-lg font-semibold text-gray-900 mt-1">Feb 2024</p>
            <p className="text-xs text-gray-500 mt-1">Estimated</p>
          </div>
        </div>
      )}

      {/* Vendor Commissions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            {isVendorTeam ? 'Payout History' : 'Vendor Commission Reports'}
          </h3>
          {!isVendorTeam && (
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium">
              Export Report
            </button>
          )}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {!isVendorTeam && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
                )}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Sales</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commission</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {scopedCommissions.map((commission, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  {!isVendorTeam && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {commission.vendor}
                    </td>
                  )}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {commission.totalSales}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {commission.commissionRate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    {commission.commissionAmount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      commission.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {commission.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {commission.period}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {isVendorTeam ? (
                      <>
                        {commission.status === 'Paid' && (
                          <button className="text-green-600 hover:text-green-900">Download Receipt</button>
                        )}
                        {commission.status === 'Pending' && (
                          <span className="text-gray-400">Processing...</span>
                        )}
                      </>
                    ) : (
                      <>
                        {commission.status === 'Pending' && (
                          <button className="text-blue-600 hover:text-blue-900">Process Payment</button>
                        )}
                        {commission.status === 'Paid' && (
                          <button className="text-green-600 hover:text-green-900">View Receipt</button>
                        )}
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Commission;

