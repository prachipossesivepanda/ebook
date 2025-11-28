import { useState } from 'react';

const Subscription = () => {
  const [pricingPlans, setPricingPlans] = useState({
    basic: { name: 'Basic', price: 29, features: ['Up to 100 books', 'Basic analytics', 'Email support'] },
    professional: { name: 'Professional', price: 79, features: ['Unlimited books', 'Advanced analytics', 'Priority support', 'Custom branding'] },
    enterprise: { name: 'Enterprise', price: 199, features: ['Unlimited books', 'Full analytics', '24/7 support', 'Custom branding', 'API access', 'Dedicated manager'] },
  });

  const vendorSubscriptions = [
    { vendor: 'BookStore Pro', plan: 'Professional', status: 'Active', startDate: '2024-01-01', nextBilling: '2024-02-01', amount: '$79' },
    { vendor: 'Book World', plan: 'Enterprise', status: 'Active', startDate: '2023-12-15', nextBilling: '2024-02-15', amount: '$199' },
    { vendor: 'ReadMore Books', plan: 'Basic', status: 'Active', startDate: '2024-01-10', nextBilling: '2024-02-10', amount: '$29' },
    { vendor: 'Literary Hub', plan: 'Professional', status: 'Expired', startDate: '2023-11-01', nextBilling: 'N/A', amount: '$79' },
  ];

  const handlePlanUpdate = (planName, field, value) => {
    setPricingPlans({
      ...pricingPlans,
      [planName]: {
        ...pricingPlans[planName],
        [field]: field === 'price' ? parseFloat(value) || 0 : value,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Subscription & Pricing Control</h2>
        <p className="text-gray-600">Manage subscription plans and pricing</p>
      </div>

      {/* Pricing Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(pricingPlans).map(([key, plan]) => (
          <div key={key} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-800">${plan.price}</span>
                <span className="text-gray-600">/month</span>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Price ($)
              </label>
              <input
                type="number"
                value={plan.price}
                onChange={(e) => handlePlanUpdate(key, 'price', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                min="0"
                step="0.01"
              />
            </div>

            <ul className="space-y-2 mb-6">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            <button className="w-full px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 font-medium">
              Update Plan
            </button>
          </div>
        ))}
      </div>

      {/* Vendor Subscriptions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Active Subscriptions</h3>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium">
            Export Report
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Billing</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {vendorSubscriptions.map((subscription, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {subscription.vendor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {subscription.plan}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      subscription.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {subscription.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {subscription.startDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {subscription.nextBilling}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    {subscription.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-900">Edit</button>
                      <button className="text-red-600 hover:text-red-900">Cancel</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Subscription Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">Total Subscriptions</p>
          <p className="text-2xl font-bold text-gray-800">156</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">Active</p>
          <p className="text-2xl font-bold text-green-600">142</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">Monthly Revenue</p>
          <p className="text-2xl font-bold text-blue-600">$12,450</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">Expired</p>
          <p className="text-2xl font-bold text-red-600">14</p>
        </div>
      </div>
    </div>
  );
};

export default Subscription;

